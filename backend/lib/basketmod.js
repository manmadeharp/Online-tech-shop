const calculateTotal = (basket) => {
    let total = 0
    // console.log(basket)
    for (const [key, product] of Object.entries(basket)) {
        if(key == 'total') {
            continue
        }
        // console.log(typeof product)
        // console.log(typeof product.quantity)
        total += product.price*product.quantity

    }
    // console.log(total)
    return total
}

module.exports = calculateTotal