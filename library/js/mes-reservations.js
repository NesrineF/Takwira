function checked() {
    var t = JSON.parse(localStorage.getItem("con"));
    var t1 = JSON.parse(localStorage.getItem("reserved"));
    var t2 = JSON.parse(localStorage.getItem("addt"));
    var x = t2.find(addt => addt.idu == t.id);
    var z = t1.filter(reserved => reserved.id == x.id);
    var x = 8;
    var y = 7;

    for (let index = 0; index < z.length; index++) {
        if (z != undefined) {
            for (let h = 1; h < x; h++) {//1///8
                for (let j = 1; j < y; j++) {//1*************7
                    var l = j.toString();
                    var k = h.toString();
                    if ((z[index].temp == k) && (z[index].jour == l)) {
                        document.getElementById(k+l).checked = true;
                        console.log("aaaaaaaaaaaaaaaa"+ k+l);
                    }
                }
            }
        }
    }
}