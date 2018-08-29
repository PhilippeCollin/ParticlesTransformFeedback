export function createParticlesCube(particlesCount: number, color: Array<number> = [1.0, 1.0, 1.0], randomizeColor = false): Array<number> {
   const valuesPerParticle = 6;
   const dataLength = particlesCount * valuesPerParticle;
   const particlesData = new Array(dataLength);
   for (let i = 0; i < dataLength; i += valuesPerParticle) {
      // Coord
		particlesData[i] = Math.random() - 0.5; // X
		particlesData[i + 1] = Math.random() - 0.5; // Y
      particlesData[i + 2] = Math.random() - 0.5; // Z
      particlesData[i + 3] = Math.random();
      particlesData[i + 4] = Math.random();
      particlesData[i + 5] = Math.random();
   }
   return particlesData;
}
