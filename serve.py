#!/usr/bin/env python3
"""Simple HTTP server for the training app (local testing, same API as PythonAnywhere)."""
import http.server
import socketserver
import os
import json

PORT = int(os.environ.get('PORT', 3010))
DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(DIR, 'treningi-data.json')


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def _send(self, code, body, ctype='application/json; charset=utf-8'):
        if isinstance(body, str):
            body = body.encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.split('?')[0] == '/api/data':
            try:
                with open(DATA_FILE, 'r', encoding='utf-8') as f:
                    body = f.read()
            except FileNotFoundError:
                body = '{"data":{"runs":[],"strength":[],"foods":[]}}'
            self._send(200, body)
        else:
            super().do_GET()

    def do_POST(self):
        if self.path.split('?')[0] == '/api/data':
            try:
                length = int(self.headers.get('Content-Length') or 0)
                payload = self.rfile.read(length).decode('utf-8')
                parsed = json.loads(payload)
                if not isinstance(parsed, dict) or 'data' not in parsed:
                    raise ValueError('brak klucza "data"')
                with open(DATA_FILE, 'w', encoding='utf-8') as f:
                    f.write(payload)
                self._send(200, '{"ok":true}')
            except Exception as e:
                self._send(400, '{"ok":false,"error":"%s"}' % str(e))
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'404')


if __name__ == '__main__':
    print(f"🚀 Serwer uruchomiony: http://localhost:{PORT}")
    print(f"📁 Katalog: {DIR}")
    print("Press Ctrl+C to stop.")
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
