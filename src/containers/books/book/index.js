import { connect } from 'react-redux'

import { loadBook, resetAndPlayTrack } from 'src/actions'
import { getBook, getBookPagination } from 'src/reducers/selectors'

import Book from './Book'

const mapStateToProps = (state) => ({
  items: getBook(state),
  pagination: getBookPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadBook(false, false, url)),
  refresh: (url) => dispatch(loadBook(false, true, url)),
  resetAndPlayTrack: (tracks, id) => dispatch(resetAndPlayTrack(tracks, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)
