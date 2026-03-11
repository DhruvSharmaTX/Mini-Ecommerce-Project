function loadProducts() {
    renderPage(
        "Products",
        `<button onclick="showProductForm('create')">Create Product</button>
        <button onclick="showProductsTable()">Get All Products</button>
        <button onclick="showProductsTable(true)">Update Products</button>
        <button onclick="showProductForm('get')">Get Product</button>`,
        "productContent"
    );
}

function showProductForm(action) {
    if (action === "create") {
        document.getElementById("productContent").innerHTML = renderForm(
            "Create Product",
            [
                { id: "product_name", placeholder: "Product Name" },
                { id: "price", placeholder: "Price" },
                { id: "stock", placeholder: "Stock Quantity" }
            ],
            "Create",
            "createProduct()"
        );
    } else if (action === "get") {
        document.getElementById("productContent").innerHTML = renderSearch(
            "Get Product",
            "product_id",
            "Product ID",
            "getProduct()"
        );
    }
}

async function createProduct() {
    const name = document.getElementById("product_name").value;
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    const res = await postData("/products", { name, price, stock_quantity: stock });

    if (res.ok) {
        alert("Product created");
        showProductsTable();
    }
}

async function getProduct() {
    const id = document.getElementById("product_id").value;
    try {
        const p = await getData("/products/" + id);
        showProductsTable(false, [p], "Product Details");
    } catch {
        document.getElementById("productContent").innerHTML = "<p>Product not found</p>";
    }
}

async function updateProductInline(id) {
    const price = parseFloat(document.getElementById("price_" + id).value);
    const stock = parseInt(document.getElementById("stock_" + id).value);
    const res = await putData("/products/" + id, { price, stock_quantity: stock });
    if (res.ok) {
        alert("Product updated successfully");
        showProductsTable(true); 
    } else {
        alert("Error updating product");
    }
}

async function showProductsTable(editable = false, data = null, title = null) {
    const products = data || await getData("/products");
    const rows = products.map(p => {
        if (editable) {
            return [
                p.id,
                p.name,
                `<input type="number" id="price_${p.id}" value="${p.price}" style="width:80px">`,
                `<input type="number" id="stock_${p.id}" value="${p.stock_quantity}" style="width:60px">`,
                `<button onclick="updateProductInline('${p.id}')">Update</button>`
            ];
        } else {
            return [p.id, p.name, p.price, p.stock_quantity];
        }
    });
    const headers = editable ? ["ID", "Name", "Price", "Stock", "Action"] : ["ID", "Name", "Price", "Stock"];
    const sectionTitle = title || (editable ? "Update Products" : "All Products");
    document.getElementById("productContent").innerHTML =
        renderSection(sectionTitle, renderTable(headers, rows));
}