import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadSponsor, resetAndPlayTrack } from 'src/actions'
import { getSponsor, getSponsorPagination } from 'src/reducers/selectors'

import Sponsor from './Sponsor'

const mapStateToProps = (state) => ({
  items: getSponsor(state),
  pagination: getSponsorPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadSponsor,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor)
