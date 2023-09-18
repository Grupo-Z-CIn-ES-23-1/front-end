import React, { useEffect, useState } from "react";
import Router from "next/router";

const DashboardPage = () => {
  const [locationName, setLocationName] = useState("");
  const [floodData, setFloodData] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    // Verifica se o usuário está logado
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      Router.push("/login");
    }
  }, []);

  const getCoordinatesFromName = async (locationName) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          locationName
        )}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const coordinates = data.results[0].geometry.location;
        return coordinates;
      } else {
        throw new Error("Localização não encontrada");
      }
    } catch (error) {
      console.error("Erro na geocodificação:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const coordinates = await getCoordinatesFromName(locationName);
      const floodDataResponse = await fetch(
        `https://flood-api.open-meteo.com/v1/flood?latitude=${coordinates.lat}&longitude=${coordinates.lng}&daily=river_discharge&forecast_days=7`
      );
      const floodData = await floodDataResponse.json();
      setFloodData(floodData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Bem-vindo ao Painel!</h2>

        <div className="search-box">
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Digite a localização (ex: Oslo, Noruega)"
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>

        {floodData && (
          <div className="data-box">
            <h3>
              Dados de Enchente para Latitude {floodData.latitude} e Longitude{" "}
              {floodData.longitude}
            </h3>
            <ul>
              {floodData.daily.time.map((date, index) => (
                <li key={date}>
                  {date}: {floodData.daily.river_discharge[index]}{" "}
                  {floodData.daily_units.river_discharge}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
