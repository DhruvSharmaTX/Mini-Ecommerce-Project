function showHome(){
    document.getElementById("homeView").style.display="block";
    document.getElementById("app").innerHTML="";
    loadDashboard();
}

async function loadDashboard(){
    const users = await getData("/users/");
    const products = await getData("/products/");
    const orders = await getData("/orders/");
    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("totalProducts").innerText = products.length;
    document.getElementById("totalOrders").innerText = orders.length;
    let revenue = 0;
    orders.forEach(o=>{
        revenue += o.total_amount;
    });
    document.getElementById("totalRevenue").innerText = "₹ " + revenue;
}

showHome();