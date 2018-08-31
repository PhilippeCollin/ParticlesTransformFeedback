export class KeyboardManager {
   private _keysDown: Set<number> = new Set();

   get keysDown() {
      return this._keysDown;
   }

   constructor(canvas: HTMLCanvasElement) {
      canvas.addEventListener("keydown", this.onKeyDown);
      canvas.addEventListener("keyup", this.onKeyUp);
   }

   private onKeyDown(event: KeyboardEvent) {
      this._keysDown.add(event.keyCode);
   }

   private onKeyUp(event: KeyboardEvent) {
      this._keysDown.delete(event.keyCode);
   }
}