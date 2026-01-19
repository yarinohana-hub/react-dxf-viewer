/**
 * DXF Viewer Library
 * 
 * A WebGL-based DXF file viewer integrated into Next.js.

 * 
 * @example
 * ```tsx
 * import { DxfViewer } from "@/lib/dxf-viewer-library";
 * 
 * const viewer = new DxfViewer(containerElement, {
 *   autoResize: true,
 *   clearColor: new THREE.Color("#ffffff"),
 * });
 * 
 * await viewer.Load({ url: "/path/to/file.dxf" });
 * ```
 */

// Core viewer class
export { DxfViewer } from "./DxfViewer.js";

// Color rendering strategies
export { RendererColorStrategy } from "./RendererColorStrategy.js";
export { MonochromeColorStrategy } from "./MonochromeColorStrategy.js";

// Data fetching utilities
export { DxfFetcher } from "./DxfFetcher.js";

// Scene management
export { DxfScene, Entity, ColorCode } from "./DxfScene.js";

// Worker for background processing
export { DxfWorker } from "./DxfWorker.js";

// Pattern support for hatches
export { Pattern, RegisterPattern, LookupPattern } from "./Pattern.js";

// Batching and material keys
export { BatchingKey, CompareValues } from "./BatchingKey.js";
export { MaterialKey } from "./MaterialKey.js";

// Text rendering utilities
export { TextRenderer, ParseSpecialChars, HAlign, VAlign } from "./TextRenderer.js";

// Buffer utilities
export { DynamicBuffer, NativeType, NativeArray } from "./DynamicBuffer.js";

// Controls
export { OrbitControls, MapControls } from "./OrbitControls.js";

// Tree data structure
export { RBTree } from "./RBTree.js";

// Text format parsing
export { MTextFormatParser } from "./MTextFormatParser.js";

// Math utilities
export { 
  IntersectSegmentsParametric, 
  PointToSegmentDistance, 
  PointInPolygon 
} from "./math/utils.js";

// Hatch calculation
export { HatchCalculator, HatchStyle } from "./HatchCalculator.js";

// Dimension support
export { LinearDimension, DimensionLayout } from "./LinearDimension.js";
export { AngularDimension } from "./AngularDimension.js";

// Parser (for advanced use cases)
export { default as DxfParser } from "./parser/DxfParser.js";

// Types are defined in index.d.ts and will be automatically picked up by TypeScript

