"use client"
import React from 'react'

export default function WatchAnimePage({
  params
}: {
  params: {
    id: string
  }
}) {
  return (
    <div>{params.id}</div>
  )
}