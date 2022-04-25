import {mat4, vec3} from "gl-matrix";
import React, {useCallback, useLayoutEffect} from "react";
import classes from "./Canvas.module.css";

const VSHADER_SOURCE =
    'attribute vec3 a_Position;\n' +
    'attribute vec3 a_Color;\n' +
    'uniform mat4 u_Pmatrix;\n' +
    'uniform mat4 u_Mmatrix;\n' +
    'uniform mat4 u_Vmatrix;\n' +
    'varying vec3 v_Color;\n' +
    'void main() {\n' +
    ' v_Color = a_Color;\n' +
    ' gl_Position = u_Pmatrix*u_Vmatrix*u_Mmatrix*vec4(a_Position,1.0);\n' +
    ' }\n';

const FSHADER_SOURCE =
    ' precision mediump float;\n' +
    ' uniform vec4 u_FragColor;\n' +
    ' varying vec3 v_Color;\n' +
    ' void main() {\n' +
    ' gl_FragColor = vec4(v_Color,1.0);\n' +
    ' }\n';


const Canvas = () => {

  const webGLStart = useCallback(() => {

    const getShader = (gl: WebGLRenderingContext, type: 'VERTEX_SHADER' | 'FRAGMENT_SHADER', source: string) => {
          const shader = gl.createShader(gl[type]);

          if (!shader) {
              throw new Error('Unable to create a shader.');
          }

          gl.shaderSource(shader, source);

          gl.compileShader(shader);

          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
              throw new Error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
          }

          return shader;
      }

    const canvas = document.getElementById('canvasGL');

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('No html canvas element.');
    }

    canvas.width = 500;
    canvas.height = 500;

    // WebGL rendering context
    const gl = canvas.getContext("webgl", { antialias: false });

    if (!gl) {
      throw new Error('Unable to initialize WebGL.');
    }

    let VS = getShader(gl, 'VERTEX_SHADER', VSHADER_SOURCE);
    let FS = getShader(gl, 'FRAGMENT_SHADER', FSHADER_SOURCE);

    // WebGL program
    const shaderProgram = gl.createProgram();
    console.log(shaderProgram);

    if (!shaderProgram) {
      throw new Error('Unable to create the program.');
    }

    gl.attachShader(shaderProgram, VS);
    gl.attachShader(shaderProgram, FS);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

     let u_Pmatrix = gl.getUniformLocation(shaderProgram, 'u_Pmatrix');
     let u_Mmatrix = gl.getUniformLocation(shaderProgram, 'u_Mmatrix');
     let u_Vmatrix = gl.getUniformLocation(shaderProgram, 'u_Vmatrix');

    let a_Position = gl.getAttribLocation(shaderProgram, 'a_Position');
    let a_Color = gl.getAttribLocation(shaderProgram, 'a_Color');

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_Color);

    let triangle_vertex =
        [
          -1, -1, -1, 1, 1, 0,
          1, -1, -1, 1, 1, 0,
          1, 1, -1, 1, 1, 0,
          -1, 1, -1, 1, 1, 0,

          -1, -1, 1, 0, 0, 1,
          1, -1, 1, 0, 0, 1,
          1, 1, 1, 0, 0, 1,
          -1, 1, 1, 0, 0, 1,

          -1, -1, -1, 0, 1, 1,
          -1, 1, -1, 0, 1, 1,
          -1, 1, 1, 0, 1, 1,
          -1, -1, 1, 0, 1, 1,

          1, -1, -1, 1, 0, 0,
          1, 1, -1, 1, 0, 0,
          1, 1, 1, 1, 0, 0,
          1, -1, 1, 1, 0, 0,

          -1, -1, -1, 1, 0, 1,
          -1, -1, 1, 1, 0, 1,
          1, -1, 1, 1, 0, 1,
          1, -1, -1, 1, 0, 1,

          -1, 1, -1, 0, 1, 0,
          -1, 1, 1, 0, 1, 0,
          1, 1, 1, 0, 1, 0,
          1, 1, -1, 0, 1, 0


        ];

    let TRIANGLE_VERTEX = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle_vertex), gl.STATIC_DRAW);

    let triangle_face = [0, 1, 2,
      0, 2, 3,

      4, 5, 6,
      4, 6, 7,

      8, 9, 10,
      8, 10, 11,

      12, 13, 14,
      12, 14, 15,

      16, 17, 18,
      16, 18, 19,

      20, 21, 22,
      20, 22, 23];

    let TRIANGLE_FACES = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_face), gl.STATIC_DRAW);

    // ---------------------------------------------------------------------
    let PROJMATRIX: mat4 = mat4.create();
    //mat4.perspective(PROJMATRIX, 55, canvas.width / canvas.height, 1, 100);
    mat4.ortho(PROJMATRIX, -4.0, 4.0, -4.0, 4.0, 4.0, 15.0);
    //mat4.frustum(PROJMATRIX, -4.0, 4.0, -4.0, 4.0, 4.0, 15.0);

    let VIEWMATRIX = mat4.create();
    let MODELMATRIX = mat4.create();
    let VIEWMATRIX_eye = mat4.create();

    gl.enable(gl.DEPTH_TEST);

    let animate = function (time: number) {

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      mat4.identity(MODELMATRIX);
      mat4.identity(VIEWMATRIX);
      mat4.identity(VIEWMATRIX_eye);


      //-------------------  VIEW --------------------------------------------
      mat4.rotateY(VIEWMATRIX_eye, VIEWMATRIX_eye, time * 0.0005);
      mat4.translate(VIEWMATRIX_eye, VIEWMATRIX_eye, [0.0, 0.0, 5.0]);

      let eye = vec3.fromValues(0.0, 5.0, 5.0);

      vec3.transformMat4(eye, eye, VIEWMATRIX_eye);

      let center = vec3.fromValues(0.0, 0.0, 0.0);
      let up = vec3.fromValues(0.0, 1.0, 0.0);
      mat4.lookAt(VIEWMATRIX, eye, center, up);

      // --------------------------------------------------------------

      gl.clearColor(0.5, 0.5, 0.5, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // ---------------------Cube Center-----------------------------------------
      mat4.identity(MODELMATRIX);
      mat4.translate(MODELMATRIX, MODELMATRIX, [0.0, 0.5, 0.0]); //x y z
      mat4.scale(MODELMATRIX, MODELMATRIX, [0.2, 1.2, 0.1]); //x y z


     // gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX);
      gl.uniformMatrix4fv(u_Pmatrix, false, PROJMATRIX);
      gl.uniformMatrix4fv(u_Mmatrix, false, MODELMATRIX);
      gl.uniformMatrix4fv(u_Vmatrix, false, VIEWMATRIX);

      gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 4 * (3 + 3), 0);
      gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 4 * (3 + 3), 3 * 4);

      //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
      gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);


      // --------------Cube------------------------------------------------
      // let AngeleFace = 0;
      // for (let i = 1; i <= 12; i++) {
      //
      //   AngeleFace = (i * -6.0 * 5.0) * Math.PI / 180;
      //   mat4.identity(MODELMATRIX);
      //   mat4.rotateY(MODELMATRIX, MODELMATRIX, AngeleFace);
      //   mat4.translate(MODELMATRIX, MODELMATRIX, [2.5, 0.0, 0.0]); //x y z
      //
      //   if (i % 3 === 0) {
      //     mat4.scale(MODELMATRIX, MODELMATRIX,[0.15, 0.5, 0.1]); //x y z
      //   } else {
      //     mat4.scale(MODELMATRIX, MODELMATRIX, [0.1, 0.3, 0.1]); //x y z
      //   }
      //
      //   //gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX);
      //   gl.uniformMatrix4fv(u_Pmatrix, false, PROJMATRIX);
      //   gl.uniformMatrix4fv(u_Mmatrix, false, MODELMATRIX);
      //   gl.uniformMatrix4fv(u_Vmatrix, false, VIEWMATRIX);
      //
      //   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 4 * (3 + 3), 0);
      //   gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 4 * (3 + 3), 3 * 4);
      //
      //   //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
      //   gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
      // }

      gl.flush();

      window.requestAnimationFrame(animate);
    }
    animate(0);
  },[]);

  useLayoutEffect(() => {
      webGLStart();
  },[webGLStart]);

  return ( <canvas id="canvasGL" className={classes.canvas} />)
};

export default Canvas;
