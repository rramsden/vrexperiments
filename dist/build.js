(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _menu = require("./menu");

var _menu2 = _interopRequireDefault(_menu);

var _debug = require("./debug");

var _debug2 = _interopRequireDefault(_debug);

var camera = undefined,
    controls = undefined,
    effect = undefined,
    clock = undefined,
    scene = undefined,
    renderer = undefined,
    container = null;

function init() {
  clock = new THREE.Clock();
  container = $('#container');

  // Canvas Size
  var WIDTH = container.width(),
      HEIGHT = container.height();

  // Camera Attributes
  var VIEW_ANGLE = 90,
      // FOV - How much can the camera see
  ASPECT = WIDTH / HEIGHT,
      // Aspect ratio
  NEAR = 0.001,
      // Near plane
  FAR = 700; // Far plane

  // Setup renderer and append to DOM
  renderer = new THREE.WebGLRenderer({ alpha: false });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x000000, 1);
  container.append(renderer.domElement);

  // Setup the camera
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 10, 0);

  // Setup the scene
  scene = new THREE.Scene();

  // Add Camera
  scene.add(camera);

  // Setup orbital controls
  controls = new THREE.OrbitControls(camera, container.get(0));
  controls.enableZoom = false;
  controls.target.set(camera.position.x + 0.1, camera.position.y, camera.position.z);

  // Setup VR effect
  effect = new THREE.StereoEffect(renderer);
  effect.setSize(WIDTH, HEIGHT);

  // Setup mobile device controls
  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    // element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);

  // Add some light to the scene
  var light = new THREE.HemisphereLight(0xffffff, 0xFFFFFF, 1);
  scene.add(light);

  var geometry = new THREE.SphereGeometry(501, 60, 40);
  geometry.scale(-1, 1, 1);

  var material2 = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('img/landscape.jpg')
  });

  var mesh = new THREE.Mesh(geometry, material2);

  scene.add(mesh);
}

function resize() {
  var width = container.width();
  var height = container.height();

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();

  camera.updateProjectionMatrix();

  controls.update(dt);
}

function render() {
  effect.render(scene, camera);
}

function animate(t) {
  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}

init();
animate();

},{"./debug":2,"./menu":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = function Debug(scene) {
  _classCallCheck(this, Debug);

  var debugaxis = function debugaxis(axisLength) {
    //Shorten the vertex function
    function v(x, y, z) {
      return new THREE.Vector3(x, y, z);
    }

    //Create axis (point1, point2, colour)
    function createAxis(p1, p2, color) {
      var line,
          lineGeometry = new THREE.Geometry(),
          lineMat = new THREE.LineBasicMaterial({ color: color });
      lineGeometry.vertices.push(p1, p2);
      line = new THREE.Line(lineGeometry, lineMat);
      scene.add(line);
    }

    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
  };

  debugaxis(100);
};

exports["default"] = Debug;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.textMesh = null;
window.textGeom = null;

var Menu = (function () {
  function Menu() {
    _classCallCheck(this, Menu);
  }

  _createClass(Menu, [{
    key: "start",
    value: function start(scene) {
      var material = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
      });
      textGeom = new THREE.TextGeometry("WELCOME TO DEGISPACE", {
        font: "8bit"
      });
      textMesh = new THREE.Mesh(textGeom, material);
      textMesh.position.set(-125, 70, 0);
      textGeom.rotateX(-25 * (Math.PI / 180));
      textGeom.scale(0.1, 0.1, 0.1);

      scene.add(textMesh);

      textGeom.computeBoundingBox();
    }
  }]);

  return Menu;
})();

exports["default"] = Menu;
module.exports = exports["default"];

},{}]},{},[1,2,3]);

//# sourceMappingURL=build.js.map
