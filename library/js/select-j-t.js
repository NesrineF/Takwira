function select() {
    var t = JSON.parse(localStorage.getItem("reserved"));
    var t1 = JSON.parse(localStorage.getItem("profil"));
    var op = document.getElementById("appt2").value;
    console.log("edfdsfdsfdsfg");

    for (let j = 1; j < 7; j++) {
        var k = j.toString();

        if (document.getElementById(j.toString()).selected == true) {
            for (let index = 0; index < reserved.length; index++) {
                if (reserved[index].jour == j) {
                    var u = reserved[index].temp;
                    var a = parseInt(u);
                    op[a].disabled = false;
                }
            }
        }
    }
}
