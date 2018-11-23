import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTags } from 'src/actions'
import { getTags, getTagsPagination } from 'src/reducers/selectors'

import Tags from './Tags'

const mapStateToProps = state => ({
  items: getTags(state),
  pagination: getTagsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadTags
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Tags)
