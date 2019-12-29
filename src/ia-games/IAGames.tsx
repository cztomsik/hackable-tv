import * as React from 'react'
import axios from 'axios'
import { Route, Link } from 'wouter'
import { Heading, ListItem, List, Button, Image } from '../ui'

// TODO
const favorites = [
  {
    identifier: 'msdos_sdramp_shareware',
    title: 'Alien Rampage',
    description: 'Alien Rampage v1.11 - Shareware'
  },

  {
    identifier: 'msdos_jazzxmas_shareware',
    title: 'Jazz Jackrabbit Christmas Edition',
    description:
      'This is an all-new CHRISTMAS EDITION of Jazz Jackrabbit, the breakthrough PC thriller that won Best Arcade Game of the Year!'
  },

  {
    identifier: 'msdos_jjxmas95_shareware',
    title: 'Jazz Jackrabbit Holiday Hare 1995',
    description:
      'From Epic MegaGames comes the All-New 1995 Holiday Hare. This holiday version of the award winning Jazz Jackrabbit features new levels and music for your holiday game playing pleasure!'
  },

  {
    identifier: 'msdos_Quake106_shareware',
    title: 'Quake',
    description: 'Famous first-person shooter game from id Software.'
  },

  {
    identifier: 'TETRIS.EXE',
    title: 'Tetris',
    description: 'A Tetris clone written in QBasic in the year 2000 by Michael Fogleman.'
  }
]

export const IAGames = () => (
  <>
    <Route path="" component={Listing} />
    <Route path="/:id" component={Detail} />
  </>
)

export const Listing = () => {
  // TODO: load once only
  const [games, setGames] = React.useState(null)

  React.useEffect(() => {
    getGames().then(setGames)
  }, [])

  return (
    <div>
      <Heading>Internet Archive Games</Heading>

      <List>
        {games &&
          games.map(g => (
            <Link to={`/${g.identifier}`}>
              <ListItem key={g.identifier}>{g.title}</ListItem>
            </Link>
          ))}
      </List>

      <Button>Dummy button to catch focus</Button>
    </div>
  )
}

// TODO: load detail (& cache it; optimistic-ui)
export const Detail = ({ params }) => (
  <div style={{ display: 'flex' }}>
    <Image src={`https://archive.org/services/img/${params.id}`} width={400} height={200} />

    <div style={{ padding: 20 }}>
      <Heading>{params.id.slice(0, 20)}</Heading>

      <div style={{ color: '#ddd', fontSize: 24, lineHeight: 28 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus nulla quod dignissimos quisquam
        repudiandae nesciunt molestiae cumque culpa, neque iusto nam unde necessitatibus reprehenderit porro molestias
        dolore vitae voluptas!
      </div>
    </div>
  </div>
)

const getGames = async ({ rows = 10 } = {}) => {
  const params = {
    output: 'json',
    q: 'collection:(softwarelibrary_msdos_shareware) format:(zip)',
    sort: 'downloads desc',
    rows,
    fl: ['identifier', 'title', 'description']
  }

  const { data } = await axios.get(`https://archive.org/advancedsearch.php`, { params })

  console.log(data?.response?.docs)

  return data?.response?.docs
}
