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
var element = "";
function showImage(){
    for (var i=0; i < t.length; i++){
       element += `						<div class="project-container">
        <div class="project-header">
            <a class="project-thumb lightbox" href="dummies/property_01.jpg" data-lightbox-group="dummy-projects">
                <img alt="" src="${t[i].img[0]}">
                <span class="overlay"><span><span><i class="fa fa-search"></i> Zoom In</span></span></span>
            </a>
            <ul class="custom-list project-tags">
                <li>Tag1,</li>
                <li>Tag2,</li>
                <li>Tag3</li>
            </ul>
        </div>
        <div class="project-content">
            <h4 class="project-title"><a href="#">Project Name Goes Here</a></h4>
            <h5 class="project-category">Category Name</h5>
        </div>
    </div>
`
    }
    
}







