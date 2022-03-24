import { ChangeEvent, useEffect, useRef, useState } from 'react';

import api from '../../services/api';

import './style.css';

type CoinsListType = {
  id: string;
  name: string,
  current_price: string
}

export function Converter() {
  const baseCoinInput = useRef(null);
  const targetCoinInput = useRef(null);
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
    baseCoinID: "bitcoin",
    baseCoinPrice: 0,
    baseCoinAmount: 0,
    targetCoinID: "bitcoin",
    targetCoinPrice: 0,
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
    let baseCoinID: string;
    let baseCoinPrice: number;
    let baseCoinAmount: number;
    let targetCoinID: string;
    let targetCoinPrice: number;
    let targetCoinAmount: number;
    
    if (event.target.name == 'baseCoin') {
      baseCoin = coinsList.find(coin => coid.id == event.target.value);
      baseCoinID = baseCoin.id;
      baseCoinPrice = baseCoin.current_price;
      baseCoinAmount = baseCoinInput.current.value;
      
      targetCoin = coinsList.find(coin => coin.id == converterData.targetCoin);
      targetCoinID = targetCoin.id;
      targetCoinPrice = targetCoin.current_price;
      targetCoinAmount = targetCoinInput.current.value;
    }
    if (event.target.name == 'targetCoin') {
      baseCoin = coinsList.find(coin => coid.id == converterData.baseCoin);
      baseCoinID = baseCoin.id;
      baseCoinPrice = baseCoin.current_price;
      baseCoinAmount = baseCoinInput.current.value;
      
      targetCoin = coinsList.find(coin => coin.id == event.target.value);
      targetCoinID = targetCoin.id;
      targetCoinPrice = targetCoin.current_price;
      targetCoinAmount = targetCoinInput.current.value;
    }
    if (event.target.name == 'baseCoinAmount') {
      baseCoin = coinsList.find(coin => coid.id == converterData.baseCoin);
      baseCoinID = baseCoin.id;
      baseCoinPrice = baseCoin.current_price;
      baseCoinAmount = baseCoinInput.current.value;
      
      targetCoin = coinsList.find(coin => coin.id == converterData.targetCoin);
      targetCoinID = targetCoin.id;
      targetCoinPrice = targetCoin.current_price;
      targetCoinAmount = targetCoinInput.current.value;
    }
    if (event.target.name == 'targetCoinAmount') {
      baseCoin = coinsList.find(coin => coid.id == converterData.baseCoin;
      baseCoinID = baseCoin.id;
      baseCoinPrice = baseCoin.current_price;
      baseCoinAmount = baseCoinInput.current.value;
      
      targetCoin = coinsList.find(coin => coin.id == converterData.targetCoin);
      targetCoinID = targetCoin.id;
      targetCoinPrice = targetCoin.current_price;
      targetCoinAmount = targetCoinInput.current.value;
    }
    setConverterData(
      {
        baseCoinID,
        baseCoinPrice,
        baseCoinAmount,
        targetCoinID,
        targetCoinPrice,
        targetCoinAmount
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
            ref={}
            value={converterData.targetCoinAmount}
            onChange={handleConversion}
          />
        </div>
      </div>
    </main>
  );
}
