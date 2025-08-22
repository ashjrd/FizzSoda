// Swiper
var swiper = new Swiper(".home", {
        spaceBetween: 30,
        centeredSlides: true,
        
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-btn");
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartDropdown = document.getElementById("cart-dropdown");
  const cartIcon = document.getElementById("cart-icon");
  const orderBtn = document.getElementById("order-btn");
  const emptyBtn = document.getElementById("empty-btn");
  const modal = document.getElementById("order-modal");
  const closeModal = document.getElementById("close-modal");
  const orderSummary = document.getElementById("order-summary");
  const orderTotal = document.getElementById("order-total");

  let count = 0;
  let totalPrice = 0;

  // Add to cart
  addButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const productBox = e.target.closest(".box");
      const productName = productBox.querySelector("h2").innerText;
      const selectedOption = productBox.querySelector(".price-select");
      const priceText = selectedOption.options[selectedOption.selectedIndex].text;
      const priceValue = parseFloat(selectedOption.value);

      count++;
      cartCount.textContent = count;

      const li = document.createElement("li");
      li.innerHTML = `${productName} - ${priceText} <button class='remove-btn'>❌</button>`;
      cartItems.appendChild(li);

      totalPrice += priceValue;

      // Remove item (without closing dropdown)
      li.querySelector(".remove-btn").addEventListener("click", (event) => {
        event.stopPropagation(); // prevent dropdown from closing
        li.remove();
        count--;
        cartCount.textContent = count < 0 ? 0 : count;
        totalPrice -= priceValue;
      });
    });
  });

  // Toggle cart dropdown
  cartIcon.addEventListener("click", () => {
    cartDropdown.style.display =
      cartDropdown.style.display === "block" ? "none" : "block";
  });

  // Close dropdown outside click (only if not removing)
  document.addEventListener("click", (e) => {
    if (!cartIcon.contains(e.target)) {
      cartDropdown.style.display = "none";
    }
  });

  // Order Now -> show modal
  orderBtn.addEventListener("click", () => {
    if (cartItems.children.length === 0) {
      alert("Your cart is empty!");
    } else {
      // Summary
      orderSummary.innerHTML = "";
      [...cartItems.children].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.textContent.replace("❌", "").trim();
        orderSummary.appendChild(li);
      });

      orderTotal.textContent = `Total: ₱${totalPrice.toFixed(2)}`;

      modal.classList.add("show");

      // Reset cart
      cartItems.innerHTML = "";
      count = 0;
      totalPrice = 0;
      cartCount.textContent = 0;
    }
  });

  // Empty Cart button
  emptyBtn.addEventListener("click", () => {
    cartItems.innerHTML = "";
    count = 0;
    totalPrice = 0;
    cartCount.textContent = 0;
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Close modal if clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});