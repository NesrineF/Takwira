var img = "";

function openFile(event) {

    var input = event.target;

    var reader = new FileReader();

    reader.onload = function () {

        img = reader.result;
        console.log(img);

        

    };
    reader.readAsDataURL(input.files[0]);
}

function showImage(){
    for (var i=0; i < window.localStorage.length; i++){
        var res = window.localStorage.getItem(window.localstorage.key(i))
        var image = new Image()
        image.src = res;
        parentDiv.appendChild(image)
    }
}







