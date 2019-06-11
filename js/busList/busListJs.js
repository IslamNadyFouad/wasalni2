$( document ).ready(function() {
 var arrOfSeats="";
 var numOfBookingSeats=0;
 var mybusid="",mynumofseat="",myuserid="",myda="";
 var appear=0;
/* mybusid=$("#tBusId").text();
     mynumofseat=seatFormat(arrOfSeats);
     myuserid=$("#tUserId").text();
     myda=$("#tdate").text();*/
 
 
       var parameters = location.search.substring(1).split("&");
	     	var temp = parameters[0].split("=");
		     x = unescape(temp[1]);
       var temp2=parameters[1].split("=");
       y = unescape(temp2[1]);
      
       
       var temp3=parameters[2].split("=");
       z = unescape(temp3[1]);console.log("z="+z);
       var dx=new Date(z);
       var z=dx.getFullYear()+"-"+setDfM(dx.getMonth()+1)+"-"+setDfD(dx.getDate());
       document.getElementById('titleOfDate').innerHTML=z;
       document.getElementById('titleOfDay').innerHTML=getDayNameAr(new Date(z).getDay());
       var temp4=parameters[3].split("=");
        w = unescape(temp4[1]);
         var dw=new Date(w);
       var w=dw.getFullYear()+"-"+setDfM(dw.getMonth()+1)+"-"+setDfD(dw.getDate());
       
       var temp5=parameters[4].split("=");
       v = unescape(temp5[1]);
      /* if(v=="one")
       {$("#returnList").css("visibility","hidden");}*/
       $("#returnList").css("visibility","hidden");
       //console.log(v);
     var da=new Date(z);var currentDay=da.getDay();//return the day 0 1 ...6 //star ,sunday
    console.log("the Day : "+getDayNameEn(currentDay)+" "+currentDay);
    
    showList(x,y, getDayNameAr(currentDay),z);
      
      var s,d;
      var ref = firebase.database().ref().child("BusSchedule");
          ref.once("value", function(snapshot) {
           snapshot.forEach(function(item){
      
            if(item.val().sourceEn==x)
            {
             $("#titleOfSource").text(item.val().source);s=item.val().source;
            }
            
            if(item.val().destinationEn==y)
            {
              $("#titleOfDestination").text(item.val().destination);d=item.val().destination;
            }
       });
          
}, function (error) {
   console.log("Error: " + error.code);
});
 
 //function checkX(doc)
 //{
 // if(doc.data().sourceEn==x)
 //   {
 //    document.getElementById('receive').innerHTML=doc.data().sourceEn;
 //   }
 // 
 //}
 
  $("#returnList").click(function() {
        $(this).css('background-color',"rgba(64,64,64,0.4)");
        $("#goList").css('background-color',"rgba(64,64,64,1)");
         document.getElementById('titleOfDate').innerHTML=w;
          document.getElementById('titleOfDay').innerHTML=getDayNameAr(new Date(w).getDay());
         $("#titleOfSource").text(d);
         $("#titleOfDestination").text(s);
         $('#listOfBuses').empty();
         showList(y,x, getDayNameAr(currentDay));
     });
    
        $("#goList").click(function() {
            $(this).css('background-color',"rgba(64,64,64,0.4)");
            $("#returnList").css('background-color',"rgba(64,64,64,1)");
            
             document.getElementById('titleOfDate').innerHTML=z;
              document.getElementById('titleOfDay').innerHTML=getDayNameAr(new Date(z).getDay());
             $("#titleOfSource").text(s);
             $("#titleOfDestination").text(d);
             $('#listOfBuses').empty();
             showList(x,y, getDayNameAr(currentDay));
         });
        
        
        
 
 function showList(sourcex,destinationx,day,mydate)
 {
     var ref = firebase.database().ref().child("BusSchedule");
     var i=1;
        ref.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
            if(item.val().sourceEn==sourcex && item.val().destinationEn==destinationx && item.val().day==day)
               {setBus(item,i,mydate);i++;}
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });
 }
    
    function f2time(x)
    {
     if(x<12)
     {
      return"صباحا";
     }
     else
     return "مساء";
     
    }
    
    function f1time(x)
    {
     if(x<12)
     {
      return x;
     }
     else
     return x-12;
     
    }
   function setBus(doc,i,mydate){
     
      // console.log("the "+doc.val().busId);
    //$('#listOfBuses').empty();
       $('#listOfBuses').append("<div class='show-default accordion' id='itm"+i+"'></div>");
       var idd="#itm"+i;
        $(idd).append("<div class='day'><i class='far fa-moon'></i></div>");
        $(idd).append("<div class='date'><span>"+f1time(doc.val().time_for_go)+"</span> <span>"+f2time(doc.val().time_for_go)+"</span></div>");
        $(idd).append("<div class='classType'>"+availableSeat(doc.val().busId)+" مقعد</div>");
        $(idd).append("<div class='divPrice'><span id='price'> "+doc.val().price+"</span> جنيه  </div>");
        $(idd).append("<div class='right'><a href='#' class='button ExitB' id='chooseSeat"+i+"'>اختيار المقاعد</a></div>");
        var chBtn="#chooseSeat"+i;
        $('#listOfBuses').append(" <div class='table1' id='pan"+i+"'></div>");
        var pan="#pan"+i;
        $(pan).append("	<div class='rightPart' id='rightPart"+i+"'></div>");
        var rightPart="#rightPart"+i;
           $(rightPart).append("<div class='tripInfo'>مدة الرحلة 7 ساعات  |  تاريخ الوصول المتوقع 07:15 صباحا</div>");
           $(rightPart).append("<div class='bottomPart' id='bottomPart"+i+"'>");
           var bottomPart="#bottomPart"+i;
               $(bottomPart).append("<div class='seatList'><div class='conatinerOfTable' id='conatinerOfTable"+i+"'> </div></div>");
               var conatinerOfTable="#conatinerOfTable"+i;
               $(conatinerOfTable).empty();
               setTableX(conatinerOfTable,i,doc.val().price,doc.key,mydate);//setTable(conatinerOfTable);
                $(bottomPart).append("<div class='seatInf' id='seatInf"+i+"'></div>");
                var seatInf="#seatInf"+i;
                setTableInFo(seatInf,i,doc.key,mydate);
        $(pan).append("<div class='infoOfBooking' id='infoOfBooking"+i+"'></div>");
        var infoOfBooking="#infoOfBooking"+i;
          $(infoOfBooking).append("<div class='textOfTotalPrice'>اجمالي السعر</div>");
          $(infoOfBooking).append("<div class='textOfTotalPrice' id='totalPrice"+i+"'>0 جنيه</div>");
          var totprice="#totalPrice"+i;
          $(infoOfBooking).append("<div class='bookbtn'><input type='button' id='BookingBtn"+i+"' value='إحجز الآن'></div>");
          var bookBtn="#BookingBtn"+i;
          $(infoOfBooking).append("<div><span class='available'> قمت بتحديد <i class='seat-number' id='numOfSeat"+i+"'>0</i>مقعد</span></div>");
        var nOfSeat="#numOfSeat"+i;
        $(chBtn).click(function(){
             $(totprice).text("0");
             $(nOfSeat).text("0");
          
          if($(pan).css('display')=='none'){
                $(".table1").css("display","none");$(".ExitB").html("اختيار المقاعد");
                $(pan).css("display","block");$(chBtn).html("X اغلاق");
                numOfBookingSeats=0;
                arrOfSeats="";
          
                $(conatinerOfTable).empty();
                setTableX(conatinerOfTable,i,doc.val().price,doc.key,mydate);
                $(seatInf).empty();
                setTableInFo(seatInf,i,doc.key,mydate);
                $(totprice).text("0");
          }else{
           $(pan).css("display","none");$(chBtn).html("اختيار المقاعد");
           numOfBookingSeats=0;
           arrOfSeats="";
           $(conatinerOfTable).empty();
           $(seatInf).empty();
           $(totprice).empty();
          }
          
          
         });
        
        $(bookBtn).click(function(){
         
            $(pan).css("display","none");$(chBtn).html("اختيار المقاعد");
            
           var user = firebase.auth().currentUser;

           if (user) {
            //var userId = firebase.auth().currentUser.uid;
            $("#tUserId").text(firebase.auth().currentUser.uid);
             $(".modalY").css("display","block");
             
           } else {
                         if(v=="one")
                         $(".modalZ").css("display","block");
                         else
                         {
                                      if(appear==0)
                                      {
                                       $(".modalZ").css("display","block");appear=1;
                                      }
                                      else
                                      $(".modalY").css("display","block");
                         }
            //$("#btnLogin").css("display","none");
            
           }
           
           $("#ts").text(doc.val().source);
             $("#td").text(doc.val().destination);
             $("#tdate").text(mydate);
             $("#t2time").text(f1time(doc.val().time_for_go)+" "+f2time(doc.val().time_for_go));
             $("#ttime").text(doc.val().time_for_go);
             $("#tBusId").text(doc.key);
            
             $("#tcount").text(numOfBookingSeats);
         });
    } 
    
    
    function setTableInFo(seatInf,i,busid,mydate)
    {
     
     $(seatInf).append("<table id='table"+i+"'></table>");
       var table="#table"+i;
        $(table).append("<tr><td class='seatFixed'>مقعد غير متوفر<td><td>	<img src='images/booked.png' width='20px' height='20px'></td></tr>");
        $(table).append("<tr><td class='seatFixed'>مقعد متوفر<td><td>	<img src='images/free.png' width='20px' height='20px'></td></tr>");
        $(table).append("<tr><td class='seatFixed'>المقعد المحدد<td><td>	<img src='images/selected.png' width='20px' height='20px'></td></tr>");
        $(table).append("<tr><td class='seatFixed'>المقاعد المتوفرة<td><td id='bookedS"+i+"'>	49</td></tr>");
       bookedSeatValue(busid,"#bookedS"+i,mydate);
    }
    function bookedSeatValue(busid,id,mydate)
    {
     var ref = firebase.database().ref().child("Booking");
     ref.once("value", function(snapshot) {
      var b=0;
             snapshot.forEach(function(item){
              if(item.val().busId==busid && item.val().date == mydate)
              {
               var V2=item.val().numberOfSeats;
               var V1=V2.split("-");
                 b+=V1.length;
              }
               
             });
      $(id).text(49-b);
      });
     
    }
    /*****************************************/
    function seatEvent(idSeat,i,pr)
    {
     var idnumSeat="#numOfSeat"+i;
                       var idtotprice="#totalPrice"+i;
     //console.log("pr------->"+pr);
        $(idSeat).click(function(){
                   if ( $(this).children("img").attr('src') == 'images/free.png' ) {
                       $(this).children("img").attr("src", "images/selected.png");
                       //arrSeats[numOfBookingSeats]=$(this).children("span").text();
                       arrOfSeats+=$(this).children("span").text()+"-";
                       numOfBookingSeats++;
                       
                       $(idnumSeat).text(numOfBookingSeats);
                       //console.log("pr====="+pr);
                       $(idtotprice).text(numOfBookingSeats*pr);
                       //arrSeats[0]=i+1;totalPrice
                    } else {
                     $(this).children("img").attr("src", "images/free.png");
                     numOfBookingSeats--;
                     $(idnumSeat).text(numOfBookingSeats);
                     $(idtotprice).text(numOfBookingSeats*15);
                     arrOfSeats=deleteSeats($(this).children("span").text(),arrOfSeats);
                     //arrSeats[numOfBookingSeats]=$(this).children("span").text();
                     }
        });
    }
    function deleteSeats(xseat,aseat)
    {
     	var tem = aseat.split("-");
      var nseat="";
     for(var k=0;k<tem.length;k++)
     {
      //console.log("tem ["+k+"]="+tem[k]+"      ======="+xseat);
      if(xseat!=tem[k])
      {
       nseat+=tem[k]+"-";
      }
     }
    // console.log("nseat-->"+seatFormat(nseat));
     return nseat;
    }
    function setSeat(idRow,k,i,j,N,pric,busid,mydate)
    {
     //console.log("busid------->"+busid);
     var ref = firebase.database().ref().child("Booking");
     ref.once("value", function(snapshot) {
      var isb=false;
             snapshot.forEach(function(item){
              //console.log("busid------->"+mydate+"  ---> bookBusId="+item.val().date);
              if(item.val().busId==busid && item.val().date== mydate)
              {//console.log("busid------->"+busid);
               var V2=item.val().numberOfSeats;
               var V1=V2.split("-");
                 for(var kk=0;kk<V1.length;kk++)
                      {
                          if(V1[kk]==N)
                          {
                              isb=true;
                             
                          }
                      }
              }
               
             });
             
     if(isb==true)
     {
      $(idRow).append("<td class='colOfSeat'><img src='images/booked.png' class='seatImg2'><span class='seatNum'>"+N+"</span></td>");
     }
     else{
       $(idRow).append("<td class='colOfSeat' id='seat"+(k+"_"+i+"_"+j)+"'><img src='images/free.png' class='seatImg'><span class='seatNum'>"+N+"</span></td>");
       idSeat="#seat"+k+"_"+i+"_"+j;
       seatEvent(idSeat,k,pric);
       }
      });
     
     
     
     
     
     
     
     
     
     
     //console.log(isBooked(N));
     /*if(isBooked(N)==true)
     {
      $(idRow).append("<td class='colOfSeat'><img src='images/booked.png' class='seatImg2'><span class='seatNum'>"+N+"</span></td>");
     }
     else{
       $(idRow).append("<td class='colOfSeat' id='seat"+(k+"_"+i+"_"+j)+"'><img src='images/free.png' class='seatImg'><span class='seatNum'>"+N+"</span></td>");
       idSeat="#seat"+k+"_"+i+"_"+j;
       seatEvent(idSeat);}*/
       //isBooked(N);
    }
    function isBooked(n)
    {
     var isb=false;
     var ref = firebase.database().ref().child("Booking");
     ref.once("value", function(snapshot) {
          var isb2=false;
             snapshot.forEach(function(item){
               var V2=item.val().numberOfSeats;
               var V1=V2.split("-");
                 for(var kk=0;kk<V1.length;kk++)
                      {
                          if(V1[kk]==n)
                          {//console.log(V1[kk]+"  <-> "+n);
                              isb2=true;//console.log("isb -->"+isb);
                          }
                      }
             });
             console.log("yyyyyyyyy="+isb2);
             isb=isb2;
      });
     console.log("xxxxxx="+isb);
     return isb;
    }
    
    function setTableX(conatinerOfTable,k,pric,busid,mydate)
    {
     $(conatinerOfTable).append("<table id='tbl"+k+"'></table>");
     //$('#listOfBuses').append("<div class='show-default accordion' id='itm"+i+"'></div>");
       var idTable="#tbl"+k,idRow="";
       var N=1;
        for (i = 1; i < 6; i++) {
                $(idTable).append("<tr id='trw"+(k+"_"+i)+"'></tr>");
                 idRow="#trw"+k+"_"+i;
               for(j = 1; j < 14; j++){
                 
                  if(i==1 || i==2)
                {
                    if(j==6 || j==7)
                    {  $(idRow).append("<td class='colOfSeat'></td>");}
                    else
                    { setSeat(idRow,k,i,j,N,pric,busid,mydate);N++;}
                }
                else if(i==3)
                {
                    if(j !=13)
                    {$(idRow).append("<td class='colOfSeat'></td>");}
                    else
                    {setSeat(idRow,k,i,j,N,pric,busid,mydate);N++;}
                }
                else
                {setSeat(idRow,k,i,j,N,pric,busid,mydate);N++;}
              }
          }
    }
    
    function getDayNameAr(dayNum){
     var dayAr = ["الأحد", "الاثنين", "الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
     return dayAr[dayNum];
    }
    function getDayNameEn(dayNum){
     var dayAr = ["sunday", "monday", "tuesday","wednesday","thursday","friday","starday"];
     return dayAr[dayNum];
    }
    
    function availableSeat(busn)
    {
     var ref = firebase.database().ref().child("DailyBooking");
     var sum=0;
       ref.once("value", function(snapshot) {
          snapshot.forEach(function(item){
           if(item.val().busId==busn)
           {
           console.log(item.val().seats.length);
           sum+=item.val().seats.length;
           console.log("-->"+sum);
           }
          });
   
       }, function (error) {
       console.log("Error: " + error.code);
       });
    console.log("ali "+sum);
   return 49-sum;
    }
 
 
 $("#confirmBtn").click(function(){
  //var userId = firebase.auth().currentUser.uid;
  
   
    
   
    $(".modalY").css("display","none");
    
    if(v=="one")
    {
     //alert("يمكنك الدفع اون لاين بواسطة رقم الحجز "+12);
    var newSeatKey = firebase.database().ref().child('Booking').push();
    newSeatKey.set({
    busId: $("#tBusId").text(),
    numberOfSeats: seatFormat(arrOfSeats),
    userId: $("#tUserId").text(),
    date:$("#tdate").text(),
    monthlyId:"daily",
     });
    $("#bookid1").text(newSeatKey.key);
    $(".modali").css("display","block");
    }
    else
    {
     /* var discount = firebase.database().ref().child('Discount').push();
    discount.set({
    bookId:newSeatKey.key,
    percentage: "5%",
    state: "unpaid",
     });*/
     mybusid=$("#tBusId").text();
     mynumofseat=seatFormat(arrOfSeats);
     myuserid=$("#tUserId").text();
     myda=$("#tdate").text();
     
     $("#returnList").css("visibility","visible");
     $("#goList").css('visibility',"hidden");
     document.getElementById('titleOfDate').innerHTML=w;
     document.getElementById('titleOfDay').innerHTML=getDayNameAr(new Date(w).getDay());
         $("#titleOfSource").text(d);
         $("#titleOfDestination").text(s);
         $('#listOfBuses').empty();
         showList(y,x, getDayNameAr(currentDay),w);
         $("#confirmBtn").css("display","none");
          $("#confirmBtn2").css("display","block");
    }
  });
 
 
 
  $("#confirmBtn2").click(function(){
  //var userId = firebase.auth().currentUser.uid;
  
  var newSeatKey2 = firebase.database().ref().child('Booking').push();
    newSeatKey2.set({
    busId: mybusid,
    numberOfSeats:mynumofseat,
    userId: myuserid,
    date:myda,
    monthlyId:"daily",
     });
    var discount2 = firebase.database().ref().child('Discount').push();
    discount2.set({
    bookId:newSeatKey2.key,
    percentage: "5%",
    state: "unpaid",
     });
  
    var newSeatKey = firebase.database().ref().child('Booking').push();
    newSeatKey.set({
    busId: $("#tBusId").text(),
    numberOfSeats: seatFormat(arrOfSeats),
    userId: $("#tUserId").text(),
    date:$("#tdate").text(),
    monthlyId:"daily",
     });
    
    var discount = firebase.database().ref().child('Discount').push();
    discount.set({
    bookId:newSeatKey.key,
    percentage: "5%",
    state: "unpaid",
     });
   appear=0;
   if(navigator.onLine){
 
        $("#bookid1").text(newSeatKey2.key);
        $("#bookid2").text(newSeatKey.key);
        $(".modali").css("display","block");
         $(".modalY").css("display","none");
    
        $("#returnList").css("visibility","hidden");
          $("#goList").css('visibility',"visible");
          document.getElementById('titleOfDate').innerHTML=z;
          document.getElementById('titleOfDay').innerHTML=getDayNameAr(new Date(z).getDay());
         $("#titleOfSource").text(s);
         $("#titleOfDestination").text(d);
         $('#listOfBuses').empty();
         showList(x,y, getDayNameAr(currentDay),z);
         $("#confirmBtn").css("display","block");
          $("#confirmBtn2").css("display","none");
          
 } else {
  alert('connection error');
 }
    
  });
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
 function seatFormat(ss)
 {
   var newSeat="";
  for(var h=0;h<ss.length-1;h+=1)
  {
   if(ss[h]=="-" && ss[h+1]=="-")
      {
      }
      else
      {
       newSeat+=ss[h];
      }
  }
  //console.log("newSeat-->"+newSeat);
  return newSeat;
 }
 
 });