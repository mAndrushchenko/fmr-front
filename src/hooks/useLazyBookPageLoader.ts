import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReaderWord, getBookPages, getBookAction } from 'src/store/slices/readerSlice'
import type { TId } from 'src/types/store'
import { deepEqual } from 'src/utils/deepEqual'
import { useToggle } from './useToggle'

export const useLazyBookPageLoader = (id: TId['id']) => {
  const dispatch = useDispatch()
  const pages = useSelector(store => store.readerSlice.pages, deepEqual)
  const totalPages = useSelector(store => store.readerSlice.totalPages)
  const bookWordIndex = useSelector(store => store.readerSlice.selectedWord)
  const bookLength = useSelector(store => store.readerSlice.bookLength)
  const loadingPages = useSelector(store => store.readerSlice.loadingPages, deepEqual)
  const [ isPageReady, toggleIsReady ] = useToggle(true)
  const bookWordIndexRef = useRef(bookWordIndex)
  bookWordIndexRef.current = bookWordIndex

  useEffect(() => {
    dispatch(getBookAction({ id, cacheSize: 3 }))
  }, [ id ])

  const isEnded = bookWordIndex >= bookLength - 1
  const isPageExists = (index: number) => index < totalPages && index >= 0

  const pageIndex = Math.floor(bookWordIndex / 300)
  const pageWordIndex = bookWordIndex - pageIndex * 300
  const page = pages[pageIndex]
  let word: string | undefined

  if (!page &&
      isPageExists(pageIndex) &&
      !loadingPages.includes(pageIndex)
  ) {
    if (isPageReady) toggleIsReady(false)
    dispatch(getBookPages({ index: pageIndex }))
  }

  if (
    !pages[pageIndex + 1] &&
    isPageExists(pageIndex + 1) &&
    !loadingPages.includes(pageIndex + 1)
  ) {
    dispatch(getBookPages({ index: pageIndex + 1 }))
  }

  if (page) {
    if (!isPageReady) toggleIsReady(true)
    word = page[pageWordIndex]
  }

  // bookWordIndexRef instead of bookWordIndex so there is no dependency
  // and nextWord can be safely passed to the child without unnecessary rerenders
  const nextWord = useCallback((index?: number) => {
    index = index ?? bookWordIndexRef.current + 1
    dispatch(setReaderWord({ selectedWord: index }))
  }, [])

  return {
    page,
    word,
    pageWordIndex,
    nextWord,
    isEnded,
    isPageReady
  }
}
