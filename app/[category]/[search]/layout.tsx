import PageLayout from '@/components/PageLayout/PageLayout'

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body >
        <PageLayout >
          {children}
        </PageLayout>
      </body>
    </html>
  )
}
