import * as React from 'react'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'
import { Heading, Button } from '../ui'
import { mediaPlayer } from '../mediaPlayer'
import axios from 'axios'

const favorites = [
  { name: 'Synthetic FM', url: 'https://mediaserv38.live-streams.nl:18040/live' },
  { name: 'Classic Rock Florida HD', url: 'http://198.58.98.83:8258/stream' },
  { name: 'Evropa2', url: 'https://icecast3.play.cz/evropa2-128.mp3' },
  { name: 'Kiss', url: 'https://icecast4.play.cz/kiss128.mp3' },
  { name: 'BEAT Radio', url: 'http://icecast1.play.cz/beat64.mp3' },
  { name: 'ROCK Radio', url: 'http://ice.abradio.cz:8000/sumava128.mp3' }
]

export const Radio = () => {
  const [rockStations, setRockStations] = React.useState([])
  const [synthStations, setSynthStations] = React.useState([])

  React.useEffect(() => {
    getStations('rock').then(setRockStations)
    getStations('synthwave').then(setSynthStations)
  }, [])

  return (
    <div>
      <Heading>Radio</Heading>

      <Shelf
        title="Favorites"
        data={favorites}
        renderItem={it => <ShelfItem title={it.name} onEnterPress={() => mediaPlayer.play(it.url)} />}
      />

      <Shelf
        title="Rock"
        data={rockStations}
        renderItem={it => <ShelfItem title={it.name} onEnterPress={() => mediaPlayer.play(it.url)} />}
      />

      <Shelf
        title="Synthwave"
        data={synthStations}
        renderItem={it => <ShelfItem title={it.name} onEnterPress={() => mediaPlayer.play(it.url)} />}
      />
    </div>
  )
}

const Shelf = ({ title, data, renderItem }) => {
  const el = React.useRef()

  return (
    <div tabIndex={0}>
      <h3 style={{ color: '#ccc' }}>{title}</h3>
      <div style={{ display: 'flex', marginLeft: -10, alignItems: 'center' }}>{data.map(it => renderItem(it))}</div>
    </div>
  )
}

const ShelfItem = withFocusable()(({ title, focused }) => {
  const size = focused ? { width: 160, height: 160 } : { width: 120, height: 120 }

  return (
    <div style={{ ...size, margin: 10, alignItems: 'center' }}>
      <div style={{ backgroundColor: '#ccc', height: '100%', width: '100%' }} />
      {focused && <span style={{ color: '#ccc', marginTop: 10 }}>{title}</span>}
    </div>
  )
})

const getStations = async genre => {
  const { data } = await axios.get(
    `http://www.radio-browser.info/webservice/json/stations/search?tag=${genre}&limit=6&order=votes&reverse=true`
  )

  return data.map(({ name, url }) => ({ name, url }))
}
