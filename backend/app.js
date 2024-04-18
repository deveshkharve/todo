// app.js
const express = require('express');
const { checkJwt } = require('./auth.js');
const { todoApiRouter } = require('./router/tasks.js');
const { usersApiRouter } = require('./router/users.js');
const { logger } = require('./utils/logger.js')
const cors = require('cors')

const helmet = require('helmet');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())
app.use(express.json());
app.use(helmet())

app.use('/api/users', usersApiRouter)
app.use('/api/tasks', checkJwt, todoApiRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


