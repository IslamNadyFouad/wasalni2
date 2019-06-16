$( document ).ready(function() {
 
   $("#accountBtn").click(function(){
     $("#btnLogin").css("display","block");
     $("#btnLogin2").css("display","none");
     $("#btnRegister1").css("display","block");
     $("#btnRegister2").css("display","none");
    var user = firebase.auth().currentUser;

        if (user) {
          window.location.href = "profile.html";
        } else {
          $(".modalX").css("display","block");
        }
    });
    
    
     $("#logoutBtn").click(function(){
        firebase.auth().signOut();
        window.location.href = "index.html";
     });
     
     $("#newAccountBtn").click(function(){
      $(".modalX").css("display","none");
      $(".modalOfRegister").css("display","block");
     });
     
     $("#oldAccountBtn").click(function(){
      $(".modalX").css("display","block");
      $(".modalOfRegister").css("display","none");
     });
     
     
     
     $("#monthBtn").click(function(){
         $("#btnLogin").css("display","block");
         $("#btnLogin2").css("display","none");
         $("#btnRegister1").css("display","block");
         $("#btnRegister2").css("display","none");
    
         var user = firebase.auth().currentUser;

        if (user) {
          window.location.href = "MonthlyBooking.html";
        } else {
          $(".modalX").css("display","block");
        }
     });
     
     
    });