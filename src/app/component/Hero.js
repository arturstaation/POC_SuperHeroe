'use client'
import { useEffect, useState } from 'react';

export default function Hero({ code }) {

    const ACCESS_TOKEN = "cdfb98818343b05b59f07b6026f7b5c9";
    const BASE_URL = `https://superheroapi.com/api.php/${ACCESS_TOKEN}/`;

    const [heroData, setHeroData] = useState({
        name: '',
        intelligence: 0,
        image: '',
        strength: 0,
    });

    useEffect(() => {
        const fetchData = () => {
            const xhr = new XMLHttpRequest();
            const url = BASE_URL + code;

            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const json = xhr.response;
                    console.log('Dados recebidos com sucesso!', json);

                    setHeroData({
                        name: json.name,
                        intelligence: json.powerstats.intelligence,
                        image: json.image.url,
                        strength: json.powerstats.strength,
                    });
                } else {
                    console.log('Problema ao conectar com a API: ' + xhr.status);
                }
            };
            xhr.send();
        };

        fetchData();
    }, [code]);
    return (
        <article>
            {heroData.image && <img src={heroData.image} alt={heroData.name}></img>}
            <h1>{heroData.name}</h1>
            <p>
                intelligence:
                <span
                    style={{
                        width: `${heroData.intelligence}%`,
                        backgroundColor: '#F9B32F',
                        display: 'inline-block',
                        height: '10px',
                    }}
                ></span>
            </p>
            <p>
                strength:
                <span
                    style={{
                        width: `${heroData.strength}%`,
                        backgroundColor: '#FF7C6C',
                        display: 'inline-block',
                        height: '10px',
                    }}
                ></span>
            </p>
        </article>
    );
}
