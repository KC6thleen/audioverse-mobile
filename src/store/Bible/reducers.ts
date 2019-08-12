import {
  BIBLE_BOOK,
  BIBLE_CHAPTER,
  BIBLE_VERSES,
  BIBLE_VERSION,
  BibleState,
  BibleActionTypes,
} from './types'

const initialState: BibleState = {
  version: {
    id: 'ENGESV2',
    name: '2001 English Standard',
    abbr: 'ESV'
  },
  book: {
    name: 'Genesis',
    book_id: 'Gen',
    testament: 'O',
  },
  chapter: 1,
  verses: ''
}

export function BibleReducer(
  state = initialState,
  action: BibleActionTypes,
): BibleState {
  switch(action.type) {
    case BIBLE_VERSION:
      return {
        ...state,
        version: action.version
      }
    case BIBLE_BOOK:
      return {
        ...state,
        book: action.book
      }
    case BIBLE_CHAPTER:
      return {
        ...state,
        chapter: action.chapter
      }
    case BIBLE_VERSES:
      return {
        ...state,
        verses: action.verses
      }
    default:
      return state
  }
}
