$(document).ready(function() {
    $("#btnRegister1").click(function() {
         if($("#passValue").val()==$("#pass2Value").val())
         {
               auth.createUserWithEmailAndPassword($("#emailValue").val(), $("#passValue").val()).then(() => {
               var userId = firebase.auth().currentUser.uid;
               firebase.database().ref('Users/' + userId).set({
               name: $("#nameValue").val(),
               email: $("#emailValue").val(),
               phone:$("#phoneValue").val(),
               password:$("#passValue").val()
                 }).catch(function(error){ alert("this "+error);});
               
                  }).catch(function(error){ alert("this "+error);});
          
               $(".modalOfRegister").css("display","none");
          
         }
         else
         {
            alert("كلمة السر غير متطابقة");
         }
        
   
        });
    
      /* $("#btnRegister2").click(function() {
   
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
   
        });*/
       
       
    });
