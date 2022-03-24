import { useEffect, useState } from 'react';

import { Card } from '../../components/Card'

import api from '../../services/api';

import './style.css';

type CoinsDataType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
}


export function Home() {
  const [coinsDataList, setCoinsDataList] = useState<CoinsDataType[]>(
    [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "",
        current_price: ""
      }
    ]
  );

  function fetchAPI() {
    api
      .get<CoinsDataType[]>('/coins/markets?vs_currency=usd&per_page=10')
      .then(({ data }) => {
        const coinsData = data.map((coinsFetchedData) => {
          const { id, symbol, name, image, current_price } = coinsFetchedData;
          return { id, symbol, name, image, current_price };
        });
        setCoinsDataList(coinsData);
      });
  }

  useEffect(() => {
    fetchAPI();
    const timer = setInterval(() => {
      fetchAPI();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <div id="container">
        {
          coinsDataList.map((coinData) => 
            <Card key={coinData.id} coinData={coinData} />
          )
        }
      </div>
    </main>
  );
}