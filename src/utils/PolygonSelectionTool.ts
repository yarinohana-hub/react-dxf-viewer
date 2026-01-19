import * as THREE from 'three';
import { getSafeObjectBounds, unprojectToPlane } from './threeUtils';

// Type import only - runtime import is dynamic
type DxfViewer = import('@/core/dxf-viewer-library').DxfViewer;

const SNAP_THRESHOLD_PIXELS = 40;
const PREVIEW_LINE_DASH_SIZE = 10;
const PREVIEW_LINE_GAP_SIZE = 20;
const POINTS_SIZE_NORMAL = 7;
const POINTS_COLOR_NORMAL = 0xff0000;
const POINTS_COLOR_HOVER = 0xff5555;
const PREVIEW_LINE_COLOR_NORMAL = 0xff0000;
const MIN_SELECTION_POINTS = 3;
const RENDER_ORDER_UI = 999;
const POINT_MATERIAL_ATTENUATION = false;

/**
 * Polygon Selection Tool
 * 
 * Allows users to draw a polygon on the canvas and find all DXF entities
 * whose centers fall within that polygon. Returns the handles via callback.
 */
export class PolygonSelectionTool {
  private viewer: DxfViewer;
  private canvas: HTMLCanvasElement;
  private isActive: boolean = false;
  private points: THREE.Vector3[] = [];

  private previewLine: THREE.Line | null = null;
  private polygonLine: THREE.Line | null = null;
  private pointsMesh: THREE.Points | null = null;
  private startPointMesh: THREE.Points | null = null;
  private mousePosition: THREE.Vector3 = new THREE.Vector3();

  private completedPolygonLine: THREE.LineLoop | null = null;
  private completedPointsMesh: THREE.Points | null = null;

  private isHoveringNearStart: boolean = false;

  private onComplete: (handles: string[]) => void;
  private onCancel: () => void;

  private _boundOnPointerDown: (e: PointerEvent) => void;
  private _boundOnPointerMove: (e: PointerEvent) => void;
  private _boundOnKeyDown: (e: KeyboardEvent) => void;
  private _boundOnDblClick: (e: MouseEvent) => void;

  constructor(viewer: DxfViewer, onComplete: (handles: string[]) => void, onCancel: () => void) {
    this.viewer = viewer;
    const canvas = viewer.GetCanvas();
    if (!canvas) {
      throw new Error('Canvas not available');
    }
    this.canvas = canvas;
    this.onComplete = onComplete;
    this.onCancel = onCancel;

    this._boundOnPointerDown = this._onPointerDown.bind(this);
    this._boundOnPointerMove = this._onPointerMove.bind(this);
    this._boundOnKeyDown = this._onKeyDown.bind(this);
    this._boundOnDblClick = this._onDblClick.bind(this);
  }

  public activate() {
    if (this.isActive) return;

    this.isActive = true;
    this.points = [];

    this.canvas.style.cursor = 'crosshair';

    this.canvas.addEventListener('pointerdown', this._boundOnPointerDown, { capture: true });
    this.canvas.addEventListener('pointermove', this._boundOnPointerMove);
    window.addEventListener('keydown', this._boundOnKeyDown);
    this.canvas.addEventListener('dblclick', this._boundOnDblClick, { capture: true });
  }

  public deactivate() {
    if (!this.isActive) return;

    this.isActive = false;

    this.canvas.style.cursor = 'default';

    this.canvas.removeEventListener('pointerdown', this._boundOnPointerDown, { capture: true });
    this.canvas.removeEventListener('pointermove', this._boundOnPointerMove);
    window.removeEventListener('keydown', this._boundOnKeyDown);
    this.canvas.removeEventListener('dblclick', this._boundOnDblClick, { capture: true });

    this.clearDrawingVisuals();
  }

  public clearCompletedPolygon() {
    const scene = this.viewer.GetScene();
    if (this.completedPolygonLine) {
      scene.remove(this.completedPolygonLine);
      this.completedPolygonLine.geometry.dispose();
      (this.completedPolygonLine.material as THREE.Material).dispose();
      this.completedPolygonLine = null;
    }
    if (this.completedPointsMesh) {
      scene.remove(this.completedPointsMesh);
      this.completedPointsMesh.geometry.dispose();
      (this.completedPointsMesh.material as THREE.Material).dispose();
      this.completedPointsMesh = null;
    }
    this.viewer.Render();
  }

  public clearInProgressPolygon() {
    this.points = [];
    this.clearDrawingVisuals();
  }

