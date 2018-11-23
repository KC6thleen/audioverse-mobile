import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagsBooks } from 'src/actions'
import { getTagsBooks, getTagsBooksPagination } from 'src/reducers/selectors'

import TagsBooks from './TagsBooks'

const mapStateToProps = state => ({
  items: getTagsBooks(state),
  pagination: getTagsBooksPagination(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadTagsBooks
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TagsBooks)
