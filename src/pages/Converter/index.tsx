import { useEffect, useState } from 'react';

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
        id: "",
        name: "",
        current_price: ""
      }
    ]
  );

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

  function handleConversion() {
    /*const baseCoinSelector = document.getElementById('base-coin-selector');
    const baseCoinSelectorValue = baseCoinSelector.selectedOptions[baseCoinSelector.selectedIndex].nodeValue;
    const baseCoinInput = document.getElementById('base-coin-input').nodeValue;
    const targetCoinSelector = document.getElementById('target-coin-selector');
    const targetCoinSelectorValue = targetCoinSelector.selectedOptions[targetCoinSelector.selectedIndex].nodeValue;
    const targetCoinInput = document.getElementById('target-coin-input').nodeValue;*/
  }

  return (
    <main>
      <div id="content">
        <div className="base-coin">
          <select id="base-coin-selector">
            {
              coinsList.map((coin) => 
                <option key={coin.id} value={coin.id}>{coin.name}</option>
              )
            }
          </select>
          <input type="text" id="base-coin-input" onChange={handleConversion} />
        </div>
        <div className="target-coin">
          <select id="target-coin-selector" onChange={handleConversion}>
            {
              coinsList.map((coin) => 
                <option key={coin.id} value={coin.id}>{coin.name}</option>
              )
            }
          </select>
          <input type="text" id="target-coin-input" onChange={handleConversion} />
        </div>
      </div>
    </main>
  );
}