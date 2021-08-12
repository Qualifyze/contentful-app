import React from 'react'
import { AppExtensionSDK } from '@contentful/app-sdk'
import {
  Heading,
  Form,
  Workbench,
  Paragraph,
  TextField,
  Button,
} from '@contentful/forma-36-react-components'
import { css } from '@emotion/css'

export interface AppInstallationParameters {
  webhookUrl: string
  accessToken: string
}

interface ConfigProps {
  sdk?: AppExtensionSDK
}

type ConfigOptions = { webhookUrl: string; accessToken: string }

const Config = ({ sdk }: ConfigProps) => {
  const [parameters, setParameters] = React.useState<AppInstallationParameters>(
    { webhookUrl: '', accessToken: '' }
  )

  const onConfigure = React.useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk?.app.getCurrentState()

    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    }
  }, [parameters, sdk])

  React.useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk?.app.onConfigure(() => onConfigure())
  }, [sdk, onConfigure])

  React.useEffect(() => {
    ;(async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null =
        (await sdk?.app.getParameters()) || null

      if (currentParameters) {
        setParameters(currentParameters)
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk?.app.setReady()
    })()
  }, [sdk])

  function updateWebhookUrl(event: React.ChangeEvent<HTMLInputElement>) {
    setParameters((prevParams) => ({
      ...prevParams,
      webhookUrl: event.target.value.trim(),
    }))
  }

  function updateAccessToken(event: React.ChangeEvent<HTMLInputElement>) {
    setParameters((prevParams) => ({
      ...prevParams,
      accessToken: event.target.value.trim(),
    }))
  }

  return (
    <Workbench className={css({ margin: '80px' })}>
      <Form>
        <Heading>Configure Qualifyze Deployment App</Heading>
        <Paragraph>
          This app allows you to trigger deployments of our website from within
          Contentful.
        </Paragraph>
        <TextField
          id="webhookUrl"
          name="webhookUrl"
          labelText="Webhook URL:"
          textInputProps={{ width: 'large' }}
          value={parameters.webhookUrl}
          onChange={updateWebhookUrl}
          helpText="URL of the webhook that should be called when triggering a deployment"
        />
        <TextField
          id="accessToken"
          name="accessToken"
          labelText="Access token:"
          textInputProps={{ width: 'large' }}
          value={parameters.accessToken}
          onChange={updateAccessToken}
          helpText="Authorization token required to call the webhook above"
        />
      </Form>
    </Workbench>
  )
}

export { Config }
