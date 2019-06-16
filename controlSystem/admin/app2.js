const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
var ThebusId="";
// create element & render cafe
function renderCafe(doc){
    //console.log("++++"+doc);
    let li = document.createElement('li');
    let userName = document.createElement('span');
    let userEmail = document.createElement('span');
    let userPhone = document.createElement('span');
    let userPassword = document.createElement('span');
    let cross = document.createElement('div');
     let cross2 = document.createElement('div');
     cross2.classList.add('dclass');
    
    li.setAttribute('data-id', doc.key);
    userName.textContent = doc.val().name;
    userEmail.textContent = doc.val().email;
    userPhone.textContent = doc.val().phone;
    userPassword.textContent = doc.val().password;
   
    cross.textContent = 'x';
    cross2.textContent = '..';
  

    li.appendChild(userName);
    li.appendChild(userEmail);
    li.appendChild(userPhone);
    li.appendChild(userPassword);
   
    li.appendChild(cross);
    li.appendChild(cross2);

    cafeList.appendChild(li);
//console.log(id);
    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');console.log(id);
         firebase.database().ref().child("Users").child(id).remove();
           document.getElementById("userN").value=doc.val().name;
           document.getElementById("userE").value=doc.val().email;
           document.getElementById("userPH").value=doc.val().phone;
           document.getElementById("userPA").value=doc.val().password;
            firebase.auth().signInWithEmailAndPassword(document.getElementById("userE").value, document.getElementById("userPA").value).then(function(){
                 }).catch(function(error){ alert("this "+error);});
             if (firebase.auth().currentUser)
                  {
                 firebase.auth().currentUser.delete();
                 
                  }
         
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
           document.getElementById("userE").value=doc.val().email;
           document.getElementById("userPH").value=doc.val().phone;
            document.getElementById("userPA").value=doc.val().password;
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
 /* firebase.auth().createUserWithEmailAndPassword(form.Euser.value, form.PAuser.value).then(function(){
    alert("user added successful");
    }).catch(function(error){ alert("this "+error);});*/
    firebase.auth().signOut();
    
               firebase.database().ref().child('Users').push().set({
                  name: form.Nuser.value,
                  email:form.Euser.value,
                  phone:form.PHuser.value,
                  password:form.PAuser.value,
                 }).catch(function(error){ alert("this "+error);});
    
    firebase.auth().createUserWithEmailAndPassword(form.Euser.value, form.PAuser.value).then(() => {
              
               alert("user created");
                  }).catch(function(error){ alert("this "+error);});
       
    
    
    form.Nuser.value = '';
    form.Euser.value = '';
    form.PHuser.value = '';
    form.PAuser.value = '';
    
    //window.location.href = "userUpdate.html";
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

  var ref = firebase.database().ref().child("Users");
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
  
   var newSeatKey = firebase.database().ref().child('Users/'+ThebusId);
    newSeatKey.update({
    name: document.getElementById("userN").value,
    email:document.getElementById("userE").value,
    phone:document.getElementById("userPH").value,
    password:document.getElementById("userPA").value,
    
     });
  
  var x=document.querySelector('.modali');
            x.classList.add("disModel");
            window.location.href = "userUpdate.html";
  });