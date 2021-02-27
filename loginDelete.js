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

const deleteRegisterBtn = document.querySelector('#deleteRegisterBtn');

deleteRegisterBtn.onclick = function() {
    alert("You sure you want to delete your registration?");
    alert("If you misclick, please refresh this page");
    alert("click OK to get your info deleted from the database");
    alert("Are you really sure you want to do this?");
    alert("Last chance to refresh the page");
    alert("okay, you win");
    alert("or not");
    alert("please refresh the page");
    alert("okay, the entry is deleted now");

    fetch('http://37.44.247.223:4003/delete', {
        method: 'DELETE',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: id,
            password: password,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("update success");
                // location.reload();
            }
        });
    alert("Your information has been deleted successfully!");
    location.href = "./index.html?";
};
