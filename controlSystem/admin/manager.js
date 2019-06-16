const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
var ThebusId="";
// create element & render cafe
function renderCafe(doc){
    //console.log("++++"+doc);
    let li = document.createElement('li');
    let userName = document.createElement('span');
    let userUN = document.createElement('span');
    let userPassword = document.createElement('span');
    let userE = document.createElement('span');
    let userPH = document.createElement('span');
    let cross = document.createElement('div');
     let cross2 = document.createElement('div');
     cross2.classList.add('dclass');
    
    li.setAttribute('data-id', doc.key);
    userName.textContent = doc.val().name;
    userUN.textContent = doc.val().userName;
    userPassword.textContent = doc.val().password;
    userE.textContent = doc.val().email;
    userPH.textContent = doc.val().phone;
    cross.textContent = 'x';
    cross2.textContent = '..';
  

    li.appendChild(userName);
    li.appendChild(userUN);
    li.appendChild(userPassword);
    li.appendChild(userE);
    li.appendChild(userPH);
    li.appendChild(cross);
    li.appendChild(cross2);

    cafeList.appendChild(li);
//console.log(id);
    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');console.log(id);
        //db.collection('cafes').doc(id).delete();
         firebase.database().ref().child("Manager").child(id).remove();
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
           document.getElementById("userN").value=doc.val().name;
           document.getElementById("userUN").value=doc.val().userName;
            document.getElementById("userPA").value=doc.val().password;
            document.getElementById("userE").value=doc.val().email;
            document.getElementById("userPH").value=doc.val().phone;
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
    
    var newSeatKey = firebase.database().ref().child('Manager').push();
    newSeatKey.set({
    name: form.Nuser.value,
    userName:form.UNuser.value,
    password:form.PAuser.value,
    email:form.Euser.value,
    phone:form.PHuser.value,
     });
    
    
    form.Nuser.value = '';
    form.UNuser.value = '';
    form.PAuser.value = '';
    form.Euser.value = '';
    form.PHuser.value = '';
    window.location.href = "manager.html";
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

  var ref = firebase.database().ref().child("Manager");
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
  
   var newSeatKey = firebase.database().ref().child('Manager/'+ThebusId);
    newSeatKey.update({
    name: document.getElementById("userN").value,
    userName:document.getElementById("userUN").value,
    password:document.getElementById("userPA").value,
    email:document.getElementById("userE").value,
    phone:document.getElementById("userPH").value,
    
     });
  
  var x=document.querySelector('.modali');
            x.classList.add("disModel");
            window.location.href = "manager.html";
  });