function checked1(){
var s= confirm('Souhaitez vous ajouter un terrain vous meme?');
if (s == true){
    var t1 = JSON.parse(localStorage.getItem("reserved"));
    var obj = new Object();
var x=8;
var y=7;
        for (let h = 1; h < x; h++) {//1///8
            for (let j = 1; j < y; j++) {//1*************7
                var l = j.toString();
                var k = h.toString();
                if ((z[index].temp == k) && (z[index].jour == l)) {

                }
            }
        }
    
}
   obj.temp=x;
    obj.jour=y;
    t.push(obj);
    localStorage.setItem("reserved",JSON.stringify(t));

}
function checked2(){
    console.log("checked2")
}