import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTag } from 'src/actions'
import { getTag, getTagPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getTag(state),
  pagination: getTagPagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTag,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
