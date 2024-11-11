// Clase base para operaciones matemáticas
class Calculadora {
    constructor() {
        this.resultado = 0;
    }

    sumar(a, b) {
        this.resultado = a + b;
        return this.resultado;
    }

    restar(a, b) {
        this.resultado = a - b;
        return this.resultado;
    }

    multiplicar(a, b) {
        this.resultado = a * b;
        return this.resultado;
    }

    dividir(a, b) {
        if (b === 0) throw new Error("No se puede dividir entre cero.");
        this.resultado = a / b;
        return this.resultado;
    }

    limpiar() {
        this.resultado = 0;
    }
}

// Clase hija para operaciones científicas
class CalculadoraCientifica extends Calculadora {
    seno(x) {
        this.resultado = Math.sin(x);
        return this.resultado;
    }

    coseno(x) {
        this.resultado = Math.cos(x);
        return this.resultado;
    }

    logaritmo(x) {
        if (x <= 0) throw new Error("El logaritmo solo está definido para valores mayores que cero.");
        this.resultado = Math.log(x);
        return this.resultado;
    }

    raizCuadrada(x) {
        if (x < 0) throw new Error("La raíz cuadrada de un número negativo no es un número real.");
        this.resultado = Math.sqrt(x);
        return this.resultado;
    }
}

// Objeto de la calculadora científica
const calculadora = new CalculadoraCientifica();
let operacionActual = null;
let valorAnterior = null;

function actualizarDisplay() {
    document.getElementById('display').textContent = calculadora.resultado;
}

function agregarNumero(numero) {
    calculadora.resultado = calculadora.resultado * 10 + numero;
    actualizarDisplay();
}

function operacion(oper) {
    valorAnterior = calculadora.resultado;
    operacionActual = oper;
    calculadora.resultado = 0;
}

function calcularResultado() {
    if (operacionActual && valorAnterior !== null) {
        switch (operacionActual) {
            case 'sumar': calculadora.sumar(valorAnterior, calculadora.resultado); break;
            case 'restar': calculadora.restar(valorAnterior, calculadora.resultado); break;
            case 'multiplicar': calculadora.multiplicar(valorAnterior, calculadora.resultado); break;
            case 'dividir': calculadora.dividir(valorAnterior, calculadora.resultado); break;
        }
        operacionActual = null;
        valorAnterior = null;
    }
    actualizarDisplay();
}

function limpiar() {
    calculadora.limpiar();
    operacionActual = null;
    valorAnterior = null;
    actualizarDisplay();
}

function borrar() {
    const display = document.getElementById('display');
    let currentValue = display.textContent;
    
    if (currentValue.length > 1) {
        // Eliminar el último dígito
        calculadora.resultado = parseInt(currentValue.slice(0, -1), 10);
    } else {
        calculadora.resultado = 0;
    }
    actualizarDisplay();
}

function funcionCientifica(func) {
    switch (func) {
        case 'seno': calculadora.seno(calculadora.resultado); break;
        case 'coseno': calculadora.coseno(calculadora.resultado); break;
        case 'raizCuadrada': calculadora.raizCuadrada(calculadora.resultado); break;
        case 'logaritmo': calculadora.logaritmo(calculadora.resultado); break;
    }
    actualizarDisplay();
}
