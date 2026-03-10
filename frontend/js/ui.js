function renderPage(title, buttons, contentId) {
    document.getElementById("homeView").style.display = "none";
    let html = `
        <h2>${title}</h2>
        <div class="section">
        ${buttons}
        </div>
        <div id="${contentId}"></div>`;
    document.getElementById("app").innerHTML = html;
}

function renderSection(title, body) {
    return `
    <div class="section">
    <h3>${title}</h3>
    ${body}
    </div>`;
}

function renderTable(headers, rows) {
    let th = headers.map(h => `<th>${h}</th>`).join("");
    let tr = rows.map(r =>
        `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`
    ).join("");
    return `
    <table class="table">
    <tr>${th}</tr>
    ${tr}
    </table>`;
}

function renderForm(title, inputs, buttonText, action) {
    let fields = inputs.map(i =>
        `<input id="${i.id}" placeholder="${i.placeholder}">`
    ).join("");
    return renderSection(title, `
    ${fields}
    <br><br>
    <button onclick="${action}">${buttonText}</button>`);
}

function renderSearch(title, id, placeholder, action) {
    return renderSection(title, `
    <input id="${id}" placeholder="${placeholder}">
    <br><br>
    <button onclick="${action}">Search</button>`);
}