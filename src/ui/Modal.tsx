import * as React from 'react'

export const Modal = ({ children }) => <div style={base}>{children}</div>

const base: any = {
  width: '100%',
  height: '100%',
  backgroundColor: '#222a',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}
