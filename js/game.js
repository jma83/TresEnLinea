import Cuadricula from "./cuadricula.js";
import IA from "./ia.js";

export default class Game {
    constructor() {
        this.initialNode = document.getElementById("seleccionInicial");
        this.main = document.getElementById("main-container");
        this.turnoJugador = "X";
        this.guia = null;
        this.ia = null;
    }

    sumbitFunction = (event) => {
        event.preventDefault();
        let lineas = document.getElementById("lineasCuadricula").value;
        console.log(lineas);
        this.cuadricula = new Cuadricula(lineas);

        if (document.getElementById("option2").checked){
            this.ia = new IA(this.cuadricula);            
        }
        
        this.main.removeChild(this.initialNode);
        this.cuadricula.crearCuadricula(this.main);
        this.guia = document.getElementById("guia");
    };

    comprobarFinPartida = () => {
        if (this.cuadricula.comprobar3Linea() === true) {
            this.guia.innerHTML = "FIN DE LA PARTIDA! GANA EL JUGADOR " + this.turnoJugador;
            console.log("Gana alguien");
            return true;
        }else if (this.cuadricula.comprobarTablas() === true){
            this.guia.innerHTML = "FIN DE LA PARTIDA! EMPATE!";
            console.log("Hay tablas");
            return true;
        }
        return false;
    };

    cambiaTurnoJugador = () => {
        if (this.turnoJugador === "X") {
            this.turnoJugador = "O";
            this.guia.innerHTML = "Turno jugador 2 (O)!"
        } else {
            this.turnoJugador = "X";
            this.guia.innerHTML = "Turno jugador 1 (X)!"
        }
    };
    getTurnoJugador = () => {
        return this.turnoJugador;
    };

    getCuadricula = () => {
        return this.cuadricula;
    };

    getIA = () =>{
        return this.ia;
    }
}



