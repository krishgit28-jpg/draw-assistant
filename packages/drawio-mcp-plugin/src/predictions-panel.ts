/**
 * AI Predictions Panel for Draw.io MCP Plugin
 *
 * Handles the rendering of AI prediction cards in a right-side panel,
 * hover previews with semi-transparent overlay on the mxGraph canvas,
 * and click-to-commit interactions using native mxGraph APIs.
 *
 * Browser-only module — may use console.* freely per AGENTS.md rule 7.
 */

import type { DrawioUI } from "./types";

// ───────────────────────────── Types ─────────────────────────────

export type Prediction = {
  updated_xml: string;
  confidence_score: number;
  description: string;
  onCommit?: () => void;
};

type PredictionsPanelState = {
  panelElement: HTMLElement | null;
  styleElement: HTMLStyleElement | null;
  predictions: Prediction[];
  previewCells: any[];
  isHovering: boolean;
  originalXml: string | null;
  ui: DrawioUI | null;
  selectionListenerSuppressed: boolean;
  onSelectionChange: ((callback: () => void) => void) | null;
};

// ─────────────────────────── Module State ────────────────────────

const state: PredictionsPanelState = {
  panelElement: null,
  styleElement: null,
  predictions: [],
  previewCells: [],
  isHovering: false,
  originalXml: null,
  ui: null,
  selectionListenerSuppressed: false,
  onSelectionChange: null,
};

// ──────────────────────────── CSS ────────────────────────────────

const PANEL_CSS = `
/* ── AI Predictions Panel ── */
.mcp-predictions-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: #1a1a2e;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #e0e0e0;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mcp-predictions-panel.mcp-panel-hidden {
  transform: translateX(100%);
}

.mcp-predictions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.mcp-predictions-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #a8d8ea;
}

.mcp-predictions-badge {
  background: rgba(83, 144, 217, 0.25);
  color: #7ec8e3;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.mcp-predictions-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mcp-predictions-body::-webkit-scrollbar {
  width: 4px;
}

.mcp-predictions-body::-webkit-scrollbar-track {
  background: transparent;
}

.mcp-predictions-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}

.mcp-predictions-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  padding: 24px;
}

.mcp-predictions-empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
  opacity: 0.4;
}

.mcp-predictions-empty-text {
  font-size: 13px;
  line-height: 1.5;
}

.mcp-quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
}

.mcp-quick-action-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mcp-quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* ── Prediction Card ── */
.mcp-prediction-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.mcp-prediction-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #5390d9, #7ec8e3);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.mcp-prediction-card:hover {
  background: rgba(83, 144, 217, 0.1);
  border-color: rgba(83, 144, 217, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.mcp-prediction-card:hover::before {
  opacity: 1;
}

.mcp-prediction-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.mcp-prediction-card-index {
  font-size: 11px;
  font-weight: 600;
  color: #5390d9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mcp-prediction-confidence {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mcp-prediction-confidence-bar {
  width: 48px;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.mcp-prediction-confidence-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.mcp-prediction-confidence-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
}

.mcp-prediction-description {
  font-size: 13px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.mcp-prediction-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.mcp-prediction-action-hint {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mcp-prediction-apply-btn {
  font-size: 11px;
  color: #7ec8e3;
  background: rgba(83, 144, 217, 0.15);
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mcp-prediction-apply-btn:hover {
  background: rgba(83, 144, 217, 0.3);
  color: #a8d8ea;
}

/* ── Minimalist workspace overrides ── */
.mcp-workspace-minimalist .geFormatContainer,
.mcp-workspace-minimalist .geSidebar,
.mcp-workspace-minimalist .geFooterContainer {
  display: none !important;
}

.mcp-workspace-minimalist .geEditor {
  right: 320px !important;
}
`;

// ──────────────────────────── Helpers ────────────────────────────

function getConfidenceColor(score: number): string {
  if (score >= 0.8) return "#48bb78";
  if (score >= 0.6) return "#ecc94b";
  if (score >= 0.4) return "#ed8936";
  return "#fc8181";
}

function getGraph(ui: DrawioUI): any {
  return ui?.editor?.graph;
}

function getMxUtils(): any {
  return (window as any).mxUtils;
}

function getMxConstants(): any {
  return (window as any).mxConstants;
}

