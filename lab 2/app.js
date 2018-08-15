const prompt = require('readline-sync')
const mongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

let options = ['Insert Data', 'Display All Data', 'Find by ID', 'Delete by ID', 'Update by ID']
let choice = prompt.keyInSelect(options, 'Select your option')

while (choice != -1) {
    
    console.log(choice)
    switch (choice) {
        case 0:
            console.log("Insert")
            //insert()
            break
        case 1:
            displayAll()
            console.log("DIsplay")
            setTimeout(()=>{},2000)
            break
        case 2:
            console.log("find")
            setTimeout
            //findById()
            break
        case 3:
        console.log("delete")
            //deleteById()
            break
        case 4:
        console.log("update")
            //updateById()
            break
    }
    choice = prompt.keyInSelect(options, 'Select your option')
}


function insert() {
    let id = prompt.questionInt("Enter Product Id: ")
    let name = prompt.questionInt("Enter Product Name:")
    let cost = prompt.questionFloat("Enter Product Cost: ")
    let desc = prompt.question("Enter Product Description: ")
    insertIntoDb(id, name, cost, desc)
}

function insertIntoDb(id, name, cost, desc) {
    mongoClient.connect(url, (err, mongo) => {
        if (err) throw err
        let db = mongo.db('hsagarthegr8')
        let myObj = { pId: id, pName: name, pCost: cost, pDesc: desc }
        db.collection("node").insertOne(myObj, (err, res) => {
            if (err) throw err
            console.log("1 document inserted")
            mongo.close()
        })
    })
}

function displayAll() {
    mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
        if (err) throw err
        let db = mongo.db('hsagarthegr8')
        db.collection("node").find({}, { _id: 0 }).toArray((err, res) => {
            if (err) throw err
            console.log(res)
            mongo.close()
        })
    })
}

function findById() {

}

function deleteById() {

}

function updateById() {

}

