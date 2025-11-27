import React, { useState, useEffect } from 'react'

export default function AddressInput({ defaultValue = '', onSearch }) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  function submit(e) {
    e && e.preventDefault()
    if (onSearch) onSearch(value)
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        aria-label="address"
        placeholder="Search address or place"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit' }}
      />
      <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#2b7a78', color: '#fff' }}>
        Search
      </button>
    </form>
  )
}
