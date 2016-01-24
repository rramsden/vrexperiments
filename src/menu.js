window.textMesh = null;
window.textGeom = null;

export default class Menu {
  start(scene) {
    let material = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF
    })
    textGeom = new THREE.TextGeometry("HI", {
      font: "8bit"
    });
    textMesh = new THREE.Mesh( textGeom, material );
    textMesh.position.set(-70, 70, 0);
    textGeom.rotateX(-25 * (Math.PI/180));

    scene.add( textMesh );

    textGeom.computeBoundingBox();
    textGeom.textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
  }
}
