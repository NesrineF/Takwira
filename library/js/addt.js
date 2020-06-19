var img = "";
var listimage = []
var parentDiv = document.getElementById("change")

function openFile(event) {

    var input = event.target;

    var reader = new FileReader();

    reader.onload = function () {

        img = reader.result;
        console.log(img);
        listimage.push(img);

        

    };
    reader.readAsDataURL(input.files[0]);
}

function setterrains(){
    var t1 = JSON.parse(localStorage.getItem("con"));
    
    console.log("rrrrrrrrrrrrr" + t1);
    
    
    var t = JSON.parse(localStorage.getItem("addt")) || [];
    var obj = new Object();
    if ((document.getElementById("namet").value !="") && (document.getElementById("villes").value !="") && (document.getElementById("localisation").value!="") && (document.getElementById("Nbr_pr").value!="") && (document.getElementById("numt").value.length == 8) && (document.getElementById("prixt").value!="")){
        obj.id=Math.floor(Math.random()*1000);
        obj.idu=t1.id;
        console.log(obj1.id);
        obj.nomt=document.getElementById("namet").value;
        obj.loct=document.getElementById("localisation").value ;
        obj.nbrp=document.getElementById("Nbr_pr").value ;
        obj.numt=document.getElementById("numt").value;
        obj.prixt=document.getElementById("prixt").value;
        obj.villes=document.getElementById("villes").value;
        obj.park=document.getElementById("Parking").checked;
        obj.swim=document.getElementById("Swiming").checked;
        obj.cafe=document.getElementById("Cafe").checked;
        obj.wifi=document.getElementById("Wifi").checked;
        obj.kids=document.getElementById("Kids").checked;   
        var Image = document.getElementById("img").value;
        obj.img = listimage;
        console.log(obj.img);     
        t.push(obj);
        localStorage.setItem("addt", JSON.stringify(t));
        listimage = [];
        alert("vous avez ajouter un terrain")
    }
    else {
        alert("veuillez remplir tous les champs");
        //console.log(    (document.getElementById("namet").value !="") +' '+ (document.getElementById("localisation").value!="") +' '+ (document.getElementById("Nbr_pr").value!="") +' '+ (document.getElementById("numt").length == 8) +' '+
        //(document.getElementById("prixt").value!=""))
        ;

    }

}
var element = "";
function showImage() {
    var t = JSON.parse(localStorage.getItem("addt")) || [];
    for (var i = 0; i < t.length; i++) {
        element += `	<div class="project-container">
        <div class="project-header">
            <a class="project-thumb lightbox" href="dummies/property_01.jpg" data-lightbox-group="dummy-projects">
                <img alt="" src="${t[i].img[0]}">
                <span class="overlay"><span><span><i class="fa fa-search"></i> Zoom In</span></span></span>
            </a>
            
        </div>
        <div class="project-content">
            <h4 class="project-title"><a href="property-details-swap.html">${t[i].loct}</a></h4>
            <h5 class="project-category">${t[i].nomt}</h5>
        </div>
    </div>
`
    }
}

