class Man {
    static sal : Number  = 1;
    private name: String
    
    constructor( name: String){
        console.log(name)
        this.name = name
    }
    hello(user){
        console.log('aaa', this.name)
    }
}

class Nilim extends Man{
    private user: String
    constructor(){
        super('name')
        // console.log('done', this.name);
        // console.log('user', user);
        
    }
    hello(user){
        // console.log(this.user)
        // super.hello(user)
    }
}

class Employe{
    // readonly name: String;
    constructor(readonly name){
        console.log('name', name);
        
    }
    hello(user){
        // console.log(this.user)
        // super.hello(user)
    }
}
console.log(Man.sal);

let man : Man;
man = new Man('nilim')
let nilim = new Nilim()
let employe = new Employe('rafid')
// employe.name = 

// nilim.hello('user')