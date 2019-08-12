export interface BibleState {
  version: {
    id: string
    name: string
    abbr: string
  }
  book: {
    name: string
    book_id: string
    testament: string
  }
  chapter: number
  verses: string
}

export const SET_BIBLE_VERSION = 'SET_BIBLE_VERSION'
export const BIBLE_VERSION = 'BIBLE_VERSION'
export const BIBLE_BOOK = 'BIBLE_BOOK'
export const BIBLE_CHAPTER = 'BIBLE_CHAPTER'
export const BIBLE_VERSES = 'BIBLE_VERSES'

export interface SetBibleVersionAction {
  type: typeof SET_BIBLE_VERSION
  version: BibleState["version"]
  bookId?: string
}

interface BibleVersionAction {
  type: typeof BIBLE_VERSION
  version: BibleState["version"]
}

interface BibleBookAction {
  type: typeof BIBLE_BOOK
  book: BibleState["book"]
}

interface BibleChapterAction {
  type: typeof BIBLE_CHAPTER
  chapter: number
}

interface BibleVersesAction {
  type: typeof BIBLE_VERSES
  verses: string
}

export type BibleActionTypes = SetBibleVersionAction |BibleVersionAction | BibleBookAction |
  BibleChapterAction | BibleVersesAction
