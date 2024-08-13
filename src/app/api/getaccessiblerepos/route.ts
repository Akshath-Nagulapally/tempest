export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import fs from 'fs'
import http from 'http'
import { Octokit, App } from 'octokit'
import { createNodeMiddleware } from '@octokit/webhooks'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

// Load environment variables from .env file
// Set configured values
const appId = 950709
const privateKeyPath = process.env.PRIVATE_KEY_PATH
// const privateKey = fs.readFileSync('C:\Users\admin\Downloads\goark\tempest\src\app\akkiai.2024-08-04.private-key.pem', 'utf8')
const privateKey ='-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAq9wQ9kF1pnjKwaaa2D5urbnODXV67iW5cWl9+kqIIx7c0lJD\nz5VNaGA8KrnFUz8UQSmqH0pgLxHG/5DATzR2rYgnxPw0BkV01QYuyQ+B72yVKdBh\njx9LtZk7Oto0KBGtRXPQx4ytMqOYRa7Pj5rwFC6N8JlNKFJBCGWLaQ2y5YHzWiwE\nqqcLWP5rpyi8sESZXillcyC7/o5zyBPewoVAz1+8YJAWUVsOwJQzsKDdeS17fQ0v\n97Pecg2mbxS5t5iqM/yX0Brs7vsmsclq8amIltNKP5+mwBiGYs0/GYbBd67xH/l9\nHZW0nhjjlHmhOhaPSOg+1rT3o/0nAlCo3o6ZRwIDAQABAoIBAHjxHV6vIkRMrSMq\nQ7358ZmAMGl4S1JcaexN+MGywas1hODd06q5vwe88Zp/sUWsFmzlDTuH87gsIoan\nLy6OFRZ5wsL1WQcwyc8/0pzbtOzw1OfgJUe7FmRtuSjpddrc1bsSjdJgRWJljjs7\nkgXVWy5YtLqkp4/AktN94mXDpimr6k55BJvwkCkM++aZkMA6LLLA35pHb1xxvRW+\nTqKkmFdATm3khp/7++LVh1AWLTaKuROyG9ynvIEjMmevo2ix1+tXs6OdxNS5iuJv\ntTJfixdQWqFxbUMTS475EpkvxvcRk//FqeyJtN/1vp+ExNlDgi+CmUQuLwxDxyyt\nlfHjJAECgYEA2eFwjksRUWi8DR0k/u6WEfAXxAayVjmgz7S5BBrooSMf8x33HNAo\nqQoyBgSsrSxL+bPSLSAJVmmQsAEkjrV9HUE4igHdXr33Hrt6n5wuNfm0kuInsFys\nbh11Aibm1Haj3OxmbsEJ9Y3J3QvuCAyYJ5PbyHwjGXOBCbDQIZV3WcECgYEAye1p\nmu+ynJ8lQYWtSVvXwTgVs+xetpEC/d4BLJ9sVoPWEZAdJVpIZrIoN3+mlQf2mhW5\nZIrS7y7moQVZ1jxLaq689GMUydCTPgbEmuuAwRoafKaJxsKgGgjWkGsVsHw444Zt\nNn4B/czMFJSxlecQZH5FB/euUG6jLDEajtZiZQcCgYEAsDsRwHZlhpSRboYBU5aF\nmfK6Nls4SlgIg5hpAjIFsbhockvtgce466mMdqO3S8cFmO5i9Q7xnox6dHIoMKoJ\nje0gHziM5sH+rUP1Vj6MfioAbcIxWgxLiDGZX+k5Uea4ecxYugK33H8YJQwuNyKA\nu5pz7kDCXya227DBWDi+NcECgYA/UrxzYgfZJe9BBPK6tpqKdVQZAF8TUZZmlmA3\n5ibLWrye9VquhAmAaw5BmT5cLgsfdwCUjxRm/YZFqK/rhyz/X5zR5uB2CXqjUOwG\nySOvasgznuZF9nLOt0bSM0Kx/cK5V0aYeBuXw8mcCqVGJRf268IqJXn8rzVsflmd\nwY1JsQKBgBiOmboOY7Z1CqynzVqemfEGQde8WZaiIb+7Tc2wPJc7YzBNEi2MZFxF\nFnKZX7OfMhH7/fCdI/rxLm1ypXcUaCqJo0bD922rKwP66WbrLb/zyQyHW4h6Uuyp\nO30di+37Fm99IFMQdC6Q9CnQ6vxE94UCqtxXchuBtNKhnBN9EFAm\n-----END RSA PRIVATE KEY-----'
const secret = 'Akkikalli01!!!!'
const enterpriseHostname = process.env.ENTERPRISE_HOSTNAME
const messageForNewPRs = "New PR has been verified.";


// console.log('App ID:', appId)
// console.log('Private Key Path:', privateKeyPath)
// console.log('Private Key:', privateKey ? 'Loaded' : 'Not Loaded')
// console.log('Webhook Secret:', secret)
// console.log('Enterprise Hostname:', enterpriseHostname)


// Create an authenticated Octokit client authenticated as a GitHub App
const app = new App({
  appId,
  privateKey,
  webhooks: {
    secret
  },
  ...(enterpriseHostname && {
    Octokit: Octokit.defaults({
      baseUrl: `https://${enterpriseHostname}/api/v3`
    })
  })
})



//const installationUrl = await app.getInstallationUrl();
//return res.redirect(installationUrl);



export async function GET(request: Request) {


  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()


  let { data: profiles, error } = await supabase
  .from('profiles')
  .select("*")
  // Filters
  .eq('id', user?.id)

  const username = profiles[0].username
  console.log(username);



  
  const { data } = await app.octokit.request('/app')

  app.octokit.log.debug(`Authenticated as '${data.name}'`)

  async function listRepositories() {
    const repos = [];
    for await (const { repository } of app.eachRepository.iterator()) {
      console.log(`Repository: ${repository.name}`)
      console.log(repository.owner.login);


      if (repository.owner.login === username){
      repos.push(
            {
            'owner' : repository.owner.login,
            'reponame' :repository.name,
            "ref": 'main'
            }
        )
      }

    }
    return repos;
  }
  
  const user_select_repos = await listRepositories().catch(console.error);

  return new Response(JSON.stringify(user_select_repos), {
    headers: { 'Content-Type': 'application/json' }
  });
  
}


