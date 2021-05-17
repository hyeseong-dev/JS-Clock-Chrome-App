const form = document.querySelector('.js-form'), // 찾은 것중 가장 첫번째 것을 가져옴 <---> document.querySelectorAll 은 array로 모두 가져옴
    input = document.querySelector("input"),
    greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser',
    SHOWING_CN = 'showing';

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();             // a 태그나 submit 태그는 누르게 되면 href 를 통해 이동하거나 , 창이 새로고침하여 실행됩니다. preventDefault 를 통해 이러한 동작을 막아줄 수 있습니다.
    const currentValue = input.value;
    paintGreeting(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', handleSubmit)
}


function paintGreeting(text) {
    form.classList.remove(SHOWING_CN)
    const currentValue = input.value;
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`
    saveName(currentValue);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        // shie is not
        askForName();
    } else {
        // she is
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();

/*
웹브라우저의 로컬스토리지를 사용하여 간단한 데이터 정보(유저 이름)를 저장 할 수 있다.
*/