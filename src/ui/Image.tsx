import * as React from 'react'

// TODO: real image
export const Image = ({ src, width, height }) => {
  const backgroundColor = React.useMemo(
    () =>
      `#${Math.round(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')}`,
    []
  )

  return <div style={{ width, height, backgroundColor }}></div>
}
