import { connect } from 'react-redux'

import { loadBook, resetAndPlayTrack } from '../../../actions'
import { getBook, getBookPagination } from '../../../reducers/selectors'

import Book from './Book'

const mapStateToProps = (state) => ({
  items: getBook(state),
  pagination: getBookPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadBook(false, false, url)),
  refresh: (url) => dispatch(loadBook(false, true, url)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)
