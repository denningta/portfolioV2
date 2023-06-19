import { Card } from '@sanity/ui'
import { useEffect, useRef, useState } from 'react'
import { FieldProps } from 'sanity'

function CustomField(props: FieldProps) {

  if (!Array.isArray(props.value)) return props.renderDefault(props)

  const { description, title, ...restProps } = props
  const statusBar = useRef<HTMLDivElement>(null)
  const [statusBarWidth, setStatusBarWidth] = useState(0)

  useEffect(() => {
    setStatusBarWidth(statusBar.current?.offsetWidth ?? 0)
  }, [statusBar])

  const totalEffort = props.value?.map((el: any) => el.percent).reduce((acc, curr) => acc + curr, 0) ?? 0

  return (
    <Card border padding={3}>
      {props.renderDefault(props)}
      <div
        style={{
          marginTop: 20,
          color: totalEffort === 100 ? 'lightgreen' : (totalEffort > 100 ? 'red' : 'lightsalmon')
        }}>
        Total Effort: <span>{totalEffort}</span>
      </div>
      <div
        ref={statusBar}
        style={{
          marginTop: 10,
          marginBottom: 10,
          height: 10,
          backgroundColor: 'darkgray',
          display: 'flex'
        }}
      >
        {props.value && props.value.map((el: any, i) =>
          <div
            key={`status-${i}`}
            style={{
              backgroundColor: 'lightseagreen',
              height: '100%',
              width: statusBarWidth * (el.percent / 100)
            }}
          ></div>
        )}

      </div>
    </Card>
  )
}

export default CustomField
