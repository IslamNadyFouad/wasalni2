
///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
$( document ).ready(function() {

 
 var myDat="2019-06-15";
var theIncome=0;
var d=new Date(myDat);
var year=d.getFullYear();
var mon=d.getMonth();
var dy=d.getDate();
var dayWeek=["","السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"];
for(var i=1;i<=7;i++)
{
  md=year+"-"+setDfM(mon+1)+"-"+setDfD(dy);
  console.log("md= "+md);
  dy++;
  //showBooking(md,i);
   showReport(dayWeek[i],md,i);
   $("#showDate"+i).text(md);
}
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
  function showReport(day,mydate,k)
 {
     var ref = firebase.database().ref().child("BusSchedule");
     var i=1;
        ref.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
            if( item.val().day==day)
               {
                 setBusBooking(item,i,mydate,k);
                setBookingList(item,i,mydate,k);i++;
               
               }
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });
 }
 
  function setBookingList(doc,i,mydate,k)
 {
     var ref = firebase.database().ref().child("Booking");
        ref.once("value", function(snapshot) {
        //console.log(snapshot.val());
          snapshot.forEach(function(item){
            if(item.val().busId==doc.key &&  item.val().date==mydate)
               {cal(item,i,mydate,doc,k);}
          });
         }, function (error) {
         console.log("Error: " + error.code);
         });
 }
    function cal(item,i,mydate,doc,k)
    {
     var inc=0;
     var y=item.val().numberOfSeats.split("-");
    // $("").text(y.length*doc.val().price);
     dold="#income"+k+""+i;
     inc=  parseInt($(dold).text());
     $(dold).text(inc+(y.length*doc.val().price));
     console.log("the "+y.length*doc.val().price);
     wold="#wast"+k+""+i;
     $(wold).text((doc.val().seats*doc.val().price)-(inc+(y.length*doc.val().price)));
     
      told="#totalIncome"+k;
     inc=  parseInt($(told).text());
     $(told).text(inc+(y.length*doc.val().price));
    }
    
    function setBusBooking(doc,i,mydate,k){
     if(k==3)
       console.log("the "+doc.val().source);
    //$('#listOfBuses').empty();
    var cafe="#cafe-list"+k;
       $(cafe).append("<li id='item"+k+""+i+"'></li>");
       var idd="#item"+k+""+i;
        
        
        $(idd).append("<span id='source"+k+""+i+"'>"+doc.val().source+"</span>");
        $(idd).append("<span id='des"+k+""+i+"'>"+doc.val().destination+"</span>");
        
        $(idd).append("<span id='time"+k+""+i+"'>"+doc.val().time_for_go+"</span>");
        $(idd).append("<span id='income"+k+""+i+"'>0</span>");
        $(idd).append("<span id='wast"+k+""+i+"'>"+735+"</span>");
      
        
    }
 
 });