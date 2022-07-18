import { IconButton } from '@material-ui/core'
import { VolumeUp, VolumeOff, VolumeMute, VolumeDown } from '@material-ui/icons'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import React, { memo, RefObject, useCallback, useEffect, useState } from 'react'

export type VolumeSliderProps = {
  videoRef: RefObject<HTMLVideoElement>
}

export const VolumeSliderRaw = ({ videoRef }: VolumeSliderProps) => {
  const [volume, setVolume] = useState(1)

  const handleVolumeChangeEvent = useCallback(() => {
    if (videoRef.current) {
      setVolume(videoRef.current.volume * 100)
    }
  }, [videoRef])
  const handleVolumeChangeElement = useCallback(
    (event: any, newValue: number | number[]) => {
      setVolume(newValue as number)
      if (videoRef.current) {
        videoRef.current.volume = volume / 100
      }
    },
    [videoRef, volume]
  )
  const handleVolumeBlur = () => {
    if (volume < 0) {
      setVolume(0)
    } else if (volume > 100) {
      setVolume(100)
    }
  }
  useEffect(() => {
    const { current } = videoRef
    current?.addEventListener('volumechange', handleVolumeChangeEvent)
    return () => {
      current?.removeEventListener('volumechange', handleVolumeChangeEvent)
    }
  }, [handleVolumeChangeEvent, videoRef])
  return (
    <>
      <IconButton color="primary" aria-label="upload picture" component="span">
        <VolumeUp />
      </IconButton>
      <Slider
        onBlur={handleVolumeBlur}
        value={volume}
        onChange={handleVolumeChangeElement}
        aria-labelledby="continuous-slider"
      />
      <p>{volume}</p>
    </>
  )
}

export const VolumeSlider = memo(VolumeSliderRaw)
