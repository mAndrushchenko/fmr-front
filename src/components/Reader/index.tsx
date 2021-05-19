import { useCallback, useState, VFC, MouseEvent } from 'react'
import { useStyles } from './styles'
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

export const Reader: VFC = () => {
  const classes = useStyles()
  const [ speed, setSpeed ] = useState(200)
  const [ isPaused, togglePause ] = useToggle(true)
  const [ fontSize, setFontSize ] = useState(28)
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const pauseClickHandler = useCallback(
    (event: MouseEvent) =>
      event.currentTarget === event.target && togglePause(),
    []
  )
  const progressChangeHandler = useCallback(
    (value: number) => {
      const nextIndex = +((value / 100) * tokenList.length - 1).toFixed()
      togglePause(true)
      // For unknown reason, nextIndex === -1 when value === 0
      setCurrentIndex(nextIndex > 0 ? nextIndex : 0)
    },
    []
  )
  const progress = (currentIndex / (tokenList.length - 1)) * 100

  return (
    <div className={classes.root} onClick={pauseClickHandler}>
      <Progress
        value={progress}
        onChange={progressChangeHandler}
        onPause={togglePause}
      />
      <Visualizer
        tokenList={tokenList}
        index={currentIndex}
        speed={speed}
        fontSize={fontSize}
        paused={isPaused}
        onNext={setCurrentIndex}
        onPause={togglePause}
      />
      <Controls
        fontSize={fontSize}
        speed={speed}
        onFontSizeChange={setFontSize}
        onSpeedChange={setSpeed}
        onPause={togglePause}
      />
    </div>
  )
}
