
export default function ViewPdfPage()  {
  const file = 'LandsEnd-Sumiran.pdf'
  const pdfUrl = `/api/pdf?file=${encodeURIComponent(file)}`
  const downloadUrl = `/api/pdf?file=${encodeURIComponent(file)}&download=1`

  return (
    <div style={{ padding: 20 }}>
      <h1>View PDF</h1>
      <p>
        <a href={pdfUrl} target="_blank" rel="noreferrer">Open in new tab</a>{' '}
        |{' '}
        <a href={downloadUrl}>Download</a>
      </p>

      <div style={{ height: '80vh', border: '1px solid #ddd' }}>
        <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
      </div>

      <p style={{ marginTop: 12 }}>
        Place your PDF at <strong>public/pdfs/{file}</strong>
      </p>
    </div>
  )
}
