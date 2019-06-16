const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
var ThebusId="";
// create element & render cafe
function renderCafe(doc){
    //console.log("++++"+doc);
    let li = document.createElement('li');
    let busId = document.createElement('span');
    let date = document.createElement('span');
    let monthlyId = document.createElement('span');
    let numOfSeats = document.createElement('span');
     let userId = document.createElement('span');
    let cross = document.createElement('div');
     let cross2 = document.createElement('div');
     cross2.classList.add('dclass');
    
    li.setAttribute('data-id', doc.key);
    busId.textContent = doc.val().busId;
    date.textContent = doc.val().date;
    monthlyId.textContent = doc.val().monthlyId;
    numOfSeats.textContent = doc.val().numberOfSeats;
   userId.textContent = doc.val().userId;
    cross.textContent = 'x';
    cross2.textContent = '..';
  

    li.appendChild(busId);
    li.appendChild(date);
    li.appendChild(monthlyId);
    li.appendChild(numOfSeats);
    li.appendChild(userId);
   
    li.appendChild(cross);
    li.appendChild(cross2);

    cafeList.appendChild(li);
//console.log(id);
    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');console.log(id);
        //db.collection('cafes').doc(id).delete();
         firebase.database().ref().child("Booking").child(id).remove();
          let li = cafeList.querySelector('[data-id=' + id + ']');
            cafeList.removeChild(li);
    });
    
     cross2.addEventListener('click', (e) => {
        e.stopPropagation();
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
           document.getElementById("busIdU").value=doc.val().busId;
           document.getElementById("dateU").value=doc.val().date;
           document.getElementById("monthlyIdU").value=doc.val().monthlyId;
           document.getElementById("numOfSeatsU").value=doc.val().numberOfSeats;
           document.getElementById("userIdU").value=doc.val().userId;
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
    
    var newSeatKey = firebase.database().ref().child('Booking').push();
    newSeatKey.set({
    busId: form.busId.value,
    date:form.date.value,
    monthlyId:form.monthlyId.value,
    numberOfSeats:form.numOfSeats.value,
    userId:form.userId.value,
     });
    
    
    form.busId.value = '';
    form.date.value = '';
    form.monthlyId.value = '';
    form.numOfSeats.value = '';
    form.userId.value = '';
    
    window.location.href = "bookingUpdate.html";
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

  var ref = firebase.database().ref().child("Booking");
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
  
   var newSeatKey = firebase.database().ref().child('Booking/'+ThebusId);
    newSeatKey.update({
    busId: document.getElementById("busIdU").value,
    date:document.getElementById("dateU").value,
    monthlyId:document.getElementById("monthlyIdU").value,
    numberOfSeats:document.getElementById("numOfSeatsU").value,
     userId: document.getElementById("userIdU").value,
     });
  
  var x=document.querySelector('.modali');
            x.classList.add("disModel");
            window.location.href = "bookingUpdate.html";
  });