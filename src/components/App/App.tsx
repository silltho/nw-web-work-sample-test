import { Typography } from '@material-ui/core'
import { VideoControl } from 'components/VideoControl'
import { VideoPlayer } from 'components/VideoPlayer'
import { memo, useRef } from 'react'
import styled from 'styled-components'

const StyledApp = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  margin-left: auto;
  margin-right: auto;
`

const StyledSpacer = styled.div`
  height: 16px;
`

export const AppRaw = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <StyledApp>
      <Typography variant="h3">Videoplayer Controls</Typography>
      <StyledSpacer />
      <VideoPlayer ref={videoRef} />
      <StyledSpacer />
      <VideoControl videoRef={videoRef} />
    </StyledApp>
  )
}

export const App = memo(AppRaw)
