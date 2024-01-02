"use client"
import { CusttomButtonProps } from '@/types/indext'
import React from 'react'

export default function CusttomButton({
	title,
	containerStyles,
	handleClick,
	btnType
}: CusttomButtonProps) {
  return (
    <button
        disabled={false}
				type={btnType || 'button'}
				className={`custom-btn ${containerStyles}`}
				onClick={handleClick}
    >
			<span className={'flex-1'}>
				{title}
			</span>
    </button>
  )
}
