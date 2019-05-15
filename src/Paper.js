import React, { useState } from 'react'
import ContentEditable from 'react-contenteditable'
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
    console.warn('signing in...')
    firebase.auth().signInAnonymously().then(({ user }) => {
      console.warn(`SIGNED IN! user.uid ${!!user.uid}`)
      setUser(user)
    })
  }

  return user
}

function useTable(user, w, h) {
  const [ table, setTable ] = useState(
    [...Array(h).keys()].map(() => [...Array(w).keys()].map(() => ''))
  )

  if (!user || !user.uid) return table
  
  firebase.firestore().collection('paper').doc(user.uid).get()
    .then(d => setTable(Object.values(d.data())))

  return table
}

function Paper({ w, h }) {
  console.log(`Paper render!`)

  const user = useUser()
  const table = useTable(user, w, h)

  return (
    <table>
      <tbody>
        {
          table.map((r, y) =>
            <tr key={y}>
              {
                r.map((c, x) =>
                  <td key={x}>
                    <ContentEditable
                      html={c}
                      onChange={e => {
                        console.log(`user.uid ${!!user.uid}`)
                        table[y][x] = e.target.value
                        firebase.firestore().collection('paper').doc(user.uid).set(Object.assign({}, table))
                      }}
                    />
                  </td>
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
