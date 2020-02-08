import * as React from 'react'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'

// this is ew (turning HoC to render comp)
// TODO: make own focusable comp
// (not sure if it can be hook based but render-prop is fine too)
const Ew = withFocusable()(({ children, ...rest }) => children(rest))

export const Focusable = ({ onPress, onFocus = undefined, ...rest }) =>
  <Ew onEnterPress={onPress} onBecameFocused={onFocus} {...rest} />
