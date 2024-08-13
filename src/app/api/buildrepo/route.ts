export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
    // Parse the incoming request to get search parameters
    const url = new URL(request.url);
    let zipUrl = url.searchParams.get('ZIPDOWNLOAD_URL');
    const funcName = url.searchParams.get('FUNCTIONAL_NAME');
    // Validate parameters
    if (!zipUrl || !funcName) {
        return new Response(JSON.stringify({ error: 'Missing parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        });
    }


    
    // Prepare the body for the POST request
    const body = JSON.stringify({
        ZIPDOWNLOAD_URL: zipUrl,
        FUNCTIONAL_NAME: funcName,
    });

    zipUrl = encodeURIComponent(zipUrl);


    console.log('body constructed', body);
    
    // Define the API URL
    const apiUrl = 'http://localhost:5000/run-docker';
    
    // Make the fetch request to the API
    try {
        const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
        });
    
        // Retrieve JSON from the API response
        const responseData = await apiResponse.json();
    
        // Return the API response as JSON
        return new Response(JSON.stringify(responseData), {
        headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(`Error: ${error}`, { status: 500 });
    }
    }
    


