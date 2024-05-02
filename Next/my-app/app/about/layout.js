import React from 'react'
import Link from "next/link";

export default function Aboutlayout({children}) {
  return (
    <div>
      <nav className='mt-6 mb-6'>Mission | Vision</nav>
      <Link href = "/about/mission"> Mission </Link>
      {children}
    </div>
  )
}
