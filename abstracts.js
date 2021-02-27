document.addEventListener('DOMContentLoaded', function(){
    fetch('http://37.44.247.223:4003/getAllAbstracts')
        .then(response => response.json())
        .then(data => loadHTMLList(data['data']));
});

function loadHTMLList(data) {
    const list = document.querySelector('#abstracts_list');
    if (data.length === 0) {
        list.innerHTML = "<li>No abstracts yet</li>";
        return;
    }

    let listHTML = "";
    console.log(data);
    data.forEach(function({id, firstName, lastName, email, university, title, abstract}){
        if (title !== "") {
            listHTML += `<div id="abstract_${id}">`;
            listHTML += "<li>";
            listHTML += `<h3>${title}</h3>`;
            listHTML += `<h5>${firstName} ${lastName}, ${university}</h5>`;
            listHTML += `<p>${abstract}</p>`;
            listHTML += "</li>";
            listHTML += "</div>";
        }
    });
    console.log(listHTML);
    console.log(list);

    list.innerHTML = listHTML;
}
