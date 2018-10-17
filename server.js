const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5678;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Activity } = require('./models');
const app = express();
const path = require('path');
const jwtSecret = 'shh1234';

app.use("/", express.static("./build/"));

app.use(bodyParser.json());

app.get('/api/users', async (request, response) => {
  const users = await User.findAll({});
  response.json(users);
});

app.post('/api/register', async (request, response) => {
  const { email, password, firstName, lastName } = request.body;
  if (!email || !password) {
    response.status(400).json({
      error: "Please Provide an Email and Password"
    });
    return;
  }

  const existingUser = await User.findOne({
    where: {
      email: email
    }
  });

  if (existingUser) {
    response.status(409).json({
      message: "Email is already registered."
    })
    return;
  }

  const passwordDigest = await bcrypt.hash(password, 12);

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    passwordDigest: passwordDigest
  });

  const token = jwt.sign({ userId: user.id }, jwtSecret);
  response.json({
    token: token
  });
});

app.post('/api/login', async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).json({
      message: "Please Provide an Email and Password"
    });
    return;
  }
  const existingUser = await User.findOne({
    where: {
      email: email
    }
  });
  if (existingUser === null) {
    response.status(401).json({
      message: "Invalid username or password."
    });
    return;
  }
  const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordDigest);
  if (isPasswordCorrect) {
    const token = jwt.sign({ userId: existingUser.id }, jwtSecret);
    response.json({
      token: token
    });
  } else {
    response.status(401).json({
      message: 'Invalid Username or Password'
    })
  }
});

app.get('/api/current-user', async (request, response) => {
  const token = request.headers['jwt-token'];
  const verify = await jwt.verify(token, jwtSecret);

  const user = await User.findOne({
    where: {
      id: verify.userId
    }
  });
  response.json({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
});

app.post('/api/activities', async (request, response) => {

  const newActivity = await Activity.create({
    date: request.body.date,
    distance: request.body.distance,
    hour: request.body.hour,
    minute: request.body.minute,
    second: request.body.second,
    ruckWeight: request.body.ruckWeight,
    powerScore: request.body.powerScore,
    userId: request.body.userId
  });
  response.json(newActivity);
});

app.get('/api/activities', async (request, response) => {
  const activities = await Activity.findAll({});
  response.json(activities);
});

app.get('/api/:id/userActivities', async (request, response) => {
  const activities = await Activity.findAll({
    where: {
      userId: request.params.id
    }
  })
  response.json(activities);
});

app.delete('/api/activity/:id', async (request, response) => {
  const activityId = request.params.id;
  const activity = await Activity.findOne({
    where: {
      id: activityId
    }
  });
  await activity.destroy();
});

app.put('/api/users/:id', async (request, response) => {
  const userId = request.params.id;
  const user = await User.findOne({
    where: {
      id: userId
    }
  })
  if (request.body.firstName !== '') {
  user.firstName = request.body.firstName
  }
  if (request.body.lastName !== '') {
    user.lastName = request.body.lastName
  }
  await user.save();
  response.sendStatus(200);
});

if (process.env.NODE_ENV == "production") {
  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
