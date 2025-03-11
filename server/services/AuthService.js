const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class AuthService {

  async register(data) {
    const { email, password } = data;

    try {
      const user = await UserModelInstance.findOneByEmail(email);
      if (user) {
        throw createError(409, 'Email already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModelInstance.create({ ...data, password: hashedPassword });
      return newUser;

    } catch(err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    const { email, password } = data;

    try {
      const user = await UserModelInstance.findOneByEmail(email);
      if (!user) {
        throw createError(401, 'Incorrect username or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw createError(401, 'Incorrect username or password');
      }

      return user;

    } catch(err) {
      throw createError(500, err);
    }
  }

  async findOrCreateGoogleUser(profile) {
    try {
      let user = await UserModelInstance.findOneByGoogleId(profile.id);
      if (!user) {
        user = await UserModelInstance.create({
          google: profile.id, // Use the correct column name
          email: profile.emails[0].value,
          firstname: profile.name.givenName, // Assuming you want to split the name
          lastname: profile.name.familyName
        });
      }
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async findOrCreateFacebookUser(profile) {
    try {
      let user = await UserModelInstance.findOneByFacebookId(profile.id);
      if (!user) {
        user = await UserModelInstance.create({
          facebook: profile.id, // Use the correct column name
          email: profile.emails[0].value, // Ensure email is available
          firstname: profile.name.givenName, // Assuming you want to split the name
          lastname: profile.name.familyName
        });
      }
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }
  
  

  async findUserById(id) {
    try {
      const user = await UserModelInstance.findOneById(id);
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }
}
