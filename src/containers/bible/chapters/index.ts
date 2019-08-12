import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import {
  loadBibleChapters,
  download,
  removeLocalBibleChapter,
  resetAndPlayTrack,
} from '../../../actions'
import { bibleChapter } from '../../../store/Bible/actions'
import { addLocalFiles } from '../../../store/localFiles/actions'
import { getBibleChapters, getBibleChaptersPagination, getBible } from '../../../reducers/selectors'

import BibleChapters from './BibleChapters'

const mapStateToProps = (state: AppState) => ({
  items: getBibleChapters(state),
  pagination: getBibleChaptersPagination(state),
  bible: getBible(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    bibleChapter,
    loadBibleChapters,
    download,
    addLocalFiles,
    removeLocalBibleChapter,
    resetAndPlayTrack,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleChapters)
