import path from 'path';
const fs = require('fs');

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

// Import the necessary Kubernetes client and URL libraries
const k8s = require('@kubernetes/client-node');


const kubeconfigPath = 'src/app/kubeconfig/kubeconfig.yaml';

// Construct the path to the kubeconfig file
// fs.readFile(kubeconfigPath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading the file:', err);
//         return;
//     }
//     console.log(data);
//     });


//kubeconfigPath
// Load the Kubernetes configuration
const kc = new k8s.KubeConfig();
kc.loadFromFile(kubeconfigPath);

const client = k8s.KubernetesObjectApi.makeApiClient(kc);




export function GET(request: Request) {

    
    
    //extracting search params.
    const url = new URL(request.url);
    const FunctionalProjectName = url.searchParams.get('functional_name') || '';
    const ResourceType = url.searchParams.get('resource_type') || '';
    const UserID = url.searchParams.get('user_id') || '';
    const numreplicas = url.searchParams.get('num_replicas') || 3;
    const Port = url.searchParams.get('port') || 80;
    const TargetPort = url.searchParams.get('target_port') || 3000;


    let resource = {};

    console.log(UserID)

    //Target namespace creation and shit.

    const namespace = {
        apiVersion: 'v1',
        kind: 'Namespace',
        metadata: {
          name: UserID
        }
    }
    const deployment = {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: FunctionalProjectName,
          labels: {
            app: FunctionalProjectName
          }
        },
        spec: {
          replicas: numreplicas,
          selector: {
            matchLabels: {
              app: FunctionalProjectName
            }
          },
          template: {
            metadata: {
              labels: {
                app: FunctionalProjectName
              }
            },
            spec: {
              containers: [
                {
                  name: `${FunctionalProjectName}-container`,
                  image: 'akshathnag06002/akkiregistry:goarklandingpage_nix_builder_test' //CHANGE THIS TO WHATEVER IS REQUIRED BOSS
                }
              ],
              imagePullSecrets: [
                {
                  name: 'regcred'
                }
              ]
            }
          }
        }
      }



      const service = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: `${FunctionalProjectName}-service`
        },
        spec: {
          selector: {
            app: FunctionalProjectName
          },
          ports: [
            {
              protocol: 'TCP',
              port: Port,
              targetPort: TargetPort
            }
          ],
          type: 'LoadBalancer'
        }
      };
            

      const ingress = {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'Ingress',
        metadata: {
          name: `${FunctionalProjectName}-ingress`,
          annotations: {
            
            "nginx.ingress.kubernetes.io/rewrite-target": "/",
            "cert-manager.io/cluster-issuer": "letsencrypt-prod"
          }
        },
        spec: {
          ingressClassName: 'nginx',
          tls: [
            {
              hosts: [
                `${FunctionalProjectName}.akkiai.com`
              ],
              secretName: `${FunctionalProjectName}-tls`
            }
          ],
          rules: [
            {
              host: `${FunctionalProjectName}.akkiai.com`,
              http: {
                paths: [
                  {
                    path: '/',
                    pathType: 'Prefix',
                    backend: {
                      service: {
                        name: `${FunctionalProjectName}-service`,
                        port: {
                          number: 80
                        }
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      };
      



    

    


    console.log(FunctionalProjectName)

    // Validate the project name length
    if (!FunctionalProjectName) {
        return new Response('Project name is required', { status: 400 });
    }

    if (FunctionalProjectName.length > 63) {
        return new Response('Project name must be 63 characters or less', { status: 400 });
    }
    
    async function createOrPatch(resource) {
        try {
          // Attempt to create the deployment
          await client.create(resource);
          console.log('created successfully.');
        } catch (error) {
          console.log('Creation failed, attempting to patch deployment.');
          try {
            // If creation fails, attempt to patch the deployment
            await client.patch(resource);
            console.log('patched successfully.');
          } catch (patchError) {
            console.error('Both create and patch operations failed:', patchError);
          }
        }
      }
      createOrPatch(namespace);
      createOrPatch(deployment);
      createOrPatch(service);
      createOrPatch(ingress);
          
    // Deploy the Kubernetes deployment using the validated project name
    //deployDeployment(FunctionalProjectName);

    return new Response(`Successfully created deployment for: ${FunctionalProjectName}`);
}