  private clearDrawingVisuals() {
    this.clearDrawingVisualsOnly();
    const scene = this.viewer.GetScene();
    if (this.previewLine) {
      scene.remove(this.previewLine);
      this.previewLine.geometry.dispose();
      (this.previewLine.material as THREE.Material).dispose();
      this.previewLine = null;
    }
    this.viewer.Render();
  }

  private getSnapThreshold(): number {
    const camera = this.viewer.GetCamera() as THREE.OrthographicCamera;

    const worldWidth = (camera.right - camera.left) / camera.zoom;
    const pixelToWorld = worldWidth / this.canvas.width;
    return SNAP_THRESHOLD_PIXELS * pixelToWorld;
  }

  private isNearStartPoint(point: THREE.Vector3): boolean {
    if (this.points.length < 3) {
      return false;
    }

    const startPoint = this.points[0];
    const distance = point.distanceTo(startPoint);
    const threshold = this.getSnapThreshold();

    return distance < threshold;
  }

  private _getWorldPosition(event: PointerEvent | MouseEvent): THREE.Vector3 {
    return unprojectToPlane(event.clientX, event.clientY, this.canvas, this.viewer.GetCamera());
  }

  private _onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;

    event.stopPropagation();
    event.preventDefault();

    const point = this._getWorldPosition(event);
    if (!point) return;

    if (this.isNearStartPoint(point)) {
      this.completeSelection();
      return;
    }

