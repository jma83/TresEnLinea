import Game from "./game.js";


(function main1() {

    let game = new Game();
    let formNode = document.getElementById("my-form");
    formNode.addEventListener(
        "submit",
        (e) => {
            game.sumbitFunction(e);

            let casillaNodes = document.getElementsByClassName("casilla");
            let resultclick = 0;
            Array.from(casillaNodes).forEach((element) => {
                element.addEventListener(
                    "click",
                    async (e) => {
                        console.log(resultclick);
                        if (resultclick == 0)
                            resultclick = await turnoJugador(e, game,resultclick);
                        if (resultclick == 1)   {
                            resultclick = 2;
                            resultclick = await turnoIA(game);
                        }
                    },
                    true
                );
            });


        },
        true
    );
})();

async function turnoJugador(event, game) {
    let flagTrigger = 0;
    if (await game.getCuadricula().marcarValorCasilla(event.target, game.getTurnoJugador()) === true) {
        flagTrigger = 1;
        if (game.comprobarFinPartida()) flagTrigger = 2;
        if (flagTrigger == 1) {
            game.cambiaTurnoJugador();
            if (game.getIA() != null && game.getTurnoJugador() === game.getIA().getTurnoIA())
                flagTrigger = 1;
        }
    } else {
        console.log("No se cambia de turno ni se marca casilla");
        flagTrigger = 0;
    }
    return flagTrigger;
}


async function turnoIA(game){
    let resultclick = 0;
    if (game.getIA() != null) {
        resultclick = await game.getIA().marcarIA();
        if (game.comprobarFinPartida()) resultclick = 2;
        if (resultclick !== 2)
            game.cambiaTurnoJugador();
    }
    return resultclick;
}