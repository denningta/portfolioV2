'use client'

import { useState } from "react"
import { Document, Page } from "react-pdf"
import { pdfjs } from "react-pdf"

interface PdfProps {
  pdf?: {
    asset?: {
      url?: string
    }
  }
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function Pdf({ pdf }: PdfProps) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [hover, setHover] = useState(false)

  const handleDocumentLoad = ({ numPages }) => {
    setNumPages(numPages)
  }

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)


  if (!pdf?.asset) return null

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="min-h-[792px] bg-white border dark:border-neutral-700 rounded overflow-hidden">
        <Document
          file={pdf.asset.url}
          onLoadSuccess={handleDocumentLoad}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="flex justify-center items-center h-full"
          />
        </Document>
      </div>

      {numPages &&
        <div className={`absolute bottom-5 text-black w-full justify-center transition ease-in-out ${hover ? 'flex' : 'hidden'} `}>
          <div className="flex w-fit justify-center items-center space-x-6 border bg-white rounded-lg drop-shadow-xl">
            <button
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber === 1}
              className="p-4"
            >
              {'<'}
            </button>
            <div>{pageNumber} of {numPages}</div>
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={pageNumber === numPages}
              className="p-4"
            >
              {'>'}
            </button>
          </div>
        </div>
      }
    </div>
  )

}
