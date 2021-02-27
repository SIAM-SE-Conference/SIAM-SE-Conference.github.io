document.addEventListener('DOMContentLoaded', function(){
    fetch('http://37.44.247.223:4003/getAllParticipants')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data) {
    const table = document.querySelector('#participants_table_tbody');
    if (data.length === 0) {
        console.log("no data found yet");
        table.innerHTML = "<tr><td class='no-data' colspan='3'>No Participants Yet</td></tr>";
        return;
    }

    let tableHTML = "";

    data.forEach(function({id, firstName, lastName, email, university, title, abstract}){
        tableHTML += "<tr>";
        tableHTML += `<td>${firstName} ${lastName}</td>`;
        tableHTML += `<td>${university}</td>`;
        if (title === "") {
            tableHTML += `<td>-</td>`;
        } else {
            tableHTML += `<td><a href="./abstracts.html#abstract_${id}">Presentation</a></td>`;
        }

        tableHTML += "</tr>";
    });
    table.innerHTML = tableHTML;
}
