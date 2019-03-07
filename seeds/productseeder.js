const mongoose = require('mongoose')

const Product = require('../models/products')

const products = [
  new Product({
    imagePath: "https://www.mobygames.com/images/covers/l/525981-tekken-7-dlc-7-armor-king-playstation-4-front-cover.jpg",
    title: "King",
    description: "tekken 7",
    price: 100
  }),
  new Product({
    imagePath: "https://thumbs.mic.com/Y2VlNTUwYWNmMyMvLUVFYXpTWXhic05OQ3pXSV9la0ZrbFhWR0h3PS8zMjV4ODI6MTU5NXgxMzUzLzgwMHg4MDAvZmlsdGVyczpmb3JtYXQoanBlZyk6cXVhbGl0eSg4MCkvaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL3BvbGljeW1pYy1pbWFnZXMvZHkycW43bHVsbGtjcGpnaThsdHl5cm51ZDhybG1kcGp1ajduZWc4Z2FtejdxMm0xcHJwZ2VnNXo1c2NnbG9kYS5qcGc.jpg",
    title: "Kazuya",
    description: "tekken 7",
    price: 1000
  }),
  new Product({
    imagePath: "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc5V9nBiRaoDEnD1eVZwyJwAIM8rW0o.gsvq3zRSgVlZ5LYn8sYSzuVokxXnsgS0hFpugYWmqEXVhtlFjJtVO3rBKn11dCA3Td2.cbrc6zdOytlEFOEUQpIk0KILZjeD6qLNnF8qZTBF6kNtkoRgzE200ZBjHrZkdy_jWQTGuJ8J8-&w=800&h=800&format=jpg",
    title: "Marduk",
    description: "tekken 7",
    price: 1000
  })
]

// for(i=0; i < products.length; i++){
//     products[i].save()
// }
products.map(i => {
  i.save() 
})

module.exports = products