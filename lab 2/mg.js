var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

mongoClient.connect(url, {useNewUrlParser:true}, (err, mongo) => {
    if (err) throw err
    let db = mongo.db('hsagarthegr8')
    db.collection("node").find({},{_id:0}).toArray((err, res) => {
        if(err) throw err
        console.log(res)
        mongo.close()
    })
})