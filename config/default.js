module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  port: 3001,
  // secret: 'mysecret',
  bcrypt: {secret: 'mysecret'},
  root: process.cwd()
};
