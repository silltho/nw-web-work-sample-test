import { IconButton } from '@material-ui/core'
import { VolumeUp, VolumeOff, VolumeMute, VolumeDown } from '@material-ui/icons'
import Slider from '@material-ui/core/Slider'
import styled from 'styled-components'
import React, {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
} from 'react'

const StyledVolumeSlider = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  margin-right: 1rem;
  gap: 5px;
`

const StyledVolumeOff = styled(VolumeOff)`
  color: #fff;
`
const StyledVolumeMute = styled(VolumeMute)`
  color: #fff;
`
const StyledVolumeDown = styled(VolumeDown)`
  color: #fff;
`
const StyledVolumeUp = styled(VolumeUp)`
  color: #fff;
`
const StyledSlider = styled(Slider)`
  color: #fff;
`

export type VolumeSliderProps = {
  videoRef: RefObject<HTMLVideoElement>
}

export const VolumeSliderRaw = ({ videoRef }: VolumeSliderProps) => {
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0)

  //const storedVolume = useRef(0)

  const icon = useMemo(() => {
    if (muted || volume <= 0) {
      return <StyledVolumeOff />
    }
    if (volume <= 30) {
      return <StyledVolumeMute />
    }
    if (volume <= 60) {
      return <StyledVolumeDown />
    }
    return <StyledVolumeUp />
  }, [muted, volume])

  // handle volume change made on the player it self
  const handleVolumeChangeEvent = useCallback(() => {
    if (videoRef.current) {
      //mui element uses 0-100 value, so it has to be changed from 0-1 value by *100
      setVolume(videoRef.current.volume * 100)
      setMuted(videoRef.current.muted)
    }
  }, [videoRef])

  //handle volume change made on the custom volume slider
  const handleVolumeChangeElement = useCallback(
    (event: ChangeEvent<{}>, newValue: number | number[]) => {
      if (typeof newValue !== 'number' || !videoRef.current) return
      videoRef.current.volume = newValue / 100 //videoRef uses 0-1 value, so it has to be changed from 0-100 value by /100
      if (videoRef.current.volume > 0) {
        videoRef.current.muted = false
      }
      if (videoRef.current.volume === 0) {
        videoRef.current.muted = true
      }
    },
    [videoRef]
  )

  const handleToggleMute = useCallback(() => {
    if (!videoRef.current) return
    if (videoRef.current.volume === 0 && videoRef.current.muted) {
      videoRef.current.volume = 1
      videoRef.current.muted = false
      return
    }
    if (!videoRef.current.muted) {
      videoRef.current.muted = true

      return
    }
    videoRef.current.muted = false
  }, [videoRef])
  useEffect(() => {
    const { current } = videoRef
    current?.addEventListener('volumechange', handleVolumeChangeEvent)
    return () => {
      current?.removeEventListener('volumechange', handleVolumeChangeEvent)
    }
  }, [handleVolumeChangeEvent, videoRef])

  return (
    <StyledVolumeSlider>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleToggleMute}
      >
        {icon}
      </IconButton>
      <StyledSlider
        value={muted ? 0 : volume}
        onChange={handleVolumeChangeElement}
        aria-labelledby="continuous-slider"
      />
    </StyledVolumeSlider>
  )
}

export const VolumeSlider = memo(VolumeSliderRaw)
