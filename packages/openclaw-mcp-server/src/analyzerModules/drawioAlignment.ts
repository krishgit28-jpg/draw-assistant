import type { AnalyzerResult, ContextAnalyzer } from '../analyzerTypes.js'
import type { MCPPayload } from '../types.js'

export class DrawioAlignmentAnalyzer implements ContextAnalyzer {
  readonly id = 'heuristic.drawio_alignment'
  private readonly tolerance = 10 // pixels

  analyze(payload: MCPPayload): AnalyzerResult {
    const elements = payload.currentSlide?.elements || []
    const issues: string[] = []

    const edges = elements.filter(e => e.type === 'edge')
    const vertices = elements.filter(e => e.type === 'vertex')

    // Helper to find a vertex by id
    const getVertex = (id: string) => vertices.find(v => v.id === id)

    // Check edges for jagged lines
    for (const edge of edges) {
      try {
        const details = JSON.parse(edge.content || '{}')
        const source = getVertex(details.source_id)
        const target = getVertex(details.target_id)

        if (source && target) {
          const sourceCenterX = source.left + source.width / 2
          const sourceCenterY = source.top + source.height / 2
          const targetCenterX = target.left + target.width / 2
          const targetCenterY = target.top + target.height / 2

          const xDiff = Math.abs(sourceCenterX - targetCenterX)
          const yDiff = Math.abs(sourceCenterY - targetCenterY)

          if (xDiff > 0 && xDiff <= this.tolerance) {
            issues.push(`Nodes ${source.id} and ${target.id} are connected but their X-centers are off by ${xDiff}px, causing a jagged line.`)
          }

          if (yDiff > 0 && yDiff <= this.tolerance) {
            issues.push(`Nodes ${source.id} and ${target.id} are connected but their Y-centers are off by ${yDiff}px, causing a jagged line.`)
          }
        }
      } catch (e) {
        // ignore
      }
    }

    return { alignmentIssues: issues }
  }
}
