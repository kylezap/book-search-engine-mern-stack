const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      const foundUser = await User.findById(userId);
      if (!foundUser) {
        throw new Error('User not found');
      }
      return foundUser;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ $or: [{ username: email }, { email: email }] });
      if (!user) {
        throw new Error("User not found");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Incorrect password");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { userId, bookInput }) => {
      const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { savedBooks: bookInput } }, { new: true });
      return updatedUser;
    },
    deleteBook: async (_, { userId, bookId }) => {
      const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { savedBooks: { bookId: bookId } } }, { new: true });
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;