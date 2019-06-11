$(document).ready(function() {
    $("#btnUnRU").click(function() {
        
         var pushUnU = firebase.database().ref().child('UnRegisterUser').push();
    pushUnU.set({
     email:$("#unRUeValue").val(),
     phone:$("#unRUphValue").val(),
     });
  
    $("#tUserId").text(pushUnU.key);
    console.log(pushUnU.key);
  
    $(".modalZ").css("display","none");
    $(".modalY").css("display","block");
   // window.location.href = "profile.html";
   
   
        });
    
    });
