const BASE_URL = "http://127.0.0.1:8000";

async function getData(url){
    const res = await fetch(BASE_URL + url);
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