const vert = "#version 300 es\n" + `
uniform highp vec2 mousePos;
uniform highp vec3 camPos;
uniform highp mat4 MVP;

in highp vec3 pos;
in lowp vec3 pointColor;

out lowp float dist;
out lowp vec3 vertexColor;

void main()
{ 
   vertexColor = pointColor;
	dist = length(camPos - pos);
	gl_PointSize = 2.0f / dist;
	gl_Position = MVP * vec4(pos, 1.0f);
}
`;

export default vert;