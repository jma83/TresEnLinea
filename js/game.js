import Cuadricula from "./cuadricula.js";

export default class Game {
    constructor() {
        this.initialNode = document.getElementById("seleccionInicial");
        this.main = document.getElementById("main-container");

        this.turnoJugador = "X";
        this.cuadricula = new Cuadricula();
        this.guia = null;
    }

    sumbitFunction = (event) => {
        event.preventDefault();

        this.main.removeChild(this.initialNode);

        var node = document.createElement("P");
        var textnode = document.createTextNode("HOLI");
        node.appendChild(textnode);
        this.main.appendChild(node);
        //crearCuadricula
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
}



