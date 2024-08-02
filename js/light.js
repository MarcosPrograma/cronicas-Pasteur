import * as THREE from 'three';

export function setearLuces(scene) {
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffeeda, 2.5);
    directionalLight.position.set(10, 40, 10);
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 1024;  //calidad de la sombras
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;

    scene.add(directionalLight);

    //Setear render para manejar sombras
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; //mapa de sombras suaves
}