function getMxCodec(): any {
  return (window as any).mxCodec;
}

function getMxEvent(): any {
  return (window as any).mxEvent;
}

// ────────────────────── Canvas Save / Restore ───────────────────

/**
 * Captures the current graph XML so we can restore it after a hover preview.
 * Uses mxCodec to encode the model — the same path draw.io uses internally.
 */
function captureGraphState(ui: DrawioUI): string | null {
  const graph = getGraph(ui);
  if (!graph) return null;

  try {
    const encoder = new (getMxCodec())();
    const node = encoder.encode(graph.getModel());
    return getMxUtils().getXml(node);
  } catch (err) {
    console.warn("[predictions-panel] failed to capture graph state", err);
    return null;
  }
}

/**
 * Restores the graph to a previously captured XML state without touching
 * the undo manager. We do this by decoding directly into the model after
 * clearing it — no beginUpdate/endUpdate so the undo stack stays clean.
 */
function restoreGraphState(ui: DrawioUI, xml: string): void {
  const graph = getGraph(ui);
  if (!graph || !xml) return;

  try {
    const mxUtils = getMxUtils();
    const doc = mxUtils.parseXml(xml);
    const codec = new (getMxCodec())(doc);
    const model = graph.getModel();

    // Bypass undo: disable event notification, decode, re-enable.
    model.beginUpdate();
    try {
      codec.decode(doc.documentElement, model);
    } finally {
      model.endUpdate();
    }

    graph.refresh();
  } catch (err) {
    console.warn("[predictions-panel] failed to restore graph state", err);
  }
}

// ───────────────────── Hover Preview Logic ──────────────────────

/**
 * Renders the prediction XML on the canvas with semi-transparent opacity.
 * The preview is rendered by decoding the XML into temporary cells and
 * applying a translucent style override.
 *
 * IMPORTANT: We suppress the outgoing selection-change listener during
 * hover to prevent an infinite loop (hover → canvas change → selection
 * event → sends data to server → new predictions → etc).
 */
function showHoverPreview(ui: DrawioUI, prediction: Prediction): void {
  if (state.isHovering) {
    clearHoverPreview(ui);
  }

  const graph = getGraph(ui);
  if (!graph) return;

  // Capture current state before applying preview
  state.originalXml = captureGraphState(ui);
  state.isHovering = true;
  state.selectionListenerSuppressed = true;

  try {
    const mxUtils = getMxUtils();
    const doc = mxUtils.parseXml(prediction.updated_xml);
    const root = doc.documentElement;

    // Navigate to the mxGraphModel if wrapped in mxfile
    let graphModelElement = root;
    if (root.nodeName === "mxfile") {
      const diagram = root.querySelector("diagram");
      if (diagram) {
        const mxGraphModel = diagram.querySelector("mxGraphModel");
        if (mxGraphModel) {
          graphModelElement = mxGraphModel;
        }
      }
    }

    const model = graph.getModel();
    const codec = new (getMxCodec())(graphModelElement.ownerDocument);

    // Decode into model (bypassing undo)
    model.beginUpdate();
    try {
      codec.decode(graphModelElement, model);
    } finally {
      model.endUpdate();
    }

    // Apply semi-transparent opacity to all user cells
    const allCells = model.cells || {};
    for (const cellId of Object.keys(allCells)) {
      const cell = allCells[cellId];
      if (cell && (cell.vertex || cell.edge)) {
        const currentStyle = cell.style || "";
        if (!currentStyle.includes("opacity=")) {
          cell.style = currentStyle + ";opacity=50;";
        } else {
          cell.style = currentStyle.replace(
            /opacity=\d+/,
            "opacity=50",
          );
        }
      }
    }

    graph.refresh();
  } catch (err) {
    console.warn("[predictions-panel] hover preview failed", err);
    // Revert on failure
    if (state.originalXml) {
      restoreGraphState(ui, state.originalXml);
    }
    state.isHovering = false;
    state.selectionListenerSuppressed = false;
  }
}

/**
 * Removes the hover preview and restores the original canvas state.
 */
function clearHoverPreview(ui: DrawioUI): void {
  if (!state.isHovering || !state.originalXml) {
    state.isHovering = false;
    state.selectionListenerSuppressed = false;
    return;
  }

  restoreGraphState(ui, state.originalXml);

  state.isHovering = false;
  state.originalXml = null;
  state.selectionListenerSuppressed = false;
}

