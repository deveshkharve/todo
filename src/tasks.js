export const getTaskList = async () => {
  const token = localStorage.getItem('token');
  const route = '/api/tasks'
  const url = `${process.env.BACKEND_HOST || 'http://localhost:3001'}${route}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

export const createTask = async (title, status, description, dueDate) => {
  const token = localStorage.getItem('token');
  const route = '/api/tasks'
  const url = `${process.env.BACKEND_HOST || 'http://localhost:3001'}${route}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title, status, description, dueDate
    })
  })
  const data = await response.json()
  return data
}

export const updateTask = async (id, title, status, description, dueDate) => {
  const token = localStorage.getItem('token');
  const route = `/api/tasks/${id}`
  const url = `${process.env.BACKEND_HOST || 'http://localhost:3001'}${route}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title, status, description, dueDate
    })
  })
  const data = await response.json()
  return data
}

export const deleteTask = async (id) => {
  const token = localStorage.getItem('token');
  const route = `/api/tasks/${id}`
  const url = `${process.env.BACKEND_HOST || 'http://localhost:3001'}${route}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  })
  const data = await response.json()
  return data
}

