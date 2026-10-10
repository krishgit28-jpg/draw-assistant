import { z } from "zod";

import { ToolRegistrar } from "./types.js";
import type { Context } from "../types.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const TOOL_propose_xml_predictions = "propose-xml-predictions";

/**
 * Schema for a single AI prediction object.
 */
const PredictionSchema = z.object({
  updated_xml: z
    .string()
    .describe(
      "The complete Draw.io XML representing the predicted diagram variation.",
    ),
  confidence_score: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "A confidence score between 0 and 1 indicating the AI's confidence in this prediction.",
    ),
  description: z
    .string()
    .describe(
      "A human-readable description of this prediction variation.",
    ),
});

/**
 * Register the `propose-xml-predictions` MCP tool.
 *
 * This tool is invoked by the AI client (OpenClaw) to push 5 predicted
 * diagram variations to the connected draw.io frontend. Unlike standard
 * tools that round-trip through the bus and wait for a reply, this is
 * a fire-and-forget push: we forward the payload to all connected
 * extensions and return an acknowledgement immediately.
 *
 * The frontend plugin handles rendering prediction cards, hover previews,
 * and click-to-commit interactions.
 */
export const registerProposeXmlPredictionsTool: ToolRegistrar = (
  server,
  context,
) => {
  server.tool(
    TOOL_propose_xml_predictions,
    "Push exactly 5 AI-predicted diagram variations to the connected Draw.io frontend. Each prediction contains updated XML, a confidence score, and a description. The frontend renders interactive cards for preview and commit.",
    {
      predictions: z
        .array(PredictionSchema)
        .length(5)
        .describe(
          "An array of exactly 5 prediction objects, each with updated_xml, confidence_score, and description.",
        ),
    },
    async (args) => {
      const { predictions } = args;

      // Push the predictions payload to all connected extensions via the bus.
      // We use __control to distinguish this from standard tool events so the
      // plugin can handle it in its own message handler without interfering
      // with the tool-dispatch flow.
      context.bus.send_to_extension({
        __control: "xml-predictions",
        predictions,
      });

      context.log.debug(
        `[${TOOL_propose_xml_predictions}] forwarded ${predictions.length} predictions to extension`,
      );

      const response: CallToolResult = {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              message: `Successfully forwarded ${predictions.length} predictions to the Draw.io frontend.`,
            }),
          },
        ],
      };
      return response;
    },
  );
};
