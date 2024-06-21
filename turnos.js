document.addEventListener('DOMContentLoaded', function() {
    ////////////////////////////////////////////////////////////aside/////////////////////////////////////////////////////////
    //busco el id por medio del param
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = parseInt(urlParams.get('id'));

    //selecciono por id la opcion de servicio para agregarle la clase de activada
    const opcionServicio = document.getElementById(`${serviceId}`)
    opcionServicio.classList.add("activado")
    
    //funcion para buscar y agregar estado activado o quitarlo en la seleccion de opciones 
    function estadoOpcion(tipoOpcion,actualActivado) {
        tipoOpcion.forEach(function(opcion) {
            opcion.addEventListener('click', function() {
                // Quitamos la clase activado del elemento que la tiene actualmente en el contenedor de servicios
                const activadoActual = document.querySelector(actualActivado);
                if (activadoActual) {
                    activadoActual.classList.remove('activado');
                }
    
                // Agregamos la clase activado al elemento de servicio que fue clicado
                opcion.classList.add('activado');
            });
        });
    }

    // Seleccionamos todas las opciones de servicios para agregar un addEventListener por cada una de ellas
    const opcionesServicios = document.querySelectorAll('.container-Opciones:first-child .opciones-box .opcion');
    estadoOpcion(opcionesServicios,'.container-Opciones:first-child .opcion.activado')

    // Seleccionamos todas las opciones de horarios para agregar un addEventListener por cada una de ellas
    const opcionesHorarios = document.querySelectorAll('.container-Opciones:nth-child(2) .opciones-box .opcion');
    estadoOpcion(opcionesHorarios,'.container-Opciones:nth-child(2) .opcion.activado')

    
    ////////////////////////////////////////////////////////////calendario////////////////////////////////////////////////////
    // Crear una instancia de Date
    const today = new Date();
    const calendarioGrid = document.querySelector('.calendario-grid');
    // optenemos el primer y ultimo día del mes actual
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth =  new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Obtener el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    let startDayOfWeek = firstDayOfMonth.getDay();
    const lastDayOfWeekOfMonth = lastDayOfMonth.getDay();

    //ahora verifiquemos cuantos dias tiene el mes ,cual es su dia actual y los dias que restan para que acabe el mes
    let cantDiasMes = lastDayOfMonth.getDate();
    const diaActual = today.getDate()
    const diasRestantes = cantDiasMes - diaActual

    // Calcular el mes anterior
    let previousMonth = (today.getMonth() === 0) ? 11 : today.getMonth() - 1; // Si es enero, el mes anterior es diciembre
    let diasCalendario = 1;
    const cantDiasEnCalendario = 42;//7x6 
    if (diasRestantes <= 7) {
        startDayOfWeek = today.getDay();
        previousMonth = today.getMonth();
        diasCalendario = diaActual;
        let nextMonth = today.getMonth() + 1;
        // Si el próximo mes es enero del próximo año
        let firstDayNextMonth = nextMonth > 11 ? new Date(today.getFullYear() + 1, 0, 1) : new Date(today.getFullYear(), nextMonth, 1);
    
        // El último día del próximo mes
        let lastDayNextMonth = new Date(firstDayNextMonth.getFullYear(), firstDayNextMonth.getMonth() + 1, 0);
        cantDiasMes = lastDayNextMonth.getDate()
    }
    //si el dia no comenzo un domingo, entonces debemos buscar cuantos dias tenia el mes antior asi rellenamos
    if (startDayOfWeek != 0) {
        // Obtener la cantidad de días del mes anterior
        const daysInPreviousMonth = new Date(today.getFullYear(), previousMonth + 1, 0).getDate();
        let diasCalendarioMesAnterior = daysInPreviousMonth - (startDayOfWeek-1);
        let disCalendarioSigMes = 1;
        let terminoOtroMes = false
        for (let day = 1; day <= cantDiasEnCalendario; day++) {
            const dayDiv = document.createElement('div');
            if (diasCalendarioMesAnterior <= daysInPreviousMonth) {
                dayDiv.classList.add('desactivo');
                dayDiv.textContent = diasCalendarioMesAnterior;
                diasCalendarioMesAnterior++;
            }else if (diasCalendario > cantDiasMes && diasRestantes > 7){
                dayDiv.classList.add('desactivo');
                dayDiv.textContent = disCalendarioSigMes;
                disCalendarioSigMes++;
            }else if (diasCalendario > cantDiasMes && diasRestantes <= 7){
                if(disCalendarioSigMes > cantDiasMes){
                    disCalendarioSigMes = 1;
                    terminoOtroMes = true
                }
                if (terminoOtroMes) {
                    dayDiv.classList.add('desactivo');
                }
                dayDiv.textContent = disCalendarioSigMes;
                disCalendarioSigMes++;
            }else if (diasCalendario <= cantDiasMes) {
                if (diasCalendario === diaActual) {
                    dayDiv.classList.add('activo');
                }
                if (diasCalendario < diaActual) {
                    dayDiv.classList.add('desactivo');
                }else {
                    const turno = turnosDisponibles.find(turno => turno.dia === diasCalendario);
                    if (!turno || turno.horas.length === 0) {
                        dayDiv.classList.add('desactivo');
                    } else {
                        dayDiv.classList.add('dia-clickable');
                        dayDiv.addEventListener('click', function() {
                            seleccionarDia(dayDiv);
                        });
                    }
                }
                dayDiv.textContent = diasCalendario;
                diasCalendario++;
            }
            calendarioGrid.appendChild(dayDiv);
        }
    }

    function seleccionarDia(diaDiv) {
        let diaSeleccionado = diaDiv.textContent;
        console.log(diaSeleccionado);
        // Remover la clase activado del día previamente seleccionado
        const diaActivado = document.querySelector('.calendario-grid .activo');
        if (diaActivado) {
            diaActivado.classList.remove('activo');
        }
        // Agregar la clase activado al día seleccionado
        diaDiv.classList.add('activo');

        // Mostrar las horas disponibles en el aside
        mostrarHorasDisponibles(diaSeleccionado);
    }

    function mostrarHorasDisponibles(diaSeleccionado) {
        const horariosLista = document.getElementById('horariosLista');
        horariosLista.innerHTML = ''; // Limpiar horarios anteriores
        
        const turno = turnosDisponibles.find(turno => turno.dia === diaSeleccionado);

        if (turno && turno.horas.length > 0) {
            turno.horas.forEach(hora => {
                
                const li = document.createElement('li');
                li.classList.add('opcion');
                li.textContent = hora;
                horariosLista.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.classList.add('opcion');
            li.textContent = 'No hay horarios disponibles';
            horariosLista.appendChild(li);
        }
    }
});