import { useEffect, useState } from 'react';

import { Card } from '../../components/Card'

import api from '../../services/api';

import './style.css';

type CoinsDataType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: string;
}


export function Home() {
  const [coinsDataList, setCoinsDataList] = useState<CoinsDataType[]>(
    [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "",
        currentPrice: ""
      }
    ]
  );

  useEffect(() => {
    api
      .get<string, string>('/coins/markets?vs_currency=usd&per_page=10')
      .then((res) => {
        const { data } = JSON.parse(res);
        const coinsFetchedData = data as CoinsDataType[];
        const coinsFetchedDataList = coinsFetchedData.map<CoinsDataType>((coinData) => {
          const id = coinData.id;
          const symbol = coinData.symbol;
          const name = coinData.name;
          const image = coinData.image;
          const currentPrice = coinData.currentPrice;
          return { id, symbol, name, image, currentPrice };
        });
        setCoinsDataList(coinsFetchedDataList);
      });
    const timer = setTimeout(() => {
      setCoinsDataList(
        [
          {
            id: "",
            symbol: "",
            name: "",
            image: "",
            currentPrice: ""
          }
        ]
      );
    }, 10000);
    return () => clearTimeout(timer);
  }, [coinsDataList]);

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