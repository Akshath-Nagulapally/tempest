//Make some more validations happen: for example you need to make sure that the name inputted is 63 characters and prevent the abuse and stuff from happenning.

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export function GET(request: Request) {


    function generateFunctionalName(projectName: string, existingFunctionalNames: string[]): string {
        // Ensure the project name is lowercased and replace invalid subdomain characters
        const sanitizedProjectName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '');
    
        // Check if the sanitized project name already exists in the list of functional names
        if (!existingFunctionalNames.includes(sanitizedProjectName)) {
            return sanitizedProjectName;
        }
    
        // Base for unique identifier (e.g., timestamp or random number)
        const baseIdentifier = Date.now().toString(36);
    
        let uniqueIdentifier = baseIdentifier;
        let functionalName = `${sanitizedProjectName}-${uniqueIdentifier}`;
    
        // Ensure uniqueness by checking against existing functional names
        while (existingFunctionalNames.includes(functionalName)) {
            uniqueIdentifier = `${baseIdentifier}-${Math.floor(Math.random() * 1000)}`;
            functionalName = `${sanitizedProjectName}-${uniqueIdentifier}`;
        }
    
        return functionalName;
    }
        
    const url = new URL(request.url);
    const projectName = url.searchParams.get('name') || '';
    const existingFunctionalNames = ["cat", "cat-123aabba"]; // This should be replaced with your actual existing names list

    if (!projectName) {
        return new Response('Project name is required', { status: 400 });
    }

    const functionalName = generateFunctionalName(projectName, existingFunctionalNames);
    
    return new Response(functionalName);
}