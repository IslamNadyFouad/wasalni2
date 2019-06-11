
 /************************************************************************************************************/
 
 $( document ).ready(function() {
   
     $("#dateClick2").click(function(){
        if($("#dateDetails2").css('display')=='none')
        {$("#dateDetails2").css("display","block");}
        else
        {$("#dateDetails2").css("display","none");}
        
        });
    
    
    var d=new Date();   $("#dateInp2").text(d.getFullYear()+"-"+setDfM(d.getMonth()+1)+"-"+setDfD(d.getDate()));
                        $("#thistextDateReturn").val(d.getFullYear()+"-"+setDfM(d.getMonth()+1)+"-"+setDfD(d.getDate()));
    var currentDay=d.getDate();
    var currentYear=d.getFullYear();
    var currentMonth=d.getMonth();
    $("#yearId2").text(currentYear);
    $("#monthId2").text(currentMonth+1+" ");
    viewDate(currentDay,currentMonth,currentYear);
    var month=currentMonth,year=currentYear;
    
    function setDfM(x)
    {
     if(x<10)
     {
      return "0"+x;
     }
     return x;
    }
    function setDfD(x)
    {
     if(x<10)
     {
      return "0"+x;
     }
     return x;
    }
    //----------------------------------------
    $(".back2").click(function() {
        
    if(year<2022)
    {
        if(month==11)
        {
            month=0;year++;viewDate(currentDay,month,year);
        }
        else
        {
            month++;viewDate(currentDay,month,year);
        }
    }
         $("#yearId2").text(year);
         $("#monthId2").text(month+1+" ");
     });
   
   $(".back1").click(function() {
        
        if(year>=currentYear && month>=currentMonth+1)
        {
        if(month==0)
        {
            month=11;year--;viewDate(currentDay,month,year);
        }
        else
        {
            month--;viewDate(currentDay,month,year);
        }
        }
         $("#yearId2").text(year);
         $("#monthId2").text(month+1+" ");
     });
     //---------------------------------------------------------------------------
    
     $("#tb2 tr .td").click(function() {
       if($(this).html() < currentDay-1 && month ==currentMonth)
       {}
       else{
         if($(this).html()<10)
          { $("#dateInp2").text(year+"-"+(month+1)+"-0"+$(this).html());
          $("#thistextDateReturn").val(year+"-"+(month+1)+"-"+$(this).html());
          }
         else
         { $("#dateInp2").text(year+"-"+(month+1)+"-"+$(this).html());
         $("#thistextDateReturn").val(year+"-"+(month+1)+"-"+$(this).html());
         }
         $("#dateDetails2").css("display","none");
       }
     });
      $("#tb2 tr .td").mouseover(function() {
        $(this).css('background-color', '#FFAA33');
         $(this).css('color', '#FFF');
        });
      $("#tb2 tr .td").mouseout(function() {
        $(this).css('background-color', '#787878');
         $(this).css('color', '#FFAA33');
        });
     //--------------------------------------------------------------------------
     function viewDate(myDay,myMonth,myYear)
     {
                
       var firstDay = new Date(myYear,myMonth, 1);
       var lastDay2 = new Date(myYear, myMonth + 1, 0);
       var fd=firstDay.getDay();
            

            var i,j,c=1;
            var cls="#td",mainClass;
           for (i = 0; i < 6; i++) {
               //mainClass=cls2+i+" ";
               for(j = 0; j < 7; j++){
                mainClass=cls+i+j;
                   if(c==lastDay2.getDate()+1){$(mainClass).text(" ");}
                   else if(i==0){
                       if(fd==j || c!= 1)
                       {$(mainClass).text(c);c++; }
                       else{$(mainClass).text(" ");}
                   }
                   else{
                    $(mainClass).text(c);c++;
                    }
               }
           }
           mainClass="";
     }//--------------------------------
     
     //$(window).click(function() {
     //  if (!event.target.matches('#dateClick2')){
     //    $("#dateDetails2").css("display","none");
     //  }
     //  });
});