const http = require('http');
const { parse } = require('querystring')

const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        collectRequestData(req, result => {
            console.log(result)
            res.writeHead(200, { 'Content-Type': 'text/json' })
            res.end(JSON.stringify(result))
        })
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="username" placeholder="Enter Username" /><br />
                    <input type="password" name="password" placeholder="Enter Password" /><br />
                    <input type="submit" value="Submit" />
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(8080, () => console.log('Listening of port 8080'));

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}