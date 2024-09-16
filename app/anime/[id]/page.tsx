"use client"
import React from 'react'

export default function AnimeInfoPage({
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
