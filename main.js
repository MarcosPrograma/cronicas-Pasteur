import * as THREE from 'three';

import scene from "./js/scene.js";
import renderer from "./js/renderer.js";
import { setearCamera } from "./js/camera.js"
import { setearControles, setearRaycaster } from "./js/controls.js";
import { cargarModelo } from "./js/loader.js";
import { setearLuces } from "./js/light.js";
import { interacciones, iniciarCarrusel } from './js/interactions.js';

//Camara
const camera = setearCamera();

//Controles
const controls = setearControles(camera, renderer);

//Cargar modelo
cargarModelo(scene);

//Lucecita
setearLuces(scene);

//Cubito - pruebas
const geometry = new THREE.BoxGeometry(5,5,5);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const cube1 = new THREE.Mesh(geometry, material1);
cube1.userData = { id: 'panel1' }; // Añadir id para el panel correspondiente
cube1.position.set(0,5,0);
scene.add(cube1);

const cube2 = new THREE.Mesh(geometry, material1);
cube2.userData = { id: 'panel2' }; 
cube2.position.set(28,5,28);
scene.add(cube2);

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
