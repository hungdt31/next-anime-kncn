"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function WatchAnimePage({
  params
}: {
  params: {
    id: string
  }
}) {
  const searchParams = useSearchParams()
  const epId = searchParams.get('ep')

  return (
    <div>{params.id} - {epId}</div>
  )
}