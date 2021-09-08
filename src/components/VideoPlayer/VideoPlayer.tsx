import { forwardRef, memo } from 'react'
import styled from 'styled-components'

const StyledVideo = styled.video`
  width: 100%;
`

export const VideoPlayerRaw = forwardRef<HTMLVideoElement>((props, ref) => (
  <StyledVideo
    ref={ref}
    src="http://media.w3.org/2010/05/sintel/trailer.mp4"
    controls
  />
))

export const VideoPlayer = memo(VideoPlayerRaw)
