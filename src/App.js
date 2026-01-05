import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import { weatherData } from "./api/weather.ts";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="cards">
        {weatherData.daily.time.map((time, index) => (
          <Card
            key={time.toISOString()}
            day={time.getDate()}
            month={time.toLocaleString("default", { month: "long" })}
            sunrise={weatherData.daily.sunrise[index]}
            sunset={weatherData.daily.sunset[index]}
            tempMax={weatherData.daily.temperature_2m_max[index]}
            tempMin={weatherData.daily.temperature_2m_min[index]}
            rainSum={weatherData.daily.rain_sum[index]}
            snowFall={weatherData.daily.snowfall_sum[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
