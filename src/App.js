import React, { useEffect, useState } from "react";
import "./App.css";
// import Api2 from "./Components/Api2";
// import ApiUseState from "./Components/ApiUseState";
// import Github from "./Components/Github";
// import Login from "./Components/Login";
import axios from "axios";
import Coin from "./Components/Coin";

function App() {
  const [coins, setCoin] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoin(res.data);
      })

      .catch((error) => {
        console.log("Error");
      });
  }, []);

  var filterCoin = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="app">
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a Currency</h1>
          <form>
            <input
              className="coin-input"
              placeholder="Coin Name"
              type="text"
              onChange={handleChange}
            ></input>
          </form>
        </div>

        {filterCoin.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              volume={coin.total_volume}
              market_cap={coin.market_cap}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
