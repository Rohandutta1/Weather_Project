import React, { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapPreview({ position, onPositionChange }) {
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return

    mapRef.current = L.map('map-preview', { center: [position.lat, position.lon], zoom: 13 })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current)

    markerRef.current = L.marker([position.lat, position.lon], { draggable: true }).addTo(mapRef.current)

    mapRef.current.on('click', function (e) {
      const { lat, lng } = e.latlng
      markerRef.current.setLatLng(e.latlng)
      onPositionChange({ lat, lon: lng })
    })

    markerRef.current.on('dragend', function (e) {
      const p = e.target.getLatLng()
      onPositionChange({ lat: p.lat, lon: p.lng })
    })

    return () => {
      mapRef.current && mapRef.current.remove()
      mapRef.current = null
    }
  }, [])


  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return
    const latlng = L.latLng(position.lat, position.lon)
    markerRef.current.setLatLng(latlng)
    mapRef.current.setView(latlng, mapRef.current.getZoom())
  }, [position])

  return (
    <div style={{ height: 420, borderRadius: 8, border: '1px solid rgba(255,255,255,0.03)' }}>
      <div id="map-preview" style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
