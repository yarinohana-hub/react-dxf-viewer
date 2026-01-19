import { RendererColorStrategy } from "./RendererColorStrategy.js"

/**
 * Monochrome color strategy for DXF rendering.
 * 
 * Visual Rules:
 * - Converts all DXF entity colors to grayscale using perceptual luminance
 * - Maps to dark gray/near-black for contrast against white background
 * - Background is pure white
 * - Preserves luminance information for visual hierarchy
 * 
 * Implementation Notes:
 * - Uses standard perceptual luminance weights (ITU-R BT.709)
 * - Scales grayscale to max 180/255 for optimal contrast on white
 * - Stateless - no internal state or caching needed
 * - Called once per unique color at material creation time
 * 
 * Performance:
 * - Simple arithmetic operations only
 * - No external dependencies or lookups
 * - Identical cost to previous inline implementation
 */
export class MonochromeColorStrategy extends RendererColorStrategy {
    /**
     * Convert RGB color to monochrome grayscale.
     * 
     * Algorithm:
     * 1. Extract R, G, B components and normalize to [0-1]
     * 2. Calculate perceptual luminance using ITU-R BT.709 weights
     * 3. Scale to darker gray range (0-180) for contrast on white background
     * 4. Return uniform RGB grayscale value
     * 
     * @param {number} color RGB value (e.g. 0xff0000)
     * @param {number} backgroundLuminance Not used (monochrome ignores background)
     * @return {number} Grayscale RGB value
     */
    transformColor(color, backgroundLuminance = 0) {
        // Extract RGB components and normalize to [0-1]
        const r = ((color & 0xff0000) >>> 16) / 255
        const g = ((color & 0xff00) >>> 8) / 255
        const b = (color & 0xff) / 255
        
        // Calculate perceptual luminance using standard weights
        // ITU-R BT.709: Y = 0.2126*R + 0.7152*G + 0.0722*B
        const luminance = r * 0.2126 + g * 0.7152 + b * 0.0722
        
        // Map to darker gray scale for contrast against white background
        // Max value 180 (instead of 255) ensures good visibility
        const grayLevel = Math.floor(luminance * 180)
        
        // Return uniform RGB value (grayLevel, grayLevel, grayLevel)
        return (grayLevel << 16) | (grayLevel << 8) | grayLevel
    }

    /**
     * Get the recommended background color for monochrome mode.
     * 
     * @return {number} Pure white (0xffffff)
     */
    getBackgroundColor() {
        return 0xffffff
    }

    /**
     * Get the background alpha value.
     * 
     * @return {number} Fully opaque (1.0)
     */
    getBackgroundAlpha() {
        return 1.0
    }

    /**
     * Get the strategy name for debugging/logging.
     * 
     * @return {string} "MonochromeColorStrategy"
     */
    getName() {
        return "MonochromeColorStrategy"
    }
}

