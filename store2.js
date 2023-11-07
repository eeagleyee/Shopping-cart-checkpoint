if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Comment: This code ensures that the 'ready' function is called when the document has finished loading.

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Comment: This block of code sets up event listeners for removing items from the cart.

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // Comment: This block of code sets up event listeners for changes in quantity inputs.

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  // Comment: This block of code sets up event listeners for adding items to the cart.

  // Comment: The 'Toggle' function does not seem to be used. Consider removing it.

  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("liked");
      if (this.classList.value.includes("liked")) {
        alert("You liked this product");
        button.innerHTML = `<i class="fa-solid fa-heart" style="color: #f04b05"></i>`;
      } else {
        alert("You unliked this product");
        button.innerHTML = `
          <i class="fa-regular fa-heart" style="color: #323232"></i>`;
      }
    });
  });

  // Comment: This block of code sets up event listeners for like buttons, toggling their 'liked' class and displaying alerts.

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);

  // Comment: This sets up an event listener for the purchase button.
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

// Comment: This function is called when the purchase button is clicked. It displays an alert and clears the cart.

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// Comment: This function is called when a remove button is clicked. It removes the corresponding item from the cart.

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// Comment: This function is called when the quantity of an item is changed. It ensures that the quantity is valid and updates the cart total.

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

// Comment: This function is called when an 'Add to Cart' button is clicked. It extracts item details and calls 'addItemToCart'.

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
          <div class="cart-item cart-column">
              <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
              <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1">
              <button class="btn btn-danger" type="button">REMOVE</button>
          </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

// Comment: This function adds an item to the cart. It creates a new cart row, checks if the item is already in the cart, and appends the row to the cart.

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("₦", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 0.1; // Corrected the formula
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "₦" + new Intl.NumberFormat("en-US").format(total);
}

// Comment: This function updates the total price of items in the cart. It calculates the total based on the prices and quantities of the items in the cart.
