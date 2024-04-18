const { createUser, getUser, verifyUser } = require('../services/users.js');
const { createTask, getTasks } = require('../services/todo-service.js');
const { createSecurePassword } = require('../auth.js');
const assert = require('assert');

let testUser;
describe('User Service', function() {
  describe('#createUser()', function() {
    it('should create a new user and return a success message', async function() {
      const username = 'testUser';
      const password = 'testPassword';
      const result = await createUser(username, password);
      testUser = result.user
      assert.equal(result.message, 'User created successfully');
    });
  });

  describe('#getUser()', function() {
    it('should return a user if the user exists', async function() {
      const username = 'testUser';
      const result = await getUser(username);
      assert.equal(result.username, username);
    });

    it('should return null if the user does not exist', async function() {
      const username = 'nonExistentUser';
      const result = await getUser(username);
      assert.equal(result, null);
    });
  });

  describe('#verifyUser()', function() {
    it('should return a user if the username and password match', async function() {
      const username = 'testUser';
      const password = 'testPassword';
      const result = await verifyUser(username, password);
      assert.equal(result.username, username);
    });

    it('should return null if the username and password do not match', async function() {
      const username = 'testUser';
      const password = 'wrongPassword';
      const result = await verifyUser(username, password);
      assert.equal(result, null);
    });
  });
});


describe('Task Service', function() {
  describe('#createTask()', function() {
    it('should create a new task and return a success message', async function() {
      const taskTitle = 'testTask';
      const result = await createTask(testUser.id, taskTitle, undefined);
      assert.ok(result.tasks);
      assert.equal(result.tasks[0].title, taskTitle);
      assert.equal(result.message, 'Task created successfully');
    });
  });

  describe('#getTasks()', function() {
    it('should return a task if the task exists', async function() {
      const taskTitle = 'testTask';
      const result = await getTasks(testUser.id);
      assert.ok(result.tasks);
      assert.equal(result.tasks[0].title, taskTitle);
    });
  });
});


