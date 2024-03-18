import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dagger',
  description: 'Ethereum Portfolio Management'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.ico" />
        <title>Dagger</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  )
}