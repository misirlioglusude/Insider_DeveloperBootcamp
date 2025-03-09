document.getElementById("loadProducts").addEventListener("click", function () {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("productContainer");
      container.innerHTML = "";
      data.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Fiyat: ${product.price} TL</p>
                    <a href="${product.link}" target="_blank">Show Details</a>
                `;
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Loading error:", error));
});
