import React, { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import { Provider } from 'react-redux'
import { AppNavigation } from './src/navigation/AppNavigation'
import { bootstrap } from './src/bootstrap'
import store from './src/store'

export default function App() {
 
  const [isReady, setIsReady] = useState(false)

  //useEffect(() => console.disableYellowBox = true)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
    
  )
}

