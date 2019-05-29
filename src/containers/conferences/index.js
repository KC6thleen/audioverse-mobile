import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadConferences } from 'src/actions'
import { getConferences, getConferencesPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getConferences(state),
  pagination: getConferencesPagination(state),
  avatarExtractor: item => item.photo86,
  subtitleExtractor: () => null,
  onPress: item => props.navigation.navigate({
    routeName: 'Conference',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadConferences,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
