class Game {
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

class Cuadricula {
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

class Casilla {
    constructor() {
        this.btnNoSelected = "btn-secondary";
        this.btnSelectedX = "btn-primary";
        this.btnSelectedO = "btn-danger";
    }

    asociarElementoCasilla = (i) => {
        this.casillaNode = document.getElementsByClassName("casilla")[i];
    };
    marcarValor = (value) => {
        console.log(this.casillaNode);
        console.log("Valor " + value);
        if (this.casillaNode.value === "") {
            this.casillaNode.value = value;
            this.casillaNode.classList.remove(this.btnNoSelected);
            if (this.casillaNode.value == "X") {
                this.casillaNode.classList.add(this.btnSelectedX);
            } else {
                this.casillaNode.classList.add(this.btnSelectedO);
            }
            return true;
        } else {
            console.log("Casilla ya marcada!");
            return false;
        }
    };

    getCasillaNode = () => {
        return this.casillaNode;
    };
}

(main = () => {
    let game = new Game();
    let formNode = document.getElementById("my-form");
    formNode.addEventListener(
        "submit",
        (e) => {
            game.sumbitFunction(e);

            let cuadricula = game.getCuadricula();
            let casillaNodes = document.getElementsByClassName("casilla");
            let resultclick = false;
            let function1 = null;
            Array.from(casillaNodes).forEach((element) => {
                 element.addEventListener(
                    "click",
                    function1 = (e) =>  {
                        console.log("entro")
                        if (resultclick===false)
                        resultclick = catchClickEvent(e, cuadricula, game);
                        if (resultclick === true) {
                            console.log("BORRANDO!");
                            Array.from(casillaNodes).forEach((element2) => {
                                element2.removeEventListener(
                                    "click",
                                    function1,
                                    true
                                );
                            });
                        } else {
                            console.log("no se borra!");
                        }
                    },
                    true
                );
            });
            
        },
        true
    );
})();

function catchClickEvent(event, cuadricula, game) {
    if (cuadricula.marcarValorCasilla(event.target, game.getTurnoJugador())===true) {
        console.log("holi")
        let flagTrigger = game.comprobarFinPartida();
        if (flagTrigger===false)
        game.cambiaTurnoJugador();
        return flagTrigger;
    }else{
        console.log("No se cambia de turno ni se marca casilla")
    }
    return false;
}
