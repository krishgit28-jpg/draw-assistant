import {
  McpBridgeClient,
  type ActionSupplier,
  type SchemaSupplier,
  type StateSupplier,
  type Unsubscribe,
  type ClientSpecs,
  type CanvasState,
  type CanvasElement
} from "@pptist/sdk";
import type { DrawioUI } from "./types";
import { toolDefinitions } from "./tool-registry";
import { get_active_document_id, get_page_id, get_selected_cell, remove_circular_dependencies, serialize_document_info } from "./drawio-tools";
import { handlePredictions } from "./predictions-panel";

export function initOpenClawBridge(ui: DrawioUI, baseUrl: string = "http://localhost:3100"): McpBridgeClient {
  const schema: SchemaSupplier = {
    getSpecs: (): ClientSpecs => {
      return {
        appName: "Draw.io",
        appVersion: "1.0",
        documentation: `
Draw.io diagram editor capabilities. 
Architecture Instructions:
- Draw.io uses an mxGraph backed model. Elements are called 'cells'.
- To add elements, use tools like 'add-rectangle' or 'add-cell-of-shape' (requires x, y, width, height).
- Styles are semicolon-separated key-value pairs (e.g. 'rounded=1;fillColor=#ff0000;').
- To connect nodes, use 'add-edge' with source_id and target_id.
- Prioritize making clean, well-aligned diagrams.
        `.trim(),
        capabilities: ["state.push", "actions.execute"],
        schemas: {},
        actions: toolDefinitions.map((def) => ({
          id: def.name,
          label: def.name,
          description: `Execute tool: ${def.name}`,
          applicableTo: ["any"],
          argsSchema: {
            type: "object",
            properties: Array.from(def.params).reduce((acc, param) => {
              acc[param] = { type: "string" };
              return acc;
            }, {} as Record<string, any>),
          },
        })),
      };
    },
  };

  const actions: ActionSupplier = {
    listActions: () => {
      const specs = schema.getSpecs();
      if (specs instanceof Promise) {
        throw new Error("Synchronous specs expected");
      }
      return specs.actions;
    },
    execute: async (command, args) => {
      const def = toolDefinitions.find((d) => d.name === command);
      if (!def) {
        return { ok: false, error: `Unknown command: ${command}` };
      }

      try {
        const result = def.handler(ui, args || {});
        if (result instanceof Promise) {
          await result;
        }
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    },
  };

  const state: StateSupplier<CanvasState> = {
    getSnapshot: () => buildSnapshot(ui, "snapshot"),
    subscribe: (listener: (snapshot: CanvasState) => void): Unsubscribe => {
      let isUnsubscribed = false;

      const triggerListener = (trigger: string) => {
        if (isUnsubscribed) return;
        try {
          listener(buildSnapshot(ui, trigger));
        } catch (err) {
          console.error("[OpenClaw Bridge] Error in state snapshot build:", err);
        }
      };

      // Listen to basic UI events
      const uiEvents = ["fileLoaded", "pageSelected", "pageRenamed", "pageMoved", "pagesPatched"];
      uiEvents.forEach((evt) => {
        ui.editor?.addListener?.(evt, () => triggerListener(`ui:${evt}`));
      });

      // Hook mxGraph model and selection changes if available
      const graph = ui.editor?.graph;
      let mxEvent = (window as any).mxEvent;

      const onGraphChange = () => triggerListener("graph:change");

      if (graph && mxEvent) {
        (graph as any).getModel()?.addListener(mxEvent.CHANGE, onGraphChange);
        (graph as any).getSelectionModel()?.addListener(mxEvent.CHANGE, onGraphChange);
      } else if (graph) {
        // Fallback if mxEvent is not available via window
        (graph as any).getModel()?.addListener("change", onGraphChange);
        (graph as any).getSelectionModel()?.addListener("change", onGraphChange);
      }

      return () => {
        isUnsubscribed = true;
        if (graph && mxEvent) {
          (graph as any).getModel()?.removeListener(mxEvent.CHANGE, onGraphChange);
          (graph as any).getSelectionModel()?.removeListener(mxEvent.CHANGE, onGraphChange);
        } else if (graph) {
          (graph as any).getModel()?.removeListener("change", onGraphChange);
          (graph as any).getSelectionModel()?.removeListener("change", onGraphChange);
        }
      };
    },
  };

  const client = new McpBridgeClient({
    schema,
    actions,
    state,
    baseUrl,
    log: (...args) => console.log("[OpenClaw Bridge]", ...args),
  });

  client.start();

  // Poll for suggestions and feed them to the UI
  setInterval(async () => {
    try {
      const res = await fetch(`${baseUrl}/suggestions`);
      if (res.ok) {
        const json = await res.json();
        const suggestionsList = json.suggestions || [];
        // OpenClaw generic suggestions format to legacy Prediction[] format mapper
        const mapped = suggestionsList.map((s: any) => ({
          description: s.label + (s.description ? ": " + s.description : ""),
          confidence_score: s.confidence || 0.9,
          // If the AI sent updatedElements, we'd map them to XML. For now just pass empty XML
          // or rely on the execute callback for action_sequences.
          updated_xml: "",
          onCommit: async () => {
            if (s.steps && Array.isArray(s.steps)) {
              for (const step of s.steps) {
                const def = toolDefinitions.find((d) => d.name === step.command);
                if (def) {
                  try {
                    const args = {
                      ...(step.args || {}),
                      target_document: { id: get_active_document_id() },
                      target_page: { id: get_page_id((ui as any).currentPage) }
                    };
                    await def.handler(ui, args);
                  } catch (err) {
                    console.error(`[OpenClaw Bridge] Failed to execute step ${step.command}`, err);
                  }
                } else {
                  console.warn(`[OpenClaw Bridge] Unknown command ${step.command}`);
                }
              }
            }
          }
        }));

        // Pass to the predictions panel
        if (mapped.length > 0) {
          handlePredictions(ui, mapped);
        }
      }
    } catch (e) {
      // Ignore polling errors
    }
  }, 2000);

  return client;
}

function buildSnapshot(ui: DrawioUI, trigger: string): CanvasState {
  let selected = null;
  try {
    selected = get_selected_cell(ui);
  } catch (e) {
    // Ignore error if selection fails
  }

  const serializeCell = (cell: any): CanvasElement => {
    const geometry = cell.geometry || {};
    
    // Extract Draw.io specific topology data for the analyzer
    const details = {
      isEdge: !!cell.edge,
      source_id: cell.source?.id || null,
      target_id: cell.target?.id || null,
      parent_id: cell.parent?.id || null,
      value: cell.value,
    };

    return {
      id: cell.id || "unknown",
      type: cell.edge ? "edge" : (typeof cell.value === "object" ? cell.value?.nodeName || "object" : "vertex"),
      left: geometry.x || 0,
      top: geometry.y || 0,
      width: geometry.width || 0,
      height: geometry.height || 0,
      content: JSON.stringify(details),
    };
  };

  const selection: CanvasElement[] = [];
  if (selected && selected !== "no cell selected") {
    selection.push(serializeCell(selected));
  }

  const allElements: CanvasElement[] = [];
  try {
    const model = (ui as any).editor?.graph?.getModel();
    if (model && model.cells) {
      for (const id in model.cells) {
        const cell = model.cells[id];
        // Exclude root (0) and default layer (1)
        if (cell.id !== "0" && cell.id !== "1") {
          allElements.push(serializeCell(cell));
        }
      }
    }
  } catch (e) {
    // Ignore
  }

  let documentInfo = null;
  try {
    const file = ui.getCurrentFile?.();
    if (file) {
      documentInfo = serialize_document_info(ui, "current-document");
    }
  } catch (e) {
    // Ignored
  }

  return {
    trigger,
    selection,
    slide: {
      id: documentInfo?.current_page?.id || "unknown-page",
      elements: allElements.length > 0 ? allElements : selection,
    },
    history: [],
  };
}
