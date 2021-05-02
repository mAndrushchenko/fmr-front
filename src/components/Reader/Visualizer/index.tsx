import { styled } from '@material-ui/core'
import { VFC, useRef, useState } from 'react'
import { useInterval } from '../../../hooks/useInterval'

interface VisualizerProps {
  className?: string
  tokenList: string[]
  startIndex?: number
  speed: number
  fontSize: number
  paused?: boolean
  onNext?: (tokenIndex: number) => void
  onEnd?: (tokenIndex: number) => void
}

interface TextStyleProps {
  fontSize: number
}

const VisualizerRoot = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const Text = styled('p')((props: TextStyleProps) => ({
  fontSize: props.fontSize ?? 16
}))

export const Visualizer: VFC<VisualizerProps> = ({
  className,
  tokenList,
  startIndex = 0,
  speed,
  fontSize,
  paused = false,
  onNext,
  onEnd
}) => {
  const [ currentToken, setToken ] = useState(tokenList[startIndex])
  const delayRef = useRef<number>((60 / speed) * 1000)
  delayRef.current = (60 / speed) * 1000

  useInterval(() => {
    if (paused) return true
    if (tokenList.length <= startIndex + 1) {
      onEnd?.(startIndex)
      return true
    }

    setToken(tokenList[++startIndex])
    onNext?.(startIndex)
  }, delayRef, [ paused, onNext ])

  return (
    <VisualizerRoot className={className}>
      <Text fontSize={fontSize}>{currentToken}</Text>
    </VisualizerRoot>
  )
}
