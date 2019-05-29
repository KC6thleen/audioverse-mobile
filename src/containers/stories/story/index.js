import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadStory } from 'src/actions'
import { getStory, getStoryPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getStory(state),
  pagination: getStoryPagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadStory,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
