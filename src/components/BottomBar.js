import React, { useState } from 'react'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  stickToBottom: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
})
export default function BottomBar () {
  const [done, setDone] = useState(false)
  const classes = useStyles()
  return (
    <div className={classes.stickToBottom}>
      <Tooltip title='Show done tasks'>
        <ToggleButton
          value='false'
          selected={done}
          onChange={() => { setDone(!done) }}
        >
          <DoneOutlineIcon />
        </ToggleButton>
      </Tooltip>
    </div>
  )
}
