import * as React from 'react'
import { withFocusable } from 'https://jspm.dev/@noriginmedia/react-spatial-navigation@2.12.5'

// this is ew (turning HoC to render comp)
// TODO: make own focusable comp
// (not sure if it can be hook based but render-prop is fine too)
const Ew = withFocusable()(({ children, ...rest }) => children(rest))

export const Focusable = ({ onPress, onFocus = undefined, ...rest }) =>
  <Ew onEnterPress={onPress} onBecameFocused={onFocus} {...rest} />
