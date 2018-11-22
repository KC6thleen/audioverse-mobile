import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { bibleChapter, loadBibleChapters, resetAndPlayTrack } from 'src/actions'
import { getBibleChapters, getBibleChaptersPagination, getBible } from 'src/reducers/selectors'

import BibleChapters from './BibleChapters'

const mapStateToProps = (state) => ({
  items: getBibleChapters(state),
  pagination: getBibleChaptersPagination(state),
  bible: getBible(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    bibleChapter,
    loadBibleChapters,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleChapters)
