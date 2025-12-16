

export const businessOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: no user logged in' });
    }

    if (req.user.role !== 'merchant' || 'admin') {
      return res.status(403).json({ error: 'Forbidden: business role required' });
    }

    next();
  } catch (err) {
    console.error('Error in businessOnly middleware:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
