window.textMesh = null;
window.textGeom = null;

export default class Menu {
  start(scene) {
    let material = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF
    })
    textGeom = new THREE.TextGeometry("WELCOME TO DEGISPACE", {
      font: "8bit"
    });
    textMesh = new THREE.Mesh( textGeom, material );
    textMesh.position.set(-125, 70, 0);
    textGeom.rotateX(-25 * (Math.PI/180));
    textGeom.scale(0.1,0.1,0.1);

    scene.add( textMesh );

    textGeom.computeBoundingBox();
  }
}
