import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTag, resetAndPlayTrack } from 'src/actions'
import { getTag, getTagPagination } from 'src/reducers/selectors'

import Tag from './Tag'

const mapStateToProps = (state) => ({
  items: getTag(state),
  pagination: getTagPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadTag,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Tag)
