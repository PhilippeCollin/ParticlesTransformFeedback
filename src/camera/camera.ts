import { vec3, mat4 } from 'gl-matrix';
import { Rotation } from './rotation';


export class Camera {
   private _view: mat4 = mat4.create();
   private _projection: mat4 = mat4.create();
   private _viewProjectMatrix: mat4 = mat4.create();

   // Provided orientation vectors
   private _position: vec3;
   private _front: vec3;
   private _up: vec3;

   // Derived orientation vectors
   private _right: vec3 = vec3.create();
   private _back: vec3 = vec3.create();
   private _center: vec3 = vec3.create();

   // Used to store temporary rotation matrices
   private _rotationMatrix: mat4 = mat4.create();

   get position(): vec3 {
      return this._position;
   }

   get viewProjectionMatrix() {
      return this._viewProjectMatrix;
   }

   public move(delta: vec3) {
      vec3.add(this._position, this._position, delta);
   }

   public rotate({ pitch, yaw, roll }: Rotation) {
      if (pitch) {
         // Pitch - Affects both "up" and "front" vectors
         mat4.fromRotation(this._rotationMatrix, pitch, this._right);
         vec3.transformMat4(this._front, this._front, this._rotationMatrix);
         vec3.transformMat4(this._up, this._up, this._rotationMatrix);
      }
      if (yaw) {
         // Yaw - Only affects "front" vector
         mat4.fromRotation(this._rotationMatrix, yaw, this._up);
         vec3.transformMat4(this._front, this._front, this._rotationMatrix);
      }
      if (roll) {
         // Roll - Only affects "up" vector
         mat4.fromRotation(this._rotationMatrix, roll, this._back);
         vec3.transformMat4(this._up, this._up, this._rotationMatrix);
      } 
      this.syncRotationVectors();
      this.updateViewProjectionMatrix();
   }

   /* Syncs derived rotation vectors */
   private syncRotationVectors() {
      vec3.scale(this._back, this._front, -1);
      vec3.cross(this._right, this._up, this._back);
      vec3.add(this._center, this._position, this._front);
   }

   private updateViewProjectionMatrix() {
      // Update View matrix
      mat4.lookAt(this._view, this._position, this._center, this._up);
      // Compute View Projection matrix
      mat4.multiply(this._viewProjectMatrix, this._projection, this._view);
   }

   constructor(
      position: vec3,
      front: vec3,
      up: vec3,
      fovInDegrees: number,
      aspect: number
   ) {
      // Initialize all orientation vectors
      this._position = position;
      this._front = front;
      this._up = up;
      this.syncRotationVectors();

      // Create Projection matrix
      mat4.perspective(this._projection, fovInDegrees / 360.0 * 2.0 * Math.PI, aspect, 0.01, 1000.0);
      this.updateViewProjectionMatrix();
   }
}