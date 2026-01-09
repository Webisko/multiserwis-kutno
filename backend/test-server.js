const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend running!' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@test.com' && password === 'admin123') {
    res.json({
      token: 'test-token-123',
      user: { id: '1', email, name: 'Administrator', role: 'ADMIN' }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
