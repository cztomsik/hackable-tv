import * as React from 'react'
import fetch from 'node-fetch'
import { Heading, ListItem, List, Button, Image, LoadingIndicator } from '../ui'

const places = [
  { name: 'Prague', id: 796597 },
  { name: 'Vienna', id: 551801 },
  { name: 'Barcelona', id: 753692 },
  { name: 'Santa Cruz de Tenerife', id: 773692 },
  { name: 'London', id: 44418 },
  { name: 'San Francisco', id: 2487956 }
]

export const Weather = () => {
  const [place, setPlace] = React.useState(places[0])
  const { data } = useWeather(place.id)

  return (
    <div>
      <Heading>Weather</Heading>
      <h4 style={{ marginTop: -60 }}>{new Date().toLocaleDateString()}</h4>
      <div style={{ marginBottom: 40 }}>Data provided by https://www.metaweather.com/api/</div>

      <div style={{ display: 'flex' }}>
        <List>
          {places.map(p => (
            <ListItem key={p.id} onFocus={() => setPlace(p)}>
              {p.name}
            </ListItem>
          ))}
        </List>

        <div style={{ flex: 1, padding: 20 }}>{data ? <Detail {...data} /> : <LoadingIndicator />}</div>
      </div>
    </div>
  )
}

const Detail = data => (
  <div>
    <h1 style={{ fontSize: 60, marginBottom: 40 }}>{data.state}</h1>

    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Metric header="Temp" value={data.temp} unit="Celc." />
      <Metric header="Humidity" value={data.humidity} unit="%" />
      <Metric header="Pressure" value={data.pressure} unit="kPA" />
    </div>
  </div>
)

const Metric = ({ header, value, unit }) => (
  <div>
    <div style={{ fontSize: 20, color: '#aaa' }}>{header}</div>
    <span style={{ fontSize: 40, lineHeight: 50, color: '#fff' }}>
      {value.toFixed(1)}
      {unit}
    </span>
  </div>
)

const useWeather = placeId => {
  const [data, setData] = React.useState(null)

  const getData = async () => {
    const {
      consolidated_weather: [first]
    } = await fetch(`https://www.metaweather.com/api/location/${placeId}`).then(r => r.json())

    return {
      state: first.weather_state_name,
      temp: first.the_temp,
      humidity: first.humidity,
      pressure: first.air_pressure
    }
  }

  React.useEffect(() => {
    let cancelled = false

    setData(null)
    getData().then(data => {
      if (!cancelled) {
        setData(data)
      }
    })

    return () => (cancelled = true)
  }, [placeId])

  return { data }
}
