import * as React from 'react'
import fetch from 'node-fetch'
import { Route, Link } from 'wouter'
import { Heading, ListItem, List, Button, Image, LoadingIndicator } from '../ui'
import { useQuery } from 'react-query'

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
  const { status, data } = useQuery('todos', getGames)

  return (
    <div>
      <Heading>Internet Archive Games</Heading>

      {status === 'loading' ? (
        <LoadingIndicator />
      ) : (
        <List>
          {data &&
            data.map(g => (
              <Link to={`/${g.identifier}`}>
                <ListItem key={g.identifier}>{g.title}</ListItem>
              </Link>
            ))}
        </List>
      )}

      <Button>Dummy button to catch focus</Button>
    </div>
  )
}

export const Detail = ({ params: { id } }) => {
  const { status, data } = useQuery(`game-${id}`, () => getGameDetail(id))

  return status === 'loading' ? (
    <LoadingIndicator />
  ) : (
    <div style={{ display: 'flex' }}>
      <Image src={`https://archive.org/services/img/${id}`} width={400} height={200} />

      <div style={{ padding: 20 }}>
        <Heading>{data.metadata.title}</Heading>

        <div style={{ color: '#ddd', fontSize: 24, lineHeight: 28 }}>{data.metadata.description}</div>

        <div>
          {JSON.stringify(
            data.files.map(f => f.name),
            null,
            2
          )}
        </div>
      </div>
    </div>
  )
}

const getGames = async ({ rows = 10 } = {}) => {
  const params = new URLSearchParams({
    output: 'json',
    q: 'collection:(softwarelibrary_msdos_shareware) format:(zip)',
    sort: 'downloads desc',
    rows: '' + rows,
    fl: ['identifier', 'title', 'description'].join(',')
  })

  const data = await fetch(`https://archive.org/advancedsearch.php?${params}`).then(r => r.json())

  return data?.response?.docs
}

const getGameDetail = async id => fetch(`https://archive.org/metadata/${id}`).then(r => r.json())
