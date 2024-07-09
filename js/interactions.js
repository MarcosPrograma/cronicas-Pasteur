
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

//----------- Carrusel ------------
export function iniciarCarrusel(){
    document.querySelectorAll('.carrusel').forEach(carrusel => {
        const imagenes = carrusel.querySelector('.carrusel-imagenes');
        const imagen = carrusel.querySelectorAll('.carrusel-imagen');
        const siguiente = carrusel.querySelector('.carrusel-bot-sig');
        const anterior = carrusel.querySelector('.carrusel-bot-ant');
        let indice = 0;
        

        function mostrarImagen(indice){
            const width = imagen[0].clientWidth;
            imagenes.style.transform = `translateX(${-indice * width}px)`;
        }

        function mostrarSiguienteImagen(){
            indice = (indice + 1) % imagen.length;
            mostrarImagen(indice);
        }

        let cambioAutomatico = setInterval(mostrarSiguienteImagen, 3000);

        function resetTiempo(){
            clearInterval(cambioAutomatico);
            cambioAutomatico = setInterval(mostrarSiguienteImagen, 3000);
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
