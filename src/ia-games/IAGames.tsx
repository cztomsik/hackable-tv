// TODO: launch (can be external command)

import * as React from 'react'
import { styled } from 'goober'
import { Route, Link } from 'wouter'
import { Heading, ListItem, List, Image, LoadingIndicator } from '../ui'
import { useQuery } from 'react-query'

export const IAGames = () => (
  <>
    <Route path="" component={Listing} />
    <Route path="/:id" component={Detail} />
  </>
)

export const Listing = () => {
  const { isLoading, data } = useQuery('games', fetchGames)

  return (
    <div>
      <Heading>Internet Archive Games</Heading>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <List>
          {data?.map(g => (
            <Link to={`/${g.identifier}`}>
              <ListItem key={g.identifier}>{g.title}</ListItem>
            </Link>
          ))}
        </List>
      )}
    </div>
  )
}

export const Detail = ({ params: { id } }: any) => {
  const { isLoading, data } = useQuery(['game', id], fetchGameDetail)

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <div style={{ display: 'flex' }}>
      <Image src={`https://archive.org/services/img/${id}`} width={400} height={200} />

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Heading>{data.metadata.title}</Heading>
        <Description>{stripHtml(data.metadata.description ?? 'No description found')}</Description>

        <pre>
          {JSON.stringify(
            data.files.map(f => f.name),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}

// TODO: shared UI component
const Description = styled('div')`
  color: #ddd;
  font-size: 24px;
  line-height: 32px;
`

const stripHtml = html => html.replace(/(<([^>]+)>)/gi, '')

// data fetching

const fetchGames = async ({ rows = 10 } = {}) => {
  const params = new URLSearchParams({
    output: 'json',
    q: 'collection:(softwarelibrary_msdos_shareware) format:(zip)',
    sort: 'downloads desc',
    rows: '' + rows,
    fl: ['identifier', 'title', 'description'].join(','),
  })

  const data = await fetch(`https://archive.org/advancedsearch.php?${params}`).then(r => r.json())

  return data?.response?.docs
}

const fetchGameDetail = async (key, id) => fetch(`https://archive.org/metadata/${id}`).then(r => r.json())
