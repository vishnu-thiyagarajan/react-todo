import React, { useState } from 'react'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ListIcon from '@material-ui/icons/List'
import TodayIcon from '@material-ui/icons/Today'
import ScheduleIcon from '@material-ui/icons/Schedule'
import Tooltip from '@material-ui/core/Tooltip'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Badge from '@material-ui/core/Badge'
import { Link } from 'react-router-dom'

function ButtonGrp () {
  const [type, setType] = useState('Lists')
  const handleType = (event, newType) => {
    if (newType !== null) setType(newType)
  }
  return (
    <>
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleType}
      >
        <ToggleButton value='Lists'>
          <Badge badgeContent={4} color='primary'>
            <Link to='/'>
              <Tooltip title='Lists'><ListIcon /></Tooltip>
            </Link>
          </Badge>
        </ToggleButton>
        <ToggleButton value='Today'>
          <Badge badgeContent={4} color='primary'>
            <Link to='/today'>
              <Tooltip title='Today'><TodayIcon /></Tooltip>
            </Link>
          </Badge>
        </ToggleButton>
        <ToggleButton value='Scheduled'>
          <Badge badgeContent={4} color='primary'>
            <Link to='/scheduled'>
              <Tooltip title='Scheduled'><ScheduleIcon /></Tooltip>
            </Link>
          </Badge>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}

export default ButtonGrp
