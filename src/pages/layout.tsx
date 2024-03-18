import { Providers } from '@/pages/providers'

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
        <div id="root">
          <Providers>{children}</Providers>
        </div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  )
}