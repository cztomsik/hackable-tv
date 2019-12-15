import * as React from 'react'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'
import { Heading, Button } from '../ui'
import { mediaPlayer } from '../mediaPlayer'

// TODO: http://rad.io
// from https://www.internet-radio.com/
//
// TODO: image, slogan, facebook, twitter,
const radios = [
  { name: 'Synthetic FM', url: 'https://mediaserv38.live-streams.nl:18040/live' },
  { name: 'Classic Rock Florida HD', url: 'http://198.58.98.83:8258/stream' },
  { name: 'Evropa2', url: 'https://icecast3.play.cz/evropa2-128.mp3' },
  { name: 'Kiss', url: 'https://icecast4.play.cz/kiss128.mp3' },
  { name: 'BEAT Radio', url: 'http://icecast1.play.cz/beat64.mp3' },
  { name: 'ROCK Radio', url: 'http://ice.abradio.cz:8000/sumava128.mp3' }
]

export const Radio = () => {
  const [foo, setFoo] = React.useState('Foo')

  return (
    <div>
      <Heading>Radio</Heading>

      <Shelf
        title="Pinned"
        data={radios}
        renderItem={it => <ShelfItem title={it.name} onEnterPress={() => mediaPlayer.play(it.url)} />}
      />

      <Shelf
        title="Rock"
        data={radios}
        renderItem={it => <ShelfItem title={it.name} onEnterPress={() => mediaPlayer.play(it.url)} />}
      />

      <Shelf
        title="Alternative"
        data={radios}
        renderItem={it => <ShelfItem title={it.name} onEnterPress={() => mediaPlayer.play(it.url)} />}
      />

      <div tabIndex={0} style={{ display: 'flex', width: '50%', justifyContent: 'space-between', padding: 20 }}>
        <Button style={{ width: 100 }} onEnterPress={() => setFoo(foo + 'o')}>
          {foo}
        </Button>
        <Button style={{ width: 200 }} onEnterPress={() => setFoo(foo + 'o')}>
          {foo}
        </Button>
      </div>

      <Button onEnterPress={() => setFoo(foo + 'o')}>{foo}</Button>
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
