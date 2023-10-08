import React from 'react'
import { SideBar, TopBar } from '../../components'

const layout = ({children}: any) => {
  return (
    <div className='min-w-full min-h-screen bg-blue-100'>
        <main>
            {children}
        </main>
        
    </div>
    
  )
}

export default layout