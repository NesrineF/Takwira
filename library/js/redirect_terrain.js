
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
}



                                    
