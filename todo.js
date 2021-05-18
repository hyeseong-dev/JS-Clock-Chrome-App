const toDoForm = document.querySelector('.js-toDoForm'), // 여기서는 모듈을 사용하지 않아 다른 상수 이름으로 변경함 form -> toDoForm
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = "toDos";

let toDos = [];
let idNumbers = 1;

function deleteToDo(event) {
    const btn = event.target;
    const li= btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) { // 파이썬의 for i in [1,2,3,4]: 처럼 iterable 객체에서 하나씩 던져주는것과 비슷하게 toDo도 하나씩 받게됨
        return toDo.id != parseInt(li.id)            // li.id는 유저가 직접 삭제 버튼을 클릭한 그 해당 값을 지칭함.
    });                                              // 기준점은 li.id이며 loop를 돌면서 toDo.id가 기준 값과 다르면 참으로 인식하고 이를 cleanToDos에 저장하고 이를 다시 기존 toDos배열에 저장함.
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
