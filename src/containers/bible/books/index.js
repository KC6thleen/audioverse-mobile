import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadBibleBooks, loadBibleChapters } from 'src/actions'
import { getBibleBooks, getBibleBooksPagination } from 'src/reducers/selectors'

import BibleBooks from './BibleBooks'

const mapStateToProps = (state) => ({
  items: getBibleBooks(state),
  pagination: getBibleBooksPagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadBibleBooks,
    loadBibleChapters,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleBooks)
