import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import AnimatedPages from './components/AnimatedPages'

const App = () => {
  return (
    <>
    <Router>
      <AnimatedPages/>
    </Router>
    </>
  )
}

export default App