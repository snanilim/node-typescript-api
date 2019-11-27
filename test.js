var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Man = /** @class */ (function () {
    function Man(name) {
        console.log(name);
        this.name = name;
    }
    Man.prototype.hello = function (user) {
        console.log('aaa', this.name);
    };
    return Man;
}());
var Nilim = /** @class */ (function (_super) {
    __extends(Nilim, _super);
    function Nilim() {
        return _super.call(this, 'name') || this;
        // console.log('done', this.name);
        // console.log('user', user);
    }
    Nilim.prototype.hello = function (user) {
        console.log(this.user);
        _super.prototype.hello.call(this, user);
    };
    return Nilim;
}(Man));
var Employe = /** @class */ (function () {
    // readonly name: String;
    function Employe(name) {
        this.name = name;
        console.log('name', name);
    }
    return Employe;
}());
console.log(Man.sal);
var man = new Man('nilim');
var nilim = new Nilim();
var employe = new Employe('rafid');
// employe.name = 
// nilim.hello('user')
