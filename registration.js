// toggle the appearence of title and abstract
const isSpeakerF = document.querySelector('#isSpeakerF');
var x1 = document.getElementById("title_abstract");
var x2 = document.getElementById("blank");
isSpeakerF.onclick = function(){
    x1.style.display = "none";
    x2.style.display = "block";
};

const isSpeakerT = document.querySelector('#isSpeakerT');
isSpeakerT.onclick = function(){
    x1.style.display = "block";
    x2.style.display = "none";
};

// Send the information to the backend
const registerBtn = document.querySelector('#registerBtn');

registerBtn.onclick = function() {
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

    if (firstName === "" && lastName === "") {
        alert("The name cannot be empty.");
        return;
    }

    if (email === "") {
        alert("The email cannot be empty.");
        return;
    }


    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    universityInput.value = "";
    titleInput.value = "";
    abstractInput.value = "";
    notesInput.value = "";

    fetch('http://37.44.247.223:4003/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
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
        .then(data => sendEmail(data['data']));
    alert("Thank you for your participation! You should've received an email about this registration(with subject: 2021 SIAM Southeast Student Conference). Please check the junk box if necessary.");
    alert("You can use your id and password from the email to login and make changes of the information you just submitted.");
    alert("See you on April 3rd! ^_^");
    location.href = "./participants.html";
};

function sendEmail(data){
    var data_dict = {};
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            data_dict[key] = data[key];
        }
    }
    fetch('http://37.44.247.223:4003/sendEmail', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            id: data_dict['id'],
            firstName: data_dict['firstName'],
            lastName: data_dict['lastName'],
            email: data_dict['email'],
            university: data_dict['university'],
            title: data_dict['title'],
            abstract: data_dict['abstract'],
            notes: data_dict['notes']
        })
    })
        .then(response => response.json())
        .then(data => console.log("email sent"));
}
