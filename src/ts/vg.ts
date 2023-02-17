import { Cart } from "./vgModels/Cart";
import { CartProduct } from "./vgModels/CartProduct";
import { Product } from "./vgModels/Product";
import { Sort } from "./vgModels/sortingEnum";

/*
  1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/

export function sortProductsBy(sortBy: Sort, products: Product[]): Product[] {
  let sortedList: Product[] = [];
  products.forEach((product) => sortedList.push(product));

  switch(sortBy) {
    case Sort.PRICE_ASCENDING: 
      sortedList = sortList('Price', sortedList);
      sortedList.reverse();
    break;
    case Sort.PRICE_DECENDING: 
      sortedList = sortList('Price', sortedList);
    break;
    case Sort.NAME_ALPHABETIC:
      sortedList = sortList('Name', sortedList);
    break;
    case Sort.NAME_ALPHABETIC_REVERSE:
      sortedList = sortList('Name', sortedList);
      sortedList.reverse();
    break;

    default: throw new Error('Ogiltigt val av sortering');
  };

  return sortedList;
};

function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((product1, product2) => {
    if (whichAttribute === "Price") {
      if (product1.price < product2.price) {
        return 1;
      } else if (product1.price > product2.price) {
        return -1;
      }
      return 0;
    } else {
      if (product1.name < product2.name) {
        return 1;
      } else if (product1.name > product2.name) {
        return -1;
      }
      return 0;
    }
  });
};

/*
  2. Refaktorera funktionen createProductHtml :)
*/

export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedProductList") || "[]");

/*
  Funktioner:
  - Välja kategori
  - Uppdatera varukorg
  - Skapa HTML
  - Spara i local storage?
  - Hover över bild?
*/

export function createProductHtml() {

  for (let i = 0; i < productList.length; i++) {
    let dogProduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogProduct.appendChild(dogImgContainer);
    let dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });

    dogImgContainer.appendChild(dogImg);

    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);

    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogProduct.appendChild(name);

    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogProduct.appendChild(price);

    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogProduct.appendChild(info);

    productList[i].productSpec = false;

    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let saveAsText = JSON.stringify(productList);
      localStorage.setItem("savedProductList", saveAsText);
    });

    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCartIndex(i);
      updateFloatingCart();
    });

    if (productList[i].category === "sassy") {
      let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
      dogProduct.className = "dogProduct";
      cat1.appendChild(dogProduct);
    }
    if (productList[i].category === "criminal") {
      let cat2: HTMLElement = document.getElementById("criminal") as HTMLElement;
      dogProduct.className = "dogProduct";
      cat2.appendChild(dogProduct);
    }
    if (productList[i].category == "singles") {
      let cat3: HTMLElement = document.getElementById("singles") as HTMLElement;
      dogProduct.className = "dogProduct";
      cat3.appendChild(dogProduct);
    }
    if (productList[i].category === "puppy") {
      let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
      dogProduct.className = "dogProduct";
      cat4.appendChild(dogProduct);
    }
    if (productList[i].category === "oldies") {
      let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
      dogProduct.className = "dogProduct";
      cat5.appendChild(dogProduct);
    }
  }

  let saveAsText = JSON.stringify(productList);
  localStorage.setItem("savedProductList", saveAsText);
  sessionStorage.clear();
};

function updateFloatingCart() {
  let quantity = cartList.reduce((previous: number, current: number) => { 
    return previous + current;
  });

  let floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
  floatingCart.innerHTML = "" + quantity;
};

/*
  3. Refaktorera funktionen getfromstorage
*/

function createAmountText() {
  let amountText: HTMLTableCellElement = document.createElement("th");
  amountText.innerHTML = "Amount: ";

  return amountText;
};

function createProductQuantityText(){
  let quantityText: HTMLTableCellElement = document.createElement("th");
  quantityText.innerHTML = "Change quantity:";

  return quantityText;
};

function createTotalText() {
  let totaltext: HTMLTableCellElement = document.createElement("th");
  totaltext.innerHTML = "Total: ";

  return totaltext;
};

function createTableCells() {
  let amountContainer = document.getElementById("amount-checkout-container2") as HTMLDivElement;
  let productQuantity = document.getElementById("product-quantity") as HTMLTableRowElement;
  let checkoutTotal = document.getElementById("title-total") as HTMLTableCellElement;

  const amountText = createAmountText();
  const quantityText = createProductQuantityText();
  const totalText = createTotalText();

  amountContainer.appendChild(amountText);
  productQuantity.appendChild(quantityText);
  checkoutTotal.appendChild(totalText);
};

function createPlusButton(){
  let amountPlusBtn: HTMLButtonElement = document.createElement("button");
  amountPlusBtn.className = "plusbtn";
  
  let plusIcon: HTMLSpanElement = document.createElement("i");
  plusIcon.className = "fas fa-plus";
  amountPlusBtn.appendChild(plusIcon);

  return plusIcon;
}

function createMinusButton() {
  let amountMinusBtn: HTMLButtonElement = document.createElement("button");
  amountMinusBtn.className = "minusbtn";

  let minusIcon: HTMLSpanElement = document.createElement("i");
  minusIcon.className = "fas fa-minus";
  amountMinusBtn.appendChild(minusIcon);

  return minusIcon;
};

function createTotalPriceElement() {
  let totalPrice: HTMLTableCellElement = document.createElement("th");
  totalPrice.id = "totalPrice";

  return totalPrice;
};

function getfromstorage() {
  let amountContainer = document.getElementById("amount-checkout-container2") as HTMLDivElement;
  let productQuantity = document.getElementById("product-quantity") as HTMLTableRowElement;
  let checkoutTotal = document.getElementById("title-total") as HTMLTableCellElement;

  let fromStorage: string = localStorage.getItem("cartArray") || "";
  let cartItems: CartProduct[] = JSON.parse(fromStorage);

  createTableCells();

  for (let i: number = 0; i < cartItems.length; i++) {
    let titleContainer = document.getElementById("title-container") as HTMLTableRowElement;
    let strongElement = document.createElement("strong") as HTMLElement;
    strongElement.innerHTML = "Products: ";
    titleContainer.appendChild(strongElement);

    let productName: HTMLTableCellElement = document.createElement("th");
    titleContainer.appendChild(productName);
    productName.innerHTML = cartItems[i].name;
    productName.className = "productName";

    let amountOfItems: HTMLTableCellElement = document.createElement("th");
    amountContainer.appendChild(amountOfItems);
    amountOfItems.innerHTML = "x" + cartItems[i].amount;
    amountOfItems.className = "productAmount";

    let amountQuantity: HTMLTableCellElement = document.createElement("th");
    amountQuantity.className = "amountQuantity";
    productQuantity.appendChild(amountQuantity);

    const plusBtn = createPlusButton();
    const minusBtn = createMinusButton();

    amountQuantity.appendChild(plusBtn);
    amountQuantity.appendChild(minusBtn);
  };

  function countTotalSum () {
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) { 
      total += cartItems[i].price *= cartItems[i].amount;
    };

    return total;
  };

  let total = countTotalSum();
  let totalPrice = createTotalPriceElement();
  totalPrice.innerHTML = total + "$";
  
  checkoutTotal.appendChild(totalPrice);
};