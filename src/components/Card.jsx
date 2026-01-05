export default function Card({
  day,
  month,
  sunrise,
  sunset,
  tempMax,
  tempMin,
  rainSum,
  snowFall,
}) {
  return (
    <div className="card">
      <h2>
        {day} {month}
      </h2>
      <div className="line-wrapper">
        <p>Max. Temperature:</p>
        <p>{Math.round(tempMax)}</p>
      </div>
      <div className="line-wrapper">
        <p>Min. temperature:</p>
        <p>{Math.round(tempMin)}</p>
      </div>
      <div className="line-wrapper">
        <p>Rain Fall:</p>
        <p>{Math.round(rainSum)} mm</p>
      </div>
      <div className="line-wrapper">
        <p>Snow Fall:</p>
        <p>{Math.round(snowFall)} cm</p>
      </div>
      <div className="line-wrapper">
        <p>sunrise:</p>
        <p>{sunrise.toLocaleTimeString()}</p>
      </div>
      <div className="line-wrapper">
        <p>sunset:</p>
        <p>{sunset.toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
