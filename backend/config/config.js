module.exports = {
  PORT: process.env.PORT || 3000,
  SECRET_TOKEN: process.env.SECRET_TOKEN || 'secret',
  TIME_EXP_TOKEN: process.env.TIME_EXP_TOKEN || '30m',
  MAX_MEGABYTES: process.env.MAX_MEGABYTES || 2
};