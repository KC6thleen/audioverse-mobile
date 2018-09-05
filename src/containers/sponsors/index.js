import { connect } from 'react-redux'

import { loadSponsors } from 'src/actions'
import { getSponsors, getSponsorsPagination } from 'src/reducers/selectors'

import Sponsors from './Sponsors'

const mapStateToProps = (state) => ({
  items: getSponsors(state),
  pagination: getSponsorsPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadSponsors(false, false)),
  loadMore: () => dispatch(loadSponsors(true, false)),
  refresh: () => dispatch(loadSponsors(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors)
