//selecting button to show add task popup
let btnAddTask=document.getElementById("add-task");

//array where added task will get stored
let taskAdded=JSON.parse(localStorage.getItem("tasks"))||[] ;
let taskDoNow=JSON.parse(localStorage.getItem("toDotasks"))||[];
;
let taskMarkedDone=[];


//let storeAddedTasks = JSON.parse(localStorage.getItem("tasks")) || [];


let taskPriority="";
let taskDifficulty="";

let leftSec=document.getElementById("lisTask");
let rightSec=document.getElementById("nowTaskList");



const taskCount=document.getElementById("totalTask");
const taskDone=document.getElementById("task-done-counter");
const taskProgress=document.getElementById("progress");

//popup and overlay of tassk addition.
const addPopup=document.getElementById("popup");
const addOverlay=document.getElementById("overlay");

const taskTimerOver=document.getElementById("task-timer-div");

const taskTimerPopup=document.getElementById("timer-popup");

const timerDisplay=document.getElementById("timer-display");



function showAddPopup(){
    addPopup.style.display="block";
    addOverlay.style.display="block";
}

function closeAddPopup(){
    addPopup.style.display="none";
    addOverlay.style.display="none";
}

function addTask(){

    //getting input data
    let taskName=document.getElementById("taskInput");
    let taskStart=document.getElementById("start-date");
    let taskEnd=document.getElementById("end-date");

    let taskP=document.getElementById("taskProgress");
    let taskDiff=document.getElementById("taskDifficulty");
    

    //adding to objects
    const taskObj={
        task_name:taskName.value,
        task_start:taskStart.value,
        task_end:taskEnd.value,
        task_pro:taskP.value,
        task_diff:taskDiff.value
    }
    

    //pushing into array
    taskAdded.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(taskAdded));


    taskCount.innerHTML=`Task : ${taskAdded.length}`

    //console.log(taskAdded);

    //clearing inputs
    taskName.value="";
    taskStart.value="";
    taskEnd.value="";


    //a dynamic div creation
    taskAdded.forEach(taskObj=>{
      
    const taskList=document.getElementById("listTask");


    const task_div=document.createElement("div");
    task_div.className="task-div";

   taskList.innerHTML = ""

    task_div.innerHTML=`
      <div class="taskobjheader">
            <h3>${taskObj.task_name}</h3>
            <p><span> From :</span>${taskObj.task_start}</p>
            
        </div>
        
        
        <p class="task-drop">${taskObj.task_diff}</p>
        
        
        <p><span> To :</span> ${taskObj.task_end}
        <button class="to-do-now"  >Move To Do</button></p> 
    
    `

    taskList.appendChild(task_div);

    const moveBtn=task_div.querySelector(".to-do-now");
    
    moveBtn.addEventListener("click",()=>{
        taskDoNow.push(taskObj);
        taskProgress.innerHTML=`Progress : ${taskDoNow.length}`

        localStorage.setItem("toDotasks",JSON.stringify(taskDoNow));
        //console.log(taskDoNow)

        const now_task_list=document.getElementById("nowTaskList");

        const taskToDo=document.createElement("div")
        taskToDo.className="do-now";
        taskToDo.innerHTML=`<p><span>Task:</span> ${taskObj.task_name}</p>
            <button class="set-timer">Set Timer</button>
            <button class="task-done">Mark done</button>`;

        now_task_list.appendChild(taskToDo);

        task_div.remove();

        const markDonebtn=taskToDo.querySelector(".task-done");
        markDonebtn.addEventListener("click",()=>{
            taskMarkedDone.push(taskObj);
            taskDone.innerHTML=`Done : ${taskMarkedDone.length}`

            markDonebtn.innerHTML="done"

            markDonebtn.disabled=true;
            markDonebtn.style.backgroundColor="red";
            markDonebtn.style.color="white";

         })

        let setTimer=taskToDo.querySelector(".set-timer");
        setTimer.addEventListener("click",()=>{

            taskTimerOver.style.display="block";
            taskTimerPopup.style.display="block";
        })
})
    
    })
    
    /*
    task_div.setAttribute("draggable", true);

    task_div.addEventListener("dragstart",(e)=>{
      let select=e.target;

      rightSec.addEventListener("dragover",(e)=>{
        e.preventDefault();
      })

      rightSec.addEventListener("drop",(e)=>{
        rightSec.appendChild(task_div);
         e.preventDefault();
         
        select=null;
      })
    })
      */

    

    addPopup.style.display="none";
    addOverlay.style.display="none";


    


const timerDisplay=document.getElementById("timer-display");

}



const summaryDiv=document.getElementById("summary-details");
function addSummary(taskObj){

  const summary_details_div=document.createElement("div");
  summary_details_div.className="summary-task"
  summary_details_div.innerHTML=`
            <h4>${taskObj.task_name}</h4>
            <p>Start: ${taskObj.task_start }</p>
            <p>End: ${taskObj.task_end }</p>
            <div class="completed"> <button>${completeTime}</button></div>
            `
            summaryDiv.appendChild(summary_details_div);



  
}








let hrs = 0, min = 0, sec = 0;
let timer = null;

let completeTime=null;

function setTime() {
  let hours=document.getElementById("timer-hours").value;
  let minutes=document.getElementById("timer-minutes").value;
  let seconds=document.getElementById("timer-seconds").value ;

  hrs=parseInt(hours)||0;
  min=parseInt(minutes)||0;
  sec=parseInt(seconds)||0;

  updateDisplay();
}


function updateDisplay() {

    timerDisplay.innerText =hrs + ":" + min + ":" + sec;
    completeTime=hrs + ":" + min + ":" + sec;
}


function run() {
  if (sec > 0) {
    sec--;
  } else if (min > 0) {
    min--;
    sec = 59;
  } else if (hrs > 0) {
    hrs--;
    min = 59;
    sec = 59;
  } else {
   clearInterval(timer)
    alert("Time’s up!");
  }
  updateDisplay();
}


function startTimer() {
  
  timer=setInterval(run, 1000);
}


function pauseTimer() {
  clearInterval(timer);
  
}

function resetTimer(){
    pauseTimer();
    hrs=0;
    min=0;
    sec=0;
    updateDisplay();
}


function closeTimer(){

    taskTimerOver.style.display="none";
    taskTimerPopup.style.display="none";

}






