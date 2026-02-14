const hamburger = document.querySelector('.header_hamburger');

const header = document.querySelector('.header');

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle('open');
    header.classList.toggle('active');

});





// time

function abso(a){
  return a - Math.floor(a);
}

function ten(x){
    if((x/10)<1){
        return "0" + x;
    }
    return x;
}

const dy= document.getElementById("y");
const dm= document.getElementById("m");
const dw= document.getElementById("w");
const d= document.getElementById("d");
const dhr= document.getElementById("hr");
const dmin= document.getElementById("min");
const dsec= document.getElementById("sec");


function getCurrentTime(){
    // 1. Set your anniversary date (Month/Day/Year)
    const date = new Date("2/11/2025 00:00:00"); 
    const ms = Date.now() - date.getTime();

// 2. Calculate time components
const totalSeconds = Math.floor(ms / 1000);
const sec = totalSeconds % 60;
const totalMinutes = Math.floor(totalSeconds / 60);
const min = totalMinutes % 60;
const totalHours = Math.floor(totalMinutes / 60);
const hr = totalHours % 24;

    // 3. Display time in HTML
    dhr.innerText = ten(hr);
    dmin.innerText = ten(min);
    dsec.innerText = ten(sec);

    let cDate = new Date();
    let cMonth = cDate.getMonth() + 1; // Current month (1-12)
    let cYear = cDate.getFullYear();
    
    // ADJUSTED: Using cMonth directly to prevent extra month count
    let timeC = dateRange(2025, 2, cYear, cMonth);

    // 4. Calculate Years and Months
    // Subtract 1 from length because dateRange includes the start month
    let actualMonths = timeC.length - 1;
    let countYear = Math.floor(actualMonths / 12);
    let countMonth = (actualMonths % 12);

    // 5. FIXED WEEK & DAY LOGIC
    // Calculate days remaining in the CURRENT month specifically
    let startDay = 11;
    let currentDay = cDate.getDate();
    let daysDiff;

    if (currentDay >= startDay) {
        daysDiff = currentDay - startDay;
    } else {
        // Handle cases where current day is earlier in the month than the 11th
        let prevMonthDays = new Date(cYear, cMonth - 1, 0).getDate();
        daysDiff = prevMonthDays - startDay + currentDay;
    }

    let countWeek = Math.floor(daysDiff / 7);
    let countDays = daysDiff % 7;

    // 6. Formatting leading zeros
    dy.innerText = countYear < 10 ? "0" + countYear : countYear;
    dm.innerText = countMonth < 10 ? "0" + countMonth : countMonth;
    dw.innerText = countWeek < 10 ? "0" + countWeek : countWeek;
    d.innerText = countDays < 10 ? "0" + countDays : countDays;
}
function dateRange(startYear,startM, endYear,endM) {
   
    var dates      = [];
  
    for(var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(endM) - 1;
      var startMon = i === startYear ? parseInt(startM)-1 : 0;
      for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        var month = j+1;
        
        dates.push([i,month]);
      }
    }
    return dates;
  }

 function getNdays(month,year) {
    return new Date(year, month, 0).getDate();
 };

window.setInterval(getCurrentTime,1000);


// scroll

const scroll = document.querySelector(".scroll");

window.addEventListener('scroll',function(){
    const h = document.documentElement.clientHeight *0.5;
   if(window.scrollY > h){
    scroll.classList.remove('inactive-scroll');
       scroll.classList.add('active-scroll');
   }else{
        scroll.classList.remove('active-scroll');
        scroll.classList.add('inactive-scroll');
    
   }
   
})

// spinner

const spinner = document.querySelector('.spinning')
const spinBtn = document.querySelector('.spin-con button')


spinBtn.addEventListener('click',spinWheel)
let  deg = 0;
let newDeg= null;
let prize ;
function spinWheel(){
  let rotateDeg = deg +( (Math.random() * 1000) + 3333) ;
  console.log(rotateDeg)
  let pureDeg = rotateDeg%360;
 
  pureDeg = changeDeg(pureDeg,rotateDeg);
  
  checkDeg(pureDeg);
 if(newDeg) rotateDeg = newDeg;
 console.log(rotateDeg)
  console.log(prize)
  spinBtn.removeEventListener('click',spinWheel)
  spinner.style.transform = `rotate(${rotateDeg}deg)`;
deg = rotateDeg;
newDeg = null;
  setTimeout(function(){
    let winner = document.querySelector(`.spin-con_content:nth-of-type(${prize})`)
    let infoSpin = document.querySelector('.spin-info')
    winner.classList.add('won');
    let wItem = winner.children[0].innerText;
    if(wItem.length<6)wItem = 'a ' + wItem;
    infoSpin.innerText=`Congrats kub dek, you will get ${wItem}!`
    // spinBtn.addEventListener('click',spinWheel)
  },5000)
}


function changeDeg(deg,rotateD){
  let degArr = [20.5,69.5,114,159,203,249,293,339.5];
  for (i=0;i<degArr.length;i++){
    if(deg>degArr[i] && deg<(degArr[i]+3)){
      newDeg = rotateD + 8;
      return deg + 8;
    }
    if(deg<degArr[i] && deg>(degArr[i]-3)){
      newDeg = rotateD - 8;
      return deg - 8;
    } 

  }
  return deg;
}

function checkDeg(deg){
   // 20.5,69.5,114,159,203,249,293,339.5
  if(deg>20.5 && deg<69.5){
    prize = '8';
  }else if(deg>69.5 && deg<114){
    prize = '7';
  }else if(deg>114 && deg<159){
    prize = '6';
  }else if(deg>159 && deg<203){
    prize = '5';
  }else if(deg>203 && deg<249){
    prize = '4';
  }else if(deg>249 && deg<293){
    prize = '3';
  }else if(deg>293 && deg<339.5){
    prize = '2';
  }else {
    prize = '1';
  }
}


// gallery zoom

const photosArr = document.querySelectorAll('.gal-box span') ;
const galOv = document.querySelector('.gal-big');
const galOvImg = document.querySelector('.gal-big img');

galOv.addEventListener('click',function(e){
  if(e.target==this){
    galOv.classList.remove('show-galbig');
  }
})

photosArr.forEach((p)=>{
  p.addEventListener('click',function(){
    let src = p.children[0].getAttribute('src');
    galOvImg.setAttribute('src',src)
    galOv.classList.add('show-galbig')
  })
})
function ten(num) {
    return num < 10 ? "0" + num : num;
}
