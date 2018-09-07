import App, { Container } from 'next/app'
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import withReduxStore from '../lib/with-redux-store'
import getPageContext from '../lib/getPageContext'
import JssProvider from 'react-jss/lib/JssProvider'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  pageContext = null

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <Component pageContext={this.pageContext} {...pageProps} />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
