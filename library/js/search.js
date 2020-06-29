var bool=false;
function searcht(){
    bool=true;
        var t = JSON.parse(localStorage.getItem("addt")) || [];
        localStorage.get
        var obj = new Object();
        x=document.getElementById("villes").value;
        var z=t.filter( addt => addt.villes == x);
        
        
    if (z != undefined) {
        /* hezou l page list 
        afficher le resultat
        */    
        localStorage.setItem("recherch",JSON.stringify(z))

       window.location.href="./../Terrains-listing-grid.html"
    } else {
        alert('no results !')
    }
        console.log(z);   
        var t1 = JSON.parse(localStorage.getItem("bool")) || [];
        var obj1 = new Object();
        for (let index = 0; index < t1.length; index++) {
console.log("aaaaaaaaaaaaa");
t1[index].tf="true";
            
        }
        // obj1.tf="true";
        // t1.push(obj1);
        localStorage.setItem("bool",JSON.stringify(t1));
        console.log("rechercheeeeeeeeeeeeeeeee"+obj1.tf);

    }
