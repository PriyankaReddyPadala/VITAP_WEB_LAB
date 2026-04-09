const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// In-memory "database" - array of users
let users = [];
let nextId = 1;

// ====================== CRUD ROUTES ======================

// CREATE - POST /users
app.post('/users', async (req, res) => {
    try {
        const newUser = {
            id: nextId++,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            createdAt: new Date()
        };

        users.push(newUser);
        console.log('✅ User Created:', newUser);

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ ALL - GET /users
app.get('/users', async (req, res) => {
    try {
        console.log(`📋 Retrieved ${users.length} users`);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ ONE - GET /users/:id
app.get('/users/:id', async (req, res) => {
    try {
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE - PUT /users/:id
app.put('/users/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users[index] = {
            ...users[index],
            name: req.body.name || users[index].name,
            email: req.body.email || users[index].email,
            age: req.body.age || users[index].age,
            updatedAt: new Date()
        };

        console.log('🔄 User Updated:', users[index]);
        res.json({
            message: 'User updated successfully',
            user: users[index]
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deletedUser = users.splice(index, 1)[0];
        console.log('🗑️ User Deleted:', deletedUser);

        res.json({
            message: 'User deleted successfully',
            deletedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Root Route
app.get('/', (req, res) => {
    res.send(`
        <h1>CRUD API with In-Memory Storage (No Database)</h1>
        <p>All CRUD operations are working using a JavaScript array.</p>
        <p>Routes:</p>
        <ul>
            <li>POST /users → Create</li>
            <li>GET /users → Read All</li>
            <li>GET /users/:id → Read One</li>
            <li>PUT /users/:id → Update</li>
            <li>DELETE /users/:id → Delete</li>
        </ul>
        <p>Data will be lost when server restarts (normal for in-memory).</p>
    `);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('💾 Using in-memory array as storage (No MongoDB required)');
});