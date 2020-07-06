function checked1(){
    var s= confirm('Souhaitez vous ajouter un terrain vous meme?');
    var p=JSON.parse(localStorage.getItem("profil")); 
    var p1=JSON.parse(localStorage.getItem("con")); 
    var t2 = JSON.parse(localStorage.getItem("reserved"))|| [];
    var obj = new Object();
    
    if (s == true){
        
    
    var x=8;
    var y=7;
    for (var index = 0; index < t2.length; index++) {
        // console.log("le temps est : "+obj[index].temp +"le jour est :" +obj[index].jour);
    
            for (let h = 1; h <= x; h++) {//1///8
                for (let j = 1; j <= y; j++) {//1*************7
                    // if((obj[index].temp==h) && (obj[index].jour==j)){
                    var l = j.toString();
                    var k = h.toString();
                    
                    if(document.getElementById(l+k).checked){
    console.log("document.getElementById(l+k).value"+document.getElementById(l+k).value);
    console.log("document.getElementById(obj[index].temp+obj[index].jour).value"+document.getElementById(t2[index].temp+t2[index].jour).value);
                        
                    if(((document.getElementById(l+k).value)!=(document.getElementById(t2[index].temp+t2[index].jour).value)))
                    {
                        var i=1;
                        console.log("i :"+ i);
                        i++;
                        
                    //     console.log('yalla ekhdem');
    
                    // console.log("document.getElementById(l+k).checked :"+(document.getElementById(l+k).checked).value);
                    // console.log("document.getElementById(obj[index].temp+obj[index].jour).value :"+document.getElementById(obj[index].temp+obj[index].jour).value );
                    console.log();
                    
    // console.log("checkedddddddd");
    console.log("hhhhhh : "+ l +"jjjjjj" + k);
    obj.id =p.id;
    obj.idc=p1.id;
    obj.temp=l;
    obj.jour=k;
    console.log("obj.id :"+obj.id);
    console.log("obj.idc : "+obj.idc);
    console.log("obj.temp : "+obj.temp);
    console.log("obj.jour : "+ obj.jour);
    var t2 = JSON.parse(localStorage.getItem("reserved"))|| [];
    
    t2.push(obj);
    localStorage.setItem("reserved",JSON.stringify(t2));
    alert("vous avez ajouter une réservation ");
    
                        // console.log("lllllllll :"+l);
                        // console.log("kkkkkk : "+k);
    
                    }
                }
                    else{
                        console.log("nchala mara jeya");
                        
                    }
                  
                    
                    // if ((z[index].temp == k) && (z[index].jour == l)) {
    
                    // }
    
    
                //}
            }
            }
        
    }
    }
    //    obj.temp=x;
    //     obj.jour=y;
    //     t.push(obj);
    //     localStorage.setItem("reserved",JSON.stringify(t));
    
    }
    function checked2(){
        console.log("checked2");
    }