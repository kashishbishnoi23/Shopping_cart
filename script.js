// add to cart button:

let cart_buttons = Array.from(document.querySelectorAll(".cart_btn"));

let add_item_buttons = Array.from(document.querySelectorAll(".add_item_btn"));

// let your_cart_display = document.querySelector("#your_cart_quantity");

let empty_cart = document.querySelector(".empty_cart");

let cart = document.querySelector(".cart");

let total_amount = 0;
let order = document.querySelector(".order");

let order_added = false;
let ordered_items = document.querySelector(".ordered_items");




// changing the cart_button on click :

let total_items = 0;

cart_buttons.forEach((item) => {
    item.addEventListener("click", (event) => {
        event.currentTarget.classList.add('hidden');
        event.currentTarget.nextElementSibling.classList.remove('hidden');
        event.currentTarget.nextElementSibling.classList.add('flex');
        let id = parseInt(event.currentTarget.parentElement.id);
        items_array[id - 1]++;

        event.currentTarget.classList.add(`cart_button-${id}`);
        

        event.currentTarget.nextElementSibling.classList.add(`addItem_button-${id}`);

    
        event.currentTarget.nextElementSibling.children[1].innerText = `${items_array[id - 1]}`;
        
        document.querySelector(".empty_cart").classList.add("hidden");

        total_items = items_array.reduce((accumulator, currentValue) =>
            accumulator + currentValue, 0
    )

    total_amount += product_array[id-1].price;
    
    
    if (!order_added){
        add_to_Cart(id, 1);
        add_order(total_amount);
    } else {
        remove_order();
        add_to_Cart(id, 1);
        add_order(total_amount);
    }










    })
})


function remove_order(){
    document.querySelector(".order").remove();
}


// creating an array of number of items of each dessert and display the total number of items:

add_item_buttons.forEach((item) => {

    item.addEventListener("click", (event) => {
        let id = parseInt(event.currentTarget.parentElement.id);
        let item_count = event.currentTarget.children[1];

        if (event.target.classList.contains("increment")) {
            items_array[id - 1]++;

            total_amount += product_array[id-1].price;



            item_count.innerText = `${items_array[id - 1]}`;
            total_items = items_array.reduce((accumulator, currentValue) =>
                accumulator + currentValue, 0
            )

            document.querySelector(".your_cart_quantity").innerHTML= `Your Cart (${total_items})`;

            document.querySelector(".total_order").innerHTML = `$${total_amount.toFixed(2)}`;

            // add or update:
            if (!items_array[id-1]){
               add_to_Cart(id, items_array[id-1]);
            } else {
                update_cart(id, items_array[id-1]); 
            }



        } else if (event.target.classList.contains("decrement")) {

            if (!total_items) {
                empty_cart.classList.remove('hidden');
            }


     // decreasing the count of items in array:
            if (items_array[id - 1] > 0) {
                items_array[id - 1]--;

                if (!items_array[id - 1]) {
                    event.currentTarget.classList.add('hidden');
                    event.currentTarget.previousElementSibling.classList.remove('hidden');

                }
                item_count.innerText = `${items_array[id - 1]}`;
                total_items = items_array.reduce((accumulator, currentValue) =>
                    accumulator + currentValue, 0
                )

                total_amount -= product_array[id-1].price;
                
            document.querySelector(".your_cart_quantity").innerHTML= `Your Cart (${total_items})`;
            document.querySelector(".total_order").innerHTML = `$${total_amount.toFixed(2)}`;


            }

           
            update_cart(id, items_array[id-1]); 
             


            if (!items_array[id-1]){
                cart.removeChild(cart.querySelector(`.item-${id}`))
             
            }

            if (!total_amount){
                remove_order();
                order_added = false;
               
                document.querySelector(".empty_cart").classList.remove("hidden");
            }
        }

    })



})






function add_to_Cart(id, count) {

    let product_name = product_array[id - 1].name;
    let price = product_array[id - 1].price.toFixed(2);

    document.querySelector(".your_cart_quantity").innerText= `Your Cart (${total_items})`;
   

    cart.innerHTML += `   
    
    <div class="item-${id} flex items-center justify-between w-full py-4">
    <div class="flex flex-col gap-2 ">
    <div class="text-sm font-semibold"> ${product_name} </div>

    <div class="flex gap-3 items-center text-xs">
    <div class="count text-orange font-bold"> ${count}x</div>
    <div class="price text-gray-400"> @$${price}</div>
    <div class="total_price text-gray-500 font-semibold">$${(count * price).toFixed(2)}  </div>
    </div>
    </div>

    <button class="cancel_item_${id} border border-gray-300 fill-cross_fill hover:fill-orange hover:border-orange rounded-full p-1">
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"  viewBox="0 0 10 10"><path  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
    </button>

    </div>

    <hr>
    `

    // console.log(document.querySelector(".cart").innerHTML)

    
// canceling the item using cancel button:


    cart.addEventListener('click', (event) => {
        if (event.target.closest(`.cancel_item_${id}`)) {
            const item = document.querySelector(`.item-${id}`);
            item.remove();
            total_amount -= (product_array[id-1].price)*items_array[id-1];
            document.querySelector(".total_order").innerHTML = `$${total_amount}`;
            total_items -= items_array[id-1];
            document.querySelector(".your_cart_quantity").innerHTML = `Your Cart(${total_items})`;
            items_array[id-1] = 0;

            document.querySelector(`.addItem_button-${id}`).classList.add("hidden");

            document.querySelector(`.cart_button-${id}`).classList.remove("hidden");

           





            if (!total_amount){
                cart.removeChild(document.querySelector(".order"));
                document.querySelector(".empty_cart").classList.remove("hidden");
                order_added = false;
            }



        }
    })


    
    

}


