var Calculadora = (function () {
    var CONST_OPERACIONES_ID = ["dividido", "por", "menos", "mas"];
    var regexNumbers = /^\d+$/;
    var numA = 0, equalActive = false, resultado = 0, operacion = "", concatOperation = false;
    /**
     * Metodo para inicializar los eventos de la calculadora
     */
    function init() {
        anadirEstiloCustom();
        var teclas = document.getElementsByClassName("tecla");
        if (!!teclas) {
            for (var x = 0 ; x < teclas.length ; x++) {
                var tecla = teclas[x];
                tecla.style.cursor = "pointer";
                tecla.onclick = clickListener;
            }
        }
    }
    /**
     * Funcion para suscribir cada uno de los botones con un comportamiento especifico
     * @param {*} event 
     */
    function clickListener(event) {
        var tecla = event.path[0];
        var display = document.getElementById("display");
        if (tecla.id === "on") {
            display.innerHTML = "0";
            reset();
        } else if (tecla.id === "sign" && display.innerHTML != "0") {
            display.innerHTML = (display.innerHTML.indexOf("-") == -1 ? ("-" + display.innerHTML) : (display.innerHTML.substring(display.innerHTML.indexOf("-") + 1, display.innerHTML.length)) );
            resultado = parseFloat(display.innerHTML);
        } else if (tecla.id === "punto" && display.innerHTML.indexOf(".") == -1) {
            display.innerHTML = display.innerHTML + ".";
        } else if (regexNumbers.test(tecla.id) 
                && display.innerHTML.length <= 8
                && !((display.innerHTML === "0") && tecla.id === "0")) {
            if (equalActive) {
                display.innerHTML = resultado = tecla.id;
                equalActive = false;
            } else if (concatOperation) {
                concatOperation = false;
                numA = parseFloat(display.innerHTML);
                display.innerHTML = tecla.id; 
            } else {
                resultado = parseFloat((display.innerHTML != "0" ? display.innerHTML : "") + tecla.id);
                display.innerHTML = (display.innerHTML != "0" ? display.innerHTML : "") + tecla.id;
            }
        } else if (CONST_OPERACIONES_ID.indexOf(tecla.id) !== -1 && display.innerHTML.length <= 8){
            operacion = tecla.id;
            if (!(!!numA)) {
                numA = resultado;
                resultado = 0;
                display.innerHTML = "";
            } else {
                if (display.innerHTML == "" || display.innerHTML == "0") {
                    resultado = executeOperation(numA, numA, operacion);
                } else if (!!display.innerHTML && display.innerHTML != "0") {
                    resultado = executeOperation(numA, parseFloat(display.innerHTML), operacion);
                    concatOperation = true;
                }
                display.innerHTML = String(resultado);
            }
        } else if (tecla.id === "igual" && !!operacion && display.innerHTML.length <= 8) {
            equalActive = true;
            if (numA == 0 && !!display.innerHTML && display.innerHTML != "0") {
                resultado = executeOperation(parseFloat(display.innerHTML), parseFloat(display.innerHTML), operacion);
            } else if (!!numA) {
                resultado = executeOperation(numA, parseFloat(display.innerHTML), operacion);
                numA = 0;
            }
            display.innerHTML = String(resultado);
        }
        tecla.classList.add("active");
        setTimeout(
            function(){ 
                tecla.classList.remove("active"); 
        }, 100);
    }
    /**
     * Metodo para agregar un keyframe que se encarga de la animacion de los botones
     */
    function anadirEstiloCustom() {
        var styleSheet = document.createElement("style");
        styleSheet.innerHTML = ".active { animation: btn_clicked 0.1s; } @keyframes btn_clicked { 0% { transform: translateY(0px); } 50% { transform: translateY(4px); } 100% { transform: translateY(0px); } }";
        document.head.appendChild(styleSheet);
    }
    /**
     * Metodo para segun una operacion realizar dicha operacion aritmetica
     * @param {*} numA 
     * @param {*} numB 
     * @param {*} operation 
     */
    function executeOperation (numA, numB, operation) {
        var result = 0;
        switch (operation) {
            case "mas":
                result = (!!numA ? numA : 0) + (!!numB ? numB : 0);
            break;
            case "menos":
                result = (!!numA ? numA : 0) - (!!numB ? numB : 0);
            break;
            case "por":
                result = (!!numA ? numA : 0) * (!!numB ? numB : 0);
            break;
            case "dividido":
                result = (!!numB ? (numA / numB) : 0);
            break;
        }
        console.log("numA: " + numA + " " + operacion + " numB: " + numB + " = " + result);
        return result <= 99999999 ? result : 0;
    }
    /**
     * Metodo para dejar en condiciones iniciales la calculadora
     */
    function reset() {
        resultado = numA = numB = 0;
        document.getElementById("display").innerHTML = "0";
        equalActive = false;
        operacion = "";
    }

    return {
        init: init
    };

}) () ;

Calculadora.init();