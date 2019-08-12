import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadStory } from '../../../actions'
import { getStory, getStoryPagination } from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getStory(state),
  pagination: getStoryPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadStory,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
