# Nodepop
We have been requested to create an API that will run on the server of a second-hand item sales service called Nodepop. It allows you to make queries using different methods and filtering by various criteria.

## Technologies
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## MongoDB
For the API to work it is necessary to have MongoDB installed. Once you do it, you should run a local MongoDB server:

```
./bin/mongod --dbpath ./data
```

## Deploy:

```sh
npm install
```

## Load initial data to database:

```
npm run init-db
```

## Start the application in production:

```sh
npm start
```

## Start the application in development:

```sh
npm run dev
```

## API Documentation

### Ads list: 
GET http://localhost:3000/api/ads
```
{
    "results": [
        {
            name: "Headphones",
            onSale: true,
            price: 59.99,
            img: "headphones.jpeg",
            tags: [ "lifestyle", "work"]
        },
        {
            name: "Scooter",
            onSale: false,
            price: 170.00,
            img: "scooter.jpeg",
            tags: [ "motor"] 
        },
        {
            name: "iPhone 14 Pro",
            onSale: true,
            price: 1319.00,
            img: "iphone14-pro.jpeg",
            tags: [ "mobile"] 
        }
    ]
}
```
### Filter by name:
GET http://localhost:3000/api/ads?name=sc

### Filter by type/status:
GET http://localhost:3000/api/ads?onSale=true

### Filter by price:
- Exact price: 
GET http://localhost:3000/api/ads?price=59.99
- Lower than:
GET http://localhost:3000/api/ads?price=-1000
- Greater than:
GET http://localhost:3000/api/ads?price=100-
- Range:
GET http://localhost:3000/api/ads?price=100-1500

### Filter by tag:
GET http://localhost:3000/api/ads?tags=motor

### Pagination:
GET http://localhost:3000/api/ads?skip=1&limit=2

### Field selection:
GET http://localhost:3000/api/ads?fields=price

### Sort:
GET http://localhost:3000/api/ads?sort=name

### Tags list:
GET http://localhost:3000/api/ads/tags

### Image:
GET http://localhost:3000/images/headphones.jpeg

### Create a new ad:
POST http://localhost:3000/api/ads (body=adData)


