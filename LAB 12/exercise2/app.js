const express = require('express');

const app = express();
const PORT = 3000;

// ==================== 1. GLOBAL APPLICATION-LEVEL MIDDLEWARE ====================

// Middleware 1: Logger - Logs every incoming request
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Pass control to next middleware
};

// Middleware 2: Request Time Stamp Adder
const addRequestTime = (req, res, next) => {
    req.requestTime = Date.now();
    console.log(`Request received at: ${req.requestTime}`);
    next();
};

// Middleware 3: Simple Authentication Simulation (checks for a custom header)
const simpleAuth = (req, res, next) => {
    console.log('🔐 Checking authentication...');
    if (req.headers['x-auth-token'] === 'secret123') {
        console.log('✅ Authentication passed');
        req.isAuthenticated = true;
    } else {
        console.log('⚠️ Authentication failed (no valid token)');
        req.isAuthenticated = false;
    }
    next(); // Continue even if auth fails (for demonstration)
};

// Apply Global Middleware (executed for ALL routes)
app.use(requestLogger);
app.use(addRequestTime);
app.use(simpleAuth);

// ==================== 2. ROUTE-LEVEL MIDDLEWARE ====================

// Custom Middleware for specific routes
const validateUser = (req, res, next) => {
    console.log('Validating user data...');
    if (req.body && req.body.username) {
        console.log(`User validated: ${req.body.username}`);
    } else {
        console.log('No username provided');
    }
    next();
};

// ==================== 3. ROUTES ====================

// Home Route - Uses only global middleware
app.get('/', (req, res) => {
    console.log('🏠 Home route handler executed');
    res.send(`
        <h1>Middleware Demo</h1>
        <p>Check your terminal for middleware execution logs!</p>
        <p><strong>Try these routes:</strong></p>
        <ul>
            <li><a href="/about">/about</a></li>
            <li><a href="/dashboard">/dashboard (with auth header)</a></li>
            <li>POST to /users</li>
        </ul>
    `);
});

// About Route - Uses global + route-level middleware
app.get('/about', (req, res) => {
    console.log('📄 About route handler executed');
    res.send(`<h1>About Page</h1><p>Request Time: ${new Date(req.requestTime)}</p>`);
});

// Dashboard Route - Protected simulation using route-level middleware
const dashboardMiddleware = (req, res, next) => {
    console.log('🔒 Dashboard access check...');
    if (req.isAuthenticated) {
        next();
    } else {
        console.log('❌ Access denied to dashboard');
        return res.status(403).send('<h1>Access Denied</h1><p>Valid x-auth-token required</p>');
    }
};

app.get('/dashboard', dashboardMiddleware, (req, res) => {
    console.log('✅ Dashboard route handler executed');
    res.send(`
        <h1>Welcome to Dashboard</h1>
        <p>Authenticated: ${req.isAuthenticated}</p>
        <p>Request processed in ${Date.now() - req.requestTime}ms</p>
    `);
});

// POST Route with body parsing and validation middleware
app.use(express.json()); // Built-in middleware to parse JSON body

app.post('/users', validateUser, (req, res) => {
    console.log('👤 User creation route executed');
    console.log('Received body:', req.body);
    
    res.json({
        message: 'User created successfully',
        user: req.body,
        requestTime: req.requestTime,
        authenticated: req.isAuthenticated
    });
});

// ==================== 4. ERROR HANDLING MIDDLEWARE (Last Middleware) ====================

app.use((err, req, res, next) => {
    console.error('❌ Error occurred:', err.message);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('📋 Middleware execution order demonstration started...\n');
});