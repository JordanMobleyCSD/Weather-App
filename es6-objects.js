// Object property shorthand 

const name = 'Jordan'
const userAge = 26

const user = {
    name, 
    age: userAge,
    location: 'Charlotte'
}

console.log(user)

// Object destructuring 

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 200,
    salePrice: undefined,
    rating: 4.2
}

// const label = product.label
// const stock = product.stock



// refactored destructuring of lines 23-24 -- destructuring syntax
// const {label:productLabel, stock, rating = 5} = product

// console.log(productLabel)
// console.log(stock)
// console.log(rating) 


const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)