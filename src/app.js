let effect, clock, scene, camera, controls, renderer, container = null;

function init() {
  clock = new THREE.Clock();
  container = $('#container');

  // Canvas Size
  let WIDTH = container.width(),
      HEIGHT = container.height();

  // Camera Attributes
  let VIEW_ANGLE = 60, // FOV - How much can the camera see
      ASPECT = WIDTH / HEIGHT, // Aspect ratio
      NEAR = 1, // Near plane
      FAR = 0; // Far plane

  // Setup renderer and append to DOM
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor( 0x000000, 1 );
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
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );

  // Setup 3D Plane
  let loader = new THREE.TextureLoader()
  let texture = loader.load('img/grid.jpg', function(object) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(15, 15);
    texture.anisotropy = renderer.getMaxAnisotropy();
  });

  let material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: texture
  });
  let mesh = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  // Add some light to the scene
  var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( light );
}

function update(dt) {
  camera.updateProjectionMatrix();
  controls.update(dt)
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
