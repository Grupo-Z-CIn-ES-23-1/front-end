import React, { useEffect } from "react";
import Router from "next/router";

const DashboardPage = () => {
  useEffect(() => {
    // Este código será executado apenas no lado do cliente
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      Router.push("/login"); // Redireciona para a página de login se não houver token.
    }
  }, []); // O array vazio como segundo argumento significa que este useEffect será executado apenas uma vez, similar ao componentDidMount.

  return (
    <div>
      Bem-vindo ao Painel!
      {/* Outro conteúdo do painel */}
    </div>
  );
};

export default DashboardPage;
