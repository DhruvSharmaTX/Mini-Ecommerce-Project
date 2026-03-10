function loadUsers() {
    renderPage(
        "Users",
        `<button onclick="showUserForm('create')">Create User</button>
        <button onclick="showAllUsers()">Get All Users</button>
        <button onclick="showUserForm('get')">Get User</button>`,
        "userContent"
    );
}

function showUserForm(action) {
    if (action === "create") {
        document.getElementById("userContent").innerHTML = renderForm(
            "Create User",
            [
                { id: "name", placeholder: "Name" },
                { id: "email", placeholder: "Email" }
            ],
            "Create",
            "createUser()"
        );
    } else if (action === "get") {
        document.getElementById("userContent").innerHTML = renderSearch(
            "Get User",
            "userid",
            "User ID",
            "getUser()"
        );
    }
}

async function createUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const res = await postData("/users/", { name, email });
    if (res.ok) {
        alert("User created");
        showAllUsers();
    }
}

async function getUser() {
    const id = document.getElementById("userid").value;
    try {
        const user = await getData("/users/" + id);
        showUserTable([user], "User Details");
    } catch {
        document.getElementById("userContent").innerHTML = "<p>User not found</p>";
    }
}

async function showAllUsers() {
    const users = await getData("/users/");
    showUserTable(users, "All Users");
}

function showUserTable(users, title) {
    const rows = users.map(u => [u.id, u.name, u.email]);
    const table = renderTable(["ID", "Name", "Email"], rows);
    document.getElementById("userContent").innerHTML = renderSection(title, table);
}