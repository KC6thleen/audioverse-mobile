import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadBook, removeLocalChapter, download, resetAndPlayTrack } from '../../../actions'
import { addLocalFiles } from '../../../store/localFiles/actions'
import { getBook, getBookPagination } from '../../../reducers/selectors'

import Book from './Book'

const mapStateToProps = (state: AppState) => ({
  items: getBook(state),
  pagination: getBookPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadBook,
    addLocalFiles,
    removeLocalChapter,
    download,
    resetAndPlayTrack,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)
