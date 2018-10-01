import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { removeFromDownloadsQueue } from 'src/actions'
import { getDownloadsQueue } from 'src/reducers/selectors'

import DownloadsQueue from './DownloadsQueue'

const mapStateToProps = (state) => ({
  items: getDownloadsQueue(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  removeFromDownloadsQueue
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsQueue)
