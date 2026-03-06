async function loadUsers(){

    const res = await fetch(API_URL + "/users/")
    const users = await res.json()

    let html = `
        <h2>Users</h2>
        <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    `

    users.forEach(u=>{
        html += `
        <tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
        </tr>
        `
    })

    html += "</table>"

    document.getElementById("content").innerHTML = html
}