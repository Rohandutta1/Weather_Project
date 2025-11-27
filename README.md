# Map Preview (Vite + React)

A minimal Vite + React project that previews a folder map (collapsible tree). Useful as a small demo or base for integrating real file system data.

## Requirements
- Node.js 18+ recommended
- `npm` or `yarn`

## Install

```bash
npm install
```

## Run dev server

```bash
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Notes about APIs used
- Geocoding: OpenStreetMap Nominatim (no API key; please follow usage policy). Reverse-geocoding and search are used for address lookup.
- Weather: Open-Meteo (free/no-key) is used to fetch current weather for the pin coordinates.

Run `npm install` before starting — `leaflet` is used for the map tiles and marker.

## Build / Preview

```bash
npm run build
npm run preview
```

## Notes
- The sample folder structure is hard-coded in `src/App.jsx`. You can replace it with dynamic data or an API that returns a folder tree.
- To adapt for Electron or a server-rendered preview, wire the data source to TypeScript/Node code that reads the file system.
