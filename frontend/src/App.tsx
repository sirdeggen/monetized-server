import React, { useState, type FormEvent } from 'react'
import { ProtoWallet, PrivateKey, AuthFetch } from '@bsv/sdk'
import ReactJsonPretty from 'react-json-pretty'

const App: React.FC = () => {
  // These are some state variables that control the app's interface.
  const [createLoading, setCreateLoading] = useState<boolean>(false)
  const [city, setCity] = useState<string>('')
  const [weather, setWeather] = useState<Object | undefined>(undefined)

  const key = PrivateKey.fromRandom()
  const wallet = new ProtoWallet(key)
  const authFetch = new AuthFetch(wallet)

  const handleCreateSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault() // Stop the HTML form from reloading the page.
    try {
      setCreateLoading(true)
      // grab the current value of the input "city"
      const city = e.currentTarget.city.value
      setCity(city)
      // make the authorized fetch request to the backend
      const response = await (await authFetch.fetch('http://localhost:3000/weather/' + city)).json()
      setWeather(response)
    } catch (error) {
      console.error(error)
    } finally {
      setCreateLoading(false)
    }
  }

  if (weather) return <>
    <h1>Weather in {city}</h1>
    <ReactJsonPretty data={weather} />
  </>

  return (
    <>
      <h1>Pay 1 Sat to Get Weather</h1>
      <p>This application allows you to pay for information you want.</p>
      {/* an input field for the city you want the weather for */}
      <form onSubmit={handleCreateSubmit}>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" className="city-input" />
        <button type="submit" disabled={createLoading}>
          {createLoading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
    </>
  )
}

export default App
