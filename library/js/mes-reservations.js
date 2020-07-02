function checked() {
    var t = JSON.parse(localStorage.getItem("con"));
    var t1 = JSON.parse(localStorage.getItem("reserved"));
    var t2 = JSON.parse(localStorage.getItem("addt"));
    var x = t2.find(addt => addt.idu == t.id);
    var z = t1.filter(reserved => reserved.id == x.id);
    var x = 8;
    var y = 7;

    for (let index = 0; index < z.length; index++) {
        console.log("aaaaaaaaaaaaaaaa" + z[index].id);
        if (z != undefined) {
            for (let h = 1; x < z.x; h++) {
                for (let j = 1; y < z.y; j++) {
                    var l = j.toString();
                    var k = h.toString();
                    if ((z[index].temp == k) && (z[index].jour == l)) {
                        document.getElementById(k + l).checked = true;
                    }
                }
            }
        }
    }
}