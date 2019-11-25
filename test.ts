
class Man {
    // name: string
    
    constructor( name: Dis){
        console.log(name)
        // this.name = name
    }
    hello(){
        console.log(this.name)
    }
}

class Dis{
    constructor(){
        console.log('done');
        
    }
    aaa(){

    }
}

new Man(new Dis()).hello()