import * as THREE from 'three';

import scene from "./js/scene.js";
import renderer from "./js/renderer.js";
import { setearCamera } from "./js/camera.js"
import { setearControles, setearRaycaster } from "./js/controls.js";
import { cargarModelo, cargarObjeto } from "./js/loader.js";
import { setearLuces } from "./js/light.js";
import { interacciones, iniciarCarrusel } from './js/interactions.js';

//Camara
const camera = setearCamera();

//Controles
const controls = setearControles(camera, renderer);

//Cargar modelo
cargarModelo(scene);

//Cargar objetos
cargarObjeto('./src/models/monumento.gltf', 'panel1', scene, {x: 0, y: 2, z: 10});
cargarObjeto('./src/models/monumento.gltf', 'panel2', scene, {x: 10, y: 2, z: 10});

//Lucecita
setearLuces(scene);

//Raycaster
setearRaycaster(camera, scene);

//Interaccion
interacciones();
iniciarCarrusel();

//Update
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();
