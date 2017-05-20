import React from 'react'
import Helmet from 'react-helmet'

class App extends React.Component {
  render () {
    return (
      <div>
        <Helmet title='Web Stock Project'
          link={[
            {rel: 'stylesheet', href: '/flexboxgrid.min.css'},
            {rel: 'stylesheet', href: '/style.css'}
          ]} />
        { this.props.children }
      </div>
    )
  }
}

export default (App)
