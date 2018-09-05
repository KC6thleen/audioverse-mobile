import React from 'react'
import MiniPlayer from './'

import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('MiniPlayer component', () => {
  it('renders empty component when no track', () => {
    const initialState = {
      playback: { state: '' }
    }
    const wrapper = shallow(<MiniPlayer onPressMetaData={jest.fn()} />, { context: { store: mockStore(initialState) } })
    expect(wrapper.dive()).toMatchSnapshot()
  })

  it('renders correctly when there is a track', () => {
    const initialState = {
      playback: { state: '', currentTrack: {} }
    }
    const wrapper = shallow(<MiniPlayer onPressMetaData={jest.fn()} />, { context: { store: mockStore(initialState) } })
    expect(wrapper.dive()).toMatchSnapshot()
  })
})
