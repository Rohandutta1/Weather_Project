import React, { useState, useEffect } from 'react'
import AddressInput from './components/AddressInput'
import MapPreview from './components/MapPreview'
import WeatherInfo from './components/WeatherInfo'
import './styles.css'

export default function App() {
  const [address, setAddress] = useState('')
  const [position, setPosition] = useState({ lat: 22.572150, lon: 88.364754 })
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lon}&current_weather=true`
        )
        const data = await res.json()
        setWeather(data.current_weather || null)
      } catch (err) {
        setWeather(null)
      }
    }
    fetchWeather()
  }, [position])

  async function handleSearch(q) {
    if (!q) return
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`
      const res = await fetch(url, { headers: { 'User-Agent': 'folder-map-preview/1.0' } })
      const results = await res.json()
      if (results && results.length) {
        const r = results[0]
        setPosition({ lat: parseFloat(r.lat), lon: parseFloat(r.lon) })
        setAddress(r.display_name || q)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handlePositionChange({ lat, lon }) {
    setPosition({ lat, lon })
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      const res = await fetch(url, { headers: { 'User-Agent': 'folder-map-preview/1.0' } })
      const data = await res.json()
      setAddress(data.display_name || '')
    } catch (err) {}
  }

  return (
    <div>
      <h1>Map & Weather Info</h1>

      <AddressInput defaultValue={address} onSearch={handleSearch} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ width: 320 }}>
          <WeatherInfo address={address} position={position} weather={weather} />
        </div>
        <div style={{ flex: 1 }}>
          <MapPreview position={position} onPositionChange={handlePositionChange} />
        </div>
      </div>
    </div>
  )
}
