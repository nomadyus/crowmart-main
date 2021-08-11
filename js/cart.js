var shoppingCart = (() => {
  cart = [];

  // Constructor
  function Item(name, id, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  // Save cart
  saveCart = () => {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  loadCart = () => {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  return {
    // Add to cart
    addItemToCart: (name, id, price, quantity) => {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].quantity++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, id, price, quantity);
      cart.push(item);
      saveCart();
    },
    // Clear cart
    clearCart: () => {
      cart = [];
      saveCart();
    },
    // Total cart quantity
    totalQuantity: () => {
      var totalQuantity = 0;
      for (var item in cart) {
        totalQuantity += cart[item].quantity;
      }
      return totalQuantity;
    },
    // Total cart price
    totalPrice: () => {
      var totalPrice = 0;
      for (var item in cart) {
        totalPrice += cart[item].price * cart[item].quantity;
      }
      return Number(totalPrice.toFixed(2));
    },
    // Get cart
    getCart: () => {
      return cart;
    }
  };
})();

// Event Bindings
$(document).ready(() => {
  console.log("Binding Shopping Cart events...")
  // Add item
  $('.add-to-cart').on("click", function (event) {
    console.log("Adding item to cart");
    event.preventDefault();
    var name = $(this).data('item-name');
    var id = $(this).data('item-id');
    var price = Number($(this).data('item-price'));
    shoppingCart.addItemToCart(name, id, price, 1);
  });

  // Clear items
  $('.clear-cart').on("click", () => {
    shoppingCart.clearCart();
  });
})