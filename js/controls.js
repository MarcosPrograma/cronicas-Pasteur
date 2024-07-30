import * as THREE from 'three';
import { OrbitControls } from "/js/controls/orbitControls.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let imgHover;

//Cargar img del hover
const imgHoverMap = new THREE.TextureLoader().load('./src/img/locationHover.png');
const imgHoverMaterial = new THREE.SpriteMaterial({ map: imgHoverMap });
imgHover = new THREE.Sprite(imgHoverMaterial);
imgHover.scale.set(1, 1, 1);
imgHover.visible = false;

export function setearRaycaster(camera, scene) {
    scene.add(imgHover);

    //Si se pasa por encima de un objeto con id, se muestra que es interactuable
    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const intersecionObjeto = intersects[0];
            if (intersecionObjeto.object.userData.id) {
                imgHover.position.copy(intersecionObjeto.point);
                imgHover.visible = true;
            } else {
                imgHover.visible = false;
            }
        } else {
            imgHover.visible = false;
        }
    }

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

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
}


export function setearControles(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    return controls;
}