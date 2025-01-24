import { useContext, useEffect, useState } from "react";
import CoinContext from "../../context/CoinContext";
import { getCoinsData, setCurrencyType } from "../../utils/Helpers";

const Home = () => {
  const { setCurrency, coins, currency } = useContext(CoinContext);

  const [coinToDisplay, setCoinToDisplay] = useState([]);

  useEffect(() => (
    setCoinToDisplay(coins)
  ), [coins]);

  const setCurrencyHandler = (e) => {
    const coinData = getCoinsData();

    if (!coinData || Object.keys(coinData).length === 0) {
      return new Error("No coin found.");
    }

    const currentCoin = Object.entries(coinData).find(([key]) => key === e.target.value);
  
    if (currentCoin) {
      setCurrencyType(e, currentCoin[0], currentCoin[1], setCurrency);
    } else {   
      return new Error("No coin found.");
    }
  };  

  return (
    <section className="hero is-fullheight" style={{ backgroundColor: "#000" }}onChange={ setCurrencyHandler }>
    { /* Currency selector */ }
      <div className="currency-selector" style={{ textAlign: "right", padding: "20px", color: "#fff" }}>
        <h3 className="is-size-5" style={{ color: "#00d1b2" }}>Currency Selector</h3>
        <select
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #00d1b2",
            backgroundColor: "#1a1a1a",
            color: "#fff",
          }}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
          <option value="gbp">GBP</option>
          <option value="jpy">JPY</option>
          <option value="aud">AUD</option>
          <option value="cad">CAD</option>
          <option value="chf">CHF</option>
          <option value="cny">CNY</option>
          <option value="sek">SEK</option>
          <option value="brl">BRL</option>
          <option value="krw">KRW</option>
          <option value="mxn">MXN</option>
          <option value="ruble">RUB</option>
          <option value="sgd">SGD</option>
          <option value="btc">BTC</option>
          <option value="eth">ETH</option>
          <option value="xrp">XRP</option>
          <option value="ltc">LTC</option>
          <option value="ada">ADA</option>
        </select>
      </div>

      { /* Site heading and currency search box */ }
      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title is-size-1 has-text-weight-bold" style={{ color: "#00d1b2" }}>
            Crypto Riches Market
          </h1>
          <p className="subtitle is-size-5" style={{ color: "#fff" }}>
            Hello, welcome to Nigerias number one and most reliable crypto market.
          </p>
          <form
            className="mt-5"
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#1a1a1a",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div className="control" style={{ flexGrow: 1, marginRight: "10px" }}>
              <input
                className="input is-medium"
                type="text"
                placeholder="Search crypto..."
                style={{
                  backgroundColor: "#000",
                  border: "1px solid #00d1b2",
                  color: "#fff",
                  padding: "10px",
                }}
              />
            </div>
            <div className="control">
              <button
                className="button is-medium"
                type="submit"
                style={{
                  backgroundColor: "#00d1b2",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  border: "none",
                }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

          {/* Table to show the crypto datails */}
    <div className="crypto-table" style={{ padding: "20px", marginTop: "20px" }}>
      <table
        className="table is-striped is-hoverable is-fullwidth"
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#00d1b2" }}>
            <th style={{ color: "#fff", textAlign: "center" }}>Rank</th>
            <th style={{ color: "#fff", textAlign: "center" }}>Coins</th>
            <th style={{ color: "#fff", textAlign: "center" }}>Price</th>
            <th style={{ color: "#fff", textAlign: "center" }}>24H Change</th>
            <th style={{ color: "#fff", textAlign: "center" }}>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {
            coinToDisplay.slice(0, 15).map((coin, index) => (
              <li className="" key={index}>{coin.market_cap_rank}</li>
              <div>
                <img src={ coin.image } alt={ coin.name } />
                <p>{ `${ coin.name } - ${ coin.symbol }` }</p>
              </div>
              <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
              <p>{ Math.floor(price_change_percentage_24h*100)/100 }</p>
              <p>{currency.symbol} {coin.market_cap.toLocaleString()}</p>
            ))
          }
        </tbody>
      </table>
    </div>
    </section>
  );
};

export default Home;
