


document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("lsasaf-products");

    fetch("../assets/data/lsasaf/products.json")
        .then(response => response.json())
        .then(products => {

            products.forEach(product => {

                if (!product.available) {
                    return;
                }

                let card = document.createElement("div");
                card.className = "product-card";

                let html = `
                    <h2>${product.name}</h2>

                    <img 
                        src="../${product.latest}" 
                        alt="${product.name}"
                        class="map-image">

                    <div class="gallery">
                `;

                product.images.forEach(img => {

                    html += `
                        <a href="../${img}" target="_blank">
                            <img 
                              src="../${img}" 
                              class="thumb">
                        </a>
                    `;

                });

                html += `
                    </div>
                `;

                card.innerHTML = html;

                container.appendChild(card);

            });

        })

        .catch(error => {
            console.error(
                "Erro carregando produtos LSASAF:",
                error
            );

            container.innerHTML =
            "<p>Erro ao carregar produtos LSASAF.</p>";
        });

});



