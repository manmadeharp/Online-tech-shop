// await delay(2000);
async function addToCart (event)  {
    let _id = event.target.dataset.id
     const delay = ms => new Promise(res => setTimeout(res, ms));
     await delay(2000);
    try {
    //   await delay(2000);
      await fetch('/basket',
        {
          method: "POST",
          body: JSON.stringify({_id}),
          headers: {
                "Content-Type": "application/json"
            }
        })
    console.log(_id)
   } catch(error) {
     console.log(error)
  }
}
async function removeFromCart (event)  {
    let _id = event.target.dataset.id
    await fetch('/basket/remove',
        {
          method: "POST",
          body: JSON.stringify({_id}),
          headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            location.reload()
      })
        
      
    console.log(_id)
} 

var stripe = Stripe("pk_test_51HmFuBIepdJVzFGkGUfKijTUJJgZaAD298BWMauq1uqzTZ23YImzXSUHyykwjefnSIU9jOlJgM6xCVMqZxIZba7z00W7yl1az0");
   var checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", function () {
      fetch("/create-session", {
        method: "POST",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          // If redirectToCheckout fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using error.message.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    });