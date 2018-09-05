import React from 'react'
import MediaControls from './MediaControls'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<MediaControls playPause={jest.fn()} skipToPrevious={jest.fn()} skipToNext={jest.fn()} replay={jest.fn()} forward={jest.fn()} />).toJSON()
  expect(tree).toMatchSnapshot()
})
