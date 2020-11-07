async function addToCart (event)  {
    let _id = event.target.dataset.id
    fetch('/basket',
        {
          method: "POST",
          body: JSON.stringify({_id}),
          headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
        
          return res.json();
       
          console.log(res)
        
      }).then((json) => {
        console.log(json);
      })
        
      
    console.log(_id)
} 
