export default class Cube {
  constructor(scene) {
    let geom = new THREE.CubeGeometry( 100, 100, 100 );
    let material = new THREE.MeshNormalMaterial();
    let cube = new THREE.Mesh(geom, material);

    cube.position.set(200,0,0);
    cube.rotation.set(45,45,45);

    scene.add(cube);
    this.cube = cube;
  }

  update() {
    this.cube.rotation.y += 0.005; 
  }
}
