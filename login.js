// validate infomation to the backend
const loginBtn = document.querySelector('#loginBtn');

var x2 = document.getElementById("loginError");

loginBtn.onclick = function() {
    const idInput = document.querySelector('#loginId');
    const passwordInput = document.querySelector('#loginPassword');

    const id = idInput.value;
    const pwd = passwordInput.value;

    idInput.value = "";
    passwordInput.value = "";

    if (id === "" || pwd == "") {
        x2.style.display = "block";
    }

    fetch('http://37.44.247.223:4003/login', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            id: id,
            pwd: pwd
        })
    })
        .then(response => response.json())
        .then(data => validate(data['data'], id, pwd));
};

function validate(data, id, password) {
    if (data.isValid === true) {
        // pass id to the other pages
        var para = new URLSearchParams();
        para.append("id", id);
        para.append("pwd", password);
        location.href = "./loginInfo.html?" + para.toString();
    } else {
        // alert("id or password is not correct, please re-enter.");
        x2.style.display = "block";
    }
}

