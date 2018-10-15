const { User, Activity } = require('./models');

const main = async () => {

  const user1 = await User.create({
    firstName: 'Casey',
    lastName: 'Gillan',
    email: 'gillan.casey@gmail.com',
    passwordDigest: '123456'
  });

  const activity1 = await Activity.create({
    date: 10/15/18,
    distance: 3,
    hour: 01,
    minute: 23,
    second: 36,
    ruckWeight: 35,
    powerScore: 2.5
  });

  await activity1.setUser(user1);

  process.exit();
}

main();