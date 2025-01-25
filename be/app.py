from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/respond')
def respond():
    return 'Hello World'

# main driver function
if __name__ == '__main__':
    app.run()