const readline = require('readline');


const Ad = require('./models/Ad');

async function main() {
    
    const confirm = await askQuestion('Are you sure you want to delete all content from the database? [n] (press "y" to confirm)')
    if (!confirm) {
        process.exit();
    }
    
    const connection = require ('./lib/connectMongoose');

    await initAds();

    connection.close();
};

main().catch(err => console.log('There was an error', err));

async function initAds() {
    const result = await Ad.deleteMany();
    console.log(`${ result.deletedCount } ads deleted.`);

    const inserted = await Ad.insertMany ([
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
    ]);
    console.log(`${inserted.length} ads created.`);
};

function askQuestion(text) {
    return new Promise ((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(text, answer => {
            interface.close();
            if (answer.toLowerCase() === 'y') {
                resolve (true);
                return;
            }
            resolve (false)
        })
    });
};

