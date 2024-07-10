"use client"
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import MiddelWare from './MiddelWare'

const ProviderRedux = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

  return (
    <Provider store={store}>
      <MiddelWare/>
    {children}
    </Provider>
  )
}

export default ProviderRedux