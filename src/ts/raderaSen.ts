//Uppgift 1
/*export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  let sortedList: Product[] = [];
  if (sort === Sort.PRICE_ASCENDING) {
    sortedList = sortList("Price", copiedList);
    sortedList.reverse();
  } else if (sort === Sort.PRICE_DECENDING) {
    sortedList = sortList("Price", copiedList);
  } else if (sort === Sort.NAME_ALPHABETIC) {
    sortedList = sortList("Name", copiedList);
  } else if (sort === Sort.NAME_ALPHABETIC_REVERSE) {
    sortedList = sortList("Name", copiedList);
    sortedList.reverse();
  }

  return sortedList;
}*/

/*function sortList(whichAttribute: string, products: Product[]): Product[] {
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
}*/

//Uppgift 2

/*class Cart {
    addToCart(i: number) {}
  };
  
  export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
  export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");
  
  export function createProductHtml() {
    let quantity = 0;
    for (let i = 0; i < cartList.length; i++) {
      quantity += cartList[i].quantity;
    }
    let floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
    floatingCart.innerHTML = "" + quantity;
  
    for (let i = 0; i < productList.length; i++) {
      let dogproduct: HTMLDivElement = document.createElement("div");
      let dogImgContainer: HTMLDivElement = document.createElement("div");
      dogImgContainer.className = "dogimgcontainer";
      dogproduct.appendChild(dogImgContainer);
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
      dogproduct.appendChild(name);
  
      let price: HTMLHeadingElement = document.createElement("p");
      price.innerHTML = "$" + productList[i].price;
      dogproduct.appendChild(price);
  
      let info: HTMLHeadingElement = document.createElement("p");
      info.innerHTML = productList[i].info;
      dogproduct.appendChild(info);
  
      productList[i].productSpec = false;
  
      dogImg.addEventListener("click", () => {
        productList[i].productSpec = !productList[i].productSpec;
        window.location.href = "product-spec.html#backArrow";
        let listastext = JSON.stringify(productList);
        localStorage.setItem("savedList", listastext);
      });
  
      cartSymbol.addEventListener("click", () => {
        let cart = new Cart();
        cart.addToCart(i);
      });
  
      if (productList[i].category === "sassy") {
        let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat1.appendChild(dogproduct);
      }
      if (productList[i].category === "kriminella") {
        let cat2: HTMLElement = document.getElementById(
          "kriminella"
        ) as HTMLElement;
        dogproduct.className = "dogproduct";
        cat2.appendChild(dogproduct);
      }
      if (productList[i].category == "singlar") {
        let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat3.appendChild(dogproduct);
      }
      if (productList[i].category === "puppy") {
        let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat4.appendChild(dogproduct);
      }
      if (productList[i].category === "oldies") {
        let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
        dogproduct.className = "dogproduct";
        cat5.appendChild(dogproduct);
      }
    }
    let listastext = JSON.stringify(productList);
    localStorage.setItem("savedList", listastext);
    sessionStorage.clear();
  }*/

  // 3

  export class CartProduct {
    constructor(
      public name: string,
      public image: string,
      public price: number,
      public amount: number
    ) {}
  }
  
  function getfromstorage() {
    let container = document.getElementById("checkout-table");
  
    let fromStorage: string = localStorage.getItem("cartArray") || "";
    let madeAsText: CartProduct[] = JSON.parse(fromStorage);
  
    let productContainer = document.getElementById(
      "product-ckeckout-container"
    ) as HTMLDivElement; // Används aldrig?
  
    let amountContainer = document.getElementById(
      "amount-checkout-container2"
    ) as HTMLDivElement;
    let amountText: HTMLTableCellElement = document.createElement("th");
    amountContainer.appendChild(amountText);
    amountText.innerHTML = "amount:";
  
    let titleContainer = document.getElementById(
      "title-container"
    ) as HTMLTableRowElement;
    titleContainer.innerHTML = "<strong>products:</strong>";
  
    let productquantity = document.getElementById(
      "product-quantity"
    ) as HTMLTableRowElement;
    let qttext: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(qttext);
    qttext.innerHTML = "change quantity:";
  
    let checkkouttotal2 = document.getElementById(
      "title-total"
    ) as HTMLTableCellElement;
    let totaltext: HTMLTableCellElement = document.createElement("th");
    checkkouttotal2.appendChild(totaltext);
    totaltext.innerHTML = "total:";
  
    for (let i: number = 0; i < madeAsText.length; i++) {
      let productt: HTMLTableCellElement = document.createElement("th");
      titleContainer.appendChild(productt);
      productt.innerHTML = madeAsText[i].name;
      productt.className = "hej";
  
      let amountt: HTMLTableCellElement = document.createElement("th");
      amountContainer.appendChild(amountt);
      amountt.innerHTML = "x" + madeAsText[i].amount;
      amountt.className = "hej";
  
      let amountqt: HTMLTableCellElement = document.createElement("th");
      productquantity.appendChild(amountqt);
      let amountplusbtn: HTMLButtonElement = document.createElement("button");
      amountqt.appendChild(amountplusbtn);
      amountqt.className = "hej";
  
      let icon: HTMLSpanElement = document.createElement("i");
      amountplusbtn.appendChild(icon);
  
      icon.className = "fas fa-minus";
      amountplusbtn.className = "plusbtn";
  
      let icon2: HTMLSpanElement = document.createElement("i");
      icon2.className = "fas fa-plus";
  
      let amountminusbtn: HTMLButtonElement = document.createElement("button");
      amountqt.appendChild(amountminusbtn);
      amountminusbtn.appendChild(icon2);
      amountminusbtn.className = "minusbtn";
    }
  
    let addition: number = 0;
  
    for (let i = 0; i < madeAsText.length; i++) {
      addition += madeAsText[i].price *= madeAsText[i].amount;
    }
  
    let totalprice2: HTMLTableCellElement = document.createElement("th");
    checkkouttotal2.appendChild(totalprice2);
    totalprice2.innerHTML = addition + "$";
    totalprice2.id = "totalincenter";
  }