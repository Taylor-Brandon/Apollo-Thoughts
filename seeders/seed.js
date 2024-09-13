const db = require('../config/connection');
const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds');
const thoughtSeeds = require('./thoughSeeds');

db.open('open', async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});
        await User.create(userSeeds);
        await Thought.create(thoughtSeeds);
        console.log('Done!');
        process.exit(0);
    } catch(err) {
        console.log("Error:", err);
        process.exit(1);
    }
});