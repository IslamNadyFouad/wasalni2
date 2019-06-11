$(document).ready(function() {
    $("#btnRegister1").click(function() {
   console.log($("#nameValue").val());
   console.log($("#emailValue").val());
   console.log($("#phoneValue").val());
   console.log($("#passValue").val());
   
   if($("#passValue").val()==$("#pass2Value").val())
   {
    auth.createUserWithEmailAndPassword($("#emailValue").val(), $("#passValue").val()).then(() => {
   
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/' + userId).set({
    name: $("#nameValue").val(),
    email: $("#emailValue").val(),
    phone:$("#phoneValue").val(),
    password:$("#passValue").val()
      });
    
    
       });
    $(".modalOfRegister").css("display","none");
   // window.location.href = "profile.html";
   }
   else
   {}
   
        });
    
       $("#btnRegister2").click(function() {
   
   if($("#passValue").val()==$("#pass2Value").val())
   {
    auth.createUserWithEmailAndPassword($("#emailValue").val(), $("#passValue").val()).then(() => {
   
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/' + userId).set({
    name: $("#nameValue").val(),
    email: $("#emailValue").val(),
    phone:$("#phoneValue").val(),
    password:$("#passValue").val()
      });
    
    
       });
    $(".modalOfRegister").css("display","none");
     $(".modalY").css("display","block");
   }
   else
   {}
   
        });
    });
