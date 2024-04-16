import React from 'react'

const CardMon = ({icon,title}) => {
  return (
    <>
      <div className="flex shadow-xl  max-lg:h-2/4  border flex-col w-1/3 flex-wrap h-3/5 pr-2 rounded-md pl-2 bg-green-300 bg-opacity-75">
        <div className="h-3/4 border-b flex items-center justify-center">
          {icon}
        </div>
        <div className="h-1/4 flex items-center justify-between pl-3 pr-3">
          <h2 className="text-white font-medium text-sm">{title}</h2>
        </div>
      </div>
    </>
  )
}

export default CardMon