    this.points.push(point);
    this.updateVisuals();
  }

  private _onPointerMove(event: PointerEvent) {
    const point = this._getWorldPosition(event);
    if (!point) return;

    this.mousePosition.copy(point);

    this.isHoveringNearStart = this.isNearStartPoint(point);
    this.canvas.style.cursor = this.isHoveringNearStart ? 'pointer' : 'crosshair';

    this.updatePreview();
    this.updateVisuals();
  }

  private _onDblClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.completeSelection();
  }

  private _onKeyDown(event: KeyboardEvent) {
    if (!this.isActive) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.completeSelection();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.cancelSelection();
    }
  }

  private updateVisuals() {
    const scene = this.viewer.GetScene();

    this.clearDrawingVisualsOnly();

    if (this.points.length > 0) {
      this.drawRegularPoints(scene);
      this.drawStartPoint(scene);
      this.drawPolygonLine(scene);
    }

    this.viewer.Render();
  }

  private drawRegularPoints(scene: THREE.Scene) {
    if (this.points.length <= 1) return;

    const regularPointsGeometry = new THREE.BufferGeometry().setFromPoints(this.points.slice(1));
    const regularPointsMaterial = new THREE.PointsMaterial({
      color: POINTS_COLOR_NORMAL,
      size: POINTS_SIZE_NORMAL,
      sizeAttenuation: POINT_MATERIAL_ATTENUATION,
    });
    this.pointsMesh = new THREE.Points(regularPointsGeometry, regularPointsMaterial);
    this.pointsMesh.renderOrder = RENDER_ORDER_UI;
    scene.add(this.pointsMesh);
  }

  private drawStartPoint(scene: THREE.Scene) {
    const startPointColor = this.isHoveringNearStart ? POINTS_COLOR_HOVER : POINTS_COLOR_NORMAL;
    const startPointGeometry = new THREE.BufferGeometry().setFromPoints([this.points[0]]);
    const startPointMaterial = new THREE.PointsMaterial({
      color: startPointColor,
      size: POINTS_SIZE_NORMAL,
      sizeAttenuation: POINT_MATERIAL_ATTENUATION,
    });
    this.startPointMesh = new THREE.Points(startPointGeometry, startPointMaterial);
    this.startPointMesh.renderOrder = RENDER_ORDER_UI;
    scene.add(this.startPointMesh);
  }

  private drawPolygonLine(scene: THREE.Scene) {
    if (this.points.length <= 1) return;

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(this.points);
    const lineMaterial = new THREE.LineBasicMaterial({ color: POINTS_COLOR_NORMAL });
    this.polygonLine = new THREE.Line(lineGeometry, lineMaterial);
    this.polygonLine.renderOrder = RENDER_ORDER_UI;
    scene.add(this.polygonLine);
  }

  private clearDrawingVisualsOnly() {
    const scene = this.viewer.GetScene();
    if (this.polygonLine) {
      scene.remove(this.polygonLine);
      this.polygonLine.geometry.dispose();
      (this.polygonLine.material as THREE.Material).dispose();
      this.polygonLine = null;
    }
    if (this.pointsMesh) {
      scene.remove(this.pointsMesh);
      this.pointsMesh.geometry.dispose();
      (this.pointsMesh.material as THREE.Material).dispose();
      this.pointsMesh = null;
    }
    if (this.startPointMesh) {
      scene.remove(this.startPointMesh);
      this.startPointMesh.geometry.dispose();
      (this.startPointMesh.material as THREE.Material).dispose();
      this.startPointMesh = null;
    }
  }

  private updatePreview() {
    if (this.points.length === 0) return;

    const scene = this.viewer.GetScene();
    this.clearPreviewLine(scene);

    const lastPoint = this.points[this.points.length - 1];
    const endPoint = this.calculatePreviewEndPoint();
    const previewMaterial = this.createPreviewMaterial();

    this.previewLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([lastPoint, endPoint]),
      previewMaterial
    );

    if (previewMaterial instanceof THREE.LineDashedMaterial) {
      this.previewLine.computeLineDistances();
    }
    this.previewLine.renderOrder = RENDER_ORDER_UI;

    scene.add(this.previewLine);
    this.viewer.Render();
  }

  private clearPreviewLine(scene: THREE.Scene) {
    if (this.previewLine) {
      scene.remove(this.previewLine);
      this.previewLine.geometry.dispose();
      (this.previewLine.material as THREE.Material).dispose();
      this.previewLine = null;
    }
  }

  private calculatePreviewEndPoint(): THREE.Vector3 {
    const isClosingPreview = this.isHoveringNearStart && this.points.length >= 3;
    return isClosingPreview ? this.points[0] : this.mousePosition;
  }

  private createPreviewMaterial(): THREE.LineDashedMaterial {
    return new THREE.LineDashedMaterial({
      color: PREVIEW_LINE_COLOR_NORMAL,
      dashSize: PREVIEW_LINE_DASH_SIZE,
      gapSize: PREVIEW_LINE_GAP_SIZE,
      transparent: false,
    });
  }

  private completeSelection() {
    if (this.points.length < MIN_SELECTION_POINTS) {
      this.cancelSelection();
      return;
    }

    this.createCompletedPolygonBoundary();

    const selectedHandles = this.findEntitiesInPolygon();

    this.onComplete(selectedHandles);
    this.deactivate();
  }

  private createCompletedPolygonBoundary() {
    const scene = this.viewer.GetScene();

    if (this.completedPolygonLine) {
      scene.remove(this.completedPolygonLine);
    }
    if (this.completedPointsMesh) {
      scene.remove(this.completedPointsMesh);
    }

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(this.points);
    const pointsMaterial = new THREE.PointsMaterial({
      color: POINTS_COLOR_NORMAL,
      size: POINTS_SIZE_NORMAL,
      sizeAttenuation: POINT_MATERIAL_ATTENUATION
    });
    this.completedPointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    this.completedPointsMesh.renderOrder = RENDER_ORDER_UI;
    this.completedPointsMesh.name = 'completed-polygon-points';
    scene.add(this.completedPointsMesh);

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(this.points);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: POINTS_COLOR_NORMAL
    });

    this.completedPolygonLine = new THREE.LineLoop(lineGeometry, lineMaterial);
    this.completedPolygonLine.renderOrder = RENDER_ORDER_UI;
    this.completedPolygonLine.name = 'completed-polygon-boundary';

    scene.add(this.completedPolygonLine);
    this.viewer.Render();
  }

  private cancelSelection() {
    this.onCancel();
    this.deactivate();
  }

  private findEntitiesInPolygon(): string[] {
    const handles: string[] = [];

    const polygonBox = new THREE.Box3().setFromPoints(this.points);

    this.viewer.GetScene().traverse((obj: THREE.Object3D) => {
      if (obj.userData.dxfHandle) {
        const objBox = getSafeObjectBounds(obj);
        if (objBox && polygonBox.intersectsBox(objBox)) {
          const center = new THREE.Vector3();
          objBox.getCenter(center);

          if (this.isPointInPolygon(center)) {
            handles.push(obj.userData.dxfHandle);
          }
        }
      }
    });

    return handles;
  }

  private isPointInPolygon(point: THREE.Vector3): boolean {
    let inside = false;
    for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
      const xi = this.points[i].x, yi = this.points[i].y;
      const xj = this.points[j].x, yj = this.points[j].y;

      const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
}

