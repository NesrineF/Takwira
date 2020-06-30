var bool = false;
var img = "";
var listimage = []
var parentDiv = document.getElementById("change")
function affichage(){
    var t1 = JSON.parse(localStorage.getItem("bool")) || [];
    var z=t1.find(bool => bool.tf );
    



    
    if (z.tf=="true"){console.log("recherche tekhdem");
    load();
    }
    else{console.log("affichage lkol yekhdem");
    afft();
    }
   localStorage.removeItem("bool");

}
function load() {
 bool = true;
    //var t1 = JSON.parse(localStorage.getItem("addt")) || [];
    bool= true;
    var t = JSON.parse(localStorage.getItem("recherch"));
    localStorage.removeItem("profil");


    var list = document.getElementById("resultat")
    var element = ""
    for (let i = 0; i < t.length; i++) {
        console.log(t[i].prixt);
        console.log("iddddddddddddddddddddddddddddddddddddd"+t[i].id);
        element += `<li class="property first-in-row odd">
        <a href="#" class="property-thumb">
            <img src="${t[i].img[0]} " alt="">
            <div class="property-content">
                <h4 class="property-title"><a href="#" onclick="func(${t[i].id})">${t[i].nomt}</a></h4>
                <h5 class="property-location">${t[i].villes}</h5>
                <p class="property-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Proin nibh augue, suscipit.</p>
                
                <div class="property-price-rating">
                    <div class="property-price"><strong>${t[i].prixt}</strong> / night</div>
                    <div class="property-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div>
                </div>
            </div>
    </li > `
        
    }
    list.innerHTML = element;
    localStorage.removeItem("recherch");

}

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

function func(e){
    console.log(e);
    var t = JSON.parse(localStorage.getItem("addt")) || [];
    window.location.href="./../property-details-swap.html";
    var z=t.find(addt => addt.id ==e);
    localStorage.setItem("profil",JSON.stringify(z));

    
}

function afft(){
    var t = JSON.parse(localStorage.getItem("addt"));
    var element3 = ""
    for (let i = 0; i < t.length; i++) {
        var list = document.getElementById("resultat")
        element3 += `<li class="property first-in-row odd">
        <a href="#" class="property-thumb">
            <img src="${t[i].img[0]} " alt="">
            <div class="property-content">
                <h4 class="property-title"><a href="#" onclick="func(${t[i].id})">${t[i].nomt}</a></h4>
                <h5 class="property-location">${t[i].villes}</h5>
                <p class="property-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Proin nibh augue, suscipit.</p>
                
                <div class="property-price-rating">
                    <div class="property-price"><strong>${t[i].prixt}</strong> / night</div>
                    <div class="property-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div>
                </div>
            </div>
    </li > `
        
    }
    list.innerHTML = element3;
}



