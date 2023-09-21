import React, { useEffect, useState } from "react";
import Router from "next/router";

// Importa condicionalmente as bibliotecas necessárias para o FusionCharts
let ReactFC, FusionCharts, Charts;
if (typeof window !== "undefined") {
  ReactFC = require("react-fusioncharts").default;
  FusionCharts = require("fusioncharts");
  Charts = require("fusioncharts/fusioncharts.charts");
  ReactFC.fcRoot(FusionCharts, Charts);
}

const DashboardPage = () => {
  const [locationName, setLocationName] = useState("");
  const [floodData, setFloodData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const gmapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setIsClient(true);

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
        )}&key=${gmapsApiKey}`
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
      const jwt = localStorage.getItem("jwt");
      const floodDataResponse = await fetch(
        `https://nextjs-docker-back-floodforec-image-jb3xebxfoa-wl.a.run.app/api/flood?latitude=${coordinates.lat}&longitude=${coordinates.lng}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const floodData = await floodDataResponse.json();
      setFloodData(floodData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const dataSource = floodData
    ? {
        chart: {
          caption: "Dados de Vazão do Rio mais próximo",
          subCaption: `Latitude: ${floodData.latitude}, Longitude: ${floodData.longitude}`,
          xAxisName: "Data",
          yAxisName: "Vazão (m³/s)",
          theme: "fusion",
        },
        data: floodData.daily.time.map((date, index) => ({
          label: date,
          value: floodData.daily.river_discharge[index],
        })),
      }
    : {};

  const chartConfigs = {
    type: "line",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource,
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Bem-vindo ao Painel!</h2>

        <div className="search-box">
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Digite a localização (ex: Recife, Pernambuco)"
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>

        {floodData && floodData.daily && floodData.daily.time && isClient && (
          <div className="data-box">
            <h3>
              Dados de Enchente para Latitude {floodData.latitude} e Longitude{" "}
              {floodData.longitude}
            </h3>
            <ReactFC {...chartConfigs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
