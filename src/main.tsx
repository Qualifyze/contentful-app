import React from 'react'
import ReactDOM from 'react-dom'

import {
  AppExtensionSDK,
  SidebarExtensionSDK,
  locations,
  init,
} from '@contentful/app-sdk'
import '@contentful/forma-36-react-components/dist/styles.css'
import '@contentful/forma-36-fcss/dist/styles.css'
import '@contentful/forma-36-tokens/dist/css/index.css'

import './index.css'
import { Config } from './components/Config'
import { Localhost } from './components/Localhost'
import { Sidebar } from './components/Sidebar'

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
  ReactDOM.render(
    <React.StrictMode>
      <Localhost />
    </React.StrictMode>,
    document.getElementById('root')
  )
} else {
  init((sdk) => {
    const ComponentLocationSettings = [
      {
        location: locations.LOCATION_APP_CONFIG,
        component: <Config sdk={sdk as AppExtensionSDK} />,
      },
      {
        location: locations.LOCATION_ENTRY_SIDEBAR,
        component: <Sidebar sdk={sdk as SidebarExtensionSDK} />,
      },
    ]

    // Select a component depending on a location in which the app is rendered.
    ComponentLocationSettings.forEach((componentLocationSetting) => {
      if (sdk.location.is(componentLocationSetting.location)) {
        // render(componentLocationSetting.component, root);
        ReactDOM.render(
          <React.StrictMode>
            {componentLocationSetting.component}
          </React.StrictMode>,
          document.getElementById('root')
        )
      }
    })
  })
}
