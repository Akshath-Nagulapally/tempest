//Make some more validations happen: for example you need to make sure that the name inputted is 63 characters and prevent the abuse and stuff from happenning.

import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'


export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {

        
    const url = new URL(request.url);
    const userid = url.searchParams.get('userid') || '';
    const projectName = url.searchParams.get('projectName') || '';
    const functionalName = url.searchParams.get('functionalName') || '';
    const framework = url.searchParams.get('framework');
    const commitActivity = url.searchParams.get('commitActivity');

    
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)
  
    
    const { data, error } = await supabase
    .from('projects')
    .insert([
      { 
        user_id: userid,
        name: projectName,
        functional_name: functionalName,
        framework: framework,
        commit_activity: commitActivity
     },
    ])
    .select()

    console.log(error);
  

    return new Response(functionalName);
}