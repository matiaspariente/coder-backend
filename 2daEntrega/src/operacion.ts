class Operando {
    private num1: number;
    private num2: number;
    private accion: string;
    constructor (num1: number, num2: number,accion: string){
        this.num1 = num1;
        this.num2 = num2;
        this.accion = accion;
    }
    resultado(){
        if (this.accion === "sumar"){
            return (this.num1 + this.num2);
        }
        else{
        return (this.num1 - this.num2);
        }
    }
}

export const operacion = (num1:number, num2:number, str:string)=>{
    return new Promise((resolve, reject) =>{
        if (str === "sumar" || str === "restar") {
            let operando1:Operando;
            operando1 = new Operando(num1, num2, str);
            resolve(operando1.resultado());
        }else{
            reject(`la accion a ingresar debe ser sumar o restar, error`);
        }
    })
}
