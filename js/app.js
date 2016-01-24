(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _menu = require("./menu");

var _menu2 = _interopRequireDefault(_menu);

var effect = undefined,
    clock = undefined,
    scene = undefined,
    camera = undefined,
    controls = undefined,
    renderer = undefined,
    container = null;

function init() {
  clock = new THREE.Clock();
  container = $('#container');

  // Canvas Size
  var WIDTH = container.width(),
      HEIGHT = container.height();

  // Camera Attributes
  var VIEW_ANGLE = 60,
      // FOV - How much can the camera see
  ASPECT = WIDTH / HEIGHT,
      // Aspect ratio
  NEAR = 1,
      // Near plane
  FAR = 0; // Far plane

  // Setup renderer and append to DOM
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x000000, 1);
  container.append(renderer.domElement);

  // Setup the camera
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 150, 250);

  // Setup the scene
  scene = new THREE.Scene();

  // Add Camera
  scene.add(camera);

  // Setup orbital controls
  controls = new THREE.OrbitControls(camera, container.get(0));
  controls.target.set(camera.position.x + 0.1, camera.position.y, camera.position.z);

  // Setup 3D Plane
  var loader = new THREE.TextureLoader();
  var texture = loader.load('img/grid.jpg', function (object) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(15, 15);
    texture.anisotropy = renderer.getMaxAnisotropy();
  });

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: texture
  });
  var mesh = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  // Add some light to the scene
  var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  var menu = new _menu2['default']();
  menu.start(scene);
}

function update(dt) {
  camera.updateProjectionMatrix();
  controls.update(dt);
}

function render() {
  renderer.render(scene, camera);
}

function animate(t) {
  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

init();
animate();

},{"./menu":2}],2:[function(require,module,exports){
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
      textGeom = new THREE.TextGeometry("HI", {
        font: "8bit"
      });
      textMesh = new THREE.Mesh(textGeom, material);
      textMesh.position.set(-70, 70, 0);
      textGeom.rotateX(-25 * (Math.PI / 180));

      scene.add(textMesh);

      textGeom.computeBoundingBox();
      textGeom.textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
    }
  }]);

  return Menu;
})();

exports["default"] = Menu;
module.exports = exports["default"];

},{}]},{},[1,2]);

//# sourceMappingURL=app.js.map
