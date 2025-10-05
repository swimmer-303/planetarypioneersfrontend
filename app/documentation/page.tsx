'use client'

import Link from 'next/link'
import { asset } from '@/components/asset'

export default function DocumentationPage() {
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
          {/* Many browsers cannot natively preview .docx; provide a fallback message. */}
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.origin + asset('/Documentation.docx') : ''
            )}`}
            className="w-full h-[70vh]"
            title="Documentation Preview"
          />
        </div>

        <p className="text-gray-400 text-sm mt-3">
          If the preview does not load, use the buttons above to open or download the file.
        </p>
      </div>
    </div>
  )
}


