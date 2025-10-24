"use client"
import React, { useEffect, useState } from 'react'

type ClientApplicationProps = {
  children: React.ReactNode
}

export default function ClientApplication({ children }: ClientApplicationProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <>{children}</>
}
