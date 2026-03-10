const BASE_URL = "https://mini-ecommerce-project-1.onrender.com";

async function getData(url){
    const res = await fetch(BASE_URL + url);
    if(!res.ok) throw new Error("API error");
    return res.json();
}

async function postData(url,data){
    return fetch(BASE_URL + url,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    });
}

async function putData(url,data){
    return fetch(BASE_URL + url,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    });
}