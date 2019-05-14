import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './.firebase.config.json'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

function useUser() {
  const [ user, setUser ] = useState(firebase.auth().currentUser)
  
  if (!user) {
    firebase.auth().signInAnonymously().then(setUser)
  }

  return user
}

function useTable(user) {
  const [ table, setTable ] = useState()

  if (!user || !user.uid) return
  
  firebase.firestore().collection('paper').doc(user.uid).get()
    .then(d => setTable(d.data()))

  return table
}

function Paper({ w, h }) {
  const user = useUser()
  const table = useTable(user)

  console.log(JSON.stringify(table, null, 2))

  return (
    <table>
      <tbody>
        {
          (table || [...Array(h).keys()].map(() => undefined) ).map((r, y) =>
            <tr key={y}>
              {
                (r || [...Array(w).keys()].map(() => undefined)).map((c, x) =>
                  <td key={x} contentEditable>{c}</td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

export default Paper
