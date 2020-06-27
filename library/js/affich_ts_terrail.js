function afft(){
    var t = JSON.parse(localStorage.getItem("addt"));
    var element3 = ""
    for (let i = 0; i < t.length; i++) {
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