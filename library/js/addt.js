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

function setterrains() {
    var t1 = JSON.parse(localStorage.getItem("con"));
    var obj1 = new Object();

    // console.log("rrrrrrrrrrrrr" + t1);


    var t = JSON.parse(localStorage.getItem("addt")) || [];
    var obj = new Object();
    console.log("nameterrain" + document.getElementById("nameterrain").value);
    console.log("localisation" + document.getElementById("localisation").value);
    console.log("Nbr_pr" + document.getElementById("Nbr_pr").value);
    console.log("numt" + document.getElementById("numt").value);
    console.log("prixt" + document.getElementById("prixt").value);
    console.log("villes" + document.getElementById("villes").value);
    console.log("Parking" + document.getElementById("Parking").value);
    console.log("img" + document.getElementById("img").value);


    if ((document.getElementById("nameterrain").value != "") && (document.getElementById("villes").value != "") && (document.getElementById("localisation").value != "") && (document.getElementById("Nbr_pr").value != "") && (document.getElementById("numt").value.length == 8) && (document.getElementById("prixt").value != "")) {
        obj.id = Math.floor(Math.random() * 1000);
        obj.idu = t1.id;
        console.log = (obj1.id);
        obj.nomt = document.getElementById("nameterrain").value;
        obj.loct = document.getElementById("localisation").value;
        obj.nbrp = document.getElementById("Nbr_pr").value;
        obj.numt = document.getElementById("numt").value;
        obj.prixt = document.getElementById("prixt").value;
        obj.villes = document.getElementById("villes").value;
        obj.park = document.getElementById("Parking").checked;
        obj.swim = document.getElementById("Swiming").checked;
        obj.cafe = document.getElementById("Cafe").checked;
        obj.wifi = document.getElementById("Wifi").checked;
        obj.kids = document.getElementById("Kids").checked;
        var Image = document.getElementById("img").value;
        obj.img = listimage;
        //  console.log("objet" + obj);

        t.push(obj);
        localStorage.setItem("addt", JSON.stringify(t));
        listimage = [];
        alert("vous avez ajouter un terrain")
        window.location.reload();
    }
    else {
        // alert("veuillez remplir tous les champs");
        console.log("elseeeeeeeeeee");

        for (let index = 0; index < t.length; index++) {
            console.log(t[0]);


        }


    }

}
var element = "";

function showImage() {
    var t = JSON.parse(localStorage.getItem("addt")) || [];
    console.log(t);
    for (var i = 0; i < t.length; i++) {
        element += `	
        <div class="project-container">
        <div class="project-header">
            <a class="project-thumb lightbox" href="dummies/property_01.jpg" data-lightbox-group="dummy-projects">
                <img alt="" src="${t[i].img[0]}">
                <span class="overlay"><span><span><i class="fa fa-search"></i> Zoom In</span></span></span>
            </a>
            
        </div>
        <div class="project-content">
            <h4 class="project-title"><a href="property-details-swap.html">${t[i].nomt}</a></h4>
    
            <h5 class="project-category">${t[i].loct}</h5>

<div class="row">
            <div class="col">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#demoModal">Modifier</button>
                <button type="button" onclick="Delete(${t[i].id})"class="btn btn-danger">Suprimmer</button>
            </div>
        </div>
<div class="modal fade sm" id="demoModal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h4 class="modal-title">Modifier mon terrain</h2>
            <button type="button" class="close" data-dismiss="modal">
                <span>&times;</span>
            </button>
        </div>
            <div class="modal-body">
            <form>
            <div class="row">
             
            <div class="col-sm-6">
            <label style="margin-left: -90px"> Nom Du terrain</label>
            <input type="text" id="nom_terrain" name="field_name" class="required" placeholder="${t[i].nomt}">
        </div>
              
        <div class="col-sm-6">
        <label style="margin-left: -60px"> Nombre de personne</label>
        <input type="text" id="nombre_personne" name="field_name" class="required" placeholder="${t[i].nbrp}">
    </div>
            
             
             
    <div class="col-sm-6">
    <label style="margin-left: -60px">Telephone</label>
    <input type="text" id="numéro_terrain" name="field_name" class="required" placeholder="${t[i].numt}">
</div>
                
<div class="col-sm-6">
<label style="margin-left: -60px">Prix du terrain</label>
<input type="text" id="prix_terrain" name="field_name" class="required" placeholder="${t[i].prixt}">
</div>
             </div>
            </form>
          </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="Update(${t[i].id})" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div>
    </div>

        </div>
    </div>
`
    }

    document.getElementById("list_terrain").innerHTML = element;
}
function Delete(e) {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + e);
    var t = JSON.parse(localStorage.getItem("addt")) || [];
    // window.location.href="./../property-details-swap.html";
    var z = t.find(addt => addt.id == e);

    pos = t.map(function (e) { return e.id; }).indexOf(z.id);


    if (pos != -1) {
        t.splice(pos, 1);

    }
    var t1 = t;
    localStorage.removeItem(t);
    localStorage.setItem("addt", JSON.stringify(t1));
    window.location.reload();


}

function Update(e) {
    console.log(e);
    var t = JSON.parse(localStorage.getItem("addt")) || [];
    var obj = new Object();
    var z = t.find(addt => addt.id == e);
obj.id = z.id;
obj.nomt = document.getElementById("nom_terrain").value;
obj.loct = z.loct;
obj.nbrp = document.getElementById("nombre_personne").value;
obj.numt = document.getElementById("numéro_terrain").value;
obj.prixt = document.getElementById("prix_terrain").value;
obj.villes = z.villes;
obj.park = z.Parking;
obj.swim = z.Swiming;
obj.cafe = z.Cafe;
obj.wifi = z.Wifi;
obj.kids = z.Kids;
var Image = z.img;
obj.img = listimage;
console.log("localisation"+z.loct);

// console.log("nom du terrain"+document.getElementById("nom_terrain").value);
// console.log("nombre de personne"+document.getElementById("nombre_personne").value);
// console.log("numéro du terrain"+document.getElementById("numéro_terrain").value);
// console.log("prix du terrain"+document.getElementById("prix_terrain").value);


    pos = t.map(function (e) { return e.id; }).indexOf(z.id);
    t.splice(pos,1)
t.push(obj);
localStorage.setItem("addt", JSON.stringify(t));
listimage = []; 0
    window.location.reload();


}




