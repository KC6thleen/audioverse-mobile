import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack, favorites } from 'src/actions'
import { getFavorites } from 'src/reducers/selectors'

import Favorites from './Favorites'

const mapStateToProps = state => ({
  items: getFavorites(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
    remove: favorites.remove
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
