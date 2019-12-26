import * as React from 'react'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'

// this is ew (turning HoC to render comp)
// TODO: make own focusable comp
// (not sure if it can be hook based but render-prop is fine too)
const Ew = withFocusable()(({ children, focused }) => children(focused))

export const Focusable = ({ onPress, ...rest }) => <Ew onEnterPress={onPress} {...rest} />
