'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { asset } from '@/components/asset'

export default function DocumentationPage() {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)

  useEffect(() => {
    const absoluteDocUrl = window.location.origin + asset('/Documentation.docx')
    const officeEmbed = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteDocUrl)}`
    setEmbedSrc(officeEmbed)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="card">
        <h1 className="text-3xl font-bold text-gradient mb-4">Documentation</h1>
        <p className="text-gray-300 mb-6">
          View the project documentation below or download the Word file.
        </p>

        <div className="flex gap-3 mb-6">
          <Link href={asset('/Documentation.docx')} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Open in new tab
          </Link>
          <Link href={asset('/Documentation.docx')} className="btn-secondary" download>
            Download .docx
          </Link>
        </div>

        <div className="bg-black/40 border border-space-purple/30 rounded-lg overflow-hidden">
          {embedSrc ? (
            <iframe
              src={embedSrc}
              className="w-full h-[70vh]"
              title="Documentation Preview"
            />
          ) : (
            <div className="p-6 text-gray-400">
              Loading preview...
            </div>
          )}
        </div>

        <p className="text-gray-400 text-sm mt-3">
          If the preview does not load, use the buttons above to open or download the file.
        </p>
      </div>
    </div>
  )
}


