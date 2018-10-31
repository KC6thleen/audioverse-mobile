import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addPlaylist } from 'src/actions'
import { getPlaylists } from 'src/reducers/selectors'

import NewPlaylist from './NewPlaylist'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addPlaylist
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(NewPlaylist)
