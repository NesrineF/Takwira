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
function load(){
    var t= JSON.parse(localStorage.getItem("recherch"));
    var list=document.getElementById("resultat")
var element =""
    for (let i = 0; i < t.length; i++) {
        
        element += `<li class="property first-in-row odd">
        <a href="#" class="property-thumb">
            <img src="${t[i].img{0}}" alt="">
            <span class="overlay"><span><i class="fa fa-search"></i> View More</span></span>
        </a>
        <div class="property-content">
            <h4 class="property-title"><a href="#">${t[i].nomt}</a></h4>
            <h5 class="property-location">${t[i].villes}</h5>
            <p class="property-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Proin nibh augue, suscipit.</p>
            <ul class="custom-list property-icons">
                <li class="beds" title="beds"><i></i>2</li>
                <li class="people" title="people"><i></i>4</li>
                <li class="bathrooms" title="bathrooms"><i></i>1</li>
            </ul>
            <div class="property-price-rating">
                <div class="property-price"><strong>$ 37</strong> / night</div>
                <div class="property-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div>
            </div>
        </div>
    </li>`
        
    }
    document.getElementById("list_terrain2").innerHTML= element;
}
}