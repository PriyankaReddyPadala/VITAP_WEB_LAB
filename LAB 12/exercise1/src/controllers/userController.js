const store = require('../data/store');

// GET /api/users
const getAllUsers = (req, res) => {
  res.json({ success: true, count: store.users.length, data: store.users });
};

// GET /api/users/:id
const getUserById = (req, res) => {
  const user = store.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  res.json({ success: true, data: user });
};

// POST /api/users
const createUser = (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required' });
  }
  const newUser = {
    id: store.users.length + 1,
    name,
    email,
    role: role || 'user',
  };
  store.users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
};

// PUT /api/users/:id
const updateUser = (req, res) => {
  const index = store.users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: 'User not found' });

  store.users[index] = { ...store.users[index], ...req.body };
  res.json({ success: true, data: store.users[index] });
};

// DELETE /api/users/:id
const deleteUser = (req, res) => {
  const index = store.users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: 'User not found' });

  const deleted = store.users.splice(index, 1);
  res.json({ success: true, message: 'User deleted', data: deleted[0] });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };