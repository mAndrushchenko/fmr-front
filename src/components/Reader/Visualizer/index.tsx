import React, { VFC, useRef, useCallback } from 'react'
import { styled } from '@material-ui/core'
import { PauseRounded } from '@material-ui/icons'
import { useInterval } from '../../../hooks/useInterval'

interface VisualizerProps {
  className?: string
  tokenList: string[]
  index: number
  speed: number
  fontSize: number
  paused?: boolean
  onNext: (tokenIndex: number) => void
  onEnd?: (tokenIndex: number) => void
  onPause?: (state?: boolean) => void
}

interface TextStyleProps {
  fontSize: number
}

const VisualizerRoot = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
})

const DisplayPaused = styled(PauseRounded)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: 256,
  opacity: 0.1,
  zIndex: -1
})

const Text = styled('p')((props: TextStyleProps) => ({
  fontSize: props.fontSize ?? 16
}))

export const Visualizer: VFC<VisualizerProps> = ({
  className,
  tokenList,
  index,
  speed,
  fontSize,
  paused = false,
  onNext,
  onEnd,
  onPause
}) => {
  const currentToken = tokenList[index]
  const delayRef = useRef<number>((60 / speed) * 1000)
  delayRef.current = (60 / speed) * 1000

  useInterval(() => {
    if (paused) return true
    if (tokenList.length <= index + 1) {
      onEnd?.(index)
      return true
    }

    onNext?.(++index)
  }, delayRef, [ paused, onNext ])

  const pauseClickHandler = useCallback(() => onPause?.(), [])

  return (
    <VisualizerRoot onClick={pauseClickHandler} className={className}>
      {paused && <DisplayPaused />}
      <Text fontSize={fontSize}>{currentToken}</Text>
    </VisualizerRoot>
  )
}
