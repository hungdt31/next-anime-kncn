import { cn } from '@/lib/utils'
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons'
import React from 'react'

interface FormNoticeProps {
  message?: string | null
  type?: 'success' | 'error'
  children?: React.ReactNode
}

export const NoticeMessage = ({ message, type, children }: FormNoticeProps) => {
  if (!message) return null

  return (
    <div
      className={cn(
        'p-3 rounded-md flex items-center gap-x-2',
        type == 'success'
          ? 'bg-emerald-500/15 text-emerald-500'
          : 'bg-destructive/15 text-destructive'
      )}
    >
      {type == 'success' ? (
        <CheckCircledIcon className="h-4 w-4" />
      ) : (
        <ExclamationTriangleIcon className="h-4 w-4" />
      )}
      {children ? (
        <div>
          <p>{message}</p>
          {children}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}
