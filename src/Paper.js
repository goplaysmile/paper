import React from 'react'

function Paper({ w, h }) {
  return (
    <table>
      <tbody>
        {
          [...Array(h).keys()].map(y =>
            <tr key={y}>
              {
                [...Array(w).keys()].map(x =>
                  <td key={x} contentEditable></td>
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
