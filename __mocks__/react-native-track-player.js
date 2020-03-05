jest.mock('react-native-track-player', () => {
  const React = require('react')
  class ProgressComponent extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {}
    }
    
    getProgress() {}
  }

  return {
    ProgressComponent: ProgressComponent,
    useProgress: jest.fn(() => ({position: 0, duration: 0, buffered: 0}))
  }
})
