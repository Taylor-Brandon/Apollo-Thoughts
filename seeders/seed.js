const db = require('../config/connection');
const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds');
const thoughtSeeds = require('./thoughtSeeds');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    const users = await User.create(userSeeds);
    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, author } = await Thought.create(thoughtSeeds[i]);
      await User.findOneAndUpdate(
        { username: author }, 
        { $addToSet: { thoughts: _id } }, 
        { new: true } 
      );
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
