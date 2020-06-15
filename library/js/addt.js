function setterrains(){
    var t = JSON.parse(localStorage.getItem("addt")) || [];
    var obj = new Object();
    if (document.getElementById("namet").value !="" && document.getElementById("localisation").value!="" && document.getElementById("Nbr_pr").value!="" && document.getElementById("numt").length == 8 && document.getElementById("prixt").value!=""){
        obj.id=Math.floor(Math.random()*1000);
        obj.nomt=document.getElementById("namet").value;
        obj.loct=document.getElementById("localisation").value ;
        obj.nbrp=document.getElementById("Nbr_pr").value ;
        obj.numt=document.getElementById("numt").value;
        obj.prixt=document.getElementById("prixt").value;
        obj.park=document.getElementById("Parking").checked;
        obj.swim=document.getElementById("Swiming").checked;
        obj.cafe=document.getElementById("Cafe").checked;
        obj.wifi=document.getElementById("Wifi").checked;
        obj.kids=document.getElementById("Kids").checked;
        console.log(obj.nomt);
        console.log(obj.loct);
        console.log(obj.nbrp);
        console.log(obj.numt.length);
        console.log(obj.prixt);
        
        
        t.push(obj);
        localStorage.setItem("addt",JSON.stringify(t));
        alert("vous avez ajouter un terrain")
    }
    else{
        alert("veuillez remplir tous les champs");
        console.log('error');
        
        console.log(document.getElementById("namet").value);
        console.log(document.getElementById("localisation").value);
        console.log(document.getElementById("Nbr_pr").value);
        console.log(document.getElementById("numt").value);
        console.log(document.getElementById("prixt").value);
    }
}