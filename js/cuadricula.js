import Casilla from "./casilla.js";


export default class Cuadricula {
    constructor() {
        this.casillas = [];
        this.clicks = 0;

    }

    crearCuadricula = (holi) => {
        //Crear div principal
        var div1 = document.createElement("DIV");
        var class1 = document.createAttribute("class");
        class1.value = "card breadcrumb align-items-center";
        div1.setAttributeNode(class1);
        holi.appendChild(div1);

        //Crear guia informativa de turnos y fin de partida
        var h2 = document.createElement("H2");
        var textnode = document.createTextNode("Turno jugador 1 (X)!");
        var class2 = document.createAttribute("class");
        var idH2 = document.createAttribute("id");
        idH2.value = "guia";
        class2.value = "row p-2 justify-content-md-center";
        h2.setAttributeNode(idH2);
        h2.setAttributeNode(class2);
        h2.appendChild(textnode);
        div1.appendChild(h2);

        //Crear tabla
        var table = document.createElement("TABLE");
        var class3 = document.createAttribute("class");
        class3.value = "table table-bordered text-center table-secondary";
        table.setAttributeNode(class3);
        div1.appendChild(table);

        var tbody = document.createElement("TBODY");
        table.appendChild(tbody);

        //Creacion casillas
        var cont = 0;
        for (let i = 0; i < 3; i++) {
            var tr = document.createElement("TR");
            tbody.appendChild(tr);
            for (let i = 0; i < 3; i++) {
                var td = document.createElement("TD");
                tr.appendChild(td);
                this.casillas.push(new Casilla());
                var input = this.casillas[cont].crearElementoCasilla();
                td.appendChild(input);
                cont++;
            }
        }
        //Crear boton de recargar/resetear partida
        var input2 = document.createElement("INPUT");
        var class5 = document.createAttribute("class");
        class5.value = "btn btn-warning";
        input2.setAttributeNode(class5);
        var type2 = document.createAttribute("type");
        type2.value = "button";
        input2.setAttributeNode(type2);
        var value2 = document.createAttribute("value");
        value2.value = "Finalizar partida";
        input2.setAttributeNode(value2);
        var onClick = document.createAttribute("onClick");
        onClick.value = "window.location.reload();";
        input2.setAttributeNode(onClick);
        div1.appendChild(input2);

    };



    comprobar3Linea = () => {
        let valores = Array(9);
        let i = 0;
        Array.from(this.casillas).forEach((casilla) => {
            valores[i] = casilla.value;
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
        Array.from(this.casillas).forEach((casilla) => {
            if (casilla.value === "") {
                result = false;
            }
        });
        return result;
    }
    marcarValorCasilla = (elementSelected, value) => {
        let i = 0;
        let result=false;;
        Array.from(this.casillas).forEach((casilla) => {
            if (casilla.getCasillaNode() === elementSelected) {
                result = casilla.marcarValor(value);            }
            i++;
        });

        if (result === true) this.clicks++;

        return result;
    };

    marcarValorCasillaPos = (pos, value, flag = false) => {
        let result = false;
        if (pos >= 0 && pos <= 8) {
            if (flag === false) {
                result = this.casillas[pos].marcarValorVirtual(value);
            } else {
                result = this.casillas[pos].marcarValor(value);
            }
        }


        if (flag === true && result === true) this.clicks++;

        return result;
    };

    obtenerPosCasillasVacias = () => {
        let indexCasillasVacias = [];
        let i = 0;
        Array.from(this.casillas).forEach((casilla) => {
            if (casilla.value === "") {
                indexCasillasVacias.push(i);
            }
            i++;
        });
        return indexCasillasVacias;
    }

    obtenerArrayValoresCasillas = () => {
        let indexCasillasVacias = [];
        Array.from(this.casillas).forEach((casilla) => {
            indexCasillasVacias.push(casilla.value);
        });
        return indexCasillasVacias;
    }

    marcarCasillasCompleto = (arrayValues) => {
        let i = 0;
        this.casillas = [];
        arrayValues.forEach(value => {
            this.casillas.push(new Casilla());
            this.casillas[i].marcarValorVirtual(value);
            i++;
        });
    }
}

