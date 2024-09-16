"use client"
import React from 'react'
import { Logo } from '@/components/header/logo';
import { UHeader } from "@/components/header/auth-header";
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Add scroll event listener
    const handleScroll = () => {
      window.scrollY >= 50 ? setShow(true) : setShow(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={cn('flex items-center justify-around py-5 fixed w-full top-0',
      show ? 'bg-header' : 'bg-transparent'
    )}>
      <Logo/>
      <UHeader />
    </div>
  )
}