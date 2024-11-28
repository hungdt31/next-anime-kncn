"use client"
import Container from '@/components/layout/container'
import React from 'react'
import { Feather } from 'lucide-react'
export default function page() {
  return (
    <div className='w-full mt-[100px]'>
      <Container title='Advanced search' icon={Feather}>
        <div>Hello</div>
      </Container>
    </div>
  )
}
