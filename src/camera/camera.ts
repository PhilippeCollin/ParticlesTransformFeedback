import { vec3, mat4 } from 'gl-matrix';

export class Camera {
   private _view: mat4 = mat4.create();
   private _projection: mat4 = mat4.create();
   private _viewProjectMatrix: mat4 = mat4.create();

   private _center: vec3 = vec3.create();

   get position(): vec3 {
      return this._position;
   }

   set position(pos: vec3) {
      this._position = pos;
      vec3.add(this._center, pos, this._front);
      this.updateViewProjectionMatrix();
   }

   get viewProjectionMatrix() {
      return this._viewProjectMatrix;
   }

   private updateViewProjectionMatrix() {
      // Update View matrix
      mat4.lookAt(this._view, this._position, this._center, this._up);
      mat4.multiply(this._viewProjectMatrix, this._projection, this._view);
   }

   constructor(
      private _position: vec3,
      private _front: vec3,
      private _up: vec3,
      fovInDegrees: number,
      aspect: number
   ) {
      // Create Projection matrix
      mat4.perspective(this._projection, fovInDegrees / 360.0 * 2.0 * Math.PI, aspect, 0.01, 1000.0);
      this.updateViewProjectionMatrix();
   }
}