import * as React from 'react'
import {
  Paragraph,
  TextLink,
  Note,
  Heading,
  HelpText,
  Tabs,
  Tab,
  TabPanel,
} from '@contentful/forma-36-react-components'
import { css } from '@emotion/css'

import { Config } from './Config'
import { Sidebar } from './Sidebar'

const Localhost = () => {
  const [activeTab, setActiveTab] = React.useState('sidebar')

  return (
    <div
      className={css({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '40px',
        paddingLeft: '40px',
        paddingRight: '40px',
      })}
    >
      <Note
        title="App running outside of Contentful"
        style={{ maxWidth: '800px', marginBottom: '40px' }}
      >
        <Paragraph>
          Contentful Apps need to run inside the Contentful web app to function
          properly. Install the app into a space and render your app into one of
          the{' '}
          <TextLink href="https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#locations">
            available locations
          </TextLink>
          .
        </Paragraph>
        <br />

        <Paragraph>
          Follow{' '}
          <TextLink href="https://www.contentful.com/developers/docs/extensibility/app-framework/tutorial/">
            our guide
          </TextLink>{' '}
          to get started or{' '}
          <TextLink href="https://app.contentful.com/deeplink?link=apps">
            open Contentful
          </TextLink>{' '}
          to manage your app.
        </Paragraph>
      </Note>

      <Heading>Local development mode</Heading>
      <HelpText>
        Select the location of the UI extension you want to see here.
      </HelpText>
      <Tabs withDivider>
        <Tab
          id="config"
          selected={activeTab === 'config'}
          onSelect={(id) => {
            setActiveTab(id)
          }}
        >
          Config
        </Tab>
        <Tab
          id="sidebar"
          selected={activeTab === 'sidebar'}
          onSelect={(id) => {
            setActiveTab(id)
          }}
        >
          Sidebar
        </Tab>
      </Tabs>
      <div
        className={css({
          position: 'relative',
          display: 'flex',
          flex: '1 1 auto',
        })}
      >
        {activeTab === 'sidebar' && (
          <TabPanel id="sidebar">
            <Sidebar />
          </TabPanel>
        )}
        {activeTab === 'config' && (
          <TabPanel id="config">
            <Config />
          </TabPanel>
        )}
      </div>
    </div>
  )
}

export { Localhost }
