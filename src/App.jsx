import { useEffect, useState } from 'react'
import './App.css'

const defaultCity = 'Lahore'

const hardcodedWeather = {
  lahore: {
    name: 'Lahore',
    country: 'PK',
    temperature: 40,
    feelsLike: 43,
    description: 'hot and sunny',
    humidity: 34,
    wind: 15,
    icon: '☀️',
  },
  karachi: {
    name: 'Karachi',
    country: 'PK',
    temperature: 36,
    feelsLike: 39,
    description: 'humid and warm',
    humidity: 69,
    wind: 21,
    icon: '🌤️',
  },
  islamabad: {
    name: 'Islamabad',
    country: 'PK',
    temperature: 31,
    feelsLike: 33,
    description: 'partly cloudy',
    humidity: 47,
    wind: 12,
    icon: '⛅',
  },
  london: {
    name: 'London',
    country: 'GB',
    temperature: 18,
    feelsLike: 17,
    description: 'light rain',
    humidity: 80,
    wind: 19,
    icon: '🌧️',
  },
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function buildRandomWeather(inputCity) {
  const cleaned = inputCity.trim()
  const normalizedName = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase()
  const temperature = randomInt(0, 50)

  return {
    name: normalizedName,
    country: 'N/A',
    temperature,
    feelsLike: Math.max(0, Math.min(50, temperature + randomInt(-3, 3))),
    description: 'generated forecast',
    humidity: randomInt(20, 90),
    wind: randomInt(5, 35),
    icon: '🌦️',
  }
}

function App() {
  const [city, setCity] = useState(defaultCity)
  const [query, setQuery] = useState(defaultCity)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timerId = setTimeout(() => {
      const key = city.trim().toLowerCase()
      const result = hardcodedWeather[key] || buildRandomWeather(city)

      setWeather(result)
      setError('')
      setLoading(false)
    }, 300)

    setLoading(true)

    return () => clearTimeout(timerId)
  }, [city])

  function handleSubmit(event) {
    event.preventDefault()
    const nextCity = query.trim()

    if (nextCity) {
      setCity(nextCity)
    }
  }

  return (
    <main className="app-shell">
      <section className="weather-card">
        <div className="copy">
          <p className="eyebrow">React hooks practice</p>
          <h1>Weather App</h1>
          <p className="subtitle">Search a city from hardcoded values with useState and useEffect.</p>
        </div>

        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            aria-label="City name"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit">Search</button>
        </form>

        {loading ? (
          <p className="status">Loading weather...</p>
        ) : error ? (
          <p className="status error">{error}</p>
        ) : weather ? (
          <div className="weather-view">
            <div className="location-row">
              <div>
                <h2>
                  {weather.name}, {weather.country}
                </h2>
                <p className="description">{weather.description}</p>
              </div>
              <span aria-hidden="true" style={{ fontSize: '3.5rem' }}>
                {weather.icon}
              </span>
            </div>

            <div className="temperature">{weather.temperature}°C</div>

            <div className="details">
              <div>
                <span>Feels like</span>
                <strong>{weather.feelsLike}°C</strong>
              </div>
              <div>
                <span>Humidity</span>
                <strong>{weather.humidity}%</strong>
              </div>
              <div>
                <span>Wind</span>
                <strong>{weather.wind} km/h</strong>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App