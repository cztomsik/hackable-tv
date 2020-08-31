import { styled } from 'goober'

export const Box = styled('div')<any>`
  ${({ flex }) => `
    ${flex && `flex: ${flex};`}
  `}
`
