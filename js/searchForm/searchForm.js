$(document).ready(function() {
    $(".wayGo").click(function() {
        $(this).css('background-color',"#ffcc66");
        $(".wayReturn").css('background-color',"rgba(37, 47, 59,0.4)");
         $("#DateIdVisible").css('visibility',"hidden");
         $("#typeOfTrip").val("one");
     });
    
        $(".wayReturn").click(function() {
            $(this).css('background-color',"#ffcc66");
            $(".wayGo").css('background-color',"rgba(37, 47, 59,0.4)");
             $("#DateIdVisible").css('visibility',"visible");
              $("#typeOfTrip").val("round");
         });
    });