
export default function WeatherInfo({ address, position, weather }) {
  return (
    <div>
      <div>
        <strong>Address:</strong>
        <div>{address || '—'}</div>
      </div>

      <div>
        <div>
          <strong>Latitude</strong>
          <div>{position?.lat?.toFixed ? position.lat.toFixed(6) : position.lat}</div>
        </div>
        <div>
          <strong>Longitude</strong>
          <div>{position?.lon?.toFixed ? position.lon.toFixed(6) : position.lon}</div>
        </div>
      </div>

      <div>
        <strong>Weather</strong>
        {weather ? (
          <div>
            Temp: {weather.temperature}°C · Windspeed: {weather.windspeed} m/s · Direction: {weather.winddirection}°
          </div>
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  )
}
