import type { AnalyzerResult, ContextAnalyzer } from '../analyzerTypes.js'
import type { MCPPayload, SerializedElement } from '../types.js'

export class DrawioTopologyAnalyzer implements ContextAnalyzer {
  readonly id = 'heuristic.drawio_topology'

  analyze(payload: MCPPayload): AnalyzerResult {
    const elements = payload.currentSlide?.elements || []
    const issues: string[] = []

    const edges = elements.filter(e => e.type === 'edge')
    const vertices = elements.filter(e => e.type === 'vertex')

    // Find dangling edges (edges without source or target)
    for (const edge of edges) {
      try {
        const details = JSON.parse(edge.content || '{}')
        if (!details.source_id) {
          issues.push(`Edge ${edge.id} has no source connected. It is dangling.`)
        }
        if (!details.target_id) {
          issues.push(`Edge ${edge.id} has no target connected. It is dangling.`)
        }
      } catch (e) {
        // ignore JSON parse error
      }
    }

    // Find orphaned vertices (vertices with no edges connected to them) if there are edges in the graph
    if (edges.length > 0 && vertices.length > 1) {
      for (const vertex of vertices) {
        let isConnected = false
        for (const edge of edges) {
          try {
            const details = JSON.parse(edge.content || '{}')
            if (details.source_id === vertex.id || details.target_id === vertex.id) {
              isConnected = true
              break
            }
          } catch (e) {
            // ignore
          }
        }
        if (!isConnected) {
          // It's an orphaned vertex
          issues.push(`Node ${vertex.id} is completely disconnected from the rest of the diagram. Consider connecting it.`)
        }
      }
    }

    // Detect structural overlaps (containment without parent_id)
    for (let i = 0; i < vertices.length; i++) {
      for (let j = 0; j < vertices.length; j++) {
        if (i === j) continue;
        const a = vertices[i]
        const b = vertices[j]
        
        // Check if A is completely inside B
        if (a.left >= b.left && a.left + a.width <= b.left + b.width &&
            a.top >= b.top && a.top + a.height <= b.top + b.height) {
          try {
            const details = JSON.parse(a.content || '{}')
            if (details.parent_id !== b.id) {
              issues.push(`Node ${a.id} is visually contained inside Node ${b.id}, but is not logically grouped.`)
            }
          } catch (e) {
             // ignore
          }
        }
      }
    }

    return { alignmentIssues: issues }
  }
}
