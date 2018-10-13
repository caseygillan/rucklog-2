const { User, Activity } = require('./models');

const main = async () => {

  const user1 = await User.create({
    firstName: 'Casey',
    lastName: 'Gillan',
    email: 'gillan.casey@gmail.com',
    passwordDigest: '123456'
  })


  process.exit();
}

main();