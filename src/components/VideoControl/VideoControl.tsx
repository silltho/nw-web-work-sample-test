import styled from 'styled-components'
import { memo, RefObject } from 'react'
import { VolumeSlider } from './VolumeSlider'
import { PlayButton } from './PlayButton'
import { ProgressBar } from './ProgressBar'

const StyledControl = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

export type VideoControlProps = {
  videoRef: RefObject<HTMLVideoElement>
}

export const VideoControlRaw = ({ videoRef }: VideoControlProps) => {
  return (
    <StyledControl>
      <PlayButton videoRef={videoRef} />
      <VolumeSlider videoRef={videoRef} />
      <ProgressBar videoRef={videoRef} />
    </StyledControl>
  )
}

export const VideoControl = memo(VideoControlRaw)
