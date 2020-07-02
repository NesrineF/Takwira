function select() {
    var t = JSON.parse(localStorage.getItem("reserved"));
    var t1 = JSON.parse(localStorage.getItem("profil"));
    var x = document.getElementById("appt2").value;
    // var x1 = document.getElementById("appt2")[2].value;
    // console.log("aaaaa"+x1);


    // let opt = x.opti;
    // console.log("opttt"+opt);
    
    // console.log("opppppp"+op);
    // for(var i=0; i<opt.length; i++){
    //     if(i == op.selectedIndex){
    //         opt[i].setAttribute("selected",true);
    //         console.log("truuuuuuuuuuue");
            
    //     }else{
    //         opt[i].setAttribute("selected",false);
    //         console.log("falseeeeeeeeeeeeeee");

    //     }
    // }

    for (let j = 1; j < 7; j++) {
        var k = j.toString();
        console.log("kkkkkkkkkkk"+k);
        

        if (x==j) {
            for (let index = 1; index < t.length; index++) {
                if (t[index].jour == k) {
                    var u = t[index].temp;
                    var a = parseInt(u);
                    console.log("uuuuuu"+u);
                    console.log("aaaaaaa"+a);
                    console.log("****************"+x[a]);

                    document.getElementById("appt2")[a].disabled = true;
                    
                }
            }
        }
    }
}
