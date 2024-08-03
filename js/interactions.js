import * as THREE from 'three';

//----------- Paneles ------------
export function interacciones() {
    document.addEventListener('DOMContentLoaded', function () {
        const abrir = document.querySelectorAll('.abrir');
        const cerrar = document.querySelectorAll('.cerrar');
        const paneles = document.querySelectorAll('.panelDesplegable'); //Paneles de info
        const panel_menu = document.getElementById('panel_menu'); //Menu
        let panelActualmenteAbierto = null;

        //Apertura de los paneles
        abrir.forEach(boton => {
            boton.addEventListener('click', function () {

                const targetId = this.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);

                if (panelActualmenteAbierto && panelActualmenteAbierto !== targetPanel) {
                    panelActualmenteAbierto.classList.remove('mostrar');
                }

                if (targetPanel) {
                    targetPanel.classList.toggle('mostrar');
                    panelActualmenteAbierto = targetPanel.classList.contains('mostrar') ? targetPanel : null;
                }

                if (panel_menu) {
                    panel_menu.classList.add('mostrar');
                }
            });
        });

        //Cierre de los paneles
        cerrar.forEach(boton => {
            boton.addEventListener('click', function () {
                const panelDesplegable = this.closest('.panelDesplegable');
                if (panelDesplegable) {
                    panelDesplegable.classList.remove('mostrar');
                    panelActualmenteAbierto = null;
                }

                let algunPanelAbierto = false;
                paneles.forEach(panel => {
                    if (panel.classList.contains('mostrar')) {
                        algunPanelAbierto = true;
                        panelActualmenteAbierto = panel;
                    }
                });

                if (panel_menu) {
                    panel_menu.classList.remove('mostrar');
                }
            });
        });
    });
}

//----------- Marcadores ------------
export function marcadores(scene, camera) {
    const contenedor = document.getElementById('marcadores-contenedor');
    const marcadores = [
        {id: 'marker1', panelId: 'panel1', position: {x: 1.5, y: 6, z: 1.5}},
        {id: 'marker2', panelId: 'panel2', position: {x: 27, y: 6, z: 27}},
        {id: 'marker3', panelId: 'panel3', position: {x: -30, y: 6, z: -2}},
        {id: 'marker4', panelId: 'panel4', position: {x: 6, y: 6, z: 29}},
        {id: 'marker5', panelId: 'panel5', position: {x: 6, y: 4, z: 0}},
        {id: 'marker6', panelId: 'panel6', position: {x: -10, y: 6, z: -30}}
    ];

    const vector = new THREE.Vector3();

    function actualizarMarcadorPosicion() {
        marcadores.forEach(marcador => {
            let marcadorElement = document.getElementById(marcador.id);
            if (!marcadorElement) {
                marcadorElement = document.createElement('div');
                marcadorElement.className = 'marcador';
                marcadorElement.id = marcador.id;
                marcadorElement.innerText = marcador.id.replace('marker', '');
                contenedor.appendChild(marcadorElement);

                marcadorElement.addEventListener('click', () => {
                    const panel = document.getElementById(marcador.panelId);
                    document.querySelectorAll('.panelDesplegable').forEach(p => p.classList.remove('mostrar'));
                    if (panel) panel.classList.add('mostrar');
                });
            }

            vector.set(marcador.position.x, marcador.position.y, marcador.position.z);
            vector.project(camera);

            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

            marcadorElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        });
    }

    return actualizarMarcadorPosicion;
}

//----------- Carrusel ------------
export function iniciarCarrusel() {
    document.querySelectorAll('.carrusel').forEach(carrusel => {
        const imagenes = carrusel.querySelector('.carrusel-imagenes');
        const imagen = carrusel.querySelectorAll('.carrusel-imagen');
        const siguiente = carrusel.querySelector('.carrusel-bot-sig');
        const anterior = carrusel.querySelector('.carrusel-bot-ant');
        let indice = 0;


        function mostrarImagen(indice) {
            const width = imagen[0].clientWidth;
            imagenes.style.transform = `translateX(${-indice * width}px)`;
        }

        function mostrarSiguienteImagen() {
            indice = (indice + 1) % imagen.length;
            mostrarImagen(indice);
        }

        let cambioAutomatico = setInterval(mostrarSiguienteImagen, 5000);

        function resetTiempo() {
            clearInterval(cambioAutomatico);
            cambioAutomatico = setInterval(mostrarSiguienteImagen, 5000);
        }

        siguiente.addEventListener('click', () => {
            mostrarSiguienteImagen();
            resetTiempo();
        });

        anterior.addEventListener('click', () => {
            indice = (indice - 1 + imagen.length) % imagen.length;
            mostrarImagen(indice);
            resetTiempo();
        });
    });
}

//----------- Stepper ------------
export function stepper(){
    let actualStep = 1;

    //Funciones    
    function pasoSiguiente(){
        const actualElement = document.querySelector(`.step[data-step="${actualStep}"]`);
        const siguienteElement = document.querySelector(`.step[data-step="${actualStep + 1}"]`);

        if(siguienteElement){
            actualElement.classList.remove('activo');
            siguienteElement.classList.add('activo');
            actualStep++;
        }
    }

    //------------------------------------------------------------------
    function terminarPaso(){
        const overlay = document.getElementById('stepperFondo-overlay');
        const stepper = document.getElementById('stepper-overlay');

        overlay.classList.add('hidden');
        overlay.classList.remove('visible');
        stepper.classList.remove('visible');

        setTimeout(() =>{
            overlay.style.display = 'none';
        }, 500);

        //document.getElementById('stepper-overlay').style.display = 'none';   
    }

    //------------------------------------------------------------------
    function mostrarStepper(step = 1){
        const overlay = document.getElementById('stepperFondo-overlay');
        const stepper = document.getElementById('stepper-overlay');

        overlay.style.display = 'flex';
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
        stepper.classList.add('visible');

        //document.getElementById('stepper-overlay').style.display = 'flex';
        document.querySelectorAll('.step').forEach(step => step.classList.remove('activo'));
        document.querySelector(`.step[data-step="${step}"]`).classList.add('activo');
        actualStep = step;
    }

    //------------------------------------------------------------------
    document.querySelectorAll('.siguiente-step').forEach(boton => {
        boton.addEventListener('click', pasoSiguiente);
    });

    document.querySelectorAll('.cierreStepper').forEach(boton => {
        boton.addEventListener('click', terminarPaso);
    });

    document.querySelector('.final-step').addEventListener('click', terminarPaso);
    document.querySelector('#mostrarStepper').addEventListener('click', (e) =>{
        e.preventDefault();
        mostrarStepper(2);
    });
    //document.querySelector('.step[data-step="1"]').classList.add('activo');

    window.addEventListener('load', () => {
        mostrarStepper();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    stepper();
});