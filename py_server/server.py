#!/usr/bin/env python
"""Flask server of counter application"""
import os
import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    """ Return value of counter"""
    return 'test'

@app.route('/api')
def api_example():
    """ Getting data about terms """
    with open('data.json', encoding='utf-8') as f:
            data = json.load(f)
    return data

@app.route('/api2')
def api_example2():
    """ TGetting data to make a mindmap """
    with open('mindmap.json', encoding='utf-8') as f:
            data = json.load(f)
    return data

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 9090), debug=True)
