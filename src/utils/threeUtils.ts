import * as THREE from 'three';

/**
 * Safely computes the bounding box for a Three.js object, skipping invalid coordinates.
 */
export function getSafeObjectBounds(obj: THREE.Object3D): THREE.Box3 | null {
  const isLine2 = (obj as any).isLineSegments2;

  if (!(obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineSegments || isLine2)) {
    return null;
  }
  

  const geometry = (obj as THREE.Mesh).geometry;
  if (!geometry) return null;

  if (isLine2) {
    const startAttr = geometry.getAttribute('instanceStart');
    const endAttr = geometry.getAttribute('instanceEnd');
    
    if (!startAttr || !endAttr) {
      if (!geometry.getAttribute('position')) return null;
    } else {
      const box = new THREE.Box3();
      let hasValidPoint = false;
      obj.updateMatrixWorld(true);

      const checkAttribute = (attr: THREE.BufferAttribute | THREE.InterleavedBufferAttribute) => {
        const array = attr.array;
        const itemSize = attr.itemSize;
        for (let i = 0; i < array.length; i += itemSize) {
          const x = array[i];
          const y = array[i + 1];
          const z = itemSize > 2 ? array[i + 2] : 0;
          
          if (isFinite(x) && isFinite(y) && isFinite(z)) {
            const point = new THREE.Vector3(x, y, z).applyMatrix4(obj.matrixWorld);
            if (isFinite(point.x) && isFinite(point.y) && isFinite(point.z)) {
              box.expandByPoint(point);
              hasValidPoint = true;
            }
          }
        }
      };

      checkAttribute(startAttr);
      checkAttribute(endAttr);

      return hasValidPoint ? box : null;
    }
  }

  const positionAttribute = geometry.getAttribute('position');
  if (!positionAttribute || !positionAttribute.array) return null;

  const array = positionAttribute.array;
  const itemSize = positionAttribute.itemSize;
  
  const box = new THREE.Box3();
  let hasValidPoint = false;

  obj.updateMatrixWorld(true);

  for (let i = 0; i < array.length; i += itemSize) {
    const x = array[i];
    const y = array[i + 1];
    const z = itemSize > 2 ? array[i + 2] : 0;
    
    if (isFinite(x) && isFinite(y) && isFinite(z)) {
      const point = new THREE.Vector3(x, y, z).applyMatrix4(obj.matrixWorld);
      if (isFinite(point.x) && isFinite(point.y) && isFinite(point.z)) {
        box.expandByPoint(point);
        hasValidPoint = true;
      }
    }
  }

  return hasValidPoint ? box : null;
}

/**
 * Safely computes the bounding box for multiple Three.js objects.
 */
export function getSafeObjectsBounds(objects: THREE.Object3D[]): THREE.Box3 | null {
  const combinedBox = new THREE.Box3();
  let hasValidBounds = false;

  for (const obj of objects) {
    const box = getSafeObjectBounds(obj);
    if (box && !box.isEmpty()) {
      combinedBox.union(box);
      hasValidBounds = true;
    }
  }

  return hasValidBounds ? combinedBox : null;
}

/**
 * Converts screen coordinates to Normalized Device Coordinates (NDC).
 */
export function getNDC(clientX: number, clientY: number, canvas: HTMLCanvasElement): THREE.Vector2 {
  const rect = canvas.getBoundingClientRect();
  return new THREE.Vector2(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -((clientY - rect.top) / rect.height) * 2 + 1
  );
}

/**
 * Unprojects screen coordinates to a world position on the Z=0 plane.
 */
export function unprojectToPlane(clientX: number, clientY: number, canvas: HTMLCanvasElement, camera: THREE.Camera): THREE.Vector3 {
  const ndc = getNDC(clientX, clientY, canvas);
  const vector = new THREE.Vector3(ndc.x, ndc.y, 0);
  vector.unproject(camera);
  vector.z = 0;
  return vector;
}

