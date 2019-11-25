var Man = /** @class */ (function () {
    // name: string
    function Man(name) {
        this.name = name;
        console.log(name);
        // this.name = name
    }
    Man.prototype.hello = function () {
        console.log(this.name);
    };
    return Man;
}());
var Dis = /** @class */ (function () {
    function Dis() {
        console.log('done');
    }
    Dis.prototype.aaa = function () {
    };
    return Dis;
}());
new Man(new Dis()).hello();
