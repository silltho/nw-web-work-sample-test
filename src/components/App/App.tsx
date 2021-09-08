import { Typography } from '@material-ui/core'
import { VideoPlayer } from 'components/VideoPlayer'
import { memo } from 'react'
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
  return (
    <StyledApp>
      <Typography variant="h3">Videoplayer Controls</Typography>
      <StyledSpacer />
      <VideoPlayer />
      <StyledSpacer />
    </StyledApp>
  )
}

export const App = memo(AppRaw)
