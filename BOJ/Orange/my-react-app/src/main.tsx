import React, { useEffect, useState } from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './index.css'

const SmartTravelDashboard = () => {
  const [position, setPosition] = useState(null)
  const [geoError, setGeoError] = useState(null)
  const [gettingLocation, setGettingLocation] = useState(false)

  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState(null)

  const [itinerary, setItinerary] = useState([
    { id: '1', city: 'Paris', country: 'France', date: '2025-06-11', notes: 'Visit Louvre & Eiffel Tower' },
    { id: '2', city: 'Rome', country: 'Italy', date: '2025-06-15', notes: 'Colosseum and Vatican Museums' },
  ])
  const [newDest, setNewDest] = useState({ city: '', country: '', date: '', notes: '' })

  const [bookingJson, setBookingJson] = useState(null)

  const [userData, setUserData] = useState({ 
    name: 'Sabrina Graham', 
    email: 'Streaming@pl.biz', 
    phone: '+1-770-736-8031 x56442' 
  })
  const [loadingUser, setLoadingUser] = useState(false)
  const [userError, setUserError] = useState(null)

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation not supported by your browser.')
      return
    }
    setGettingLocation(true)
    setGeoError(null)
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { 
          lat: parseFloat(pos.coords.latitude.toFixed(4)), 
          lon: parseFloat(pos.coords.longitude.toFixed(4)) 
        }
        setPosition(coords)
        setGettingLocation(false)
      },
      (err) => {
        setGeoError(err.message || 'Unable to retrieve location.')
        setGettingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 15000 }
    )
  }

  useEffect(() => {
    if (position) {
      fetchWeather()
    }
  }, [position])

  const fetchWeather = async () => {
    setWeatherLoading(true)
    setWeatherError(null)
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lon}&current_weather=true`
      const response = await axios.get(url)
      setWeather(response.data.current_weather)
    } catch (error) {
      setWeatherError('Failed to load weather.')
    }
    setWeatherLoading(false)
  }

  const addDestination = () => {
    if (!newDest.city || !newDest.country || !newDest.date) return
    
    const newDestination = {
      id: Date.now().toString(),
      city: newDest.city,
      country: newDest.country,
      date: newDest.date,
      notes: newDest.notes || '',
    }
    
    setItinerary([...itinerary, newDestination])
    setNewDest({ city: '', country: '', date: '', notes: '' })
  }

  const fetchUserData = async () => {
    setLoadingUser(true)
    setUserError(null)
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
      setUserData({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
      })
    } catch (err) {
      setUserError('Error fetching user data.')
    }
    setLoadingUser(false)
  }

  const convertBookingXml = () => {
    const xmlString = `
      <booking>
        <id>BK12345</id>
        <traveler>
          <firstName>Alice</firstName>
          <lastName>Wong</lastName>
        </traveler>
        <flights>
          <flight>
            <from>NYC</from>
            <to>LHR</to>
            <date>2025-06-01</date>
          </flight>
          <flight>
            <from>LHR</from>
            <to>CDG</to>
            <date>2025-06-05</date>
          </flight>
        </flights>
        <hotel>
          <name>Grand Central Hotel</name>
          <nights>4</nights>
        </hotel>
      </booking>
    `.trim()

    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlString, 'application/xml')
    
    if (doc.querySelector('parsererror')) {
      setBookingJson({ error: 'Invalid XML' })
      return
    }

    const convertNodeToJson = (node) => {
      const obj = {}
      
      for (const attr of Array.from(node.attributes)) {
        obj[`@${attr.name}`] = attr.value
      }
      
      const children = Array.from(node.children)
      if (children.length === 0) {
        return node.textContent?.trim() ?? ''
      }
      
      children.forEach((child) => {
        const key = child.tagName
        const value = convertNodeToJson(child)
        if (obj[key]) {
          if (!Array.isArray(obj[key])) obj[key] = [obj[key]]
          obj[key].push(value)
        } else {
          obj[key] = value
        }
      })
      return obj
    }

    const root = doc.documentElement
    const json = { [root.tagName]: convertNodeToJson(root) }
    setBookingJson(json)
  }

  return (
    <div className="dashboard-root">
      <header className="header">
        <h1>Smart Travel Companion Dashboard</h1>
        <p className="tagline">Your interactive travel assistant</p>
      </header>

      <main className="grid">
        <section className="panel media">
          <h2>Travel Media</h2>
          <div className="media-wrapper">
            <iframe src="https://www.youtube.com/embed/z7cRTSP0vwo"></iframe>
            <audio controls style={{ width: '100%', marginTop: '0.75rem' }}>
              <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
              Your browser does not support audio.
            </audio>
          </div>
        </section>

        <section className="panel">
          <h2>Current Location</h2>
          {position && (
            <ul className="kv">
              <li>
                <span>Latitude:</span> <strong>{position.lat}</strong>
              </li>
              <li>
                <span>Longitude:</span> <strong>{position.lon}</strong>
              </li>
            </ul>
          )}
          {!position && !geoError && <p>{gettingLocation ? 'Detecting location...' : 'Location not set.'}</p>}
          {geoError && <p className="error">{geoError}</p>}
          <div style={{ marginTop: '.5rem' }}>
            <button onClick={getLocation} disabled={gettingLocation}>
              {gettingLocation ? 'Getting location...' : 'Get Location'}
            </button>
          </div>
          <small>Uses HTML5 Geolocation API.</small>
        </section>

        <section className="panel">
          <h2>Live Weather</h2>
          {weatherLoading && <p>Loading weather...</p>}
          {weatherError && <p className="error">{weatherError}</p>}
          {weather && (
            <div className="weather">
              <div>
                <span>Temperature:</span> <strong>{weather.temperature}°C</strong>
              </div>
              <div>
                <span>Wind Speed:</span> <strong>{weather.windspeed} km/h</strong>
              </div>
              <div>
                <span>Direction:</span> <strong>{weather.winddirection}°</strong>
              </div>
              <div>
                <span>Time:</span> <strong>{weather.time}</strong>
              </div>
            </div>
          )}
          {!position && <p className="muted">Weather loads after location is found.</p>}
        </section>

        <section className="panel span-2">
          <h2>Travel Plan (Dynamic JSON)</h2>
          <pre className="json">{JSON.stringify(itinerary, null, 2)}</pre>

          <div className="form">
            <input 
              placeholder="City" 
              value={newDest.city} 
              onChange={(e) => setNewDest({ ...newDest, city: e.target.value })} 
            />
            <input 
              placeholder="Country" 
              value={newDest.country} 
              onChange={(e) => setNewDest({ ...newDest, country: e.target.value })} 
            />
            <input 
              type="date" 
              value={newDest.date} 
              onChange={(e) => setNewDest({ ...newDest, date: e.target.value })} 
            />
            <input 
              placeholder="Notes" 
              value={newDest.notes} 
              onChange={(e) => setNewDest({ ...newDest, notes: e.target.value })} 
            />
            <button onClick={addDestination} disabled={!newDest.city || !newDest.country || !newDest.date}>
              Add Destination
            </button>
          </div>
        </section>

        <section className="panel">
          <h2>User Data (Axios Fetch)</h2>
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
          </div>
          {userError && <p className="error">{userError}</p>}
          <div style={{ marginTop: '.5rem' }}>
            <button onClick={fetchUserData} disabled={loadingUser}>
              {loadingUser ? 'Loading...' : 'Fetch Data'}
            </button>
          </div>
        </section>

        <section className="panel">
          <h2>Booking XML → JSON</h2>
          <button onClick={convertBookingXml}>Convert Booking XML</button>
          {bookingJson && <pre className="json">{JSON.stringify(bookingJson, null, 2)}</pre>}
        </section>
      </main>

      <footer className="footer">
        <small>Powered by Geolocation API & Open-Meteo (no key required).</small>
      </footer>

      <style>{`
        :root {
          --bg: #f6f8fb;
        }
        .dashboard-root {
          color: #111827;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          padding: 1.5rem;
          min-height: 100vh;
          background: var(--bg);
        }
        .header h1 {
          margin: 0 0 .25rem;
          font-size: 1.6rem;
        }
        .tagline {
          margin: 0;
          opacity: .7;
          font-size: .95rem;
        }
        .grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-top: 1rem;
        }
        .panel {
          background: #fff;
          border-radius: 8px;
          padding: 1rem;
          flex: 1 1 260px;
          min-width: 250px;
          box-shadow: 0 6px 18px rgba(15,23,42,0.06);
          display: flex;
          flex-direction: column;
          gap: .75rem;
        }
        .panel h2 {
          margin: 0 0 .4rem;
          font-size: .95rem;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .media .media-wrapper {
          display: flex;
          flex-direction: column;
        }
        .span-2 {
          flex: 2 1 520px;
        }
        .kv {
          list-style: none;
          padding: 0;
          margin: .25rem 0 .75rem;
          font-size: .95rem;
          display: grid;
          gap: .4rem;
        }
        .kv span { opacity: .7; margin-right: .35rem; }
        .weather > div {
          display: flex;
          justify-content: space-between;
          font-size: .9rem;
          padding: .15rem 0;
          border-bottom: 1px dashed rgba(15,23,42,0.06);
        }
        .weather > div:last-child { border-bottom: none; }
        .form {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(140px,1fr));
          gap: .5rem;
          margin-top: .75rem;
        }
        .form input {
          background: #f7fafc;
          border: 1px solid #e6edf3;
          color: #0f172a;
          padding: .5rem .6rem;
          font-size: .9rem;
          border-radius: 6px;
          outline: none;
        }
        .form input:focus { border-color: #3da9fc; box-shadow: 0 0 0 3px rgba(61,169,252,0.08); }
        button {
          cursor: pointer;
          border: none;
          background: linear-gradient(135deg,#3da9fc,#6e45e2);
          color: #fff;
          font-weight: 600;
          font-size: .85rem;
          padding: .55rem .85rem;
          border-radius: 8px;
          box-shadow: 0 6px 18px rgba(46,64,83,0.08);
        }
        button:disabled { opacity: .5; cursor: not-allowed; }
        pre.json {
          background: #0f1724;
          color: #e6eef5;
          border-radius: 8px;
          padding: .75rem .9rem;
          max-height: 220px;
          overflow: auto;
          font-size: .8rem;
          margin: .25rem 0 0;
        }
        .error { color: #b91c1c; font-size: .85rem; }
        .muted { opacity: .7; font-size: .9rem; }
        .footer { text-align: center; font-size: .8rem; opacity: .7; margin-top: 1rem; }
        @media (max-width: 680px) {
          .panel { flex: 1 1 100%; }
          .span-2 { flex: 1 1 100%; }
          .form { grid-template-columns: repeat(auto-fit,minmax(110px,1fr)); }
        }
      `}</style>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <SmartTravelDashboard />
  </StrictMode>
)