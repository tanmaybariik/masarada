const bcrypt = require('bcryptjs');
const adminHash = "$2b$10$ALOpsbtzDOzjKRf1SkG9eu24PbucUNJ6qxZHR33JBlfA7HB2lnL36";
const userHash = "$2b$10$CspJ2kSxbB6kp./9riQE9ursZBE7adkEoaZKsTrQO8/vQDtttBkbu";

console.log("Admin match:", bcrypt.compareSync("admin123456", adminHash));
console.log("User match:", bcrypt.compareSync("user123456", userHash));
