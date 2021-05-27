import { useCallback, useState, VFC, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLazyBookPageLoader } from 'src/hooks/useLazyBookPageLoader'
import { useStyles } from './styles'
import { Visualizer } from './Visualizer'
import { Controls } from './Controls'
import { Progress } from './Progress'
import { useToggle } from '../../hooks/useToggle'

export const Reader: VFC = () => {
  const { id } = useParams<{ id: string }>()
  const classes = useStyles()
  const { nextWord, word, isEnded } = useLazyBookPageLoader(id)
  const selectedWord = useSelector(store => store.readerSlice.selectedWord)
  const bookLength = useSelector(store => store.readerSlice.bookLength)
  const [ speed, setSpeed ] = useState(200)
  const [ isPaused, togglePause ] = useToggle(true)
  const [ fontSize, setFontSize ] = useState(28)
  const pauseClickHandler = useCallback(
    (event: MouseEvent) =>
      event.currentTarget === event.target && togglePause(),
    []
  )
  const progressChangeHandler = useCallback(
    (value: number) => {
      const nextIndex = +((value / 100) * bookLength).toFixed()
      togglePause(true)
      // For unknown reason, nextIndex === -1 when value === 0
      nextWord(nextIndex > 0 ? nextIndex : 0)
    },
    [ bookLength ]
  )
  const progress = (selectedWord / (bookLength - 1)) * 100

  return (
    <div className={classes.root} onClick={pauseClickHandler}>
      <Progress
        value={progress}
        onChange={progressChangeHandler}
        onPause={togglePause}
      />
      <Visualizer
        word={word ?? ''}
        speed={speed}
        fontSize={fontSize}
        paused={isPaused || isEnded}
        onNext={nextWord}
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
