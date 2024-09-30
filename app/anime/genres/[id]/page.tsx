"use client"
import React from 'react'

export default function GenresPage({
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