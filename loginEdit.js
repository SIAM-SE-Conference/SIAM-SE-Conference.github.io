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
        .then(data => writeDefaultInInput(data['data']));
});

function writeDefaultInInput(data) {
    const list = document.querySelector('#editInfo');
    let listHTML = "";
    listHTML += `        <div class="w3-container w3-card-4">
            <br>
            <form class="w3-container w3-border w3-card-4">`;
    data.forEach(function({id, firstName, lastName, email, university, title, abstract, notes}){
        listHTML += `<label>First Name</label>
                <p><input id="firstName" class="w3-input w3-hover-light-grey" value="${firstName}"></p>`;
        listHTML += `<label>Last Name</label>
                <p><input id="lastName" class="w3-input w3-hover-light-grey" value="${lastName}"></p>`;
        listHTML += `<label>Email</label>
                <p><input id="email" class="w3-input w3-hover-light-grey" value="${email}"></p>`;
        listHTML += `<p<label>University</label><input id="university" class="w3-input w3-hover-light-grey" value="${university}"></p>`;
        listHTML += `<label>Title of the presentation.</label>
                    <p><input id="title" class="w3-input w3-hover-light-grey" value="${title}"></p>`;
        listHTML += `<label>Abstract of the presentation.</label>
                    <p><textarea id="abstract" rows="4" cols="50">${abstract}</textarea></p>`;
        listHTML += `<label>Additional Notes.</label>
                <p><textarea id="notes" rows="4" cols="50" >${notes}</textarea></p>`;
    });
    listHTML += `<br><br>

            </form>
            <br>

        </div>`;
    list.innerHTML = listHTML;

    var x = document.getElementById("editBtn");
    x.style.display = "block";
}

const editRegisterBtn = document.querySelector('#editRegisterBtn');

editRegisterBtn.onclick = function() {
    const firstNameInput = document.querySelector('#firstName');
    const lastNameInput = document.querySelector('#lastName');
    const emailInput = document.querySelector('#email');
    const universityInput = document.querySelector('#university');
    const titleInput = document.querySelector('#title');
    const abstractInput = document.querySelector('#abstract');
    const notesInput = document.querySelector('#notes');

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const email = emailInput.value;
    const university = universityInput.value;
    const title = titleInput.value;
    const abstract = abstractInput.value;
    const notes = notesInput.value;

    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    universityInput.value = "";
    titleInput.value = "";
    abstractInput.value = "";
    notesInput.value = "";

    fetch('http://37.44.247.223:4003/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: id,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            university: university,
            title: title,
            abstract: abstract,
            notes: notes
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("update success");
                // location.reload();
            }
        });

    alert("Your information has been changed succefully!");
    var para = new URLSearchParams();
    para.append("id", id);
    para.append("pwd", password);
    location.href = "./loginInfo.html?" + para.toString();
};
