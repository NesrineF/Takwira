
function profil_terrain()
 {
    var p=JSON.parse(localStorage.getItem("profil")); 
    var list1 =document.getElementById('resultat2');
    console.log("ppppppppppppppppppppppppppppppp"+p.img[0]);
    
    var element2=""

    element2+= `<div class="property-images">
    <div class="image-list">
        <div class="image"><img src="${p.img[0]}" alt="Short photo description should go right here"></div>
        <div class="image"><img src="${p.img[1]}" alt="Short photo description should go right here"></div>

    </div>
    <div class="images-footer">
        <div class="images-footer-inner">
            <div class="image-description"></div>
            <div class="image-counter"></div>
        </div>
        <button class="prev-btn"><i class="fa fa-chevron-left"></i></button>
        <button class="next-btn"><i class="fa fa-chevron-right"></i></button>
    </div>
</div>`
list1.innerHTML= element2;
var list1 =document.getElementById('resultat4');
var element4=""
element4+= `<div class="toggle-container property-address">
    <h5 class="toggle-title">Address</h5>
    <div class="toggle-content">

        <p>${p.loct}</p>

    </div>`
list1.innerHTML= element4;

var list1 =document.getElementById('resultat3');
var element3=""

element3+= `<h5 class="toggle-title">Additional Information</h5>
<div class="toggle-content">

    <ul class="custom-list check-list">`

if (p.park)
{
    element3+= `<li>parking</li>`
    

}
else{

}

if (p.swim)
{
    element3+= `<li>Swimming Pool</li>`
}
else{

}

if (p.cafe)
{
    element3+= `<li>Caféteria</li>`
}
else{

}

if (p.wifi)
{
    element3+= `<li>Wifi</li>`
}
else{

}

if (p.kids)
{
    element3+= `<li>Kids Playtime</li>`
}
else{

}
`       
    </ul>

</div>`
list1.innerHTML= element3;
}