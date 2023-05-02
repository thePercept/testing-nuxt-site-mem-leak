const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 100 requests per windowMs
});

module.exports = {
  path: '/api/*',
  handler: limiter,
};
