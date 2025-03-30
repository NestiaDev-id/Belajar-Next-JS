import React from 'react'
import { useRouter } from 'next/router'

export default function product() {
    const {query} = useRouter()
  return (
    <div>
        <h1>Detail Product</h1>
        <p>Product ID: {query.id}</p>
    </div>
  )
}
