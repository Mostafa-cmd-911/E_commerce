// Registration function
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

// Login function
export async function loginUser({ email, password }) {
  const res = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Something went wrong');
  }

  const data = await res.json();
  return data;
}
