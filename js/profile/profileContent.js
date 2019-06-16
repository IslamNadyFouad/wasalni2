$(document).ready(function(){
    
    
     var reff = firebase.database().ref().child("Users");
    // var i=1;
        reff.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
           if(item.key== firebase.auth().currentUser.uid)
           {
              $("#nameProfile").text(item.val().name);
              $("#emailProfile").text(item.val().email);
              $("#phoneProfile").text(item.val().phone);
           }
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });
     
     
     
     
     
     
 //////////////////////////////////////////////////
 //////////////////////////////////////////////////
///////////////////////*******************
function busInfo(doc)
{
 var ref3 = firebase.database().ref().child("BusSchedule");
    // var i=1;
        ref3.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
           if(item.key==doc.val().busId )
           {
               renderCafe(item,doc);
           }
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });
 
}
var mont="";
var ref = firebase.database().ref().child("MonthlyBooking");
    // var i=1;
        ref.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
           if(item.val().userId==firebase.auth().currentUser.uid )
               mont=item.key;
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });

var ref2 = firebase.database().ref().child("Booking");
    // var i=1;
        ref2.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
           if(item.val().userId==firebase.auth().currentUser.uid && item.val().monthlyId==mont )
           {//console.log("key===="+mont);
               busInfo(item);
           }
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });
        
 const cafeList = document.querySelector('#monthlyList');
//const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(item,doc){
    //console.log("++++"+doc);
    let li = document.createElement('li');
    let nOfSeats = document.createElement('span');
    let date = document.createElement('span');
    let day = document.createElement('span');
    let time = document.createElement('span');
     let source = document.createElement('span');
      let destination = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('data-id', doc.key);
    nOfSeats.textContent = "مقعد "+doc.val().numberOfSeats;
    date.textContent = doc.val().date;
    day.textContent = item.val().day;
   time.textContent = item.val().time_for_go;
   source.textContent = item.val().source;
   destination.textContent = item.val().destination;
    cross.textContent = 'x';
  

    li.appendChild(nOfSeats);
    li.appendChild(date);
    li.appendChild(day);
     li.appendChild(time);
      li.appendChild(source);
     li.appendChild(destination);
    //li.appendChild(cross);

    cafeList.appendChild(li);
    
    li.classList.add("lii");
//console.log(id);
    // deleting data
    //cross.addEventListener('click', (e) => {
    //    e.stopPropagation();
    //    let id = e.target.parentElement.getAttribute('data-id');console.log(id);
    //    //db.collection('cafes').doc(id).delete();
    //     firebase.database().ref().child("BusSchedule").child(id).remove();
    //      let li = cafeList.querySelector('[data-id=' + id + ']');
    //        cafeList.removeChild(li);
    //});
    //
       
}


////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
     
///////////////////////*******************
function busInfo2(doc)
{
 var ref3 = firebase.database().ref().child("BusSchedule");
    // var i=1;
        ref3.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
           if(item.key==doc.val().busId )
           {
               renderCafe2(item,doc);
           }
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });
 
}
//var mont="";
//var ref = firebase.database().ref().child("MonthlyBooking");
//    // var i=1;
//        ref.once("value", function(snapshot) {
//        //console.log(snapshot.val());
//          snapshot.forEach(function(item){
//           if(item.val().userId==firebase.auth().currentUser.uid )
//               mont=item.key;
//          });
//         }, function (error) {
//         console.log("Error: " + error.code);
//         });

var ref4 = firebase.database().ref().child("Booking");
    // var i=1;
        ref4.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
           if(item.val().userId==firebase.auth().currentUser.uid && item.val().monthlyId=="daily" )
           {//console.log("key===="+mont);
               busInfo2(item);
           }
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });
        
        const cafeList2 = document.querySelector('#dailyList');
//const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe2(item,doc){
    //console.log("++++"+doc);
    let li = document.createElement('li');
    let nOfSeats = document.createElement('span');
    let date = document.createElement('span');
    let day = document.createElement('span');
    let time = document.createElement('span');
     let source = document.createElement('span');
      let destination = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('data-id', doc.key);
    nOfSeats.textContent = "مقعد "+doc.val().numberOfSeats;
    date.textContent = doc.val().date;
    day.textContent = item.val().day;
   time.textContent = item.val().time_for_go;
   source.textContent = item.val().source;
   destination.textContent = item.val().destination;
    cross.textContent = 'x';
  

    li.appendChild(nOfSeats);
    li.appendChild(date);
    li.appendChild(day);
     li.appendChild(time);
      li.appendChild(source);
     li.appendChild(destination);
    li.appendChild(cross);

    cafeList2.appendChild(li);
    
    li.classList.add("lii");
// deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');console.log(id);
        //db.collection('cafes').doc(id).delete();
         firebase.database().ref().child("Booking").child(id).remove();
          let li = cafeList.querySelector('[data-id=' + id + ']');
            //cafeList.removeChild(li);
            window.location.href = "profile.html";
    });
    
       
       
}
    
    
    });