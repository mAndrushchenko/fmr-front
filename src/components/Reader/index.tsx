import { useCallback, useState, VFC } from 'react'
import { styled } from '@material-ui/core'
import { Visualizer } from './Visualizer'
import { Controls } from './Controls'
import { Progress } from './Progress'
import { useToggle } from '../../hooks/useToggle'

const tokenList = [
  'Pariatur', 'labore', 'labore', 'do',
  'duis', 'ut', 'id', 'magna',
  'magna', 'ea', 'voluptate', 'nulla.',
  'Est', 'nostrud', 'nulla', 'est',
  'quis', 'consequat', 'non', 'proident',
  'aliqua', 'incididunt', 'ut', 'enim',
  'laboris', 'fugiat.', 'Tempor', 'voluptate',
  'deserunt', 'incididunt', 'aute', 'duis',
  'irure', 'laborum', 'laboris', 'aute',
  'commodo', 'ex', 'in.', 'Ullamco',
  'excepteur', 'laborum', 'duis', 'eu',
  'velit', 'esse', 'tempor', 'culpa',
  'esse', 'exercitation', 'et', 'veniam.',
  'Officia', 'reprehenderit', 'nisi', 'ipsum',
  'sint', 'irure', 'est', 'mollit',
  'nulla.'
]

const ReaderRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    width: '100%'
  },
  [theme.breakpoints.up('sm')]: {
    width: '70%'
  },
  [theme.breakpoints.up('md')]: {
    width: '50%'
  },
  [theme.breakpoints.up('lg')]: {
    width: '30%'
  },
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

export const Reader: VFC = () => {
  const [ speed, setSpeed ] = useState(200)
  const [ isPaused, togglePause ] = useToggle(true)
  const [ fontSize, setFontSize ] = useState(28)
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const pauseClickHandler = useCallback(() => togglePause(), [])
  const progressChangeHandler = useCallback(
    (value: number) => {
      const nextIndex = +((value / 100) * tokenList.length - 1).toFixed()
      togglePause(true)
      setCurrentIndex(nextIndex)
    },
    []
  )
  const progress = (currentIndex / (tokenList.length - 1)) * 100

  return (
    <ReaderRoot onClick={pauseClickHandler}>
      <Progress value={progress} onChange={progressChangeHandler} />
      <Visualizer
        tokenList={tokenList}
        index={currentIndex}
        speed={speed}
        fontSize={fontSize}
        paused={isPaused}
        onNext={setCurrentIndex}
      />
      <Controls
        fontSize={fontSize}
        speed={speed}
        onFontSizeChange={setFontSize}
        onSpeedChange={setSpeed}
      />
    </ReaderRoot>
  )
}
