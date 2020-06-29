function bool1(){
var t1 = JSON.parse(localStorage.getItem("bool")) || [];
var obj1 = new Object();
obj1.tf="false";
t1.push(obj1);
localStorage.setItem("bool",JSON.stringify(t1))
console.log("obj1.tf"+ obj1.tf);
}