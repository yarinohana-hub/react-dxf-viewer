/**
 * Abstract base class for color transformation strategies in the DXF viewer.
 * 
 * Purpose:
 * - Encapsulate different color rendering modes (monochrome, full-color, custom palettes)
 * - Keep color logic decoupled from core viewer rendering
 * - Enable future color modes without modifying DxfViewer internals
 * 
 * Performance Contract:
 * - transformColor() is called once per unique color at material creation time
 * - Must NOT introduce per-frame or per-entity overhead
 * - Should be stateless or use safe caching
 * 
 * Selection/Interaction Contract:
 * - This strategy applies ONLY to DXF entity base colors
 * - Selection, hover, and polygon highlight materials are NOT affected
 * - Those materials are created independently via THREE.js and bypass this pipeline
 */
export class RendererColorStrategy {
    /**
     * Transform a raw DXF entity color into a renderable color.
     * Called once per unique color during material creation.
     * 
     * @param {number} color RGB color value (24-bit integer, e.g. 0xff0000 for red)
     * @param {number} backgroundLuminance Background luminance [0-1] for contrast calculations (optional)
     * @return {number} Transformed RGB color value to use for rendering
     */
    transformColor(color, backgroundLuminance = 0) {
        throw new Error("RendererColorStrategy.transformColor() must be implemented by subclass")
    }

    /**
     * Get the recommended background color for this strategy.
     * 
     * @return {number} RGB color value for background (e.g. 0xffffff for white)
     */
    getBackgroundColor() {
        throw new Error("RendererColorStrategy.getBackgroundColor() must be implemented by subclass")
    }

    /**
     * Get the background alpha value for this strategy.
     * 
     * @return {number} Alpha value [0-1]
     */
    getBackgroundAlpha() {
        return 1.0
    }

    /**
     * Optional: Get a descriptive name for this strategy (for debugging/logging).
     * 
     * @return {string} Strategy name
     */
    getName() {
        return this.constructor.name
    }
}

