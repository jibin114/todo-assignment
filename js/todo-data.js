function getData(statusValue, userValue) {

  statusValue = (statusValue == "null") ? null : (statusValue === "true")


  getJsonData(statusValue,userValue) 

}

function getJsonData(statusValue,userValue) {  //user number and status is given on function call

  var todoBody = document.getElementById("todoBody");
  var toHide = document.getElementById("toHide");
  var table = document.getElementById("table");
  todoBody.innerHTML = '';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {        
        table.style.visibility = "visible";
        toHide.style.visibility = "hidden";
        var data= this.responseText;
        jsonData = JSON.parse(data);

        populate(jsonData,statusValue,userValue,todoBody);
      }
  };
  xhttp.open("GET", "./resources/todos.json", true);
  xhttp.send();
}

// User count is compared to filter the row according to the chosen user(on load, 0 is sent as user)
function populate(info,statusValue,userValue,position) {

  var count=1;

  info.forEach((element) => {

    if(statusValue == null && userValue == 0) { 
      var taskRow = buildTableRow(count,element);   
      count++;

    } else if(element.completed == statusValue &&  (element.userId == userValue || userValue == 0) ){
      var taskRow = buildTableRow(count,element);  
      count++;
    }else if((element.completed == statusValue || statusValue == null) &&  (element.userId == userValue )){
      console.log(i)
      var taskRow = buildTableRow(count,element);  
      count++; 
    } else {  
      return;
    }

    position.innerHTML += taskRow;
  });

}



function buildTableRow(count,element) {

  let checkValue = element.completed ? "checked" : "" ;
  let disableValue = element.completed ? "disabled" : "" ;
  let checkBox = `<input onchange="fiveTasks(this);" ${disableValue} class="form-check-input" type="checkbox" ${checkValue}>`;

  return `<tr> <th scope="row">${count}</th><td>${element.id}</td><td>${element.title}</td><td>${checkBox}</td></tr>` ;  
  //<td>${ele.userId}</td>
}

var completionCount = 0;
var taskSuccessDisplay =  document.getElementById('taskSuccessDisplay');
async function fiveTasks(ele) {

  var fiveDone = new Promise(function(resolve) {
    //if element is checked, increment counter else decrement
    (ele.checked) ? completionCount++ : completionCount-- ; 
    // console.log(`${completionCount}`);
    if(completionCount == 5) {
      completionCount = 0;
      resolve("Congrats. 5 Tasks have been Successfully Completed")
    }
  });
  var res = await fiveDone;
  alertBox(res, 'success', taskSuccessDisplay); //alertbox is defined in script.js
  setTimeout(() => {
    closeAlertBox(taskSuccessDisplay);
  }, 5000);
}
