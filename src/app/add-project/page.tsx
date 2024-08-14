"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { useUserStore } from '@/zustand'  // import the store



export default function DeployRepo() {


  // const [repositories, setRepositories] = useState([]);
  // const [selectedRepo, setSelectedRepo] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [targetPort, setTargetPort] = useState('');  // New state for the port
  const router = useRouter();
  type Repository = {
    reponame: string;
    // Add any other properties your repository objects have
  };

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);



  useEffect(() => {
    const getAccessibleRepos = async () => {
      const response = await fetch('/api/getaccessiblerepos', {
        method: 'GET',
      });
      const data = await response.json();
      //const data = [];
      setRepositories(data);
    };

    getAccessibleRepos();
  }, []);


  

  const handleDeploy = async () => {
    if (selectedRepo) {
      // Get the link for the GitHub repo 
      const response = await fetch('/api/getzipfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRepo),
      });

      const zipDownloadUrl = await response.text(); // or the correct key from the JSON response



      ///Getting the functional name of a deployment. Input: normal name
      const userAssignedProjectName = projectName;





          // Get the link for the GitHub repo zip download 
      const functionalname = await fetch(`/api/functional_name?name=${encodeURIComponent(userAssignedProjectName)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

      const functionalName = await functionalname.text();
      console.log("created functional name on client side:", functionalName) 


      // Build the repository: Inputs: functional name and repo link
      const buildrepo = await fetch(`/api/buildrepo?ZIPDOWNLOAD_URL=${encodeURIComponent(zipDownloadUrl)}&FUNCTIONAL_NAME=${encodeURIComponent(functionalName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const status = await buildrepo;

      console.log(status);

      const parsedPort = targetPort ? Number(targetPort) : 3000; // Convert to number, default to 3000

      //calling kubedeploy MAKE SURE YOU ALLOW SPECIFICATION OF PORT AND IF PORT AINT SPECIFIED IT IS BY DEFAULT 3000
      const deployUrl = `/api/kubedeploy?functional_name=${encodeURIComponent(functionalName)}${targetPort ? `&target_port=${encodeURIComponent(parsedPort)}` : ''}`;

      const kubedeploy = await fetch(`/api/kubedeploy?functional_name=${encodeURIComponent(functionalName)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

      const kubedeploy_status = await kubedeploy;
      console.log(kubedeploy_status);

      // Further logic and database recording.

              //  Fetching the user's id.
      const userid = await fetch('/api/getuserid', {
          method: 'GET',
      });
      const userID = await userid.text();

      const update_db = await fetch(`/api/add_project?userid=${encodeURIComponent(userID)}&projectName=${encodeURIComponent(projectName)}&functionalName=${encodeURIComponent(functionalName)}&framework=${encodeURIComponent('framework')}&commitActivity=${encodeURIComponent('commitActivity')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
      const update_db_status = await update_db;
      console.log(update_db_status);

      const hi = await router.push('/projects')    

    }
  };







  const installGithubApp = async () => {
    console.log('button pressed')
    return redirect('https://github.com/apps/akkiai/installations/select_target');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-background">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" prefetch={false}>
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Projects
          </Link>
          <Link href="#" className="font-bold" prefetch={false}>
            Deployments
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Analytics
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Logs
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Settings
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full ml-auto">
            <img
              src="/placeholder.svg"
              width="32"
              height="32"
              className="rounded-full border"
              alt="Avatar"
              style={{ aspectRatio: "32/32", objectFit: "cover" }}
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Deploy</h1>
        </div>
        <div className="grid gap-6 max-w-6xl w-full mx-auto">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Deploy a GitHub Repository</CardTitle>
              <CardDescription>Select a GitHub repository to deploy and configure additional settings.</CardDescription>
            </CardHeader>
            <CardContent>
              {(!repositories || repositories.length === 0) ? (
                <form>
                <Button formAction={installGithubApp}>Looks like we cant access your repos just yet, click here</Button>
                </form>
              ) : (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="Project Name">Project Name</Label>
                    <Input 
                      id="branch"
                      placeholder="hello-world"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                     />
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                 
                 
                 <Select onValueChange={(value) => {
                    const repo = repositories.find(repo => repo.reponame === value);
                    setSelectedRepo(repo || null);}}>



                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a GitHub repository" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Your Repositories</SelectLabel>
                          {repositories.map((repo) => (
                            <SelectItem key={repo.reponame} value={repo.reponame}>
                              {repo.reponame}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                    <Input 
                      id="port"
                      type="number"
                      placeholder="Port(Optional) Eg. 3000"
                      value={targetPort}
                      onChange={(e) => setTargetPort(e.target.value)}/>
                    </div>
              )}
            </CardContent>
            <CardFooter>

              <Button
               className="ml-auto"
               onClick={handleDeploy}
               disabled={!selectedRepo || !projectName}>
                  Deploy
              </Button>

            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}

function FrameIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
