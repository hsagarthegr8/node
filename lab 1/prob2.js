var fs = require('fs')
var http = require('http')

http.createServer((req,res) => {
    fs.readFile('sample.txt', (err, data) => {
        if(err) throw err
    
        console.log(data.toString())
        res.writeHead(200, {'Content-Type':'text/plain'})
        res.write(data.toString())
        res.end()
    })
}).listen(8080, ()=>console.log("Listening on port 8080"))