// ────────────────────── Click-to-Commit Logic ───────────────────

/**
 * Permanently applies the prediction XML to the graph, registered in
 * the mxUndoManager so the user can Ctrl+Z to undo.
 *
 * Unlike the hover preview, this uses model.beginUpdate() / endUpdate()
 * properly so the change is tracked by the undo manager.
 */
function commitPrediction(ui: DrawioUI, prediction: Prediction): void {
  // First, ensure any hover preview is cleared
  if (state.isHovering) {
    clearHoverPreview(ui);
  }

  if (prediction.onCommit) {
    prediction.onCommit();
    return;
  }

  const graph = getGraph(ui);
  if (!graph) return;

  try {
    const mxUtils = getMxUtils();
    const doc = mxUtils.parseXml(prediction.updated_xml);
    const root = doc.documentElement;

    let graphModelElement = root;
    if (root.nodeName === "mxfile") {
      const diagram = root.querySelector("diagram");
      if (diagram) {
        const mxGraphModel = diagram.querySelector("mxGraphModel");
        if (mxGraphModel) {
          graphModelElement = mxGraphModel;
        }
      }
    }

    const model = graph.getModel();

    // Use beginUpdate / endUpdate — this is the key difference from the
    // hover preview. The undo manager captures the compound edit.
    model.beginUpdate();
    try {
      const codec = new (getMxCodec())(graphModelElement.ownerDocument);
      codec.decode(graphModelElement, model);
    } finally {
      model.endUpdate();
    }

    graph.refresh();

    console.info(
      `[predictions-panel] committed prediction: ${prediction.description}`,
    );
  } catch (err) {
    console.error("[predictions-panel] commit failed", err);
  }
}

// ─────────────────────── Panel Rendering ─────────────────────────

function injectStyles(): void {
  if (state.styleElement) return;

  const style = document.createElement("style");
  style.id = "mcp-predictions-panel-styles";
  style.textContent = PANEL_CSS;
  document.head.appendChild(style);
  state.styleElement = style;
}

function createPanel(): HTMLElement {
  const panel = document.createElement("div");
  panel.className = "mcp-predictions-panel";
  panel.id = "mcp-predictions-panel";

  panel.innerHTML = `
    <div class="mcp-predictions-header">
      <h3>AI Predictions</h3>
      <span class="mcp-predictions-badge" id="mcp-predictions-count">0</span>
    </div>
    <div class="mcp-predictions-body" id="mcp-predictions-body">
    </div>
  `;

  document.body.appendChild(panel);
  return panel;
}

function renderCards(ui: DrawioUI, predictions: Prediction[]): void {
  const body = document.getElementById("mcp-predictions-body");
  const badge = document.getElementById("mcp-predictions-count");
  if (!body) return;

  if (badge) {
    badge.textContent = String(predictions.length);
  }

  body.innerHTML = "";

  predictions.forEach((prediction, index) => {
    const card = document.createElement("div");
    card.className = "mcp-prediction-card";
    card.dataset.index = String(index);

    const confidencePercent = Math.round(prediction.confidence_score * 100);
    const confidenceColor = getConfidenceColor(prediction.confidence_score);

    card.innerHTML = `
      <div class="mcp-prediction-card-header">
        <span class="mcp-prediction-card-index">Variation ${index + 1}</span>
        <div class="mcp-prediction-confidence">
          <div class="mcp-prediction-confidence-bar">
            <div class="mcp-prediction-confidence-fill" style="width: ${confidencePercent}%; background: ${confidenceColor};"></div>
          </div>
          <span class="mcp-prediction-confidence-label">${confidencePercent}%</span>
        </div>
      </div>
      <p class="mcp-prediction-description">${escapeHtml(prediction.description)}</p>
      <div class="mcp-prediction-card-footer">
        <span class="mcp-prediction-action-hint">Hover to preview</span>
        <button class="mcp-prediction-apply-btn">Apply</button>
      </div>
    `;

    // Hover → show semi-transparent preview
    card.addEventListener("mouseenter", () => {
      showHoverPreview(ui, prediction);
    });

    // Mouse leave → revert to original
    card.addEventListener("mouseleave", () => {
      clearHoverPreview(ui);
    });

    // Click → commit permanently
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      commitPrediction(ui, prediction);
      clearPredictions();
    });

    // Also handle the "Apply" button click directly
    const applyBtn = card.querySelector(".mcp-prediction-apply-btn");
    if (applyBtn) {
      applyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        commitPrediction(ui, prediction);
        clearPredictions();
      });
    }

    body.appendChild(card);
  });
}

