function select() {
    var t = localStorage.getItem("reserved") || [];
    var obj = JSON.parse(localStorage.getItem("reserved") || []);
    var t1 = JSON.parse(localStorage.getItem("profil"));
    var op = document.getElementById("jour1").value;
  //  console.log("jour2" + op);
    
     var op1 = document.getElementById("appt1").value;
     var z = obj.find(reserved => reserved.jour == document.getElementById("appt2").value);
 //  console.log("appt2.value"+document.getElementById("appt2").value);
//    console.log("zzzzzzzz"+z);
// const languages = {
//     JavaScript: 50,
//     Python: 45,
//     Java: 30,
//     PHP: 10,
//   }
  
//   const values = Object.values(languages)
//   console.log(values[0]);
//***************************************************** */
// var car = {{type:"Fiat", model:"500", color:"white"},{type:"Fiat", model:"500", color:"white"}};
// console.log(car.type);

// for (const temp in z) {
//     console.log(temp['temp']+ "aaaaaaaaaaaaaaa");
    
// //  console.log(`${temp}: ${z[temp]}`);
//  console.log(`${temp}: ${z[temp]}`);

//          for (let j = 1; j <= 8; j++) {
//             var k = j.toString();

//     //    ${z[temp]}
//     }

//   }
   //*********************************************************************/ */
//    pos = t.map(function (e) { return e.id; }).indexOf(z.id);


    for (var index = 0; index < obj.length; index++) {
        console.log("le temps est : "+obj[index].temp);
        console.log("le jour est : "+obj[index].jour);
        console.log("appt2"+document.getElementById("appt2").value);
        
        for (let j = 1; j <= 8; j++) {
            var k = j.toString();
            console.log("kkkkk"+k);

 
        if((k==obj[index].temp) && (document.getElementById("appt2").value==obj[index].jour)){
            console.log("le temps est : " + obj[index].temp  + "le jour est : "+ obj[index].jour);
console.log("notre k : "+ k);
           
                              document.getElementById("temp"+k).disabled = true;


        }
        if((k==obj[index].temp) && (document.getElementById("appt2").value!=obj[index].jour)){
            document.getElementById("temp"+k).disabled = false;
        }
    }
        
        
    }

//     console.log("slected"+document.getElementById("appt2").value);
//     for (let j = 1; j <= 8; j++) {
//         var k = j.toString();
//         console.log("kkkk"+k);
//         for (var index = 0; index < obj.length; index++) {
//             if(k==obj[index].temp){
//                 console.log("le temps est : " + obj[index].temp  + "le jour est : "+ obj[index].jour);
// console.log("notre k : "+ k);
               
//                                   document.getElementById("temp"+k).disabled = true;


//             }
            
            
//         }

        
//     }
}
