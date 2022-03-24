import './style.css';

type CardProps = {
  coinData: {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: string;
  }
}

export function Card(props: CardProps) {
  return (
    <div className="card">
      <div className="coin">
        <span>{props.coinData.symbol.toUpperCase()}</span>
        <img src={props.coinData.image} />
      </div>
      <div className="price">
        <span>{props.coinData.name}</span>
        <span>U$ {props.coinData.current_price}</span>
      </div>
    </div>
  );
}