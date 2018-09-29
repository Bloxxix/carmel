import React from 'react'
import { Component, Components } from 'react-dom-chunky'
import { Elevation } from 'rmwc/Elevation'
import { Typography } from 'rmwc/Typography'

export default class Prompt extends Component {
  constructor (props) {
    super(props)

    this.state = { }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderChildren () {
    if (this.props.children) {
      return this.props.children
    }

    return <div />
  }

  render () {
    return <Elevation z={2} style={{
      backgroundColor: '#ffffff',
      marginTop: '0px',
      marginBottom: '10px',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'column'
    }}>
      <Typography use='title' tag='h2' style={{ margin: '10px', color: '#00bcd4', textAlign: 'center' }}>
        { this.props.title } asdfa sf ase asef asd fasd fa sdf asd fas df asd fas dfa sdf asd fa sdf asd fas df asdf ads fas
      </Typography>
      <Typography use='body2 ' tag='h2' style={{ margin: '10px', color: '#455A64', textAlign: 'center', marginBottom: '10px' }}>
        { this.props.subtitle }
      </Typography>
      { this.renderChildren() }
    </Elevation>
  }
}
