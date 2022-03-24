import { ChangeEvent, useEffect, useState } from 'react';

import api from '../../services/api';

import './style.css';

type CoinsListType = {
  id: string;
  name: string,
  current_price: string
}

export function Converter() {
  const [coinsList, setCoinsList] = useState<CoinsListType[]>(
    [
      {
        id: "bitcoin",
        name: "Bitcoin",
        current_price: "0"
      }
    ]
  );
  const [converterData, setConverterData] = useState({
    baseCoin: "bitcoin",
    baseCoinAmount: 0,
    targetCoin: "bitcoin",
    targetCoinAmount: 0
  });

  function fetchAPI() {
    api
      .get<CoinsListType[]>('/coins/markets?vs_currency=usd&per_page=1000')
      .then(({ data }) => {
        const coinsData = data.map((coinsFetchedData) => {
          const { id, name, current_price } = coinsFetchedData;
          return { id, name, current_price };
        });
        setCoinsList(coinsData);
      });
  }

  useEffect(() => {
    fetchAPI();
    const timer = setInterval(() => {
      fetchAPI();
    }, 3600000);
    return () => clearInterval(timer);
  }, []);

  function handleConversion(
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.name == 'baseCoin') {
      const baseCoin = coinsList.find(coin => coid.id == event.target.value);
      const baseCoinPrice = baseCoin.current_price;
      const targetCoin = coinsList.find(coin => coin.id == converterData.targetCoin);
      const targetCoinPrice = targetCoin.current_price;
    }
    if (event.target.name == 'targetCoin') {
      const baseCoin = coinsList.find(coin => coid.id == converterData.baseCoin);
      const baseCoinPrice = baseCoin.current_price;
      const targetCoin = coinsList.find(coin => coin.id == event.target.value);
      const targetCoinPrice = targetCoin.current_price;
    }
    setConverterData(
      {
        ...converterData,
        [event.target.name]: event.target.value
      }
    );
  }

  return (
    <main>
      <div id="content">
        <div className="base-coin">
          <select
            id="base-coin-selector"
            name="baseCoin"
            value={converterData.baseCoin}
            onChange={handleConversion}
          >
            {
              coinsList.map((coin) => 
                <option key={coin.id} value={coin.id}>{coin.name}</option>
              )
            }
          </select>
          <input
            type="text"
            id="base-coin-input"
            name="baseCoinAmount"
            value={converterData.baseCoinAmount}
            onChange={handleConversion}
          />
        </div>
        <div className="target-coin">
          <select
            id="target-coin-selector"
            name="targetCoin"
            value={converterData.targetCoin}
            onChange={handleConversion}
          >
            {
              coinsList.map((coin) => 
                <option key={coin.id} value={coin.id}>{coin.name}</option>
              )
            }
          </select>
          <input
            type="text"
            id="target-coin-input"
            name="targetCoinAmount"
            value={converterData.targetCoinAmount}
            onChange={handleConversion}
          />
        </div>
      </div>
    </main>
  );
}