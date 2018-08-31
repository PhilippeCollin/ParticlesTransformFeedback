export function radians(degrees: number) {
   return degrees / 360.0 * 2 * Math.PI;
}

export function degrees(radians: number) {
   return radians / (2 * Math.PI) * 360;
}