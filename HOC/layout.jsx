import React from "react"

const Layout = ({ children }) => {
  return (
    <div className="px-7 py-6 sm:px-32 sm:py-8 bg-forest-background-2 bg-no-repeat bg-cover text-white ">
      {children}
    </div>
  )
}

export default Layout
