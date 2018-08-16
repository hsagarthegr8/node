const prompt = require("readline-sync");
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

function home() {
	let options = [
		"Insert Data",
		"Display All Data",
		"Find by ID",
		"Delete by ID",
		"Update by ID"
	];
	let choice = prompt.keyInSelect(options, "Select your option");
	switch (choice) {
		case 0:
			insertUtil();
			break;
		case 1:
			displayAll();
			break;
		case 2:
			findByIdUtil();
			break;
		case 3:
			deleteByIdUtil();
			break;
		case 4:
			updateByIdUtil();
			break;
		case -1:
			console.log("Byeeeee...");
			break;
	}
}

function insertUtil() {
	let id = prompt.questionInt("Enter Product Id: ");
	let name = prompt.question("Enter Product Name:");
	let cost = prompt.questionFloat("Enter Product Cost: ");
	let desc = prompt.question("Enter Product Description: ");
	insert(id, name, cost, desc);
}

function insert(id, name, cost, desc) {
	mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
		if (err) throw err;
		let db = mongo.db("hsagarthegr8");
		let myObj = { pId: id, pName: name, pCost: cost, pDesc: desc };
		db.collection("node").insertOne(myObj, (err, res) => {
			if (err) throw err;
			console.log("1 Document Inserted");
			mongo.close();
			home();
		});
	});
}

function displayAll() {
	mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
		if (err) throw err;
		let db = mongo.db("hsagarthegr8");
		db.collection("node").find({}).toArray((err, res) => {
			if (err) throw err;
			console.log(
				res.map(obj => {
					return {
						ProductId: obj.pId,
						ProductName: obj.pName,
						ProductCost: obj.pCost,
						ProductDescription: obj.pDesc
					};
				})
			);
			mongo.close();
			home();
		});
	});
}

function findByIdUtil() {
	let id = prompt.questionInt("Enter ID to search: ");
	findById(id);
}

function findById(id) {
	mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
		if (err) throw err;
		let db = mongo.db("hsagarthegr8");
		db.collection("node").find({ pId: id }).toArray((err, res) => {
			if (err) throw err;
			console.log(
				res.map(obj => {
					return {
						ProductId: obj.pId,
						ProductName: obj.pName,
						ProductCost: obj.pCost,
						ProductDescription: obj.pDesc
					};
				})
			);
			mongo.close();
			home();
		});
	});
}

function deleteByIdUtil() {
	let id = prompt.questionInt("Enter ID to delete: ");
	deleteById(id);
}
function deleteById(id) {
	mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
		if (err) throw err;
		let db = mongo.db("hsagarthegr8");
		let query = { pId: id };
		db.collection("node").deleteOne(query, (err, obj) => {
			if (err) throw err;
			console.log("1 Document Deleted");
			mongo.close();
			home();
		});
	});
}

function updateByIdUtil() {
	let id = prompt.questionInt("Enter ID to update: ");
	let pName = prompt.question("Enter New Product Name:");
	let pCost = prompt.questionFloat("Enter New Product Cost: ");
	let pDesc = prompt.question("Enter New Product Description: ");
	updateById(id, pName, pCost, pDesc);
}

function updateById(id, pName, pCost, pDesc) {
	mongoClient.connect(url, { useNewUrlParser: true }, (err, mongo) => {
		if (err) throw err;
		let db = mongo.db("hsagarthegr8");
		let query = { pId: id };
		let newValues = { $set: { pName: pName, pCost: pCost, pDesc: pDesc } };
		db.collection("node").updateOne(query, newValues, (err, res) => {
			if (err) throw err;
			console.log("1 Document Updated");
			mongo.close();
			home();
		});
	});
}

home();
