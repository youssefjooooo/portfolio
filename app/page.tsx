import { redirect } from 'next/navigation'

// Redirect root to the default locale.
// The next-intl middleware also handles this, but this
// component serves as an explicit fallback.
export default function RootPage() {
  redirect('/en')
}
