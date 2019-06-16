const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
var ThebusId="";
// create element & render cafe
function renderCafe(doc){
    //console.log("++++"+doc);
    let li = document.createElement('li');
    let busid = document.createElement('span');
    let day = document.createElement('span');
    let desEn = document.createElement('span');
    let desAr = document.createElement('span');
    let price = document.createElement('span');
    let seats = document.createElement('span');
    let sEn = document.createElement('span');
    let sAr = document.createElement('span');
    let time = document.createElement('span');
    let driver = document.createElement('span');
    let duration = document.createElement('span');
    let cross = document.createElement('div');
     let cross2 = document.createElement('div');
     cross2.classList.add('dclass');
    
    li.setAttribute('data-id', doc.key);
    busid.textContent = doc.val().buse_number;
    day.textContent = doc.val().day;
    desEn.textContent = doc.val().destinationEn;
    desAr.textContent = doc.val().destination;
    price.textContent = doc.val().price;
    seats.textContent = doc.val().seats;
     sEn.textContent = doc.val().sourceEn;
    sAr.textContent = doc.val().source;
    time.textContent = doc.val().time_for_go;
    driver.textContent = doc.val().Driver_name;
    duration.textContent = doc.val().duration;
    cross.textContent = 'x';
    cross2.textContent = '..';
  

    li.appendChild(busid);
    li.appendChild(day);
    li.appendChild(desEn);
    li.appendChild(desAr);
    li.appendChild(price);
    li.appendChild(seats);
    li.appendChild(sEn);
    li.appendChild(sAr);
    li.appendChild(time);
    li.appendChild(driver);
    li.appendChild(duration);
    li.appendChild(cross);
    li.appendChild(cross2);

    cafeList.appendChild(li);
//console.log(id);
    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');console.log(id);
        //db.collection('cafes').doc(id).delete();
         firebase.database().ref().child("BusSchedule").child(id).remove();
          let li = cafeList.querySelector('[data-id=' + id + ']');
            cafeList.removeChild(li);
    });
    
     cross2.addEventListener('click', (e) => {
       // e.stopPropagation();
       ThebusId=doc.key;
        let id = e.target.parentElement.getAttribute('data-id');console.log(id);
        //db.collection('cafes').doc(id).delete();
         //firebase.database().ref().child("bs").child(id).remove();
          let li = cafeList.querySelector('[data-id=' + id + ']');
            //cafeList.removeChild(li);
            //$(".modali").css("display","block");
            var x=document.querySelector('.modali');
            x.classList.add("shModel");
           // $("#busnumUp").text(doc.val().buse_number);
           document.getElementById("busnumUp").value=doc.val().buse_number;
           document.getElementById("dayUp").value=doc.val().day;
           document.getElementById("desEnUp").value=doc.val().destinationEn;
            document.getElementById("desArUp").value=doc.val().destination;
           document.getElementById("priceUp").value=doc.val().price;
           document.getElementById("NUp").value=doc.val().seats;
            document.getElementById("sEnUp").value=doc.val().sourceEn;
           document.getElementById("sArUp").value=doc.val().source;
           document.getElementById("tUp").value=doc.val().time_for_go;
           document.getElementById("drivUp").value=doc.val().Driver_name;
           document.getElementById("duarUp").value=doc.val().duration;
    });
    
       
}

// getting data
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    var newSeatKey = firebase.database().ref().child('BusSchedule').push();
    newSeatKey.set({
    buse_number: form.busid.value,
    day:form.day.value,
    destinationEn:form.destinationEn.value,
    destination:form.destinationAr.value,
    price:form.price.value,
    seats:form.numOfSeat.value,
    sourceEn:form.sourceEn.value,
    source:form.sourceAr.value,
    time_for_go:form.time.value,
    Driver_name:form.driver.value,
    duration:form.duration.value
     });
    
    
    form.busid.value = '';
    form.day.value = '';
    form.destinationEn.value = '';
    form.destinationAr.value = '';
    form.price.value = '';
    form.numOfSeat.value = '';
    form.sourceEn.value = '';
    form.sourceAr.value = '';
    form.time.value = '';
    form.driver.value = '';
    form.duration.value = '';
    window.location.href = "index.html";
});

// real-time listener
/*db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});*/

  var ref = firebase.database().ref().child("BusSchedule");
    // var i=1;
        ref.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
           // if(item.val().sourceEn==sourcex && item.val().destinationEn==destinationx && item.val().day==day)
               renderCafe(item);
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });







document.getElementById("updateBtn").addEventListener("click", function(){
  
   var newSeatKey = firebase.database().ref().child('BusSchedule/'+ThebusId);
    newSeatKey.update({
    buse_number: document.getElementById("busnumUp").value,
    day:document.getElementById("dayUp").value,
    destinationEn:document.getElementById("desEnUp").value,
    destination:document.getElementById("desArUp").value,
    price:document.getElementById("priceUp").value,
    seats:document.getElementById("NUp").value,
    sourceEn:document.getElementById("sEnUp").value,
    source:document.getElementById("sArUp").value,
    time_for_go:document.getElementById("tUp").value,
    Driver_name:document.getElementById("drivUp").value,
    duration:document.getElementById("duarUp").value
     });
  
  var x=document.querySelector('.modali');
            x.classList.add("disModel");
            window.location.href = "index.html";
  });