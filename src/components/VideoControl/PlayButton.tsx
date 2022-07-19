import { memo, RefObject, useCallback, useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { Pause, PlayArrow } from '@material-ui/icons'
import styled from 'styled-components'

const StyledPause = styled(Pause)`
  color: #fff;
`
const StyledPlayArrow = styled(PlayArrow)`
  color: #fff;
`

export type PlayButtonProps = {
  videoRef: RefObject<HTMLVideoElement>
}

const usePlayPause = (videoRef: RefObject<HTMLVideoElement>) => {
  const [playing, setPlaying] = useState(false)
  const handlePlayPause = useCallback(() => {
    setPlaying(!videoRef.current?.paused)
  }, [videoRef])

  useEffect(() => {
    const { current } = videoRef
    current?.addEventListener('play', handlePlayPause)
    current?.addEventListener('pause', handlePlayPause)
    return () => {
      current?.removeEventListener('play', handlePlayPause)
      current?.removeEventListener('pause', handlePlayPause)
    }
  }, [handlePlayPause, videoRef])

  const handleClick = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
      setPlaying(!videoRef.current?.paused)
    }
  }, [videoRef])

  return {
    playing,
    togglePlayPause: handleClick,
  }
}

export const PlayButtonRaw = ({ videoRef }: PlayButtonProps) => {
  const { playing, togglePlayPause } = usePlayPause(videoRef)

  return (
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="span"
      onClick={togglePlayPause}
    >
      {playing ? <StyledPause /> : <StyledPlayArrow />}
    </IconButton>
  )
}

export const PlayButton = memo(PlayButtonRaw)
