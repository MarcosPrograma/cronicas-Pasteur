import { GLTFLoader } from "three/examples/jsm/Addons.js";

export function cargarModelo(scene){
    const loader = new GLTFLoader().setPath('./src/models/');

    loader.load('scene.gltf', (gltf) => {
        console.log('cargando modelo');
        const mesh = gltf.scene;
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
    });
}