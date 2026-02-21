import api from "@api/apiClient";
import { useEffect, useState } from "react";

export function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await api.get("/users/me");

        console.log("Full user data:", response.data);

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    getMe();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome {user.name}</h2>
    </div>
  );
}