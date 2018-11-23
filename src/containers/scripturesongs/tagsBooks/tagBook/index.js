import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagBook, resetAndPlayTrack } from 'src/actions'
import { getTagBook, getTagBookPagination } from 'src/reducers/selectors'

import TagBook from './TagBook'

const mapStateToProps = (state) => ({
  items: getTagBook(state),
  pagination: getTagBookPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadTagBook,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TagBook)
