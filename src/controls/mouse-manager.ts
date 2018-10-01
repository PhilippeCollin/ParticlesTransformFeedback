import { vec2 } from "gl-matrix";

export type MouseMovedEvent = { x: number; y: number; dx: number; dy: number };
export type MouseMovedCallback = (e: MouseMovedEvent) => void;

export class MouseManager {
  private _currentCoordinates: vec2 = vec2.fromValues(0.0, 0.0);

  private _onMouseMovedCallbacks: MouseMovedCallback[] = new Array<
    MouseMovedCallback
  >();

  constructor(private canvas: HTMLCanvasElement) {
    this.canvas.onclick = () => canvas.requestPointerLock();
    this.canvas.addEventListener("mousemove", this.updatePosition);
  }

  get currentCoordinates() {
    return this._currentCoordinates;
  }

  private updatePosition = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    vec2.set(
      this._currentCoordinates,
      2 * ((e.clientX - rect.left) / rect.width - 0.5),
      2 * (0.5 - (e.clientY - rect.top) / rect.height)
    );
    this._onMouseMovedCallbacks.forEach(callback =>
      callback({
        x: this._currentCoordinates[0],
        y: this._currentCoordinates[1],
        dx: e.movementX,
        dy: e.movementY
      })
    );
  };

  addMouseMovedCallback(callback: MouseMovedCallback) {
    this._onMouseMovedCallbacks.push(callback);
  }
}
