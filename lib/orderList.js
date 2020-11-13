const createOrderList = (basket) => {
  let orderlist = []
  for (const [id, product] of Object.entries(basket)) {
        if(id == 'total') {
            continue
        }
        orderlist.push(  
          {
            name: product.name,
            price: product.price,
            quantity: product.quantity
          },
        )
      }
      return orderlist
}
module.exports = createOrderList