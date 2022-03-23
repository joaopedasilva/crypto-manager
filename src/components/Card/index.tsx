import './style.css';

type CardProps = {
  coinData: {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice: string;
  }
}

export function Card(props: CardProps) {
  return (
    <div className="card">
      <div className="coin">
        <span>{props.coinData.symbol.toUpperCase()}</span><img src={props.coinData.image} />
      </div>
      <div className="price">
        <span>{props.coinData.name}</span>
        <span>{props.coinData.currentPrice}</span>
      </div>
    </div>
  );
}