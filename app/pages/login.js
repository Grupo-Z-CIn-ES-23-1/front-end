import React, { useState } from "react";
import Router from "next/router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Resposta da API:", data); // Para fins de depuração

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        Router.push("/dashboard"); // Redireciona para o painel após o login.
      } else {
        alert(data.message || "Erro no login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleSignupClick = () => {
    Router.push("/signup"); // Redireciona para a página de cadastro.
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="button-container">
            <button type="submit">Login</button>
            <button onClick={handleSignupClick}>Cadastro</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
