import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import useUser from './User'
import useTable from './Table'
import Paper from './Paper'
import styles from './App.module.scss'

function App() {
  const user = useUser()
  const table = useTable(user, 6, 9)
  
  return (
    <div className={styles.App}>
      <div>🗒</div>
      <Paper
        grid={table}
        onEdit={(row, col, txt) => {
          console.log(`before ${JSON.stringify(table)}`)
          table[row][col] = txt
          console.log(`after ${JSON.stringify(table)}`)
          
          firebase.firestore()
            .collection('paper')
            .doc(user.uid)
            .set(Object.assign({}, table))
        }}
      />
    </div>
  )
}

export default App
