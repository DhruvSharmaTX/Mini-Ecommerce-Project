// Use your backend Render URL here
// api.js
const BASE_URL = "https://mini-ecommerce-project-m23b.onrender.com"; // Correct backend
async function getData(url) {
    try {
        const res = await fetch(BASE_URL + url);
        if (!res.ok) throw new Error("API error: " + res.status);
        return res.json();
    } catch (err) {
        console.error("API GET Error:", err);
        throw err;
    }
}

async function postData(url, data) {
    try {
        const res = await fetch(BASE_URL + url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("API POST Error: " + res.status);
        return res.json();
    } catch (err) {
        console.error("API POST Error:", err);
        throw err;
    }
}

async function putData(url, data) {
    try {
        const res = await fetch(BASE_URL + url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("API PUT Error: " + res.status);
        return res.json();
    } catch (err) {
        console.error("API PUT Error:", err);
        throw err;
    }
}