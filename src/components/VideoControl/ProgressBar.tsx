import { memo, RefObject, useCallback, useEffect, useState } from 'react'
import { LinearProgress } from '@material-ui/core'
import styled from 'styled-components'

export type ProgressBarProps = {
  videoRef: RefObject<HTMLVideoElement>
}
const StyledProgressContainer = styled.div`
  width: 100%;
`
const StyledProgressBar = styled(LinearProgress)`
  width: 100%;
`
const useProgress = (videoRef: RefObject<HTMLVideoElement>) => {
  const [progress, setProgress] = useState(0)
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setProgress(
        (100 * videoRef.current?.currentTime) / videoRef.current?.duration
      )
    }
  }, [videoRef])
  useEffect(() => {
    const { current } = videoRef
    current?.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      current?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [handleTimeUpdate, videoRef])
  return [progress]
}

export const ProgressBarRaw = ({ videoRef }: ProgressBarProps) => {
  const [playerProgress] = useProgress(videoRef)
  return (
    <StyledProgressContainer>
      <StyledProgressBar
        color="primary"
        variant="determinate"
        value={playerProgress}
      />
    </StyledProgressContainer>
  )
}

export const ProgressBar = memo(ProgressBarRaw)
