import * as THREE from 'three';
import { OrbitControls } from "/js/controls/orbitControls.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); 

//---------------------------- Zoom ----------------------------
export function zoomInObjeto(camera, targetPosition, duration = 1000){
    const startPosition = new THREE.Vector3().copy(camera.position);
    const direction = new THREE.Vector3().subVectors(targetPosition, camera.position).normalize();
    
    const distance = 10;
    
    const endPosition = new THREE.Vector3().copy(targetPosition).sub(direction.multiplyScalar(distance));

    const startTime = performance.now();

    function animateZoom(time) {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);

        camera.position.lerpVectors(startPosition, endPosition, t);

        //const newLookAt = new THREE.Vector3().copy(targetPosition);
        camera.lookAt(targetPosition);

        if(t < 1){
            requestAnimationFrame(animateZoom);
        }
    }

    requestAnimationFrame(animateZoom);
}

//---------------------------- Raycaster ----------------------------
export function setearRaycaster(camera, scene) {
    const divInvisible = document.getElementById('divInvisible'); // Fondo negro

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

            //Solo lo hace con los objetos seleccionados
            if (object.userData.id){
                const targetPosition = new THREE.Vector3();
                object.getWorldPosition(targetPosition);
                zoomInObjeto(camera, targetPosition);
            }

            //si hay un panel abierto, se debe cerrar el otro 
            if (panel) {
                document.querySelectorAll('.panelDesplegable').forEach(p => p.classList.remove('mostrar'));
                panel.classList.add('mostrar');
                divInvisible.classList.add('mostrar');
            }
        }
    }

    // Cerrar paneles y ocultar divInvisible al hacer clic sobre él
    divInvisible.addEventListener('click', () => {
        document.querySelectorAll('.panelDesplegable').forEach(panel => {
            panel.classList.remove('mostrar');
        });
        divInvisible.classList.remove('mostrar');
    });

    window.addEventListener('click', onMouseClick);
}

export function setearControles(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    return controls;
}