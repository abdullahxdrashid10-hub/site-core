
const products = {
    glossy: {
        name: "Glossy Wall Tile",
        size: "300x450 mm",
        material: "Ceramic",
        price: "Rs. 1200/box",
        durability: "Medium",
        features: "Shiny Surface"
    },

    matte: {
        name: "Matte Floor Tile",
        size: "600x600 mm",
        material: "Vitrified",
        price: "Rs. 2500/box",
        durability: "High",
        features: "Slip Resistant"
    },

    germfree: {
        name: "Germ Free Tile",
        size: "600x1200 mm",
        material: "Nano Ceramic",
        price: "Rs. 3200/box",
        durability: "Very High",
        features: "Bacteria Resistant"
    }
};

function compareSelectedProducts() {

    const selected = [];

    document.querySelectorAll(".compare-checkbox:checked").forEach((checkbox) => {
        selected.push(checkbox.value);
    });

    if (selected.length !== 2) {
        alert("Please select exactly 2 products for comparison.");
        return;
    }

    const product1 = products[selected[0]];
    const product2 = products[selected[1]];

    const comparisonHTML = `
        <h3 class="text-center mb-4">Comparison Result</h3>

        <table class="table table-bordered text-center">

            <thead class="table-primary">
                <tr>
                    <th>Features</th>
                    <th>${product1.name}</th>
                    <th>${product2.name}</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                    <th>Size</th>
                    <td>${product1.size}</td>
                    <td>${product2.size}</td>
                </tr>

                <tr>
                    <th>Material</th>
                    <td>${product1.material}</td>
                    <td>${product2.material}</td>
                </tr>

                <tr>
                    <th>Price</th>
                    <td>${product1.price}</td>
                    <td>${product2.price}</td>
                </tr>

                <tr>
                    <th>Durability</th>
                    <td>${product1.durability}</td>
                    <td>${product2.durability}</td>
                </tr>

                <tr>
                    <th>Features</th>
                    <td>${product1.features}</td>
                    <td>${product2.features}</td>
                </tr>

            </tbody>

        </table>
    `;

    document.getElementById("comparisonResult").innerHTML = comparisonHTML;
}
