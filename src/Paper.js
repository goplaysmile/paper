import React, { useState, useEffect } from 'react'
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
  
  useEffect(() => {
    if (user) return

    firebase.auth().signInAnonymously().then(({ user }) => {
      setUser(user)
    })
  }, [])

  return user
}

function useTable(user, w, h) {
  const [ table, setTable ] = useState()

  useEffect(() => {
    if (!user || !user.uid) return

    firebase.firestore().collection('paper').doc(user.uid).onSnapshot(snap => {
      console.log(`arrived\n${JSON.stringify(snap.data())}`)
      setTable(snap.data() ? Object.values(snap.data()) : undefined)
    })
  }, [user])
    
  return table || [...Array(h).keys()].map(() => [...Array(w).keys()].map(() => ''))
}

function Paper({ w, h, disabled }) {
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
                    {
                      disabled ? c : (
                        <ContentEditable
                          html={c}
                          onChange={e => {
                            console.log(`user.uid ${!!user.uid}`)
                            table[y][x] = e.target.value
                            firebase.firestore().collection('paper').doc(user.uid).set(Object.assign({}, table))
                          }}
                        />
                      )
                    }
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
