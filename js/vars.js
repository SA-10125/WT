//can include a-Z or $ or _ as any letter of the variable name.

//let is block scope. Can be reassigned, cant be redeclared.
//var is function or global scope. Can be reassigned and redeclared.
//const is block scope. Cannot be reassigned or redeclared.
//can use without declaring (global scope.) (hoisting)

function example(){
    if(true){
        var VarVariable="hello there"; //var is func scope
        let LetVariable='hello where?'; //let is block scope
    }

    console.log(VarVariable);
    console.log(LetVariable); //since let is block scope, it doesnt travel beyond the if block.
}

example();

var ForRedeclareVar="OG";
var ForRedeclareVar="redeclared"; //no error cause var can be redeclared and reassigned

let ForRedeclareLet="OG";
//let ForRedeclareLet="new"; //as you can see, theres an error when uncommented.


//using a variable without declaration is called hoisting. This will move the declaration of the variable to the top of the program (during processing). 
a=10;


//JS is loosely typed. i.e the data types arent held down. 
let a=20;
a='hello there';
a=true;


//number, string, boolean, null, undefined are primitive data types
//Object, Number, String, Date, Array, Boolean are non primitive data types used with the 'new' keyword.

//In JS, almost everything is an object.
// Booleans can be objects (if defined with the new keyword)
// Numbers can be objects (if defined with the new keyword)
// Strings can be objects (if defined with the new keyword)
// Dates are always objects
// Math are always objects
// Regular expressions are always objects
// Arrays are always objects
// Functions are always objects
// Objects are always objects
// All JavaScript values, except primitives, are objects.


//JS supports +=, -=, *=, /=, %=, ++, --, &&, ||, !, etc.
//JS has =, ==, ===, !=, !== where
//      = is assignment.
//      == compares while ignoring type
//      === compares with type.
console.log("2"==2); //true
console.log("2"===2); //false

//+ is addition but it also does concatenation if one of them is a string.
console.log("3"+2);
console.log("hello "+2);

//switch is also there in JS.

//complete pls