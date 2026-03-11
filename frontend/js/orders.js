function loadOrders() {
    renderPage(
        "Orders",
        `<button onclick="showOrderForm('create')">Create Order</button>
        <button onclick="showOrderForm('get')">Get Order</button>
        <button onclick="showOrdersTable()">Get All Orders</button>
        <button onclick="showOrdersStatusTable()">Update Status</button>
        <button onclick="showOrderForm('cancel')">Cancel Order</button>`,
        "orderContent"
    );
}

function showOrderForm(action) {
    let html = "";
    if (action === "create") {
        html = `
        <input id="user_id" placeholder="User ID">
        <h4>Products</h4>
        <div id="items"><div>
            <input class="product_id" placeholder="Product ID">
            <input class="quantity" placeholder="Quantity">
        </div></div>
        <button onclick="addItem()">Add Product</button><br><br>
        <button onclick="createOrder()">Create Order</button>`;
    } else if (action === "get") {
        html = `<input id="order_id" placeholder="Order ID"><br><br>
                <button onclick="fetchOrder()">Search</button>`;
    } else if (action === "cancel") {
        html = `<input id="cancel_order_id" placeholder="Order ID"><br><br>
                <button onclick="cancelOrder()">Cancel Order</button>`;
    }
    document.getElementById("orderContent").innerHTML = renderSection(
        action === "create" ? "Create Order" :
        action === "get" ? "Get Order" : "Cancel Order", html);
}

function addItem() {
    document.getElementById("items").innerHTML += `<div>
        <input class="product_id" placeholder="Product ID">
        <input class="quantity" placeholder="Quantity">
    </div>`;
}

async function createOrder() {
    const user_id = document.getElementById("user_id").value;

    const items = Array.from(document.querySelectorAll(".product_id"))
        .map((el, i) => ({
            product_id: el.value,
            quantity: parseInt(document.querySelectorAll(".quantity")[i].value)
        }));

    const res = await postData("/orders", { user_id, items });

    if (res.ok) {
        alert("Order created");
        showOrdersTable();
    } else {
        alert("Error creating order");
    }
}


async function showOrdersTable(data = null) {
    const orders = data || await getData("/orders");
    const rows = orders.map(o => [
        o.id, o.user_id, o.total_amount,
        `<span class="status-${o.status}">${o.status}</span>`,
        o.created_at,
        `<button onclick="fetchOrder('${o.id}')">View</button>`
    ]);
    document.getElementById("orderContent").innerHTML = renderSection(
        "All Orders", renderTable(["Order ID", "User", "Total", "Status", "Created", "Action"], rows));
}

async function showOrdersStatusTable() {
    const orders = await getData("/orders");
    const rows = orders.map(o => {
        const status = o.status || 'PENDING'; // default
        return [
            o.id,
            o.user_id,
            o.total_amount,
            `<select id="status_${o.id}" onchange="updateOrderStatus('${o.id}')">
                <option ${status==='PENDING'?'selected':''}>PENDING</option>
                <option ${status==='SHIPPED'?'selected':''}>SHIPPED</option>
                <option ${status==='DELIVERED'?'selected':''}>DELIVERED</option>
                <option ${status==='CANCELLED'?'selected':''}>CANCELLED</option>
            </select>`,
            o.created_at
        ];
    });
    document.getElementById("orderContent").innerHTML = renderSection(
        "Update Order Status",
        renderTable(["Order ID","User","Total","Status","Created"], rows)
    );
}

async function updateOrderStatus(id) {
    const status = document.getElementById(`status_${id}`).value;
    try {
        const res = await putData(`/orders/${id}/status`, { status });
        const data = await res.json();
        if (res.ok && data.success) {
            alert(data.message);
            showOrdersStatusTable();
        } else {
            alert(data.detail || data.message || `Error updating status for order ${id}`);
        }
    } catch (e) {
        alert(`Error updating status: ${e}`);
    }
}


async function fetchOrder(id=null) {
    try {
        const orderId = id || document.getElementById("order_id").value;
        const order = await getData("/orders/" + orderId);
        await showSingleOrder(order);
    } catch {
        document.getElementById("orderContent").innerHTML = renderSection("Error", "<p>Order not found</p>");
    }
}

async function showSingleOrder(order) {
    const rows = await Promise.all(order.items.map(async i => {
        try { 
            const p = await getData("/products/" + i.product_id);
            return [p.id, p.name, p.price, i.quantity]; 
        } catch { 
            return [i.product_id, "Not Found", "-", i.quantity]; 
        }
    }));
    const html = `
        <p><b>User:</b> ${order.user_id}</p>
        <p><b>Status:</b> ${order.status}</p>
        <p><b>Total:</b> ${order.total_amount}</p>
        ${renderTable(["Product ID","Name","Price","Quantity"], rows)}`;
    document.getElementById("orderContent").innerHTML = renderSection("Order Details", html);
}

async function cancelOrder() {
    const id = document.getElementById("cancel_order_id").value;
    try {
        const res = await putData(`/orders/${id}/cancel`, {});
        const data = await res.json();
        if (res.ok && data.success) {
            alert(data.message);
            showOrdersTable(); // refresh table
        } else {
            alert(data.detail || data.message || "Cannot cancel this order");
        }
    } catch (e) {
        alert("Error cancelling order: " + e);
    }
}