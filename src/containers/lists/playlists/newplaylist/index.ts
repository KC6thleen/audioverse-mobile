import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { addPlaylist } from '../../../../actions'
import { getPlaylists } from '../../../../reducers/selectors'

import NewPlaylist from './NewPlaylist'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    addPlaylist,
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(NewPlaylist)
