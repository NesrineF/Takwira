
function profil_terrain()
 {
    var p=JSON.parse(localStorage.getItem("profil")); 
    var list1 =document.getElementById('resultat2');
    //console.log("ppppppppppppppppppppppppppppppp"+p.img[0]);
    
    var element2=""

    element2+= `<div class="property-images">
    <div class="image-list">
        <div class="image"><img src="${p.img[0]}" alt="hhhhhhhhhhhhhhhhhhhhhhhh"></div> 
    </div>
      </div>

<div class="row">
<div class="col-md-8">

    <!-- PROPERTY DESCRIPTION : begin -->
    <div class="property-description">

    <span class="calendar-input input-left" title="Arrival">

    <select class="time2" id="appt2" style="margin-top: 20px;" onchange="select()">
        <option value="" disabled selected>le jour</option>
        <option value="1">Lundi</option>
        <option value="2">Mardi</option>
        <option value="3">Mercredi</option>
        <option value="4">Jeudi</option>
        <option value="5">Vendredi</option>
        <option value="6">Samedi</option>
        <option value="7">Dimanche</option>
        
    
    </select>

    

  </span>

 <span class="" title="Arrival">
<form>

 <select class="time2" id="appt1" >
    <option value="" disabled selected>Horaires</option>
    <option value="1">12:30</option>
    <option value="2">14:00</option>
    <option value="3">15:30</option>
    <option value="4">17:00</option>
    <option value="5">18:30</option>
    <option value="6">20:00</option>
    <option value="7">21:30</option>
    <option value="8">23:00</option>

 </select>


    
                                
</form>
</span>


    </div>
    <!-- PROPERTY DESCRIPTION : end -->

</div> 
<div class="col-md-4">
    <!-- PROPERTY PANEL : begin -->
    <div class="property-panel">

        <!-- SWAP NOW : begin -->
        <div class="panel-item swap-now">
			<button class="button" style="margin-top: 40px;" onclick="testb()"> Reserver <i class="fa fa-check"></i></button>													
			</div>
        <!-- SWAP NOW : end -->
     </div>
    <!-- PROPERTY PANEL : end -->
    

</div>
</div>


<!-- PROPERTY DETAILS : end -->

</div>
<!-- PROPERTY DETAILS : end -->

</div>


`
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