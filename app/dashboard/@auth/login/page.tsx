 
 "use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Modal } from 'antd';

export default function Login({ params }: { params: { slug: string } }) {
  const router = useRouter()
    return (
        <div>
    <span onClick={() => router.back()}>other router</span>
      <h1>Login</h1>
    </div>
    )
  }