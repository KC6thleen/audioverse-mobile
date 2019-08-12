import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../../store'
import { loadTag } from '../../../../actions'
import { getTag, getTagPagination } from '../../../../reducers/selectors'

import List from '../../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getTag(state),
  pagination: getTagPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTag,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
