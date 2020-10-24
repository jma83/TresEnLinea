import Casilla from "./casilla.js";


export default class Cuadricula {
    constructor() {
        this.casillas = [new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla()];
        this.clicks = 0;
        let i = 0;
        Array.from(this.casillas).forEach((casilla) => {
            casilla.asociarElementoCasilla(i);
            i++;
        });
        this.crearCuadricula();
    }

    crearCuadricula = () => { };

    comprobar3Linea = () => {
        let valores = Array(9);
        let i = 0;
        Array.from(this.casillas).forEach((casilla) => {
            valores[i] = casilla.getCasillaNode().value;
            i++;
        });
        if (valores[0] !== "" && valores[0] === valores[1] && valores[1] === valores[2]) {
            return true;
        } else if (valores[4] !== "" && valores[3] === valores[4] && valores[4] === valores[5]) {
            return true;
        } else if (valores[6] !== "" && valores[6] === valores[7] && valores[7] === valores[8]) {
            return true;
        } else if (valores[0] !== "" && valores[0] === valores[3] && valores[3] === valores[6]) {
            return true;
        } else if (valores[1] !== "" && valores[1] === valores[4] && valores[4] === valores[7]) {
            return true;
        } else if (valores[2] !== "" && valores[2] === valores[5] && valores[5] === valores[8]) {
            return true;
        } else if (valores[0] !== "" && valores[0] === valores[4] && valores[4] === valores[8]) {
            return true;
        } else if (valores[2] !== "" && valores[2] === valores[4] && valores[4] === valores[6]) {
            return true;
        }
        return false;
    };

    comprobarTablas = () => {
        let result = false;
        if (this.clicks >= 9) result = true;
        console.log("comprobar tablas")
        Array.from(this.casillas).forEach((casilla) => {
            if (casilla.getCasillaNode().value ===""){
                result = false;
            }
        });
        console.log("result tablas: " + result);
        return result;
    } 
    marcarValorCasilla = (elementSelected, value) => {
        let i = 0;
        let result;
        Array.from(this.casillas).forEach((casilla) => {
            if (casilla.getCasillaNode() === elementSelected) {
                console.log("Marcamos " + i);
                result= casilla.marcarValor(value);
            }
            i++;
        });

        if (result === true) this.clicks++;

        return result;
    };
}

