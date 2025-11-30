//welcome msg on load doc
window.addEventListener("DOMContentLoaded",function()
{
  alert("Welcome to XCalendar - Celebrate each step toward your goal!\n\nClick the 'Set Start Date' button to begin your journey, then choose a future date to set your goal.");
})

// STEP 1: Initialize current date
let today=new Date();
let month=today.getMonth();//here indexes are returned 
let year=today.getFullYear();

// STEP 2: Select DOM elements
const dateList=document.getElementsByClassName("dates")[0];//ul of dates
const currMonthDisplay=document.getElementsByClassName("current")[0];//at top
const navigation=document.getElementsByClassName("navigation");
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

// STEP 3: Render calendar for current month
async function renderCalendar()
{ 
const startDateStr=localStorage.getItem("startDate");
const startDate=startDateStr?new Date(startDateStr):null; 

const goalDateStr = localStorage.getItem("goalDate");//returns the stpred selcted goal date structure
const goalDate = goalDateStr ? new Date(goalDateStr) : null; //if nothing is present in local storrage ten return null else return the date 

let crossedCount=0;
//days we will use for loops iteration
const firstWeekday=new Date(year,month,1).getDay();//1 tarik of displayed month ko konsa day hoga uska index no ; index no of day , What it does: Finds out which day of the week the month starts on.Example: If September 1st is a Sunday, getDay() returns 0. If it’s a Thursday, it returns 4.Why it matters: You need this to know how many empty or “previous month” boxes to show before the 1st.
const totalDays=new Date(year,month+1,0).getDate();//displayed month s next month ke pehle tarik se ek date pehle ,date of last day , What it does: Calculates how many days are in the current month.How it works: month + 1 moves to the next month, and 0 as the day means “go back one day,” which lands you on the last day of the current month.Example: For September, this gives you 30.
const lastWeekday=new Date(year,month,totalDays).getDay();//index no of last day of displayed month , What it does: Finds out the day of the week the month ends on.Example: If September 30th is a Monday, this returns 1.Why it matters: You’ll use this to decide how many “next month” boxes to show after the last day.
const prevMonthDays=new Date(year,month,0).getDate();//30/31 - displaye dmoth ke pehlo tarik se ek date pehle ,last date of prev month, Gets the number of days in the previous month.How it works: Setting day to 0 means “go back one day from the 1st of this month,” which lands you on the last day of the previous month.Example: If you’re rendering September, this gives you 31 (from August).Why it matters: You’ll use this to fill in the trailing days before the 1st of the current month.

let html=""//list will be added here ; starts with an empty string to build your calendar’s HTML.Why it matters: You’ll keep adding <div> elements to this string for each day, and then inject it into the page.

// STEP 4: Add previous month's trailing days
for(let i=firstWeekday;i>0;i--)//jab tak sun day ni aajata ; If the month starts on a Wednesday (firstWeekday = 3), this loop runs for i = 3, 2, 1.Why: You need to show 3 trailing days from the previous month before the 1st lands on Wednesday.
{
    html+=`<li class="inactive">${prevMonthDays-i+1}</li>`;//Adds a <li> element for each trailing day.Class "inactive": Used to style these days differently (e.g., faded out). ${prevMonthDays - i + 1}: This calculates the correct date from the previous month.
}

// STEP 5: Add current month's days
for(let i=1;i<=totalDays ; i++)
{  let currentDate= new Date(year,month,i);// iterstiong one , Creates a Date object for the day being rendered.
  
  //active only marks the current date, not all dates in the current month.
  const isToday=(currentDate.getDate()===today.getDate() && currentDate.getMonth()===today.getMonth() && currentDate.getFullYear()===today.getFullYear())?"active":"";//compare curr iterating date and  even though month was calculated earlier (probably as const month = new Date().getMonth()), we still need to compare it to today.getMonth() inside the loop to check:“Is this calendar being rendered for the current month?” Because your calendar might be showing any month — not just the current one. For example:If you're viewing September, but today is October, then month !== today.getMonth()So even if i === today.getDate(), it’s not today in the calendar view
  
  //f1
  let isGoal="";
  if(goalDate)//Checks if a goal date has been set and retrieved from localStorage.Why: If no goal is set, there's no need to compare or apply styling.
  {
    if(currentDate.getFullYear()===goalDate.getFullYear() && currentDate.getMonth()===goalDate.getMonth() && currentDate.getDate()===goalDate.getDate())
    {
      isGoal="goal";//class
    }
  }

  //f2 Store the date when the goal is set (let’s call it startDate)Compare each calendar day to startDate and today's dateMark days as "crossed" only if they fall between startDate and today 
  let isCrossed="";

  const now=new Date();//today
  now.setHours(0,0,0,0);

  const currentDateMidnight=new Date(currentDate);//iterating one
  currentDateMidnight.setHours(0,0,0,0);

  if(goalDate && startDate && currentDateMidnight>=startDate && currentDateMidnight<goalDate &&currentDateMidnight<now)//if goal is setted , so in b/w the start date and today  and less than gaol date mark the  days
   {
     isCrossed="crossed";
  }

  //html for that 

  html+=`<li class="${isToday} ${isGoal} ${isCrossed}" data-date="${i}">${i}</li>`;
}

// STEP 6: Add next month's leading days
for(let i=lastWeekday;i<6;i++)//till saturday ; the last day of the month is Thursday (lastWeekday = 4), the loop runs for:i = 4 → 1i = 5 → 2
{
    html+=`<li class="inactive">${i-lastWeekday+1}</li>`;
}

// STEP 7: Update DOM
currMonthDisplay.innerText=`${months[month]} ${year}`;
dateList.innerHTML=html;//
/*const html = `
  <li>1</li>
  <li>2</li>
  <li>3</li>
`;* visualization of html
*/

addDayClickListeners();//Attaches click event listeners to each day element (likely <li>s) so users can interact with them.
progressDisplay(goalDate,startDate);
await genMotvQuote();
}

