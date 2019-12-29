import * as React from 'react'
import { resolve, basename, extname } from 'path'
import { readdir } from 'fs'
import { Heading, List, ListItem } from '../ui'
import { mediaPlayer } from '../mediaPlayer'

export const FileManager = () => {
  const [path, setPath] = React.useState(__dirname)
  const [files, setFiles] = React.useState(null)

  const goTo = dir => setPath(resolve(`${path}/${dir}`))

  React.useEffect(() => {
    readdir(path, { withFileTypes: true }, (err, files) => setFiles(files))
  }, [path])

  return (
    <div>
      <Heading>{basename(path)}</Heading>

      {files && (
        <List>
          <ListItem onPress={() => goTo('..')}>..</ListItem>

          {files.map(f => (
            <ListItem key={f.name} onPress={f.isDirectory() ? () => goTo(f.name) : () => open(`${path}/${f.name}`)}>
              {f.name}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

const open = f => {
  switch (extname(f).slice(1)) {
    case 'mp3':
    case 'm4a':
    case 'avi':
    case 'mkv':
      return mediaPlayer.play(f)
  }
}
