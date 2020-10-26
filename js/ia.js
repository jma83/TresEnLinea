import Cuadricula from "./cuadricula.js";


export default class IA {
    constructor(c) {
        this.cuadricula = c;
        this.cuadriculaVirtual = new Cuadricula();
        this.valueIA = "O";
        this.valueJugador = "X";
        this.flag = false;
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    marcarIA = async () => {
        console.log("marcar IA!!")
        await this.sleep(200);
        let posicionesVacias = this.cuadricula.obtenerPosCasillasVacias();
        this.flag = false;
        await this.marcadoValorVirtual(this.cuadricula, this.valueIA,posicionesVacias);
        if (this.flag === false)
        await this.marcadoValorVirtual(this.cuadricula, this.valueJugador,posicionesVacias);

        if (this.flag === false && posicionesVacias.length > 0) {
            let randomPos = Math.floor(Math.random() * posicionesVacias.length);
            console.log("random: "+ posicionesVacias[randomPos])
            this.cuadricula.marcarValorCasillaPos(posicionesVacias[randomPos], this.valueIA,true);
            this.flag = true;
        }
        return !this.flag;
    }

    marcadoValorVirtual(cuadricula, valor,posicionesVacias ) {
        this.cuadriculaVirtual.marcarCasillasCompleto(cuadricula.obtenerArrayValoresCasillas());
        posicionesVacias.forEach(pos => {
            this.cuadriculaVirtual.marcarValorCasillaPos(pos, valor);
            if (this.cuadriculaVirtual.comprobar3Linea() && this.flag === false) {
                this.cuadricula.marcarValorCasillaPos(pos, this.valueIA,true);
                console.log("MARCO 3 EN LINEA!!!")
                this.flag = true;
                return this.flag;
            } else {
                console.log("RESET!")
                console.log("Cuadricula original:");
                console.log(cuadricula.obtenerArrayValoresCasillas());

                this.cuadriculaVirtual.marcarCasillasCompleto(cuadricula.obtenerArrayValoresCasillas());
                console.log("Cuadricula ficticia:");
                console.log(this.cuadriculaVirtual.obtenerArrayValoresCasillas());

            }
        });
        console.log("me voy");
    }

    getTurnoIA = () => {
        return this.valueIA;
    }


}
