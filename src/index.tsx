import { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from 'components/App'
import { CssBaseline } from '@material-ui/core'
import {
  StylesProvider,
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    type: 'dark',
  },
})

render(
  <StrictMode>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StylesProvider>
  </StrictMode>,
  document.getElementById('root')
)
