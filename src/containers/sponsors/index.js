import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadSponsors } from 'src/actions'
import { getSponsors, getSponsorsPagination } from 'src/reducers/selectors'

import Sponsors from './Sponsors'

const mapStateToProps = (state) => ({
  items: getSponsors(state),
  pagination: getSponsorsPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadSponsors
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors)
