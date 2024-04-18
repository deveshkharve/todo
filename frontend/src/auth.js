
export const processLoginRequest = async (currState, userName, password) => {
  const route = currState == 'login' ? '/api/users/login' : '/api/users/register'
  const url = `${process.env.BACKEND_HOST || 'http://localhost:3001'}${route}`
  const response = await fetch(url , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: userName,
      password: password,
    }),
  })
  const data = await response.json()
  if (data.token) {
    localStorage.setItem('token', data.token);
    return { success: true }
  } else {
    console.error('No token received');
    return { success: false }
  }
}


export const isTokenValid = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false
  } else {
    try {
      const url = `${process.env.BACKEND_HOST || 'http://localhost:3001'}/api/users`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (response.status !== 200) {
        return false
      }
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}