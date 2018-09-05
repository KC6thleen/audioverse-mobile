import { connect } from 'react-redux'

import { loadBibleChapters, bibleChapter, resetAndPlayTrack } from 'src/actions'
import { getBibleChapters, getBibleChaptersPagination, getBible } from 'src/reducers/selectors'

import BibleChapters from './BibleChapters'

const mapStateToProps = (state) => ({
  items: getBibleChapters(state),
  pagination: getBibleChaptersPagination(state),
  bible: getBible(state)
})

const mapDispatchToProps = (dispatch) => ({
  refresh: (testament, book) => dispatch(loadBibleChapters(false, true, testament, book)),
  bibleChapter: (chapter) => dispatch(bibleChapter(chapter)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleChapters)
