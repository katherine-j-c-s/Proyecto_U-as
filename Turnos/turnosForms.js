function sendForm(e) {
    //servicio section

    //horarios section
    let horario = document.querySelector("#horariosLista.opciones-box .opcion.activado");
    let divHorarioError = document.getElementById("textError")

    let errorHorario = document.getElementById("horario"); 
    let errorCalendario = document.getElementById("calendarioText"); 

    //inputs secticon
    let inputNombre = document.querySelector("input#nombre");
    let inputApellido = document.querySelector("input#apellido");
    let inputEmail = document.querySelector("input#email");
    let inputTelefono = document.querySelector("input#telefono")

    let errorInputsTitle = document.getElementById("inputsTitle"); 

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //efectos de error
    console.log(horario);
    //////////horarios
    if (!horario) {
        const selectDias = document.createElement('p');
        selectDias.classList.add("error");
        selectDias.textContent = "selecciona el dia que te haras el turno en el calendario para que pueda mostrarte las horas disponible";
        divHorarioError.appendChild(selectDias)
        errorHorario.classList.add("error")
        errorCalendario.classList.add("error")
    }else{
        errorHorario.classList.remove("error")
        errorCalendario.classList.remove("error")
    }
    //////////inputs
    let inputsValidos = true;

    if (inputNombre.value === "") {
        inputsValidos = false;
        inputNombre.classList.add("errorInputs");
    } else {
        inputNombre.classList.remove("errorInputs");
    }

    if (inputApellido.value === "") {
        inputsValidos = false;
        inputApellido.classList.add("errorInputs");
    } else {
        inputApellido.classList.remove("errorInputs");
    }

    if (inputEmail.value === "" || !regex.test(inputEmail.value)) {
        console.log(inputEmail.value === "" || !regex.test(inputEmail.value));
        inputsValidos = false;
        inputEmail.classList.add("errorInputs");
    } else {
        inputEmail.classList.remove("errorInputs");
    }
    if (inputTelefono.value === "" || Number(inputTelefono.value) < 0) {
        console.log(inputTelefono.value === "" || Number(inputTelefono.value) < 0);
        inputsValidos = false;
        inputTelefono.classList.add("errorInputs");
    } else {
        inputTelefono.classList.remove("errorInputs");
    }

    // Mostrar mensaje de error si algún input es inválido
    if (!inputsValidos) {
        errorInputsTitle.classList.add("error");
    }else {
        errorInputsTitle.classList.remove("error");
    }
    
    if(horario !== null && inputsValidos){
        errorInputsTitle.classList.remove("error");
        // Aquí puedes proceder con el envío del formulario si todos los datos son válidos
        alert("turno reservado")
        setTimeout(()=>{
            agendarReserva()
        },1000)

        console.log("Todos los datos son válidos. Proceder con el envío del formulario.");
    }
    
}