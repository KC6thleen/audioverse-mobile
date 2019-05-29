import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadSeries } from 'src/actions'
import { getSeries, getSeriesPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getSeries(state),
  pagination: getSeriesPagination(state),
  avatarExtractor: item => item.photo86,
  subtitleExtractor: () => null,
  onPress: item => props.navigation.navigate({
    routeName: 'Serie',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSeries,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
