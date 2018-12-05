import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadBook, addLocalFiles, removeLocalChapter, download, resetAndPlayTrack } from 'src/actions'
import { getBook, getBookPagination } from 'src/reducers/selectors'

import Book from './Book'

const mapStateToProps = (state) => ({
  items: getBook(state),
  pagination: getBookPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadBook,
    addLocalFiles,
    removeLocalChapter,
    download,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)
