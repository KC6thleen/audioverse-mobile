import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../../store'
import { loadTagSponsor } from '../../../../actions'
import { getTagSponsor, getTagSponsorPagination } from '../../../../reducers/selectors'

import List from '../../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getTagSponsor(state),
  pagination: getTagSponsorPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagSponsor,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
