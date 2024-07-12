import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//Cargar mundo
export function cargarModelo(scene){
    const loader = new GLTFLoader().setPath('./src/models/');

    loader.load('scene.gltf', (gltf) => {
        console.log('cargando modelo');
        const mesh = gltf.scene;
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
    });
}

//Cargar objetos
export function cargarObjeto(rutaArchivo, id, scene, posicion) {
    const loader = new GLTFLoader();

    loader.load(rutaArchivo, (gltf) => {
        console.log('cargando objetos');
        const objeto = gltf.scene;
        objeto.position.set(posicion.x, posicion.y, posicion.z); 
        objeto.userData.id = id; //id para detectar cual panel se abre

        //----Muy importante agregarle una mesh, dado que si no no intersecciona
        objeto.traverse((child) => {
            if (child.isMesh){
                child.userData.id = id;
            }
        });

        scene.add(objeto);
    });
}
