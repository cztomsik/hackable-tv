import * as React from 'react'
import { Focusable } from '../ui'

// TODO: box-shadow
// TODO: text-align: center (graffiti) & remove unnecessary <span>
export const Button = ({ children, href = '', onPress = () => href && location.assign(href) }) => (
  <Focusable onPress={onPress}>
    {focused => {
      const s = focused ? enlarged : base

      return (
        <div style={s.wrapper}>
          <button style={s.button} onClick={onPress}>
            <span style={s.text}>{children}</span>
          </button>
        </div>
      )
    }}
  </Focusable>
)

const base = {
  wrapper: { padding: 5, paddingLeft: 15, paddingRight: 15 },

  button: { width: '100%', height: 50, justifyContent: 'center', backgroundColor: '#444' },

  text: { alignSelf: 'center', fontSize: 24, color: '#ddd' }
}

const enlarged = {
  wrapper: { ...base.wrapper, padding: 1, paddingLeft: 3, paddingRight: 3 },

  button: { ...base.button, backgroundColor: '#fff' },

  text: { ...base.text, fontSize: 28, color: '#000' }
}
