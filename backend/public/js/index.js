async function addToCart (event)  {
    let _id = event.target.dataset.id
    await fetch('/basket',
        {
          method: "POST",
          body: JSON.stringify({_id}),
          headers: {
                "Content-Type": "application/json"
            }
        })
        
        
      
    console.log(_id)
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
