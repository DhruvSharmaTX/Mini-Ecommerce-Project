async function loadProducts(){

    const res = await fetch(API_URL + "/products/")
    const products = await res.json()

    let html = `
        <h2>Products</h2>
        <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
        </tr>
    `

    products.forEach(p=>{
        html += `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.stock_quantity}</td>
        </tr>
        `
    })

    html += "</table>"

    document.getElementById("content").innerHTML = html
}