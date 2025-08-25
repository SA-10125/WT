document.write("External file"); //goes into the page
console.log("External file"); //goes into the console.

//comments, variables-values, datatypes, hoisting, built in objects, functions, loops, objects. (topics to learn)

 //We will be using camel case notation in Js. like HelloThere and addEventHistory whereas snekcase is hello_there

 a=10; //here, data type is missing. //this is undefined data type
 b="10";
//now in the console, enter:
                        //a
                        //b
                        //typeof(a)
                        //typeof(b)


//see slides for global vs local declaration etc.
//look into var vs const vs let, reassigning, redeclatarion etc, slides. IMP

//JS is a loosely typed or dynamically typed language. 
//look into primitive vs non primitive datatypes
//primitive:
    Number
    String
    Boolean
    null
    undefined
//non primitive
    Object
    Number
    String
    Date
    Array
    Boolean
    // (used with 'new' keyword.) (assigns space or memory kinda.)

//literals (without using new keyword)
//using new keyword (called object)

console.log("Value of a:"+" "+a);
console.log("Value of b: "+b);
console.log("Type of a: "+typeof(a));
console.log("Type of b: "+typeof(b));
console.log("a+b ",+a+b);
console.log("(a+b) ",+(a+b));
x=10+"10";
y=10+10;
console.log("x "+x);
console.log("typeof x "+typeof(x));
console.log("y "+y);
console.log("typeof y "+typeof(y));
//js doesnt have float, instead it has number which can have both i think (pls check this)

z=true;
console.log("z "+z);
console.log("typeof z "+typeof(z));

w="true";
console.log("w "+w);
console.log("typeof w "+typeof(w));


// let x; //x has been used already, hence it cant be redeclared. (PLEASE CHECK, am unsure.) (this has someting to do with hoisting)
// x=5;
// x="ABC";
//hoisting meaning (copy)
//var is global scope but let is block scope.
//so var meaning itll move it to the top and say var x first. (even i didnt und)
// hence let throws errors but var doesnt.

var x;
x=5;
x='ABC';
console.log(x);

let h=10;
let j="10";
if (h==j){
    console.log("ah yes tru");
}
if (h===j){
    console.log("ah si si ofc");
}
else{console.log("ah ah no no ofc.");}

//the difference between == and === is type checking (== exists because yes, js is a vibes oriented language.)

let c;
console.log(c);
console.log(typeof(c));
let n=isNaN(c); //NaN is short for Not A Number. (its a data type if im not wrong.)
console.log(n);
c=30;
n=isNaN(c);
console.log(n);

//study js till beyond functions by tom.