function update_cart(id, count){

    let product = document.querySelector(`.item-${id}`);
    let price = product_array[id - 1].price.toFixed(2);
    // console.log(product);

    product.querySelector(".count").innerText = `${count}x`;
    product.querySelector(".total_price").innerText = (count*price).toFixed(2);


}



function add_order(total_amount){

  cart.innerHTML += `<div class="order flex flex-col">
      <div class="flex justify-between items-center">
        <div class="text-sm font-semibold">Order Total</div>
        <div class="total_order font-bold">$${total_amount.toFixed(2)}</div>
      </div>

      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>

        <div class="text-sm font-semibold bg-bg_color p-4 my-3">This is a <span class="font-bold">carbon-neutral </span> delivery</div>
      </div>

      <button class="confirm-btn bg-orange py-3 rounded-full text-white text-sm">Confirm Order</button>

      <div>

      </div>
    </div>`

   
    

    order_added = true;

}

//  handling the confirm button:

document.body.addEventListener('click', (event)=>{
    if (event.target.classList.contains("confirm-btn")){   
    items_array.forEach((item, index)=>{
            if (item > 0){
                let name = product_array[index].name;
                let image = product_array[index].image.desktop;
                let number = item;
                let price_of_each = product_array[index].price;
                let total_price = (product_array[index].price)*item;

                document.querySelector(".ordered_items").innerHTML += `
    <div class="flex ordered_item justify-between items-center max-h-24 p-2 pb-3 w-full">

    <div class="flex gap-3 w-full">
    <img src="${image}" class="h-10"> 
    <div class="flex flex-col justify-between">
    <div class="text-xs font-semibold"> ${name} </div>
    <div class="flex gap-3 items-center text-xs">
    <div class="count text-orange font-bold"> ${number}x</div>
    <div class="price text-gray-400"> @$${(price_of_each).toFixed(2)}</div>
    </div>
    </div>

    </div>

    <div class="total_price text-xs font-semibold">$${(total_price).toFixed(2)}  </div>

    </div>
    <hr>
                `

            }
        })

        document.querySelector(".child").innerHTML += `
        <div class="flex ordered_items_amount justify-between items-center px-4 bg-bg_color pb-4">
        <div class="text-xs font-semibold">Order Total</div>
        <div class="total_order text-xl font-bold">$${total_amount.toFixed(2)}</div>
      </div>  
        `

      document.querySelector(".order_container").innerHTML += `
      <button class="new_order_btn text-white text-xs rounded-full bg-orange p-3">
       Start New Order
      </button>
      `

      document.querySelector(".order_container").classList.remove("hidden", "z-3");
      
      document.querySelector(".shadow").classList.remove("hidden");

      console.log("inside confirm : ")
      console.log(document.querySelector(".order_container"));
    }

})


// handling the start a new order button:

document.body.addEventListener('click', (event)=>{
    if (event.target.classList.contains("new_order_btn")){

        console.log("inside new order : ")
        console.log(document.querySelector(".order_container"));
        document.querySelector(".shadow").classList.add("hidden");
        document.querySelector(".order_container").classList.add("hidden");

        // resetting the whole page:
        total_amount = 0;
        total_items = 0;
        cart.querySelector(".order").remove();

        items_array.forEach((item, index)=>{
            if (item > 0){
                cart.querySelector(`.item-${index+1}`).remove();
                add_item_buttons[index].classList.add("hidden");
                add_item_buttons[index].previousElementSibling.classList.remove("hidden");
            }

        })

        items_array.forEach((item, index)=>{
            items_array[index] = 0;
        })

        console.log(items_array);

        document.querySelector(".empty_cart").classList.remove("hidden");

        document.querySelector(".your_cart_quantity").innerHTML = `Your Cart(${total_items})`
        order_added = false;



        // let ordered_items = Array.from(document.querySelectorAll(".ordered_item"));

        //  document.querySelector(".ordered_items").innerHTML = "";
        //  console.log(ordered_items);

        document.querySelector(".ordered_items").innerHTML = "";


         
        //  ordered_items.forEach((item)=>{
        //       item.remove();
        //  })

         document.querySelector(".ordered_items_amount").remove();

         document.querySelector(".new_order_btn").remove();


        // ordered_items.forEach((item)=>{
        //    item.remove();
        // })

        // document.querySelector(".new_order_btn").remove();
        // document.querySelector(".ordered_items_amount").remove();


        
        
    }
})

