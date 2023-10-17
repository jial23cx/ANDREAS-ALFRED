
var data="";
let sumTotal =0;
let cartItems =[];
let divCart;
var svDropDown=document.getElementById("sv")
var enDropDown=document.getElementById("en")
var foodCard=document.querySelector(".meny-container");
document.querySelector("h2").style.fontFamily="'Poppins', sans-serif";
document.querySelector("h3").style.fontFamily="'Poppins', sans-serif";
const labelVeg=document.querySelector("#label1");
const labelVeg2=document.querySelector("#label2");
const labelVeg3=document.querySelector("#label3");
const labelVeg4=document.querySelector("#label4");
const labelVeg5=document.querySelector("#label5");

const labelAllergy=document.querySelector("#allergy1");
const labelAllergy2=document.querySelector("#allergy2");

const mainCourseH2=document.querySelector("#mainCourseH2");
const allergiesH2=document.querySelector("#allergiesH2");
divCart=document.createElement("div");

const h1menu=document.querySelector("h1");
const isSwedish=localStorage.getItem("isSwedish");
const isEnglish=localStorage.getItem("isEnglish");

var htmlElement = document.documentElement;


//-----------------FETCH----------

fetch('food.json').then((response) => {
  return response.json();
})

.then((data) => {
console.log(data);



//---------------------------------------Translate to English function
function translateEnglish(){
  htmlElement.setAttribute("lang", "en"); 
  h1menu.innerHTML = 'Lucky<br>Duck';

  data.forEach(function(currentValue,index){
    const foodTD=document.createElement("div");
    const newTitle=document.createElement("h2");
    const newDescription=document.createElement("p");
    const menuChoice=document.createElement("div");
    const buyButton=document.createElement("input");
    const deleteButton=document.createElement("input");
    const timesCourseDisplay=document.createElement("span");
    const priceDisplay=document.createElement("span");
    let timesCourse=0;
  
    const newClassName = 'custom-font';
    const spans = document.querySelectorAll('span');
    
    spans.forEach(span => {
        span.classList.add(newClassName);
    
        buyButton.classList.add(newClassName);
    });


    foodCard.appendChild(foodTD);
    foodTD.appendChild(newTitle).style.fontFamily="'Poppins', sans-serif";
    newDescription.innerHTML=currentValue.description.en;
    foodTD.appendChild(newDescription).style.fontFamily="'Poppins', sans-serif";
    newDescription.appendChild(menuChoice);
    foodCard.appendChild(foodTD);
    menuChoice.appendChild(buyButton);
    menuChoice.appendChild(timesCourseDisplay);
    menuChoice.appendChild(deleteButton);
    menuChoice.appendChild(priceDisplay);
    document.querySelector(".side-box").appendChild(divCart);

        //-- Values for our english page"
        buyButton.type="button";
        buyButton.value="+";
        deleteButton.type="button";
        deleteButton.value="-" //"\u{1F5D1}"; -Trashcan
        timesCourseDisplay.innerHTML=timesCourse;
        newTitle.innerHTML=currentValue.title.en;
        divCart.id ="cart";
        divCart.innerHTML ="Your shop cart is empty!";
        priceDisplay.innerHTML = "<br>" + currentValue.price + " kr";

        // Event Listeners
        buyButton.addEventListener("click", function () {
          timesCourse++;
          timesCourseDisplay.textContent =timesCourse; 
          cartBuyEventListener(currentValue, index);
        });

        deleteButton.addEventListener("click", function () {
          if (timesCourse > 0) {
            timesCourse--;
            timesCourseDisplay.textContent =timesCourse; 
            cartDeleteEventListener(currentValue, index);
          }
        });

    })

    // Shopcart start
    function cartDeleteEventListener(item, index) {
      const cartItem =cartItems.find((cartItem) => cartItem.item.id ===item.id);
      if (cartItem && cartItem.quantity > 0) {
        cartItem.quantity--;
    
        if (cartItem.quantity ===0) {
          const itemIndex =cartItems.indexOf(cartItem);
          cartItems.splice(itemIndex, 1);
        }
        updateCart();
      }
    }
    function cartBuyEventListener(item, index) {
      const cartItem =cartItems.find((cartItem) => cartItem.item.id ===item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cartItems.push({
          item: item,
          quantity: 1,
        });
      }
      updateCart();
    }

    //Update CartItems beginning
    function updateCart() {
      sumTotal =0;
      cartItems.forEach((cartItem) => {
        sumTotal +=(Array.isArray(cartItem.item.price) ? cartItem.item.price[0] : cartItem.item.price) * cartItem.quantity;
      });
      const cartContent =cartItems
    .map((cartItem) => `${cartItem.item.title.en} - ${Array.isArray(cartItem.item.price) ? cartItem.item.price[0] : cartItem.item.price} kr (Times: ${cartItem.quantity}, Sum: ${Array.isArray(cartItem.item.price) ? cartItem.item.price[0] * cartItem.quantity : cartItem.item.price * cartItem.quantity} kr)`)
    .join("<br>");

  if (cartItems.length !==0) {
    divCart.innerHTML =`${cartContent}<br>Total amount: ${sumTotal} kr`;
  } else {
    divCart.innerHTML ="Your shop cart is empty!";
  }
}
    //Update CartItems ending

  labelVeg.textContent="Vegetarian";
  labelVeg2.textContent="Chicken";
  labelVeg3.textContent="Beef";
  labelVeg4.textContent="Pork";
  labelVeg5.textContent="Seafood";
  labelAllergy.textContent="Gluten-free";
  labelAllergy2.textContent="Dairy-free";
  mainCourseH2.textContent="Main Course";
  allergiesH2.textContent="Allergies";
  
}

//-----------------------------------Translate to Swedish Function
function translateSwedish(){
  htmlElement.setAttribute("lang", "sv"); 
  h1menu.innerHTML = 'Lucky<br>Duck';

  data.forEach(function(currentValue,index){
    const foodTD=document.createElement("div");
    const newTitle=document.createElement("h2");
    const newDescription=document.createElement("p");
    const menuChoice=document.createElement("div");
    const buyButton=document.createElement("input");
    const deleteButton=document.createElement("input");
    const timesCourseDisplay=document.createElement("span");
    const priceDisplay=document.createElement("span");

    let timesCourse=0;

    
    //Make price font smaller
const newClassName = 'custom-font';
const spans = document.querySelectorAll('span');

spans.forEach(span => {
    span.classList.add(newClassName);

    buyButton.classList.add(newClassName);
});


  
    foodCard.appendChild(foodTD);
    foodTD.appendChild(newTitle).style.fontFamily="'Poppins', sans-serif";
    newDescription.innerHTML=currentValue.description.sv;
    foodTD.appendChild(newDescription).style.fontFamily="'Poppins', sans-serif";
    newDescription.appendChild(menuChoice);
    foodCard.appendChild(foodTD);
    menuChoice.appendChild(buyButton);
    menuChoice.appendChild(timesCourseDisplay);
    menuChoice.appendChild(deleteButton);
    menuChoice.appendChild(priceDisplay);
    document.querySelector(".side-box").appendChild(divCart);


        //-- Olika "värden för vår svenska funktion"
        buyButton.type="button";
        buyButton.value="+";
        deleteButton.type="button";
        deleteButton.value="-" //"\u{1F5D1}"; -Trashcan
        timesCourseDisplay.innerHTML=timesCourse;
        newTitle.innerHTML=currentValue.title.sv;
        divCart.id ="cart";
        divCart.innerHTML ="Din kundvagn är tom!";
        priceDisplay.innerHTML = "<br>" + currentValue.price + " kr";

        // Event Listeners
        buyButton.addEventListener("click", function () {
          timesCourse++;
          timesCourseDisplay.textContent =timesCourse; 
          cartBuyEventListener(currentValue, index);
        });

        deleteButton.addEventListener("click", function () {
          if (timesCourse > 0) {
            timesCourse--;
            timesCourseDisplay.textContent =timesCourse; 
            cartDeleteEventListener(currentValue, index);
          }
        });

    })

    // Kundvagn börjar
    function cartDeleteEventListener(item, index) {
      const cartItem =cartItems.find((cartItem) => cartItem.item.id ===item.id);
      if (cartItem && cartItem.quantity > 0) {
        cartItem.quantity--;
    
        if (cartItem.quantity ===0) {
          const itemIndex =cartItems.indexOf(cartItem);
          cartItems.splice(itemIndex, 1);
        }
        updateCart();
      }
    }
    function cartBuyEventListener(item, index) {
      const cartItem =cartItems.find((cartItem) => cartItem.item.id ===item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cartItems.push({
          item: item,
          quantity: 1,
        });
      }
      updateCart();
    }
    //Uppdatera kundvagn början
    function updateCart() {
      sumTotal =0;
      cartItems.forEach((cartItem) => {
        sumTotal +=(Array.isArray(cartItem.item.price) ? cartItem.item.price[0] : cartItem.item.price) * cartItem.quantity;
      });
      const cartContent =cartItems
    .map((cartItem) => `${cartItem.item.title.sv} - ${Array.isArray(cartItem.item.price) ? cartItem.item.price[0] : cartItem.item.price}kr (Antal: ${cartItem.quantity}, Totalt pris: ${Array.isArray(cartItem.item.price) ? cartItem.item.price[0] * cartItem.quantity : cartItem.item.price * cartItem.quantity} kr)`)
    .join("<br>");

  if (cartItems.length !==0) {
    divCart.innerHTML =`${cartContent}<br>Totalsumma: ${sumTotal} kr`;
  } else {
    divCart.innerHTML ='Din kundvagn är tom';
  }
}
    //Uppdatera kundvagn slut

  labelVeg.textContent="Vegetariskt";
  labelVeg2.textContent="Kyckling";
  labelVeg3.textContent="Nötkött";
  labelVeg4.textContent="Fläsk";
  labelVeg5.textContent="Fisk & Skaldjur";
  labelAllergy.textContent="Glutenfritt";
  labelAllergy2.textContent="Laktosfritt";
  mainCourseH2.textContent="Huvudrätt";
  allergiesH2.textContent="Allergier";
}

var clear=document.querySelector(".meny-container");

function clearForfoodTD(){
  clear.innerHTML="";
};


// Check if Swedish or English is in local storage
function checkLanguage() {
  
    if (isSwedish ==="true") {
      translateSwedish();
    } else if (isEnglish ==="true") {
      translateEnglish();
    } else {
      // Default to Swedish if neither language is selected
      localStorage.setItem("isSwedish", "true");
      translateSwedish();
    }
  }
  
  // Attach the checkLanguage function to the onload event
  onload=checkLanguage;
  
  // Language dropdown selection
  enDropDown.addEventListener("click", function () {
    console.log("User choose English");
    localStorage.clear();
    localStorage.setItem("isEnglish", "true");
    clearForfoodTD();
    translateEnglish();
  });
  
  svDropDown.addEventListener("click", function () {
    console.log("User choose Swedish");
    localStorage.clear();
    localStorage.setItem("isSwedish", "true");
    clearForfoodTD();
    translateSwedish();
  });
  




}).catch(function(error){
  console.error("something went wrong with retriving data")
  console.log(error)
})
//hejsan