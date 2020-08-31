import * as React from 'react'
import { useQuery } from 'react-query'
import { Box, Stack, Row, Heading, ListItem, List, LoadingIndicator } from '../ui'

const places = [
  { name: 'Prague', id: 796597 },
  { name: 'Vienna', id: 551801 },
  { name: 'Barcelona', id: 753692 },
  { name: 'Santa Cruz de Tenerife', id: 773692 },
  { name: 'London', id: 44418 },
  { name: 'San Francisco', id: 2487956 },
]

export const Weather = () => {
  const [place, setPlace] = React.useState(places[0])
  const { data, isLoading } = useQuery(['weather', place], fetchWeather)

  return (
    <Stack>
      <Heading>Weather</Heading>
      <h4 style={{ marginTop: -30 }}>{new Date().toLocaleDateString()}</h4>
      <div style={{ marginBottom: 40 }}>Data provided by https://www.metaweather.com/api/</div>

      <Row flex={1}>
        <List>
          {places.map(p => (
            <ListItem key={p.id} onFocus={() => setPlace(p)}>
              {p.name}
            </ListItem>
          ))}
        </List>
        <Box flex={1} style={{ padding: '0 20px' }}>
          {isLoading ? <LoadingIndicator /> : <Detail weather={data} />}
        </Box>
      </Row>
    </Stack>
  )
}

const Detail = ({ weather }) => (
  <Stack>
    <h1 style={{ fontSize: 60 }}>{weather.state}</h1>

    <Row>
      <Metric header="Temp" value={weather.temp} unit="Celc." />
      <Metric header="Humidity" value={weather.humidity} unit="%" />
      <Metric header="Pressure" value={weather.pressure} unit="kPA" />
    </Row>
  </Stack>
)

const Metric = ({ header, value, unit }) => (
  <div>
    <div style={{ fontSize: 20, color: '#aaa' }}>{header}</div>
    <span style={{ fontSize: 40, lineHeight: '50px', color: '#fff' }}>
      {value.toFixed(1)}
      {unit}
    </span>
  </div>
)

const fetchWeather = async (key, place) => {
  const {
    consolidated_weather: [first],
  } = await fetch(`/api/weather/location/${place.id}/`).then(r => r.json())

  return {
    state: first.weather_state_name,
    temp: first.the_temp,
    humidity: first.humidity,
    pressure: first.air_pressure,
  }
}
