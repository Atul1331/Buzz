import React from 'react'
import { Gloria_Hallelujah } from 'next/font/google'
import { cn } from '@/lib/utils'

const gloria = Gloria_Hallelujah({
    subsets: ["latin"],
    weight: "400"
})


const AuthPanel = () => {
  return (
    <div className="text-white">
        <div>
            <img className="h-52" src="/logo.png" alt="" />
        </div>
        <div className={cn("text-6xl tracking-widest", gloria.className)}>
            Buzz
        </div>
        <div>
            <p>Welcome to buzz</p>
            <p>Welcome to buzz</p>
            <p>Welcome to buzz</p>
            <p>Welcome to buzz</p>
        </div>
    </div>
  )
}

export default AuthPanel
