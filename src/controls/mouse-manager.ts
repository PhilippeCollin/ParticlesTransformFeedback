export class MouseManager {
   private _currentCoordinates =  [0.0, 0.0];

   constructor(private canvas: HTMLCanvasElement) {
      this.canvas.addEventListener("mousemove", this.updatePosition);      
   }

   get currentCoordinates() {
      return this._currentCoordinates;
   }

   private updatePosition = (event: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this._currentCoordinates = [
         2 * ((event.clientX - rect.left) / rect.width - 0.5),
         2 * (0.5 - (event.clientY - rect.top) / rect.height)
      ];
   }
}
