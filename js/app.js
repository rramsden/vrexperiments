import Menu from "./menu"
import Debug from "./debug"

let camera, controls, effect, clock,
  scene, renderer, container = null;

function init() {
  clock = new THREE.Clock();
  container = $('#container');

  // Canvas Size
  let WIDTH = container.width(),
      HEIGHT = container.height();

  // Camera Attributes
  let VIEW_ANGLE = 90, // FOV - How much can the camera see
      ASPECT = WIDTH / HEIGHT, // Aspect ratio
      NEAR = 0.001, // Near plane
      FAR = 700; // Far plane

  // Setup renderer and append to DOM
  renderer = new THREE.WebGLRenderer({alpha: false});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor( 0x000000, 1 );
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
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );

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
  let light = new THREE.HemisphereLight( 0xffffff, 0xFFFFFF, 1 );
  scene.add( light );

  var geometry = new THREE.SphereGeometry( 501, 60, 40 );
  geometry.scale( - 1, 1, 1 );

  var material2 = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( 'img/landscape.jpg' )
  } );

  var mesh = new THREE.Mesh( geometry, material2 );

  scene.add( mesh );
}

function resize() {
  let width = container.width();
  let height = container.height();

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();

  camera.updateProjectionMatrix();

  controls.update(dt)
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
