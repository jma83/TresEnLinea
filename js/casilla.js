export default class Casilla {
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