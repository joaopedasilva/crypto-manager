import { ChangeEvent, useEffect, useRef, useState } from 'react';

import api from '../../services/api';

import './style.css';

type CoinsListType = {
  id: string;
  name: string,
  current_price: string
}

export function Converter() {
  const baseCoinInputRef = useRef<HTMLInputElement>(null);
  const targetCoinInputRef = useRef<HTMLInputElement>(null);
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
    let baseCoin: CoinsListType;
    let baseCoinID: string = "bitcoin";
    let baseCoinPrice: number = 0;
    let baseCoinAmount: number = 0;
    let targetCoin: CoinsListType;
    let targetCoinID: string = "bitcoin";
    let targetCoinPrice: number = 0;
    let targetCoinAmount: number = 0;
    
    if (event.target.name == 'baseCoin') {
      baseCoin = coinsList.find(coin => coin.id == event.target.value) as CoinsListType;
      baseCoinID = baseCoin.id;
      baseCoinPrice = Number(baseCoin.current_price);
      if (baseCoinInputRef !== null) {
        baseCoinAmount = Number(baseCoinInputRef.current?.value);
      } else {
        baseCoinAmount = 0;
      }
      
      targetCoin = coinsList.find(coin => coin.id == converterData.targetCoinID) as CoinsListType;
      targetCoinID = targetCoin.id;
      targetCoinPrice = Number(targetCoin.current_price);
      if (targetCoinInputRef !== null){
        targetCoinAmount = Number(targetCoinInputRef.current?.value);
      } else {
        targetCoinAmount = 0;
      }
    }
    if (event.target.name == 'targetCoin') {
      baseCoin = coinsList.find(coin => coin.id == converterData.baseCoinID) as CoinsListType;
      baseCoinID = baseCoin.id;
      baseCoinPrice = Number(baseCoin.current_price);
      if (baseCoinInputRef !== null){
        baseCoinAmount = Number(baseCoinInputRef.current?.value);
      } else {
        baseCoinAmount = 0;
      }
      
      targetCoin = coinsList.find(coin => coin.id == event.target.value) as CoinsListType;
      targetCoinID = targetCoin.id;
      targetCoinPrice = Number(targetCoin.current_price);
      if (targetCoinInputRef !== null){
        targetCoinAmount = Number(targetCoinInputRef.current?.value);
      } else {
        targetCoinAmount = 0;
      }
    }
    if (event.target.name == 'baseCoinAmount') {
      baseCoin = coinsList.find(coin => coin.id == converterData.baseCoinID) as CoinsListType;
      baseCoinID = baseCoin.id;
      baseCoinPrice = Number(baseCoin.current_price);
      if (baseCoinInputRef !== null){
        baseCoinAmount = Number(baseCoinInputRef.current?.value);
      } else {
        baseCoinAmount = 0;
      }
      
      targetCoin = coinsList.find(coin => coin.id == converterData.targetCoinID) as CoinsListType;
      targetCoinID = targetCoin.id;
      targetCoinPrice = Number(targetCoin.current_price);
      if (targetCoinInputRef !== null){
        targetCoinAmount = Number(targetCoinInputRef.current?.value);
      }  else {
        targetCoinAmount = 0;
      }
    }
    if (event.target.name == 'targetCoinAmount') {
      baseCoin = coinsList.find(coin => coin.id == converterData.baseCoinID) as CoinsListType;
      baseCoinID = baseCoin.id;
      baseCoinPrice = Number(baseCoin.current_price);
      if (baseCoinInputRef !== null){
        baseCoinAmount = Number(baseCoinInputRef.current?.value);
      } else {
        baseCoinAmount = 0;
      }
      
      targetCoin = coinsList.find(coin => coin.id == converterData.targetCoinID) as CoinsListType;
      targetCoinID = targetCoin.id;
      targetCoinPrice = Number(targetCoin.current_price);
      if (targetCoinInputRef !== null){
        targetCoinAmount = Number(targetCoinInputRef.current?.value);
      } else {
        targetCoinAmount = 0;
      }
    }
    targetCoinAmount = (baseCoinPrice * baseCoinAmount) / targetCoinPrice;
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
            value={converterData.baseCoinID}
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
            ref={baseCoinInputRef}
            value={converterData.baseCoinAmount}
            onChange={handleConversion}
          />
        </div>
        <div className="target-coin">
          <select
            id="target-coin-selector"
            name="targetCoin"
            value={converterData.targetCoinID}
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
            ref={targetCoinInputRef}
            value={converterData.targetCoinAmount}
            onChange={handleConversion}
          />
        </div>
      </div>
    </main>
  );
}
