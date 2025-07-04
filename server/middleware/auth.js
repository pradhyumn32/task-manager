const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user.id }
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
