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

    let list = []
    let conditions = {}
    const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    for (let i = 0; i < 10; i++) {
        let res = await collections.find(conditions).sort({ _id: -1 }).limit(10).toArray();
        list = list.concat(res);
        oldDateObjectId = res.slice(-1)[0]._id;
        conditions = { "_id": { "$lt": oldDateObjectId } }
        await sleep(1000);
        console.log("count: " + i);
    }

    console.log("list size:" + list.length);
    list.forEach(value => {
        console.log("ObjectId: " + value._id + " , Date: " + require("mongodb").ObjectId(value._id).getTimestamp());
    });
    client.close();
}

main();