function progressDisplay(goalDate,startDate)
{  let todayMidnight=new Date();
   todayMidnight.setHours(0,0,0,0);

  let progressDisplay=document.getElementById("progress-counter");
  if(goalDate && startDate)
{
  let totalCount=0;
  let crossedCount=0;

  totalCount=Math.floor((goalDate-startDate)/(1000 * 60 * 60 * 24));
  crossedCount=Math.floor((todayMidnight-startDate)/(1000 * 60 * 60 * 24));

  if(crossedCount>totalCount)
  {
    crossedCount=totalCount;
  }
  if(crossedCount<0)
  {
    crossedCount=0;
  }

  progressDisplay.innerText = `${crossedCount}/${totalCount} left until your goal`;
}
else
{
  progressDisplay.innerText = "";
}
}


// STEP 8: Handle day selection
function addDayClickListeners()

{ const dates=dateList.querySelectorAll("li:not(.inactive)");//all li except inactive ones ,arr containing li, FROM ul select all li that does not contain inactive calss i.e. they may conatin active , highlight or no class 
  dates.forEach((date)=>date.addEventListener("click",
    function()
    { 
      //check if goal is laready set
      const goalDateStr = localStorage.getItem("goalDate");//returns the stpred selcted goal date structure
      if(goalDateStr)
      {      alert("Goal already set. Use the reset button to change it.");
             return;
      } 
      let selectedStartDate = localStorage.getItem("startDate") ;

      if(selectedStartDate)
      {//selectedDateElement=date;//a li , dates the selectedElement variable to remember which day is currently selected.
         console.log("start date selected");
        let selectedDate=parseInt(date.getAttribute("data-date"));//Extracts the day number from the clicked element’s data-day attribute and stores it as a number.
     
     //F1
      const selectedGoalDate = new Date(year,month,selectedDate);//What it does: Creates a full JavaScript Date object using the current calendar view’s year, month, and the clicked day. Why: This gives you the exact date the user selected, which you’ll store as the goal.
     // Prevent setting goal in the past

      const todayMidnight=new Date();//gets todays date and curr tym
      todayMidnight.setHours(0,0,0,0);//What it does: Resets the time portion of todayMidnight to 00:00:00. Why: This ensures you're comparing just the date, not the time. It avoids false negatives if the selected date is today but the time is earlier.
      
      if(selectedGoalDate<todayMidnight)
      {
        alert("Please select a future date for your goal");
        return;
      }
      alert("Goal date has been set");
      localStorage.setItem("goalDate", selectedGoalDate.toDateString());
      
      renderCalendar();//updated view with marked goal can be seen now 
    }
    else
    {
      alert("Set start date first!");
      return;
    }
  }
  ))
}

// STEP 9: Handle month navigation
const prevIcon=document.getElementById("calendar-prev");
const nextIcon=document.getElementById("calendar-next");

[prevIcon,nextIcon].forEach(icon=>
{
  icon.addEventListener("click",
    function()
    { 
      month=(icon.id=="calendar-prev")?month-1:month+1;
      /*Creates a new Date object using the current year and the out-of-bounds month.JavaScript’s Date constructor automatically corrects invalid months:new Date(2025, -1, 1) → December 2024new Date(2025, 12, 1) → January 2026*/
      if(month<0 || month>11)
      {
        const newDate=new Date(year,month,1); // new Date(2025, -1, 1)
        year = newDate.getFullYear();             // → 2024
        month = newDate.getMonth();               // → 11 (December)
      }
       
      renderCalendar();//his calls your custom function to redraw the calendar UI based on the updated month and year.It likely regenerates the grid, updates day labels, and applies any visual styles.
    }
    )
}
)
// STEP 10: Initial render
renderCalendar();

//f5
//change-start-date-button
document.getElementById("set-start-date").addEventListener
( "click",
  function()
  {
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  let input = prompt("Enter new start date (YYYY-MM-DD):");
  if(input)
  {  //check valid 
    const isValid=/^\d{4}-\d{2}-\d{2}$/.test(input);
    if(!isValid)
    {
      alert("Please enter the date in YYYY-MM-DD format.");
      return;
    } 

    let inputDate=new Date(input);
    inputDate.setHours(0,0,0,0);
    if(inputDate<=todayMidnight)
{  localStorage.setItem("startDate", inputDate.toDateString());

  alert("Start date updated! Now choose a goal date");
  renderCalendar(); // Refresh calendar
}
else
{
  alert("Choose a past or current date!");
}
  }
  else
  { 
    alert("Please enter a date in YYYY-MM-DD format.");
    return;
  }
}
);

//f4
document.getElementById("reset-goal-date").addEventListener
(
  "click",
  function()
  {
    localStorage.removeItem("startDate");
    localStorage.removeItem("goalDate");
    
  alert("Goal and start date have been reset! , To again select a goal click on a future date.");
  renderCalendar(); // Refresh 
  }
)

async function genMotvQuote() {
  try {
    // Fetch from backend
    let response = await fetch("/randomVerse");

    // Parse JSON body
    let data = await response.json();

    // Log for debugging
    console.log(data);

    // Update DOM
    let result = document.getElementById("motivation");
    result.innerText = `"${data.text}"`; // now works correctly
  } catch (error) {
    console.error("Error fetching verse:", error);
  }
}



