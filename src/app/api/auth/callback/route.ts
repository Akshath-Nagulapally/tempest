import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import axios from 'axios'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)


  async function updateUsername(userId: any, newUsername: any) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, username: newUsername })
      .select();
  
    if (error) {
      console.error('Error updating username:', error);
      return null; // Return null or handle the error as needed
    } else {
      console.log('Username updated successfully:', data);
      return data; // Return the updated data if needed
    }
  }


  if (code) {

  
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    const userId = data.user?.id; // Assuming data.user contains the user ID
    const newUsername = data.user?.user_metadata.preferred_username; // Replace with the new username

    updateUsername(userId, newUsername)
    .then(updatedData => {
      if (updatedData) {
        console.log('Updated profile data:', updatedData);
      }
    })
    .catch(err => {
      console.error('Error in updateUsername function:', err);
    });
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(`${requestUrl.origin}/error`)
    }

    const accessToken = data.session.access_token
    console.log('Access Token:', accessToken)  // Log the access token

  }

  return NextResponse.redirect(`${requestUrl.origin}/projects`)
}
