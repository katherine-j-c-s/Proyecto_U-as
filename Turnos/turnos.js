document.addEventListener('DOMContentLoaded', function() {
    ////////////////////////////////////////////////////////////aside/////////////////////////////////////////////////////////
    //busco el id por medio del param
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = parseInt(urlParams.get('id'));

    //selecciono por id la opcion de servicio para agregarle la clase de activada
    const opcionServicio = document.getElementById(`${serviceId}`)
    opcionServicio.classList.add("activado")

    // Seleccionamos todas las opciones de servicios para agregar un addEventListener por cada una de ellas
    const opcionesServicios = document.querySelectorAll('.container-Opciones:first-child .opciones-box .opcion');
    estadoOpcion(opcionesServicios,'.container-Opciones:first-child .opcion.activado')


    ////////////////////////////////////////////////////////////calendario////////////////////////////////////////////////////
// Crear una instancia de Date
    const today = new Date();
    // today.setDate(6)
    const calendarioGrid = document.querySelector('.calendario-grid');

    // optenemos el primer y ultimo día del mes actual
    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDayOfMonth =  new Date(today.getFullYear(), today.getMonth() + 1, 0);

    //optenemos el primer y ultimo dia del mes entrante
    let firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    let lastDayOfNextMonth =  new Date(today.getFullYear(), today.getMonth() + 2, 0);

    //optenemos el ultimo dia del anterior mes
    let lastDayOfLastMonth =  new Date(today.getFullYear(), today.getMonth() - 2, 0);

    // Obtener el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    let startDayOfWeek = firstDayOfMonth.getDay();
    let startDayOfWeekNextMonth = firstDayOfNextMonth.getDay();

    //optenemos el dia actual
    const diaActual = today.getDate()
    //primer dia en el calendario
    let primerDiaCalendario =  firstDayOfMonth.getDate()
    //cantidad de dias tiene el mes anterior, el actual y el siguiente
    let cantDiasMes = lastDayOfMonth.getDate();
    let cantDiasSigMes = lastDayOfNextMonth.getDate();
    let cantDiasMesAnterior = lastDayOfLastMonth.getDate()
    //cuantos dias mostrara el calendario
    const cantDiasEnCalendario = 42;//7x6

    // dias que restan para que acabe el mes
    const diasRestantes = cantDiasMes - diaActual
    // dias que faltan para que comienze la semana del siguiente el mes
    // si el dia de semana del siguiente mes comienza el lunes, falta un dia para el siguiente mes
    const diasFaltantesSigMes = startDayOfWeekNextMonth

    //si el dia no es domingo
    if (startDayOfWeek !== 0) {
        //buscamos del anteior mes el dia que fue domingo para arrancar el calendario
        primerDiaCalendario = lastDayOfLastMonth.getDate() - (startDayOfWeek - 1);
    }
    //si falta una semana para el siguiente mes
    if (diasRestantes < ( 7 + diasFaltantesSigMes)) {
        //el mes anterior se convierte en el actual
        cantDiasMesAnterior = cantDiasMes;
        //el actual en el siguiente
        cantDiasMes = cantDiasSigMes;
        //si el inicio de semana del siguiente mes no es domingo
        if (startDayOfWeekNextMonth !== 0) {
            //conviertiendo el primer dia del calendario, al dia domingo de una semana antes del siguiente mes
            primerDiaCalendario = lastDayOfMonth.getDate() - (startDayOfWeekNextMonth - 1 + 7);
        }
    }
    //una ves verificados los datos ,creamos el calendario con esos datos
    appendCalendario(primerDiaCalendario,diaActual,cantDiasMesAnterior,cantDiasMes,cantDiasEnCalendario)



    //Funcion para agregar calendario
    function appendCalendario(primerDiaCalendario,diaActual,cantDiasMesAnterior,cantDiasMes,cantDiasEnCalendario) {
        let diasMesAnterior = primerDiaCalendario;
        let diasMesActual = 1;
        let diasMesSiguiente = 1;
        for (let i = 1; i <= cantDiasEnCalendario; i++){
            //creamos el elemento div
            const dayDiv = document.createElement('div');

            //////////////////////////////////////////////ANTERIOR MES////////////////////////////////////////////////////////////
            if (diasMesAnterior <= cantDiasMesAnterior) {
                //agregamos los dias del mes anterior
                dayDiv.textContent =  diasMesAnterior;
                //los dias antes del dia actual o los dias del mes anterior al actual estaran desactivados
                if (diasMesAnterior < diaActual || diasRestantes >= ( 7 + diasFaltantesSigMes)) {
                    dayDiv.classList.add('desactivo');
                }else{
                    confirmaDiasDisponible(diasMesAnterior,dayDiv)
                }
                diasMesAnterior++;
            }
            //////////////////////////////////////////////MES ACTUAL////////////////////////////////////////////////////////////
            // verificamos que ya este el mes anterior completo y que aun este en los dias del mes actual
            if (diasMesAnterior > cantDiasMesAnterior && dayDiv.textContent == "" && diasMesActual <= cantDiasMes) {
                // si el mes anterior es el actual
                if ( diasRestantes < ( 7 + diasFaltantesSigMes)) {
                    //puede seleccionar todos los dias del mes
                    dayDiv.textContent =  diasMesActual;
                    confirmaDiasDisponible(diasMesActual,dayDiv)
                    
                }else{
                    dayDiv.textContent =  diasMesActual;
                    //si el dia del mes es menor al dia actual
                   if (diasMesActual < diaActual) {
                        //desactiva la fecha
                        dayDiv.classList.add('desactivo');
                   }else{
                        confirmaDiasDisponible(diasMesActual,dayDiv)
                   }
                }
                diasMesActual++;
            }
            //////////////////////////////////////////////SIGUIENTE MES////////////////////////////////////////////////////////////
            if (dayDiv.textContent == "" && diasMesActual > cantDiasMes) {
                //todos los dias del siguiente mes estaran desactivados
                dayDiv.textContent =  diasMesSiguiente;
                dayDiv.classList.add('desactivo');
                diasMesSiguiente++;
            }
            calendarioGrid.appendChild(dayDiv);
        }
    }
    //funcion para buscar y confirmar que el dia tenga horarios disponibles
    function confirmaDiasDisponible(diaActual,dayDiv) {
        const turno = turnosDisponibles.find(turno => turno.dia === diaActual);
        if (!turno || turno.horas.length === 0) {
            dayDiv.classList.add('desactivo');
        } else {
            dayDiv.classList.add('dia-clickable');
            dayDiv.addEventListener('click', function() {
                seleccionarDia(dayDiv);
            });
            // Agregar evento de mouseenter (cuando el cursor entra en el elemento)
            dayDiv.addEventListener('mouseenter', function() {
                dayDiv.classList.add('activoHover');
            });

            // Agregar evento de mouseleave (cuando el cursor sale del elemento)
            dayDiv.addEventListener('mouseleave', function() {
                dayDiv.classList.remove('activoHover');
            });
        }
    }
    //funcion para mostrar en el calendario que el dia fue seleccionado y le pasa a mostrarHorasDisponibles el dia
    function seleccionarDia(diaDiv) {
        let diaSeleccionado = diaDiv.textContent;
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
    //funcion que muestra las horas disponible para sacar un turno
    function mostrarHorasDisponibles(diaSeleccionado) {
        const horariosLista = document.getElementById('horariosLista');
        horariosLista.innerHTML = ''; // Limpiar horarios anteriores

        const turno = turnosDisponibles.find(turno => turno.dia === Number(diaSeleccionado));

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

        let opcionesHorarios = document.querySelectorAll('#horariosLista.opciones-box .opcion');
        estadoOpcion(opcionesHorarios,'#horariosLista.opciones-box .opcion.activado')
        
        let horarioError = document.querySelector("#textError .error")
        let calendarioSubTitulo = document.querySelector("#calendarioText.error")
        horarioError.textContent = "";
        calendarioSubTitulo.classList.remove("error");
    }
    //funcion para buscar y agregar estado activado o quitarlo en la seleccion de opciones
    function estadoOpcion(tipoOpcion,actualActivado) {
        tipoOpcion.forEach(function(opcion) {
            opcion.addEventListener('click', function() {
                // Quitamos la clase activado del elemento que la tiene actualmente en el contenedor de servicios
                const activadoActual = document.querySelector(actualActivado);
                if (activadoActual) {
                    activadoActual.classList.remove('activado');
                }
                if (actualActivado = '#horariosLista.opciones-box .opcion.activado') {
                    let calendarioSubTitulo = document.querySelector("#horario.error")
                    calendarioSubTitulo.classList.remove("error");
                }
                // Agregamos la clase activado al elemento de servicio que fue clicado
                opcion.classList.add('activado');
            });
        });
    }
});