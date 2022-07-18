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

  const handleVolumeChange = useCallback(() => {
    if (videoRef.current) {
      console.log(videoRef.current.volume)

      setVolume(videoRef.current.volume)
    }
  }, [videoRef])
  useEffect(() => {
    const { current } = videoRef
    current?.addEventListener('volumechange', handleVolumeChange)
    return () => {
      current?.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [handleVolumeChange, videoRef])
  return (
    <>
      <IconButton color="primary" aria-label="upload picture" component="span">
        <VolumeUp />
      </IconButton>
      <Slider
        value={volume * 100}
        onChange={handleVolumeChange}
        aria-labelledby="continuous-slider"
      />
      <p>{volume}</p>
    </>
  )
}

export const VolumeSlider = memo(VolumeSliderRaw)
