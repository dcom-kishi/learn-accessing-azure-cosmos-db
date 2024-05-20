var mongoClient = require("mongodb").MongoClient;

// replace "MONGO_DB_URL" to Azure Cosmos DB for Mongodb account
const MONGO_DB_URL = "mongodb://username:password@host:port/[database]?ssl=true";
const client = new mongoClient(MONGO_DB_URL);

async function main() {
    await client.connect();
    const database = client.db("CryptocurrencyRateDbTest");
    const collections = database.collection("cryptocurrency_rate_collections");
    const count = await collections.countDocuments();
    console.log("cryptocurrency_rate_collections count: " + count);

    // get collection data
    const collection = await collections.findOne();
    console.log(collection);

    cryptocurrencyRateDocument = {
        "_id": require("mongodb").ObjectId(),
        "litecoin": {
            "jpy": 18642.66,
            "usd": 162.95
        },
        "bitcoin": {
            "jpy": 5855225,
            "usd": 51179
        },
        "ethereum": {
            "jpy": 465621,
            "usd": 4069.89
        },
        "ripple": {
            "jpy": 106.24,
            "usd": 0.92861
        },
        "iostoken": {
            "jpy": 4.03,
            "usd": 0.03521283
        },
        "monacoin": {
            "jpy": 152.99,
            "usd": 1.34
        },
        "ethereum-classic": {
            "jpy": 4387.01,
            "usd": 38.35
        },
        "bitcoin-cash": {
            "jpy": 52070,
            "usd": 455.13
        },
        "nem": {
            "jpy": 15.72,
            "usd": 0.137367
        },
        "lisk": {
            "jpy": 318.62,
            "usd": 2.79
        }
    };

    // insert 10 data
    let cryptocurrencyRateDocumentList = [];
    for (let i = 0; i < 10; i++) {
        // prevent duplication of _id(object id)
        cryptocurrencyRateDocument._id = require("mongodb").ObjectId();
        // make a deep copy and then add it to the list
        cryptocurrencyRateDocumentList.push({ ...cryptocurrencyRateDocument });
    }
    await collections.insertMany(cryptocurrencyRateDocumentList);

    client.close();
}

main();