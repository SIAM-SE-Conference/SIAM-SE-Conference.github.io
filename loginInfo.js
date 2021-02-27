var para = new URLSearchParams(window.location.search);
var id = para.get("id");
var password = para.get("pwd");

// redirecting btn that need to be included for the three html files
const usrInfoBtn = document.querySelector('#usrInfoBtn');
usrInfoBtn.onclick = function(){
    var para = new URLSearchParams();
    para.append("id", id);
    para.append("pwd", password);
    location.href = "./loginInfo.html?" + para.toString();
};

const usrEditBtn = document.querySelector('#usrEditBtn');
usrEditBtn.onclick = function(){
    var para = new URLSearchParams();
    para.append("id", id);
    para.append("pwd", password);
    location.href = "./loginEdit.html?" + para.toString();
};

const usrDeleteBtn = document.querySelector('#usrDeleteBtn');
usrDeleteBtn.onclick = function(){
    var para = new URLSearchParams();
    para.append("id", id);
    para.append("pwd", password);
    location.href = "./loginDelete.html?" + para.toString();
};


// Validate:
// fetch('http://37.44.247.223:4003/login', {
//     headers: {
//         'Content-type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify({
//         id: id,
//         pwd: password
//     })
// })
//     .then(response => response.json())
//     .then(data => validate(data['data'], id, pwd));

// function validate(data, id, password) {
//     var x2 = document.getElementById("loginError");
//     if (data.isValid === false) {
//         location.href = "./login.html";
//     }
// }

// Yes I know it is not secure to do this! I don't want to spend too much time on this.
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://37.44.247.223:4003/loginSuccess/' + id)
        .then(response => response.json())
        .then(data => loadHTMLEntry(data['data']));
});

function loadHTMLEntry(data) {
    const list = document.querySelector('#allInfo');
    let listHTML = "";
    data.forEach(function({id, firstName, lastName, email, university, title, abstract, notes}){
        listHTML += `<div id="basic_info">`;
        listHTML += `<h3>Basic Information</h3>`;
        listHTML += "<ul>";
        listHTML += `<li><b>Name: </b> ${firstName} ${lastName}</li>`;
        listHTML += `<li><b>Email: </b> ${email}</li>`;
        listHTML += `<li><b>University: </b> ${university}</li>`;
        listHTML += `<li><b>Title: </b> ${title}</li>`;
        listHTML += `<li><b>Abstract: </b> <p>${abstract}</p></li>`;
        listHTML += `<li><b>Notes: </b> <p>${notes}</p></li>`;
        listHTML += "</ul>";
        listHTML += "</div>";
    });
    list.innerHTML = listHTML;
}

