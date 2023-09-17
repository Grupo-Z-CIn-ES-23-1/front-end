import React, { useState } from "react";
import Router from "next/router";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Tente novamente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Resposta da API:", data); // Para fins de depuração

      if (data.message === "User registered successfully.") {
        alert("Usuário registrado com sucesso!");
        Router.push("/login"); // Redireciona para a página de login após o cadastro.
      } else {
        alert(data.message || "Erro ao registrar");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Cadastro</h2>
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
            placeholder="Senha"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
          />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
