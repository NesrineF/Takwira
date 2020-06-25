function getID(){
    Event.observe("property-content","click",afficherID);
    function afficherID(evt){
        elementCliquer = Event.element(evt);
        var myID=elementCliquer.id;
        alert(myID);
        console.log(myID);
        console.log("je fonctionne");
        

    }
}

/*profil_terrain()
 {
    var t = JSON.parse(localStorage.getItem("addt")) || [];
    var obj = new Object()  ;
    x=document.getElementById("villes").value;
    var z=t.filter( addt => addt.villes == x);
    
    
if (z != undefined) {
    /* hezou l page list 
    afficher le resultat
     
    localStorage.setItem("recherch",JSON.stringify(z))

   window.location.href="./../Terrains-listing-grid.html"
} else {
    alert('no results !')
}
    console.log(z);
    
}
*/