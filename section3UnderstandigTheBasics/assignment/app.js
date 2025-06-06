const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>assignment</title></head>');
        res.write('<body>');
        res.write('Welcome, please enter a username :)');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username">');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if(url === "/create-user" && method === 'POST'){
        const body = [];
        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end',() => {
            const parcedBody = Buffer.concat(body).toString();
            const username = parcedBody.split('=')[1];
            console.log(username);

            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
        });
    }

    if(url === '/users'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body>');
        res.write('<h2>Welcome to my users list!!!</h2>');
        res.write('<ul>');
        res.write('<li>User_1</li>');
        res.write('<li>User_2</li>');
        res.write('<li>User_3</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
});

server.listen(3000);