from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-docker', methods=['POST'])
def run_docker():
    print("request received")
    zip_url = request.json.get('ZIPDOWNLOAD_URL')
    func_name = request.json.get('FUNCTIONAL_NAME')

    if not zip_url or not func_name:
        return jsonify({'error': 'Missing parameters'}), 400

    try:
        command = [
            'docker', 'run', '--rm',
            '-v', '/var/run/docker.sock:/var/run/docker.sock',
            '-e', f'ZIPDOWNLOAD_URL={zip_url}',
            '-e', f'FUNCTIONAL_NAME={func_name}',
            'cicd_build'
        ]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return jsonify({
            'stdout': result.stdout.decode('utf-8'),
            'stderr': result.stderr.decode('utf-8'),
            'returncode': result.returncode
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
