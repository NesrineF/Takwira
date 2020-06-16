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







<div class="row form-group mb-4">

    <div class="col-md-12 font-weight-bold"><h3>Image</h3></div>

    <div class="col-md-12 mb-3 mb-md-0">



        <input id="image" type="file" onchange="openFile(event)" name="myFile" class="form-control">

                                                 

                                                </div>



    </div>
