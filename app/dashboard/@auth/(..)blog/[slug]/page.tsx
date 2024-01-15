"use client"
import { useState } from 'react'
import { Button, Modal } from 'antd';

export default function Page({ params }: { params: { slug: string } }) {
    const [show, setShow] = useState(true);
    const handleOk = () => {
        setShow(false)
    }
    return (
        <Modal title="Basic Modal" open={show} onOk={handleOk} onCancel={handleOk}>
        <div>My Post: {params.slug}</div>
      </Modal>
    )
  }