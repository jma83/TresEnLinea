import Casilla from "./casilla.js";


export default class Cuadricula {
    constructor() {
        this.casillas = null;
        this.clicks = 0;
        
    }

    crearCuadricula = (holi) => {
        var div1 = document.createElement("DIV");
        var class1 = document.createAttribute("class");
        class1.value = "card breadcrumb align-items-center";
        div1.setAttributeNode(class1);
        holi.appendChild(div1);

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

        var table = document.createElement("TABLE");
        var class3 = document.createAttribute("class");
        class3.value = "table table-bordered text-center table-secondary";
        table.setAttributeNode(class3);
        div1.appendChild(table);

        var tbody = document.createElement("TBODY");
        table.appendChild(tbody);
        for (let i = 0; i < 3; i++) {

            var tr = document.createElement("TR");
            tbody.appendChild(tr);
            for (let i = 0; i < 3; i++) {
                var td = document.createElement("TD");
                tr.appendChild(td);

                var input = document.createElement("INPUT");
                var class4 = document.createAttribute("class");
                class4.value = "btn btn-secondary btn-lg btn-block casilla";
                input.setAttributeNode(class4);
                var type1 = document.createAttribute("type");
                type1.value = "button";
                input.setAttributeNode(type1);
                var value1 = document.createAttribute("value");
                value1.value = "";
                input.setAttributeNode(value1);

                td.appendChild(input);
            }
        }
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

        this.inicializarVariables();

    };

    inicializarVariables =() =>{
        this.casillas = [new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla(), new Casilla()];
        let i = 0;
        Array.from(this.casillas).forEach((casilla) => {
            casilla.asociarElementoCasilla(i);
            i++;
        });
    };

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
            if (casilla.getCasillaNode().value === "") {
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
                result = casilla.marcarValor(value);
            }
            i++;
        });

        if (result === true) this.clicks++;

        return result;
    };
}

