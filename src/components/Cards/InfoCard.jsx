import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  // InfoCard is a reusable component for displaying a colored dot, a value, and a label.
  //A lot of styling on the page. functionality can be found on the pages folder.
  return (
     // Outer container: arranges the colored dot and text horizontally with spacing
    <div className="flex items-center gap-3">
      <div className={`w-2 md:w-2 h-3 md:h-5 ${color} rounded-full`} />

      <p className="text-xs md:text-[14px] text-gray-500">
        <span className="text-sm md:text-[15px] text-black font-semibold">{value}</span> {label}
      </p>
    </div>
  )
}

export default InfoCard