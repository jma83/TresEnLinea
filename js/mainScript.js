import Game from "./game.js";


( function main1(){

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
