import requests

url = "http://localhost:5000/run-docker"
data = {
    "ZIPDOWNLOAD_URL": 'https://codeload.github.com/Akshath-Nagulapally/github_app_test/legacy.zip/refs/heads/main?token=BKA7RZ6LHOK6N7EMCIYUF4TGWZRMDAVPNFXHG5DBNRWGC5DJN5XF62LEZYBS7ZVYWFUW443UMFWGYYLUNFXW4X3UPFYGLN2JNZ2GKZ3SMF2GS33OJFXHG5DBNRWGC5DJN5XAhttps://codeload.github.com/Akshath-Nagulapally/github_app_test/legacy.zip/refs/heads/main?token=BKA7RZ6LHOK6N7EMCIYUF4TGWZRMDAVPNFXHG5DBNRWGC5DJN5XF62LEZYBS7ZVYWFUW443UMFWGYYLUNFXW4X3UPFYGLN2JNZ2GKZ3SMF2GS33OJFXHG5DBNRWGC5DJN5XA',
    "FUNCTIONAL_NAME": "example_function"
}

response = requests.post(url, json=data)
print(response.json())
