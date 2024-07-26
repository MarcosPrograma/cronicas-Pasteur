import * as THREE from 'three';

import scene from "./js/scene.js";
import renderer from "./js/renderer.js";
import { setearCamera } from "./js/camera.js"
import { setearControles, setearRaycaster } from "./js/controls.js";
import { cargarMundo, cargarObjeto } from "./js/loader.js";
import { setearLuces } from "./js/light.js";
import { interacciones, iniciarCarrusel, stepper } from './js/interactions.js';

//Camara
const camera = setearCamera();

//Controles
const controls = setearControles(camera, renderer);

//Cargar modelo
cargarMundo(scene);

//Cargar objetos
cargarObjeto('./src/models/monumento.gltf', 'panel1', scene, {x: 1.5, y: 1.8, z: 1.5});
cargarObjeto('./src/models/iglesia.gltf', 'panel2', scene, {x: 27, y: 1.8, z: 27});
cargarObjeto('./src/models/trainEstacion.gltf', 'panel3', scene, {x: -30, y: 1.6, z: -2});
cargarObjeto('./src/models/ruinasPiamontesa.gltf', 'panel4', scene, {x: 6, y: 1.6, z: 29});
cargarObjeto('./src/models/camera.gltf', 'panel5', scene, {x: 6, y: 1.6, z: 0});

//Lucecita
setearLuces(scene);

//Raycaster
setearRaycaster(camera, scene);

//Interaccion
interacciones();
iniciarCarrusel();
stepper();

//Update
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();
