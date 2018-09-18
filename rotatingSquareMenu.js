//Thomas Fiocchi
//CS 147 
//Assignment 3
// I believe that this assignment is worth 15 out of the 15 points as it contains all of the required elements and executes them properly. 
// I was even able to make a pun out of one of my comments.
"use strict";

var gl;


// adds in variables
var theta = 0.0;
var speed = 0.05;
var thetaLoc;
var num_verts = 4;

var direction = true;

//generates some canvas
window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [
        vec2(0, 1),
        vec2(-1, 0),
        vec2(1, 0),
        vec2(0, -1)
    ];

    var colors = [
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0)
    ];

    // Load the data into the GPU
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);


    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");


    // Initialize event handler (menu)
    document.getElementById("Controls").onclick = function (event) {
        switch (event.target.index) {
            case 0:
                direction = !direction;
                break;
            case 1:
                //add in some colors
                colors = [
                    vec3(0.0, 0.0, 1.0),
                    vec3(0.0, 0.0, 1.0),
                    vec3(0.0, 0.0, 1.0),
                    vec3(0.0, 0.0, 1.0)
                ];

                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);
                break;
            case 2:
                colors = [
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random())
                ];

                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                break;
            case 3:
                num_verts = 4;
                var vertices = [
                    vec2(0, 1),
                    vec2(-1, 0),
                    vec2(1, 0),
                    vec2(0, -1)
                ];
                var vBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
            
                // Associate out shader variables with our data buffer
            
                var vPosition = gl.getAttribLocation(program, "vPosition");
                gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vPosition);
                break;
            case 4:
                num_verts = 3;
                var vertices = [
                    vec2(0, 0),
                    vec2(0, 1),
                    vec2(1, 0)
                ];
                var vBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
            
                // Associate out shader variables with our data buffer
            
                var vPosition = gl.getAttribLocation(program, "vPosition");
                gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vPosition);
                break;
            default:
                break;
        }
    };

    //slider code
    document.getElementById("slider").onchange = function(event){
        speed = parseFloat(event.target.value); 
        }; 

    //button code
    document.getElementById("Direction").onclick = function(){
            direction = !direction; 
        };

    //some key code that is key to understanding this code
        window.onkeydown = function( event ) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
          case 'D': //direction
          case 'd':
            direction = !direction;
            break;
          case 'F':  //faster
          case 'f':
            speed += 0.025; 
           break;
          case 'S':  //slower
          case 's':
            speed -= 0.025;
            if (speed <= 0.0) {
                speed = 0.0;
            }
            break;
        }
    };

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (direction == true) {
        theta += speed;
    } else {
        theta -= speed;
    }

    //ThetaLoc code
    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, num_verts);
    window.requestAnimFrame(render);
}
