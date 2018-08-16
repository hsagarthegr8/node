const express = require('express')
const parser = require('body-parser')
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const fs = require('fs')
const app = express()

let employees = []

app.use(parser.json())
app.get('/', (req, res) => {
    let state = req.query.state
    //console.log(req.query.state)
    fs.readFile("employees.json", (err, data) => {
        employees = JSON.parse(data.toString())
        /*if(req.query.state) {
            employees = employees.filter((emp) => 
                emp.empAddress.state == req.query.state
            )
        }*/
        //console.log(employees)
        mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
            if (err) throw err;
            let db = mongo.db("hsagarthegr8");
            db.collection("employees").insertMany(employees, (err, result) => {
                if (state) {
                    db.collection("employees").find({ "empAddress.state": state }).toArray((err, result) => {
                        if (err) throw err
                        res.send(result)
                    })
                }
                else {
                    db.collection("employees").find({}).toArray((err, result) => {
                        if (err) throw err
                        res.send(result)
                    })
                }
                mongo.close();
            });
        })
    })

})

app.post('/', (req, res) => {
    console.log("In post")
    console.log(req.body)
    mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
		if (err) throw err;
		let db = mongo.db("hsagarthegr8");
		let myObj = req.body
		db.collection("employees").insertOne(myObj, (err, result) => {
			if (err) throw err;
			console.log("1 Document Inserted");
            res.send(req.body)
			mongo.close();
		});
	});
    
    
})

app.put('/', (req, res) => {
    console.log('Put')
    console.log(req.body)
    console.log(req.body.empAddress)
    mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
		if (err) throw err;
		let db = mongo.db("hsagarthegr8");
		let query = { empId: req.body.empId };
		let newValues = {$set: {"empSalary":req.body.empSalary}};
		db.collection("node").updateOne(query, newValues, (err, result) => {
			if (err) throw err;
			console.log("1 Document Updated");
            //console.log(result)
             res.send(req.body)
			mongo.close();
		});
	});
})

app.listen(8080, () => console.log("Listening on port 8080"))
