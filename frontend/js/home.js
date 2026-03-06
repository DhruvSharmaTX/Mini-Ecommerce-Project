function loadHome(){

    document.getElementById("content").innerHTML = `
        <h2>Dashboard</h2>
        <p>Welcome to the Mini Ecommerce Admin Panel</p>

        <div class="cards">

            <div class="card">
                <h3>Users</h3>
                <p>Manage customers</p>
            </div>

            <div class="card">
                <h3>Products</h3>
                <p>Manage products</p>
            </div>

            <div class="card">
                <h3>Orders</h3>
                <p>Manage orders</p>
            </div>

        </div>
    `
}