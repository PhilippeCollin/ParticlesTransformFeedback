import { vec3 } from "gl-matrix";
import vertCode from "./shaders/test.vert";
import fragCode from "./shaders/test.frag";
import { MouseManager } from "./controls/mouse-manager";
import { createParticlesCube } from "./particles-factory";
import { Camera } from "./camera/camera";
import { KeyboardManager } from "./controls/keyboard/keyboard-manager";
import { User } from "./controls/user";

const FLOAT_BYTES = 4;
const PARTICLES_COUNT = 10000;
const ROTATION_SPEED = 0.01;
const TRANSLATION_SPEED = 0.01;

let canvas: HTMLCanvasElement = null;
let gl: WebGLRenderingContext = null;
let program: WebGLProgram = null;
let user: User = null;

let particlesVertexBuffer: WebGLBuffer;

function createParticlesBuffer() {
  const vertices = createParticlesCube(PARTICLES_COUNT);
  particlesVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, particlesVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function ensureCompileStatusOk(gl: WebGLRenderingContext, shader: WebGLShader) {
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return false;
  }
  return true;
}

function initialize() {
  canvas = document.getElementById("glCanvas") as HTMLCanvasElement;

  gl = canvas.getContext("webgl2", {
    antialias: false
  }) as WebGLRenderingContext;
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  createParticlesBuffer();

  const mouseManager = new MouseManager(canvas);
  const keyboardManager = new KeyboardManager(canvas);
  const camera = new Camera(
    vec3.fromValues(0.0, 0.0, 2.0), // Position
    vec3.fromValues(0.0, 0.0, -1.0), // Front
    vec3.fromValues(0.0, 1.0, 0.0), // Up
    45.0, // Fov
    canvas.width / canvas.height
  ); // Aspect ratio
  user = new User(
    mouseManager,
    keyboardManager,
    camera,
    TRANSLATION_SPEED,
    ROTATION_SPEED
  );

  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);
  ensureCompileStatusOk(gl, vertShader);

  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragCode);
  gl.compileShader(fragShader);
  ensureCompileStatusOk(gl, fragShader);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE);

  program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  return gl;
}

function render() {
  user.update();

  const mousePos = gl.getUniformLocation(program, "mousePos");
  gl.uniform2fv(mousePos, user.cursorPosition);
  const camPos = gl.getUniformLocation(program, "camPos");
  gl.uniform3fv(camPos, user.camera.position);

  const mvp = gl.getUniformLocation(program, "MVP");
  gl.uniformMatrix4fv(mvp, false, user.camera.viewProjectionMatrix);

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Enable the depth test
  gl.enable(gl.DEPTH_TEST);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);
  // Draw the triangle

  gl.bindBuffer(gl.ARRAY_BUFFER, particlesVertexBuffer);
  const posAttribute = gl.getAttribLocation(program, "pos");
  const colorAttribute = gl.getAttribLocation(program, "pointColor");
  gl.vertexAttribPointer(posAttribute, 3, gl.FLOAT, true, 6 * FLOAT_BYTES, 0);
  gl.vertexAttribPointer(
    colorAttribute,
    3,
    gl.FLOAT,
    true,
    6 * FLOAT_BYTES,
    3 * FLOAT_BYTES
  );
  gl.enableVertexAttribArray(posAttribute);
  gl.enableVertexAttribArray(colorAttribute);

  gl.drawArrays(gl.POINTS, 0, PARTICLES_COUNT);

  requestAnimationFrame(render);
}

initialize();
requestAnimationFrame(render);
