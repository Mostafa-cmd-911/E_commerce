export async function registerUser({ fullName, email, password }) {
  const res = await fetch('http://localhost:3000/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: fullName, email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Something went wrong')
  }

  const data = await res.json()
  return data
}
