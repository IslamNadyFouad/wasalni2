
 $( document ).ready(function() {
   
     $("#dateClick1").click(function(){
        if($("#dateDetails1").css('display')=='none')
        {$("#dateDetails1").css("display","block");}
        else
        {$("#dateDetails1").css("display","none");}
        
        });
    
    
    var da=new Date();
    $("#dateInp1").text(da.getFullYear()+"-"+setDfM(da.getMonth()+1)+"-"+setDfD(da.getDate()));
    $("#thistextDateGo").val(da.getFullYear()+"-"+setDfM(da.getMonth()+1)+"-"+setDfD(da.getDate()));
    var currentDay=da.getDate();
    var currentYear=da.getFullYear();
    var currentMonth=da.getMonth();
    $("#yearId1").text(currentYear);
    /*$("#monthId1").text(currentMonth+1+" ");*/$("#monthId1").text(viewMonth(currentMonth));
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
         $("#yearId1").text(year);
         /*$("#monthId1").text(month+1+" ");*/$("#monthId1").text(viewMonth(month));
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
         $("#yearId1").text(year);
         /*$("#monthId1").text(month+1+" ");*/$("#monthId1").text(viewMonth(month));
     });
     //---------------------------------------------------------------------------
    
     $("#tb1 tr .td").click(function() {
       if($(this).html() < currentDay-1 && month ==currentMonth)
       {}
       else{
         if($(this).html()<10)
          { $("#dateInp1").text(year+"-"+(month+1)+"-0"+$(this).html());
             $("#thistextDateGo").val(year+"-"+(month+1)+"-"+$(this).html());
          }
         else
         { $("#dateInp1").text(year+"-"+(month+1)+"-"+$(this).html());
          $("#thistextDateGo").val(year+"-"+(month+1)+"-"+$(this).html());
         }
         $("#dateDetails1").css("display","none");
       }
     });
      $("#tb1 tr .td").mouseover(function() {
        $(this).css('background-color', '#FFAA33');
         $(this).css('color', '#FFF');
        });
      $("#tb1 tr .td").mouseout(function() {
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
            var cls="#tb1 tr #td",mainClass1;
           for (i = 0; i < 6; i++) {
               //mainClass=cls2+i+" ";
               for(j = 0; j < 7; j++){
                mainClass1=cls+i+j;
                   if(c==lastDay2.getDate()+1){$(mainClass1).text(" ");}
                   else if(i==0){
                       if(fd==j || c!= 1)
                       {$(mainClass1).text(c);c++; }
                       else{$(mainClass1).text(" ");}
                   }
                   else{
                    $(mainClass1).text(c);c++;
                    }
               }
           }
           mainClass1="";
     }//--------------------------------
      function viewMonth(x)
     {
      var  monthString= ["يناير", "فبراير", "مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر"];
      return monthString[x]+" ";
     }
     //$(window).click(function() {
     //  if (!event.target.matches('#dateClick1') && !event.target.matches('.back1') && !event.target.matches('.back2')){
     //    $("#dateDetails1").css("display","none");
     //  }
     //  
     //  });
});