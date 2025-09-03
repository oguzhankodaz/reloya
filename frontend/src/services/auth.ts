/** @format */

interface RegisterUserProps {
  username: string;
  surname:string
  email: string;
  password: string;
}

interface RegisterCompanyProps {
  username: string;
  email: string;
  password: string;
}

export async function registerUser({
  username,
  surname,
  email,
  password,
}: RegisterUserProps) {
  const res = await fetch("http://localhost:5000/auth/register-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: username,surname, email, password }),
  });
  if (!res.ok) {
    throw new Error("Register failed");
  }
  return res.json();
}

export async function registerCompany({
  username,
  email,
  password,
}: RegisterCompanyProps) {
  const res = await fetch("http://localhost:5000/auth/register-company", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: username, email, password }),
  });
  if (!res.ok) {
    throw new Error("Register failed");
  }
  return res.json();
}

