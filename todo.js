const toDoForm = document.querySelector('.js-toDoForm'), // 여기서는 모듈을 사용하지 않아 다른 상수 이름으로 변경함 form -> toDoForm
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = "toDos";

function filterFn(toDo) { // 매개변수는 JSON객체를 지칭
    return toDo.id === 1
}

let toDos = [];
let idNumbers = 1;

function deleteToDo(event) {
    const btn = event.target;
    const li= btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id != parseInt(li.id)
    });
    toDos = cleanToDos
    saveToDos();
}


function saveToDos() { // localStorage에 toDos내용들을 저장함.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers++;
    
    delBtn.innerText = "❌";
    delBtn.addEventListener('click', deleteToDo)
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;              //li 태그의 속성인 id는 html태그의 li태그의 id속성에 대응됨.
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
