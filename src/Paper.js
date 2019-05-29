import React, { useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'

function Paper({ grid, onEdit, disabled }) {
  const [ buf, setBuf ] = useState()

  console.log(`buf ${JSON.stringify(buf)}`)
  
  return (
    <table>
      <tbody>
        {
          grid.map((r, row) =>
            <tr key={row}>
              {
                r.map((c, col) =>
                  <td
                    key={col}
                    
                    onBlur={() => {
                      if (disabled || !buf || !buf[row] || !buf[row][col]) return
                      onEdit(row, col, buf[row][col])
                      setBuf()
                    }}
                  >
                    {
                      disabled ? c : (
                        <ContentEditable
                          html={((buf || {})[row] || {})[col] || c}

                          onChange={e => {
                            let b = buf || {[row]: {}}
                            b[row][col] = e.target.value
                            setBuf(b)
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
