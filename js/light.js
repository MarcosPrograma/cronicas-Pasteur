import * as THREE from 'three';

export function setearLuces(scene){
    const rectLight = new THREE.RectAreaLight(0xffffff, 0.6, 75, 75);
    rectLight.position.set(0,5,0);
    rectLight.lookAt(0,0,0);

    scene.add(rectLight);
}
