import * as THREE from 'three';

import scene from "./js/scene.js";
import renderer from "./js/renderer.js";
import { setearCamera } from "./js/camera.js"
import { setearControles, setearRaycaster } from "./js/controls.js";
import { cargarMundo, cargarObjeto } from "./js/loader.js";
import { setearLuces } from "./js/light.js";
import { interacciones, marcadores, iniciarCarrusel, stepper } from './js/interactions.js';

//Camara
const camera = setearCamera();

//Controles
const controls = setearControles(camera, renderer);

//Cargar modelo
cargarMundo(scene);

//Cargar objetos
cargarObjeto('/models/monumento.gltf', 'panel1', scene, {x: 1.5, y: 1.8, z: 1.5});
cargarObjeto('/models/ruinasPiamontesa.gltf', 'panel2', scene, {x: 6, y: 1.6, z: 29});
cargarObjeto('/models/trainEstacion.gltf', 'panel3', scene, {x: -30, y: 1.6, z: -1});
cargarObjeto('/models/escuelaPrimaria.gltf', 'panel4', scene, {x: -6.2, y: 1.6, z: 16});
cargarObjeto('/models/iglesia.gltf', 'panel5', scene, {x: 27, y: 1.8, z: 27});
cargarObjeto('/models/camaraPelicula.gltf', 'panel6', scene, {x: 6, y: 1.6, z: 0});
//Raul cabaleiro
cargarObjeto('/models/clubAtleticoPast.gltf', 'panel8', scene, {x: 33, y: 1.6, z: -2});
//Unidad sanitaria
//Jardin de infantes 
cargarObjeto('/models/secundaria.gltf', 'panel11', scene, {x: -5.6, y: 1.6, z: -16.5});
//Trio
cargarObjeto('/models/CEC.gltf', 'panel13', scene, {x: 15, y: 1.6, z: 5.5});
cargarObjeto('/models/festival.gltf', 'panel14', scene, {x: -2, y: 1.6, z: -30});
//Geriatrico


//Lucecita
setearLuces(scene);

//Raycaster
setearRaycaster(camera, scene);

//Interaccion
interacciones();
iniciarCarrusel();
stepper();

//Sincronizar marcadores
const actualizarMarcador = marcadores(scene, camera);

//Resize
window.addEventListener('resize', () =>{
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

//Update
function animate() {
    requestAnimationFrame(animate);

    controls.update();
    actualizarMarcador();

    renderer.render(scene, camera);
}

animate();
