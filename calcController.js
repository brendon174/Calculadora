class CalcController {
    //iniciador de objetos(funçoes da classe)
    constructor(){

        this._operation = []; 
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }
    // initalize, metodo  para disparar outros metodos como "setDisplayDateTime" 
    //com um intervalo de 1segundo
    initialize(){
          
        this.setDisplayDateTime();

        setInterval(()=>{
          
        this.setDisplayDateTime();

        }, 1000);
    } 

    // metodo com array onde forEach percorre todo array 
    addEventListenerAll(element, events, fn){

            events.split(' ').forEach(event =>{
             
               element.addEventListener(event, fn, false);

            });   
    }
    // metodo apagar tudo. zerar o array
    clearAll(){

        this._operation = [ ];

    }
    // metodo para zerar a ultima entrada 
    clearEntry(){

        this._operation.pop();

    }
    // tras o valor da ultima posição

    getLastOperation(){

          return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
       
       this._operation[this._operation.length-1] = value;

    }


     // busca valor comparado dentro do  array.
     // se for maior que -1 retorna 0 ou + senao -1
    isOperation(){
        
        return  (['+','-','*','/','%'].indexOf(value) > -1)
    }
   
    addOperation(value){
           
        // imprimindo o valor de getlast
            console.log('A', isNaN(this.getLastOperation()))
            //se for uma string ele cai aqui SENAO 
            if (isNaN(this.getLastOperation())){

                // pega o valor de isOperation 'é um operador ?' senao for é 'outra coisa'
            if(this.isOperation(value)){

                // ultimo item sera igual ao operador do momento
                this.setLastOperation(value);

            }else if (isNaN(value)) {
                    //outra coisa 
                    console.log(value);
            }else{
                this._operation.push(value);
            }

            }else{
            let newValue = this.getLastOperation().toString() + value.toString();  
            this.setLastOperation(parseInt(newValue));
            }
        
            console.log(typeof(this._operation));
        
        
    }
    // metodo error 
    setError(){
        this.displayCalc ='ERROR';
    }

    execBtn(value){
        switch (value){
            case 'ac':
                this.clearAll();
                break;
               
            case  'ce':
                this.clearEntry();
                break; 
            
            case 'soma':
                this.addOperation('+');
                break;
            
            case 'subtracao':
                this.addOperation('-');          // aqui está onde cada caso(botao) executara uma função
                break;
               
            case 'multiplicacao':
                this.addOperation('*');
                break;
                
            case 'divisao':
                this.addOperation('/');
                break;
                
            case 'porcento':
                this.addOperation('%');
                break;
                
            case 'igual':
                
                break

            case 'ponto':
                this.addOperation('.');
                break;
                
               
            case '0':
            case '1':
            case '2':    
            case '3':
            case '4':                      // numeração de casos para não escolher errado
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                 break;

            default:
                this.setError();
                break;
        }
    }


    initButtonsEvents(){
         // aqui encontra todo os valores de botoes filhos dos pais buttons e parts
         let buttons = document.querySelectorAll("#buttons > g, #parts > g");
          
         buttons.forEach((btn, index)=>{
            
            // aqui ele escuta a opçao click e arrasta. 
             this.addEventListenerAll(btn,"click drag", e =>{

                 console.log(btn.className.baseVal.replace("btn-",""));
             });

            //aqui transforma o mouse em um dedinho para clicar nos links
             this.addEventListenerAll(btn,  "mouseover mouseup mousedown", e => {
                 
                 btn.style.cursor = "pointer";

             });

         });

    }
//       esse metodo é chamado para mostrar data e hora atual de acordo com a localização do usuario
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    
    // aqui estao getters e setters onde permite armazenar valor e consultar valor dentro dessa classe
    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
          this._timeEl.innerHTML = value;
    }   

    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
          this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set  displayCalc(value){
         
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){

         return new Date(); // aqui uma nova instancia do new Date().
    }
    set currentDate(value){
        this.currentDate = value;
    }

}
  