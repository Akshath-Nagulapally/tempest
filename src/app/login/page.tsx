import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/utils/supabase'



export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  
  const signInGithub = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const origin = headers().get('origin')
    
    console.log('GitHub sign-in activated')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/api/auth/callback`,
      },
      
    })

    if (error) {
      console.log(error)
      return redirect('/login?message=Could not authenticate user')
    }

    console.log('Redirect to', data.url)
    return redirect(data.url)
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <Link
        href="/"
        className="bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-foreground no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <form>
        <button
          formAction={signInGithub}
          className="mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground"
        >
          Connect to GitHub
        </button>

        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
