import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

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

export default useTable
