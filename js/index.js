const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34"
];

function bgCol() {
  const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
  const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
  document.body.style = `background:linear-gradient(to right top, ${randomColor1},${randomColor2});`;
}
bgCol();


const hour = document.querySelector('.hour'),
min = document.querySelector('.min'),
sec = document.querySelector('.sec');
let degSec;
let degMin;
let degHour;

function time(){
let today = new Date();
let getSec = today.getSeconds();
let getMin = today.getMinutes();
let getHour = today.getHours();
let getMSec = today.getMilliseconds();

// 초침은 초당 360/60 = 6도 이동 / 분당 360도 이동
// 분침은 분당 360/60 = 6도  이동
// 시침은 분당 30/60 = 0.5도 이동

degSec = getMSec * 0.006; 
degMin = getMin * 6; 
degHour = getMin * 0.5; 

hour.style= `transform:translateX(-50%) rotate(${degHour+(getHour*30)}deg);`;


min.style= `transform: translateX(-50%) rotate(${degMin}deg);`;

sec.style=`transform:translateX(-50%)  rotate(${degSec+(getSec*6)}deg);`;

if(getSec <10){
    getSec = `0${getSec}`;
}
if(getMin <10){
    getMin = `0${getMin}`;
}
if(getHour <10){
    getHour = `0${getHour}`;
}
now.innerHTML = `${getHour}시 ${getMin}분 ${getSec}초`;
}
time();
setInterval(time,1); 



const loginForm = document.querySelector('.greeting');
const loginInput = loginForm.querySelector('input');
const greeting = document.querySelector("#greet");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event){
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY,loginInput.value);
  paintGreetings();
}

function paintGreetings(){
  const username = localStorage.getItem(USERNAME_KEY);
  greeting.innerText = `Hello ${username}!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const saveUsername = localStorage.getItem(USERNAME_KEY);
// console.log(saveUsername);

if(saveUsername === null){
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit",onLoginSubmit);
} else {
    loginForm.classList.add(HIDDEN_CLASSNAME);
  paintGreetings();
}





const API_KEY = "b7d0c5bc7ada2e64748be79d7b952fa6";

function onGeoOk(position){
    const lat =position.coords.latitude;
    const lng =position.coords.longitude;
    console.log("You live in",lat,lng);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const weather = document.querySelector("#weather span:last-child");
        const city = document.querySelector("#weather span:first-child");
        city.innerText = `${data.name} is`;
        weather.innerText = `${data.weather[0].main}!`;
    });
}
function onGeoError(){
    alert("can't find you")
}
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);




const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = todoForm.querySelector("input");

const TODOS_KEY = "todos";
let todos = [];

function saveTodos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(todos));
}

function deleteTodo(event){
    const li = event.target.parentElement;
    li.remove();
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
}

function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button =document.createElement("button");
    button.innerText = "💖";
    button.addEventListener("click",deleteTodo)
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function handleTodoSubmit(event){
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = '';
    const newTodoObj = {
        text:newTodo,
        id: Date.now(),
    }
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

todoForm.addEventListener("submit",handleTodoSubmit);

function sayHello(item){
    console.log("this is tun",item);
}

const savedTodos= localStorage.getItem(TODOS_KEY);
console.log(savedTodos);
if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(paintTodo);
}



