import React from 'react'

import {FaHeartbeat} from 'react-icons/fa'
import CardMon from './CardMon'
const CardsMon = () => {
  return (
        <>
    <div className='flex gap-2 px-2 items-center h-3/4 w-full'>
      <CardMon title="BPM" icon={<FaHeartbeat size={50}/>}/>
      <CardMon title="BPM" icon={<FaHeartbeat size={50}/>}/>
      <CardMon title="BPM" icon={<FaHeartbeat size={50}/>}/>
    </div>
        </>
  )
}

export default CardsMon