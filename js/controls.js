import * as THREE from 'three';
import { OrbitControls } from "/js/controls/orbitControls.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function setearRaycaster(camera, scene) {

    //Interaccion por clics
    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            const panelId = object.userData.id;
            const panel = document.getElementById(panelId);

            //si hay un panel abierto, se debe cerrar el otro 
            if (panel) {
                document.querySelectorAll('.panelDesplegable').forEach(p => p.classList.remove('mostrar'));
                panel.classList.add('mostrar');
            }
        }
    }

    window.addEventListener('click', onMouseClick);
}


export function setearControles(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    return controls;
}