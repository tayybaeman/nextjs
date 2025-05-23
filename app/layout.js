import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './components/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Resume Screener',
  description: 'Resume screening application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}