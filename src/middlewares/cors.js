const { ALLOWED_ORIGINS = 'http://localhost:3000' } = process.env;

const allowedOrigins = ALLOWED_ORIGINS.split(',');

const corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, HEAD, POST, PATCH, DELETE, OPTIONS',
  );

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return next();
};

module.exports = corsMiddleware;