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

    default: throw new Error('Incorrect sorting choice');
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

function updateFloatingCart() {
  let quantity = cartList.reduce((previous: number, current: number) => { 
    return previous + current;
  });

  let floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
  floatingCart.innerHTML = "" + quantity;
};

function createCartHtml() {
  let cartSymbolContainer: HTMLDivElement = document.createElement("div");
  let cartSymbol: HTMLElement = document.createElement("i");

  cartSymbolContainer.className = "cartSymbolContainer";
  cartSymbol.className = "bi bi-bag-plus";

  cartSymbolContainer.appendChild(cartSymbol);

  return {cartSymbolContainer, cartSymbol};
};

function dogImgHovereffect (dogImg: HTMLImageElement, cartContainer: HTMLDivElement) {

  dogImg.addEventListener("mouseover", () => {
    cartContainer.classList.add("hover");
    dogImg.classList.add("hover");
  });

  dogImg.addEventListener("mouseout", () => {
    cartContainer.classList.remove("hover");
    dogImg.classList.remove("hover");
  });
};

function updateCartIndex(cartSymbol: HTMLElement, i: number) {
  cartSymbol.addEventListener("click", () => {
    let cart = new Cart();
    cart.addToCartIndex(i);
    updateFloatingCart();
  });
};

function productHtml(i: number){
  let name: HTMLHeadingElement = document.createElement("h5");
  let price: HTMLHeadingElement = document.createElement("p");
  let info: HTMLHeadingElement = document.createElement("p");

  name.innerHTML = productList[i].name;
  price.innerHTML = "$" + productList[i].price;
  info.innerHTML = productList[i].info;

  return {name, price, info};
};

function showProductSpec(i: number, dogImg: HTMLImageElement) {
  dogImg.addEventListener("click", () => {
    productList[i].productSpec = !productList[i].productSpec;
    window.location.href = "product-spec.html#backArrow";
    let saveAsText = JSON.stringify(productList);
    localStorage.setItem("savedProductList", saveAsText);
  });
};

export function createProductHtml() {
  for (let i = 0; i < productList.length; i++) {
    let dogProduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    let dogImg: HTMLImageElement = document.createElement("img");
    let {cartSymbolContainer, cartSymbol} = createCartHtml();

    dogProduct.className ='dogProduct';
    dogImgContainer.className = "dogimgcontainer";

    dogProduct.appendChild(dogImgContainer);
    dogImgContainer.appendChild(dogImg);
    dogImgContainer.appendChild(cartSymbolContainer);
    
    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImgHovereffect(dogImg, cartSymbolContainer);

    let {name, price, info} = productHtml(i);

    dogProduct.appendChild(name);
    dogProduct.appendChild(price);
    dogProduct.appendChild(info);

    productList[i].productSpec = false;

    showProductSpec(i, dogImg);    

    updateCartIndex(cartSymbol, i);

    let categories = getCategories();
    categories?.appendChild(dogProduct);
   
    function getCategories() {
      switch(productList) {
        case productList[i].category === "sassy":
          return document.getElementById("sassy") as HTMLElement;
        break;
        case productList[i].category === "criminal":
          return document.getElementById("criminal") as HTMLElement;
        break;
        case productList[i].category == "singles":
          return document.getElementById("singles") as HTMLElement;
        break;
        case productList[i].category === "puppy":
          document.getElementById("puppy") as HTMLElement;
        break;
        case productList[i].category === "oldies":
          return document.getElementById("oldies") as HTMLElement;
        break;
        
        default: throw new Error('Category does now exist');
      };
    }
  };

  let saveAsText = JSON.stringify(productList);
  localStorage.setItem("savedProductList", saveAsText);
  sessionStorage.clear();
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