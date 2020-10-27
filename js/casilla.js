export default class Casilla {
    constructor() {
        this.btnNoSelected = "btn-secondary";
        this.btnSelectedX = "btn-primary";
        this.btnSelectedO = "btn-danger";
        this.value = "";
    }

    crearElementoCasilla = () => {
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
        this.casillaNode = input;
        return this.casillaNode;
    };
    marcarValor = (value) => {
        if (this.casillaNode.value === "") {
            this.casillaNode.value = this.value = value;
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

    marcarValorVirtual = (value) => {
        this.value = value;

        return true;

    };

    getCasillaNode = () => {
        return this.casillaNode;
    };
}