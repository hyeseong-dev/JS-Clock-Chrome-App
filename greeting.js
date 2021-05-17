const form = document.querySelector('.js-form'), // 찾은 것중 가장 첫번째 것을 가져옴 <---> document.querySelectorAll 은 array로 모두 가져옴
    input = document.querySelector("input"),
    greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser',
    SHOWING_CN = 'showing';

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN)
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        // shie is not
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