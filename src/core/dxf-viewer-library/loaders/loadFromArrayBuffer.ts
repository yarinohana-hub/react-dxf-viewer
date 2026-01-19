/**
 * Utility for loading DXF files from ArrayBuffer
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DxfViewerInstance = any;

export interface LoadFromArrayBufferOptions {
  /** Progress callback */
  progressCbk?: ((phase: "parse" | "prepare", processedSize: number, totalSize: number | null) => void) | null;
  /** Optional fonts URLs for text rendering */
  fonts?: string[] | null;
  /** Text encoding for the DXF file (default: utf-8) */
  encoding?: string;
}

/**
 * Load a DXF file from an ArrayBuffer into the viewer.
 * 
 * @param viewer - The DxfViewer instance
 * @param arrayBuffer - The DXF file content as ArrayBuffer
 * @param options - Optional loading options
 * 
 * @example
 * ```tsx
 * const viewer = new DxfViewer(container);
 * const response = await fetch('/path/to/file.dxf');
 * const buffer = await response.arrayBuffer();
 * await loadDxfFromArrayBuffer(viewer, buffer);
 * ```
 */
export async function loadDxfFromArrayBuffer(
  viewer: DxfViewerInstance,
  arrayBuffer: ArrayBuffer,
  options: LoadFromArrayBufferOptions = {}
): Promise<void> {
  const { encoding = "utf-8", progressCbk = null, fonts = null } = options;

  if (typeof window === "undefined") {
    throw new Error("loadDxfFromArrayBuffer can only be used in browser environment");
  }

  // Import the parser dynamically
  const { default: DxfParser } = await import("../parser/DxfParser.js");

  // Decode the ArrayBuffer to string
  const decoder = new TextDecoder(encoding);
  const dxfString = decoder.decode(arrayBuffer);

  if (progressCbk) {
    progressCbk("parse", 0, null);
  }

  // Parse the DXF string
  const parser = new DxfParser();
  const dxf = parser.parseSync(dxfString);

  if (!dxf) {
    throw new Error("Failed to parse DXF file");
  }

  if (progressCbk) {
    progressCbk("prepare", 0, null);
  }

  // Create a blob URL to load through the viewer's normal load mechanism
  const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  try {
    await viewer.Load({
      url,
      fonts,
      progressCbk,
    });
  } finally {
    // Clean up the blob URL
    URL.revokeObjectURL(url);
  }
}

/**
 * Parse a DXF file from string without loading into a viewer.
 * Useful for extracting metadata or entities without rendering.
 * 
 * @param dxfString - The DXF file content as string
 * @returns Parsed DXF object
 */
export async function parseDxfString(dxfString: string): Promise<unknown> {
  const { default: DxfParser } = await import("../parser/DxfParser.js");
  const parser = new DxfParser();
  return parser.parseSync(dxfString);
}

/**
 * Parse a DXF file from ArrayBuffer without loading into a viewer.
 * 
 * @param arrayBuffer - The DXF file content as ArrayBuffer
 * @param encoding - Text encoding (default: utf-8)
 * @returns Parsed DXF object
 */
export async function parseDxfArrayBuffer(
  arrayBuffer: ArrayBuffer,
  encoding = "utf-8"
): Promise<unknown> {
  const decoder = new TextDecoder(encoding);
  const dxfString = decoder.decode(arrayBuffer);
  return parseDxfString(dxfString);
}

export default loadDxfFromArrayBuffer;
