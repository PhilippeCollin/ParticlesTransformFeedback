const frag = `#version 300 es
   in lowp vec3 vertexColor;
   out lowp vec4 fragColor;

   void main() 
   {
      // highp float r = 0.0, delta = 0.0, alpha = 1.0;
      // highp vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      // r = dot(cxy, cxy);
      // delta = fwidth(r);
      // alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
      // fragColor = vec4(vertexColor, 1.0f) * alpha;
      if (length(gl_PointCoord - vec2(0.5f, 0.5f)) > 0.5f) {
         discard;
      }
      fragColor = vec4(vertexColor, 1.0f);
   }
`;

export default frag;
