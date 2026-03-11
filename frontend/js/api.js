// Change BASE_URL to your backend Render URL
const BASE_URL = "https://mini-ecommerce-project-1.onrender.com";

async function getData(url) {
    try {
        const res = await fetch(BASE_URL + url, {
            credentials: "include" // ensures cookies/sessions are sent if needed
        });
        if (!res.ok) throw new Error("API GET Error: " + res.status);
        return res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function postData(url, data) {
    try {
        const res = await fetch(BASE_URL + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("API POST Error: " + res.status);
        return res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function putData(url, data) {
    try {
        const res = await fetch(BASE_URL + url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("API PUT Error: " + res.status);
        return res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}