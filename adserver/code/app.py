from flask import Flask, make_response, request
import os
app = Flask(__name__)

@app.route('/')
def index():
    return 'App Works!'

@app.route('/adserver')
def hello():
    print(os.listdir())
    section = request.args.get('section')
    print(section)
    if section == 'section1':
        file = read_file('vast-with-video.xml')
        print('section1 ended')
    elif section == 'section2':
        file = read_file('vast-empty.xml')
        print('section2 ended')
    else:
        resp = make_response('error', 500)
        resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp

    response = make_response(file, 200)
    response.mimetype = "application/xml"
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(file)

    return response

def read_file(file_link):
    with open(file_link) as f:
        file = f.read()
    return file

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

