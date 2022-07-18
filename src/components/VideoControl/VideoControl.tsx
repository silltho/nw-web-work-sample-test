import { IconButton, LinearProgress } from '@material-ui/core'
import { Pause, PlayArrow } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'
import { memo, RefObject, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { VolumeSlider } from './VolumeSlider'

const StyledControl = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
export type VideoControlProps = {
  videoRef: RefObject<HTMLVideoElement>
}

export const VideoControlRaw = ({ videoRef }: VideoControlProps) => {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const handlePlayPause = useCallback(() => {
    setPlaying(!videoRef.current?.paused)
  }, [videoRef])

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        setProgress(
          (100 * videoRef.current?.currentTime) / videoRef.current?.duration
        )
      }
    }, 500)
    return () => {
      clearInterval(interval)
    }
  }, [progress, videoRef])

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  })

  const classes = useStyles()
  useEffect(() => {
    const { current } = videoRef
    current?.addEventListener('play', handlePlayPause)
    current?.addEventListener('pause', handlePlayPause)
    return () => {
      current?.removeEventListener('play', handlePlayPause)
      current?.removeEventListener('pause', handlePlayPause)
    }
  }, [handlePlayPause, videoRef])
  //

  function handleClick() {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  return (
    <StyledControl>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleClick}
      >
        {playing ? <Pause /> : <PlayArrow />}
      </IconButton>
      <VolumeSlider videoRef={videoRef} />
      <div className={classes.root}>
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress}
        />
      </div>
    </StyledControl>
  )
}

export const VideoControl = memo(VideoControlRaw)
