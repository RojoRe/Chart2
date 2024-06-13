import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
    Tooltip, Legend,
    ArcElement
);

const PieChart = () => {

    const [chart, setChart] = useState({});
    var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    var apikey = "coinranking2c04c0b3ab6b36055335170843e8d4e61ba5d154a519b0ee";

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(`${proxyUrl}${baseUrl}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${apikey}`,
                        'Access-Control-Allow-Origin': "*"
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                console.log(json);
                setChart(json.data);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };
        fetchCoins();
    }, [baseUrl, proxyUrl, apikey]);

    console.log("chart", chart);
    var data = {
        labels: chart?.coins?.map(x => x.name),
        datasets: [{
            label: `${chart?.coins?.length} Monedas Disponibles`,
            data: chart?.coins?.map(x => x.price),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    };

    return (
        <div>
            <Pie
                data={data}
                height={400}
                options={options}
            />
        </div>
    );
}

export default PieChart;
