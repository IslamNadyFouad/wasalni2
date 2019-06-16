$(document).ready(function() {
    $("#btnLogin").click(function() {
               if($("#userNmaeValue").val()=="admin")
               {
                  if($("#passwordLoginValue").val()=="admin")
                  {
                      window.location.href = "controlSystem/admin/index.html";
                  }
               }
               else if ($("#userNmaeValue").val()=="manager")
               {
                  if($("#passwordLoginValue").val()=="manager")
                  {
                      window.location.href = "controlSystem/manager/index.html";
                  }
               }
               else
               {
                     auth.signInWithEmailAndPassword($("#userNmaeValue").val(), $("#passwordLoginValue").val()).then(function(){
                        $(".modalX").css("display","none");
                        //window.location.href = "profile.html";
                     }).catch(function(error){ alert("this "+error);});
                 
               }
   });
    
    /*
    $("#btnLogin2").click(function() {
       auth.signInWithEmailAndPassword($("#userNmaeValue").val(), $("#passwordLoginValue").val()).then(function(){
       //window.location.href = "index.html";
        console.log("login");
        $(".modalX").css("display","none");
        $(".modalY").css("display","block");
        //window.location.href = "profile.html";
        }).catch(function(error){ alert("this "+error);});
     });*/
    
    
    });
