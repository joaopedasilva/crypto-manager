import { useEffect, useState } from 'react';

import api from '../../services/api';

type CoinsListType = {
  id: string;
}

export function Converter() {
  const [coinsList, setCoinsList] = useState<CoinsListType[]>(
    [
      {
        id: ""
      }
    ]
  );

  useEffect(() => {
    api
      .get<string, string>('/coins/markets?vs_currency=usd&per_page=10')
      .then((res) => {
        const { data } = JSON.parse(res);
        const coinsFetched = data as CoinsListType[];
        const coinsFetchedList = coinsFetched.map<CoinsListType>((coinData) => {
          const id = coinData.id;
          return { id };
        });
        setCoinsList(coinsFetchedList);
      });
  }, [coinsList]);

  return (
    <main>
      <div className="content">
        <form action="" className="base-coin">
          <div>
            <select id="base-coin-selector">
              {
                coinsList.map((coin) => {
                  <option value="volvo">Volvo</option>
                })
              }
            </select>
            <input type="text" />
          </div>
          <div className="target-coin">
            <select id="target-coin-selector">
              {
                coinsList.map((coin) => {
                  <option value="volvo">Volvo</option>
                })
              }
            </select>
            <input type="text" />
          </div>
        </form>
      </div>
    </main>
  );
}