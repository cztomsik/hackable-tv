import * as React from 'react'
import { Heading, Shelf, ShelfItem, Image } from '../ui'
import { mediaPlayer } from '../mediaPlayer'

const favorites = [
  { name: 'Synthetic FM', url: 'https://mediaserv38.live-streams.nl:18040/live' },
  { name: 'Classic Rock Florida HD', url: 'http://198.58.98.83:8258/stream' },
  { name: 'Evropa2', url: 'https://icecast3.play.cz/evropa2-128.mp3' },
  { name: 'Kiss', url: 'https://icecast4.play.cz/kiss128.mp3' },
  { name: 'BEAT Radio', url: 'http://icecast1.play.cz/beat64.mp3' },
  { name: 'ROCK Radio', url: 'http://ice.abradio.cz:8000/sumava128.mp3' },
  { name: '8bit FM', url: 'http://8bit.fm:8000/live' },
  { name: 'Deutschlandfunk Nova', url: 'http://dradio-edge-2092.dus-lg.cdn.addradio.net/dradio/nova/live/ogg/104/' }
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

      <Shelf title="Favorites">
        {favorites.map(it => (
          <ShelfItem title={it.name} onPress={() => mediaPlayer.play(it.url)} width={120} height={120}>
            <Image src="" width="100%" height="100%" />
          </ShelfItem>
        ))}
      </Shelf>

      <Shelf title="Rock">
        {rockStations.map(it => (
          <ShelfItem title={it.name} onPress={() => mediaPlayer.play(it.url)} width={120} height={120}>
            <Image src="" width="100%" height="100%" />
          </ShelfItem>
        ))}
      </Shelf>

      <Shelf title="Synthwave">
        {synthStations.map(it => (
          <ShelfItem title={it.name} onPress={() => mediaPlayer.play(it.url)} width={120} height={120}>
            <Image src="" width="100%" height="100%" />
          </ShelfItem>
        ))}
      </Shelf>
    </div>
  )
}

const getStations = async genre =>
  fetch(
    `/api/radio/stations/bytagexact/${genre}?limit=6&order=votes&reverse=true`
  ).then(r => r.json())
