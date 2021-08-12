import React from 'react'
import {
  Button,
  Form,
  Note,
  Option,
  SelectField,
} from '@contentful/forma-36-react-components'
import tokens from '@contentful/forma-36-tokens'
import { SidebarExtensionSDK } from '@contentful/app-sdk'
import { css } from '@emotion/css'

type Environment = 'next' | 'production'
type Status = 'success' | 'error' | 'idle'

async function triggerDeploy(environment: Environment) {
  const response = await fetch(`TODO: Add webhook URL`, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`,
      Authorization: `token TODO: Add access token`,
    },
    body: JSON.stringify({
      event_type: 'deploy',
      client_payload: {
        stage: 'next',
      },
    }),
  })
  return response
}
interface SidebarProps {
  sdk?: SidebarExtensionSDK
}

const Sidebar = (props: SidebarProps) => {
  const [env, setEnv] = React.useState<Environment>(`next`)
  const [status, setStatus] = React.useState<Status>('idle')

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!!status) {
        setStatus('idle')
      }
    }, 10000)
    return () => clearTimeout(timer)
  }, [status])

  if (status === 'success') {
    return (
      <Note
        noteType="positive"
        title="Good job!"
        hasCloseButton
        onClose={() => setStatus('idle')}
      >
        {
          // Slightly nicer to read `Next` than `next`
          `You just deployed content changes to ${env
            .charAt(0)
            .toUpperCase()}${env.slice(1)}.`
        }
      </Note>
    )
  } else if (status === 'error') {
    // The deployment trigger wasn't successful
    return (
      <Note
        noteType="negative"
        title="Ooops"
        hasCloseButton
        onClose={() => setStatus('idle')}
      >
        {`Something is broken, please let @dev know. Sorry about that!`}
      </Note>
    )
  }

  async function handleSubmit(environment: Environment) {
    const response = await triggerDeploy(env)

    if (response.status === 204) {
      setStatus('success')
    } else {
      setStatus('error')
    }

    console.log({ response })
  }

  return (
    <Form onSubmit={() => handleSubmit(env)}>
      <div
        className={css({
          // margin: '-8px', // Negate the margin on body
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        })}
      >
        <div
          className={css({
            marginBottom: tokens.spacingM,
          })}
        >
          <SelectField
            id="selectEnvironment"
            name="selectEnvironment"
            value={env}
            labelText="Select environment"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const { value } = event.target
              if (value === 'next' || value === 'production') {
                setEnv(event.target.value as Environment)
              } else {
                throw new Error(
                  `Encountered invalid value for environment: ${value}`
                )
              }
            }}
          >
            <Option value="next">Next</Option>
            <Option value="production">Production</Option>
          </SelectField>
        </div>
        <Button type="submit" buttonType="primary" isFullWidth>
          Deploy content
        </Button>
      </div>
    </Form>
  )
}

export { Sidebar }
