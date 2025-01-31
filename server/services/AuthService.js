const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class AuthService {
  async register(data) {
    const { email, password, firstname, lastname } = data; // Extract firstname and lastname
  
    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneByEmail(email);
  
      if (user) {
        throw createError(409, 'Email already in use');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user record with hashed password
      const newUser = await UserModelInstance.create({
        firstname, // Use lowercase as per your database schema
        lastname,  // Use lowercase as per your database schema
        email,
        password: hashedPassword
      });
  
      // Automatically sign in the user (e.g., create a session)
      // This part depends on your session management setup
  
      return newUser;
  
    } catch(err) {
      throw createError(500, err);
    }
  }
}