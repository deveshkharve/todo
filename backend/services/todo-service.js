const { executeQueryBuilder } = require("./database.js");
const { logger } = require('../utils/logger.js')

const TASK_STATUS = {
  todo: 'todo',
  'in progress': 'in progress',
  done: 'done',
  deferred: 'deferred'
}

 const createTask = async (userId, title, description, dueDate) => {
  try {
    logger.info('create task for user', {userId})
    const query = {
      text: `INSERT INTO tasks (user_id, title, description, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [userId, title, description, dueDate, TASK_STATUS.todo],
    };
    const tasks = await executeQueryBuilder(query);
    return { status: 'success', message: 'Task created successfully', tasks };
  } catch (error) {
    logger.error('Unable to create the task', { userId, error: error.message });
    return { status: 'error', message: 'There was a problem creating the task' };
  }
}


const getTasks = async (userId) => {
  try {
    logger.info('get task for user', {userId})
    const query = {
      text: `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at;`,
      values: [userId],
    };
    const tasks = await executeQueryBuilder(query);
    return { status: 'success', message: 'Tasks fetched successfully', tasks };
  } catch (error) {
    logger.error('Unable to fetch the task', { userId, error: error.message });
    return { status: 'error', message: 'There was a problem fetching the tasks' };
  }
}

 const updateTask = async (taskId, userId, title, description, dueDate, status) => {
  try {
      logger.info('update task for user', {taskId, userId})
      const query = {
        text: `UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 AND user_id = $6 RETURNING *`,
        values: [title, description, dueDate, TASK_STATUS[status], taskId, userId],
      };
      const tasks = await executeQueryBuilder(query);
      return { status: 'success', message: 'Task updated successfully', tasks };
  } catch (error) {
      logger.error('Unable to update the task', { taskId, userId, error: error.message });
      return { status: 'error', message: 'There was a problem updating the task' };
  }
}

 const markTaskAsDone = async (taskId, userId, status=TASK_STATUS.done) => {
  try {
      logger.info('mark task as done for user', {taskId, userId})
      const query = {
        text: `UPDATE tasks SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *`,
        values: [status, taskId, userId],
      };
      const tasks = await executeQueryBuilder(query);
      return { status: 'success', message: 'Task marked as done successfully', tasks };
  } catch (error) {
    logger.error('Unable to mark task as done', { taskId, userId, error: error.message });
    return { status: 'error', message: 'There was a problem marking the task as done' };
  }
}


 const deleteTask = async (taskId, userId) => {
  try {
      logger.info('delete task for user', { taskId, userId})
      const query = {
        text: `DELETE FROM tasks WHERE id = $1 AND user_id = $2`,
        values: [taskId, userId],
      };
      const tasks = await executeQueryBuilder(query);
      return { status: 'success', message: 'Task deleted successfully', tasks };
  } catch (error) {
      logger.error('Unable to delete task', { taskId, userId, error: error.message });
      return { status: 'error', message: 'There was a problem deleting the task' };
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  markTaskAsDone,
  TASK_STATUS
};

