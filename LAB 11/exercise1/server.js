
const http = require('http');   // Import built-in http module

const PORT = 3000;

// Create the server using http.createServer()
const server = http.createServer((req, res) => {
    
    // Log every incoming request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Set response headers
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Powered-By', 'Node.js Built-in HTTP Module');

    // Route Handling
    if (req.url === '/' || req.url === '/home') {
        // Home Page
        res.writeHead(200); // OK status
        res.write(`
            <html>
            <head>
                <title>Exercise 1 - Node.js HTTP Server</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; margin-top: 100px; }
                    h1 { color: #333; }
                    p { color: #666; }
                </style>
            </head>
            <body>
                <h1>✅ Welcome to Exercise 1</h1>
                <p>This is a simple Node.js server using only the built-in <strong>http</strong> module.</p>
                <p>No Express.js or any external framework is used.</p>
                <hr>
                <p><strong>Try these URLs:</strong></p>
                <ul style="display: inline-block; text-align: left;">
                    <li><a href="/">/</a> - Home</li>
                    <li><a href="/about">/about</a></li>
                    <li><a href="/contact">/contact</a></li>
                    <li><a href="/api">/api</a> (JSON response)</li>
                </ul>
            </body>
            </html>
        `);
        res.end();

    } else if (req.url === '/about') {
        res.writeHead(200);
        res.write(`
            <h1>About This Server</h1>
            <p>This server demonstrates how Node.js handles HTTP requests and responses using the core <strong>http</strong> module.</p>
            <p>Features shown:</p>
            <ul>
                <li>Creating server with http.createServer()</li>
                <li>Request handling</li>
                <li>Setting headers</li>
                <li>Different routes</li>
                <li>Console logging</li>
            </ul>
        `);
        res.end();

    } else if (req.url === '/contact') {
        res.writeHead(200);
        res.end('<h1>Contact Page</h1><p>Email: support@example.com</p>');

    } else if (req.url === '/api') {
        // JSON Response Example
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        const responseData = {
            message: 'Hello from Node.js HTTP Server',
            exercise: 'Exercise 1',
            timestamp: new Date().toISOString(),
            status: 'success'
        };
        res.end(JSON.stringify(responseData, null, 2));

    } else {
        // 404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>404 - Page Not Found</h1>
            <p>The requested URL <strong>${req.url}</strong> was not found on this server.</p>
            <a href="/">Go Back Home</a>
        `);
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`✅ Exercise 1: Built-in HTTP Module Demo`);
    console.log(`📌 Open your browser and visit: http://localhost:${PORT}`);
});