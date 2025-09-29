/*

document.y.x = ""; 

document.getElementbyId("demo").x= ""; 
finding the element/tag that has id as demo, and changing the contents of that tag 

x could be 
    -innerHTML : changes content -> could add a whole different block as well like <div>"haha"</div>
    -src : changes image 
    -style. :changes style (eg style.fontSize) ->style.display = "none" ->hides the content
    -

function MyFunction(){
    *insert js code* 
}

alert(a+b) ->creation of alert box. any content could be added. (could be window.alert())
console.log()
window.print() 

y could be 
    - getElementbyId("").x = ""
    - write() //could be anything. but using it after a html page is loaded, it might delete the whole file 
    - 

Variable Declarations 

let x = 5; 
let y;
y=6;
let z=x+y;
let x = "john doe"->not allowed , use vars instead 


const name; -> limited to the function block 

strings 
let name = "name"; 

ints,floats 
let x =2; 
let y = 3.5; 
let z = 123e-5;

bools 
let x = true;
let y = false; 

object 
let x = {name:"john", age:2}

array 
let y = [1,2,3]; 
y.push(4); ->appending 

date 
let date = new Date()

null 
let x = null; 

typeof x ->returns data type of x 



vars are function scope, can access var before definition
let and const are block scope. need to be init 
using var and let means that you can reassign 


operations are very similar to python 
increment ++, decrement -- 

Logical Operations for assignments 

and &&=  
or ||= 
null ??= (if x has null value, it will take the value given by this assignment )
let x; or x = undefined 
x ?? = 10; 
therefore x = 10 

let y = 0; 
y??= 10; 
therefore y = 0; 

Spread ...
let text = "12345";

let min = Math.min(...text);
let max = Math.max(...text);

spreads over iterables 

Comparison OPerators 
<,>, >=,<=,(works for strings as well)
== 
=== (equal and of same type)
!=
!== (not equal value or not equal type)

condition statements: 
if(condition){}
if(){}else{}
if(){}else if(){}else{}

switch statement same as c 
for, while, dow while loops same as c 


you can give names to loop 

loop 1: for(let i = 0; i<5;i++){
    loop 2: for(let j = 0; j<10;j++){
    
    }
}

EVENT HANDLING 
    - onclick <button onclick = "document.getElementbyId("demo").innerHTML = Date()">
                                 this.innerHTML = Date();
    - onchange 
    - onmouseover 
    - onmouseout 
    - onkeydown
    - onload 

Strings: 
    .length 

new keyword : is to create a seperate instance. 

error 

try{}
catch(err){}
finally{}

scopes are same as in python 


*/