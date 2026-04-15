export const fetchResults = async () => {
  const token = localStorage.getItem("token");

  const API_URL = "http://18.219.19.141:8000";

  const res = await fetch(`${API_URL}/results`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};