import * as THREE from "three";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";

export const sharedResolution = new THREE.Vector2(1, 1);
const lineMaterialCache = new Map();

export function updateResolution(width, height) {
    sharedResolution.set(width, height);
    lineMaterialCache.forEach(mat => {
        mat.resolution.copy(sharedResolution);
        mat.needsUpdate = true;
    });
}

export function getLineMaterial(color, linewidth = 3, opacity = 1.0) {
    const key = `${color}-${linewidth}-${opacity}`;
    if (lineMaterialCache.has(key)) {
        const mat = lineMaterialCache.get(key);
        // Ensure resolution is up to date
        if (mat.resolution.x !== sharedResolution.x || mat.resolution.y !== sharedResolution.y) {
             mat.resolution.copy(sharedResolution);
             mat.needsUpdate = true;
        }
        return mat;
    }
    const material = new LineMaterial({
        color: new THREE.Color(color),
        linewidth: linewidth,
        resolution: sharedResolution, // Binds to shared vector
        dashed: false,
        worldUnits: false, // Use screen-space width
        depthTest: false, // Ensure overlays render on top
        transparent: true,
        opacity,
    });
    lineMaterialCache.set(key, material);
    return material;
}

export function clearLineMaterialCache() {
    lineMaterialCache.forEach(mat => mat.dispose());
    lineMaterialCache.clear();
}

/**
 * Creates an overlay from an existing LineSegments object.
 * WARNING: Fails for batched geometry where positions are shared.
 * Use createOverlayFromCoordinates instead.
 */
export function createOverlay(originalObject, material) {
    if (!originalObject.geometry) return null;
    const geometry = new LineSegmentsGeometry();
    const positions = [];
    const attr = originalObject.geometry.getAttribute('position');
    if (!attr) return null;
    const array = attr.array;
    const itemSize = attr.itemSize;
    const count = attr.count;
    
    // Check if we can just use the array directly (if it's not interleaved or weird)
    // For safety with LineSegments, we assume pairs
    
    const pushVertex = (index) => {
        const x = Number(array[index * itemSize]);
        const y = Number(array[index * itemSize + 1]);
        const z = itemSize >= 3 ? Number(array[index * itemSize + 2]) : 0;
        
        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            positions.push(0, 0, 0);
        } else {
            positions.push(x, y, z);
        }
    };

    if (originalObject.geometry.index) {
        const indexArray = originalObject.geometry.index.array;
        for (let i = 0; i < indexArray.length; i++) pushVertex(indexArray[i]);
    } else {
        for (let i = 0; i < count; i++) pushVertex(i);
    }
    
    geometry.setPositions(positions);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    
    const overlay = new LineSegments2(geometry, material);
    originalObject.updateMatrixWorld();
    overlay.matrix.copy(originalObject.matrixWorld);
    overlay.matrixAutoUpdate = false;
    overlay.renderOrder = 999;
    
    // Force compute LineSegments2 bounding info
    overlay.computeLineDistances();
    
    return overlay;
}

/**
 * Creates an overlay from a set of logical coordinates (polyline vertices).
 * Automatically generates segment pairs for LineSegments2.
 * @param {Array<{x:number, y:number, z?:number}>} vertices - Array of points
 * @param {boolean} isClosed - Whether to close the loop
 * @param {THREE.Matrix4} transform - Optional transform to apply (e.g. object world matrix)
 */
export function createOverlayFromCoordinates(vertices, material, isClosed = false, transform = null) {
    if (!vertices || vertices.length < 2) return null;

    const positions = [];
    
    for (let i = 0; i < vertices.length - 1; i++) {
        const p1 = vertices[i];
        const p2 = vertices[i+1];
        
        // Safety check for NaN or undefined
        const x1 = Number(p1.x), y1 = Number(p1.y), z1 = Number(p1.z || 0);
        const x2 = Number(p2.x), y2 = Number(p2.y), z2 = Number(p2.z || 0);
        
        if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) {
            continue;
        }

        positions.push(x1, y1, z1);
        positions.push(x2, y2, z2);
    }

    if (isClosed && vertices.length > 2) {
        const p1 = vertices[vertices.length - 1];
        const p2 = vertices[0];
        
        const x1 = Number(p1.x), y1 = Number(p1.y), z1 = Number(p1.z || 0);
        const x2 = Number(p2.x), y2 = Number(p2.y), z2 = Number(p2.z || 0);
        
        if (!isNaN(x1) && !isNaN(y1) && !isNaN(z1) && !isNaN(x2) && !isNaN(y2) && !isNaN(z2)) {
            positions.push(x1, y1, z1);
            positions.push(x2, y2, z2);
        }
    }

    if (positions.length === 0) return null;

    const geometry = new LineSegmentsGeometry();
    geometry.setPositions(positions);
    
    // CRITICAL for visibility: Compute bounding volumes
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    
    const overlay = new LineSegments2(geometry, material);
    if (transform) {
        overlay.matrix.copy(transform);
        overlay.matrixAutoUpdate = false;
    }
    overlay.renderOrder = 999;
    
    // Force compute LineSegments2 bounding info
    overlay.computeLineDistances();
    
    return overlay;
}
