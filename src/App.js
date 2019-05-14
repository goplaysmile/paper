import React from 'react'
import Paper from './Paper'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <div>🗒</div>
      <Paper w={6} h={9} />
    </div>
  )
}

export default App
