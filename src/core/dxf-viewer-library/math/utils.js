/**
 * Math utilities for DXF viewer
 */

/**
 * Calculate the intersection point of two line segments in parametric form.
 * @param {Vector2} p1 Start point of first segment
 * @param {Vector2} p2 End point of first segment
 * @param {Vector2} p3 Start point of second segment
 * @param {Vector2} p4 End point of second segment
 * @param {boolean} extendLines If true, lines are extended beyond their endpoints
 * @returns {[number, number, number] | null} [t, u, cross] where t is parameter for first segment,
 *   u is parameter for second segment, cross is cross product of direction vectors.
 *   Returns null if lines are parallel.
 */
export function IntersectSegmentsParametric(p1, p2, p3, p4, extendLines = false) {
    const d1x = p2.x - p1.x
    const d1y = p2.y - p1.y
    const d2x = p4.x - p3.x
    const d2y = p4.y - p3.y
    
    const cross = d1x * d2y - d1y * d2x
    
    // Check if lines are parallel
    if (Math.abs(cross) < 1e-10) {
        return null
    }
    
    const dx = p3.x - p1.x
    const dy = p3.y - p1.y
    
    const t = (dx * d2y - dy * d2x) / cross
    const u = (dx * d1y - dy * d1x) / cross
    
    if (!extendLines) {
        // Check if intersection is within both segments
        if (t < 0 || t > 1 || u < 0 || u > 1) {
            return null
        }
    }
    
    return [t, u, cross]
}

/**
 * Calculate distance from a point to a line segment.
 * @param {Vector2} point The point
 * @param {Vector2} lineStart Start of line segment
 * @param {Vector2} lineEnd End of line segment
 * @returns {number} Distance
 */
export function PointToSegmentDistance(point, lineStart, lineEnd) {
    const dx = lineEnd.x - lineStart.x
    const dy = lineEnd.y - lineStart.y
    const lengthSq = dx * dx + dy * dy
    
    if (lengthSq === 0) {
        // Segment is a point
        const pdx = point.x - lineStart.x
        const pdy = point.y - lineStart.y
        return Math.sqrt(pdx * pdx + pdy * pdy)
    }
    
    // Calculate projection parameter
    let t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / lengthSq
    t = Math.max(0, Math.min(1, t))
    
    // Calculate closest point on segment
    const closestX = lineStart.x + t * dx
    const closestY = lineStart.y + t * dy
    
    const distX = point.x - closestX
    const distY = point.y - closestY
    
    return Math.sqrt(distX * distX + distY * distY)
}

/**
 * Check if a point is inside a polygon.
 * @param {Vector2} point The point to check
 * @param {Vector2[]} polygon Array of polygon vertices
 * @returns {boolean} True if point is inside polygon
 */
export function PointInPolygon(point, polygon) {
    let inside = false
    const n = polygon.length
    
    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = polygon[i].x
        const yi = polygon[i].y
        const xj = polygon[j].x
        const yj = polygon[j].y
        
        if (((yi > point.y) !== (yj > point.y)) &&
            (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)) {
            inside = !inside
        }
    }
    
    return inside
}

