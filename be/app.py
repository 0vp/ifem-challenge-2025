from flask import Flask, request, jsonify
import process

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/respond', methods=['POST'])
def respond():
    data = request.json['input']
    processed = process.process(data)
    return jsonify({'response': f'You sent: {data}'}) 

@app.after_request
def handle_options(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"

    return response

# main driver function
if __name__ == '__main__':
    app.run()