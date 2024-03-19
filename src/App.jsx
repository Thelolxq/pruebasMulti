import React from 'react'
<<<<<<< HEAD
import { BrowserRouter as Router} from 'react-router-dom'
import AnimatedPages from './components/AnimatedPages'

const App = () => {
  return (
    <>
    <Router>
      <AnimatedPages/>
    </Router>
=======
import Page from './pages/Page'
const App = () => {
  return (
    <>
    <div>
       <Page/>
    </div>
>>>>>>> 15727e184710d9fc59b2ae6f91c8f146086234fc
    </>
  )
}

export default App