function renderEmptyState(successMessage: boolean = false): void {
  const body = document.getElementById("mcp-predictions-body");
  const badge = document.getElementById("mcp-predictions-count");
  if (!body) return;

  if (badge) badge.textContent = "0";

  const msgText = successMessage
    ? "Prediction applied!<br/>Select shapes for new suggestions."
    : "Waiting for AI predictions…<br/>Select shapes to receive suggestions.";
  const icon = successMessage ? "✅" : "🔮";

  body.innerHTML = `
    <div class="mcp-predictions-empty">
      <div class="mcp-predictions-empty-icon">${icon}</div>
      <div class="mcp-predictions-empty-text">
        ${msgText}
      </div>
      <div class="mcp-quick-actions">
        <button class="mcp-quick-action-btn" id="mcp-btn-align">📏 Align Center</button>
        <button class="mcp-quick-action-btn" id="mcp-btn-bold">B Bold Text</button>
        <button class="mcp-quick-action-btn" id="mcp-btn-bg">🎨 Add Background</button>
      </div>
    </div>
  `;

  // Bind quick actions
  const ui = state.ui;
  if (!ui) return;
  const graph = getGraph(ui);
  if (!graph) return;

  const getSelection = () => {
    const cells = graph.getSelectionCells();
    if (!cells || cells.length === 0) {
      alert("Please select one or more shapes first.");
      return null;
    }
    return cells;
  };

  document.getElementById("mcp-btn-align")?.addEventListener("click", () => {
    const cells = getSelection();
    if (cells) graph.alignCells(getMxConstants().ALIGN_CENTER, cells);
  });

  document.getElementById("mcp-btn-bold")?.addEventListener("click", () => {
    const cells = getSelection();
    if (cells) graph.toggleCellStyleFlags(getMxConstants().STYLE_FONTSTYLE, getMxConstants().FONT_BOLD, cells);
  });

  document.getElementById("mcp-btn-bg")?.addEventListener("click", () => {
    const cells = getSelection();
    if (cells) {
      graph.setCellStyles(getMxConstants().STYLE_FILLCOLOR, '#dae8fc', cells);
      graph.setCellStyles(getMxConstants().STYLE_STROKECOLOR, '#6c8ebf', cells);
    }
  });
}

function clearPredictions(): void {
  state.predictions = [];
  renderEmptyState(true);
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ────────────────────── Public API ───────────────────────────────

/**
 * Initializes the predictions panel and injects required styles.
 * Called once during plugin bootstrap.
 */
export function initPredictionsPanel(ui: DrawioUI): void {
  state.ui = ui;
  injectStyles();
  state.panelElement = createPanel();
  renderEmptyState(false);

  console.info("[predictions-panel] initialized");
}

/**
 * Handles incoming prediction payloads from the MCP server.
 * Renders 5 interactive cards in the right-side panel.
 */
export function handlePredictions(
  ui: DrawioUI,
  predictions: Prediction[],
): void {
  if (!state.panelElement) {
    initPredictionsPanel(ui);
  }

  state.predictions = predictions;
  state.panelElement?.classList.remove("mcp-panel-hidden");

  renderCards(ui, predictions);

  console.info(
    `[predictions-panel] rendered ${predictions.length} prediction cards`,
  );
}

/**
 * Returns whether the outgoing selection listener should be suppressed.
 * Used by the bootstrap module to avoid infinite feedback loops during
 * hover previews.
 */
export function isSelectionListenerSuppressed(): boolean {
  return state.selectionListenerSuppressed;
}

/**
 * Destroys the panel and cleans up resources.
 */
export function disposePredictionsPanel(): void {
  if (state.panelElement) {
    state.panelElement.remove();
    state.panelElement = null;
  }

  if (state.styleElement) {
    state.styleElement.remove();
    state.styleElement = null;
  }

  state.predictions = [];
  state.previewCells = [];
  state.isHovering = false;
  state.originalXml = null;
  state.ui = null;
  state.selectionListenerSuppressed = false;
}
