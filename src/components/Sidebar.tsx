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

type Environment = string

function triggerDeploy(environment: Environment) {
  // TODO: Send `POST` request
  alert(`${environment}`)
}
interface SidebarProps {
  sdk?: SidebarExtensionSDK
}

const Sidebar = (props: SidebarProps) => {
  const [env, setEnv] = React.useState<Environment>(`next`)
  const [hasTriggered, setHasTriggered] = React.useState<boolean>(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (hasTriggered) {
        setHasTriggered(false)
      }
    }, 10000)
    return () => clearTimeout(timer)
  }, [hasTriggered])

  if (hasTriggered) {
    return (
      <Note
        noteType="positive"
        title="Good job!"
        hasCloseButton
        onClose={() => setHasTriggered(false)}
      >
        {
          // Slightly nicer to read `Next` than `next`
          `You just deployed content changes to ${env
            .charAt(0)
            .toUpperCase()}${env.slice(1)}.`
        }
      </Note>
    )
  }

  return (
    <Form
      onSubmit={() => {
        triggerDeploy(env)
        setHasTriggered(true)
      }}
    >
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
