import Game from "./game.js";


(function main1() {

    let game = new Game();
    let formNode = document.getElementById("my-form");
    formNode.addEventListener(
        "submit",
        (e) => {
            game.sumbitFunction(e);

            let cuadricula = game.getCuadricula();
            let casillaNodes = document.getElementsByClassName("casilla");
            let resultclick = 0;
            let function1 = null;
            Array.from(casillaNodes).forEach((element) => {
                element.addEventListener(
                    "click",
                    function1 = async (e) => {
                        console.log("holu")
                        console.log(resultclick);
                        if (resultclick == 0)
                            resultclick = await catchClickEvent(e, cuadricula, game);
                        if (resultclick == 1) {
                            console.log("Borro ajajaja!")
                           
                            if (game.getIA() != null) {
                                resultclick = await game.getIA().marcarIA();
                                if (game.comprobarFinPartida()) resultclick = 2;
                                if (resultclick !== 2)
                                    game.cambiaTurnoJugador();
                            }
                            
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
    console.log("clickando!!")
    if (cuadricula.marcarValorCasilla(event.target, game.getTurnoJugador()) === true) {
        console.log("holi")
        let flagTrigger = 0;
        if (game.comprobarFinPartida()) flagTrigger = 2;
        if (flagTrigger == 0) {
            game.cambiaTurnoJugador();
            if (game.getIA() != null && game.getTurnoJugador() === game.getIA().getTurnoIA())
                flagTrigger = 1;
        }
        return flagTrigger;
    } else {
        console.log("No se cambia de turno ni se marca casilla")
    }
    return false;
}
