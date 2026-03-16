const express = require('express');
const fs = require('fs');
const path = require('path');

const {
  generateAccessToken,
  generateRefreshToken,
  REFRESH_SECRET,
} = require('../utils/tokens');

const jwt = require('jsonwebtoken');

const router = express.Router();

const usersPath = path.join(__dirname, '../../data/users.json');

function getUsers() {
  return JSON.parse(fs.readFileSync(usersPath));
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
  });

  res.json({ accessToken, user: { id: user.id, email: user.email } });
});

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();

  const user = users.find((u) => u.email === email);
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  user.id = Date.now().toString();
  users.push({ email, password });

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  const accessToken = generateAccessToken({ email, password });
  const refreshToken = generateRefreshToken({ email, password });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
  });

  res.json({ accessToken, user: { email } });
});

router.post('/refresh', (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  try {
    const user = jwt.verify(token, REFRESH_SECRET);

    const accessToken = generateAccessToken(user);
    res.json({ accessToken, user: { id: user.id, email: user.email } });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ success: true });
});

module.exports = router;
