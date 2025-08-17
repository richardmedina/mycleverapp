import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import AppLayout from './layouts/AppLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div data-bs-theme="light">
     <AppLayout title="Text" />
    </div>
  )
}

export default App
