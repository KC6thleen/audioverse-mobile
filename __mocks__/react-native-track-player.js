jest.mock('react-native-track-player', () => {
  const React = require('React')
  class ProgressComponent extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {}
    }
    
    getProgress() {}
  }

  return {
    ProgressComponent: ProgressComponent
  }
})
