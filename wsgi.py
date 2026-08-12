#!/usr/bin/env python3
"""WSGI app for PythonAnywhere — serves the training app + auto-sync API.

Endpoints:
  GET  /api/data   -> returns saved snapshot (JSON)
  POST /api/data   -> saves snapshot (JSON body)
  everything else  -> static files (index.html, style.css, app.js...)
"""
import os
import json
import mimetypes

# Katalog z plikami aplikacji (index.html, app.js, ...)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Plik, w którym przechowywane są zsynchronizowane dane
DATA_FILE = os.path.join(BASE_DIR, 'treningi-data.json')


def _read_data():
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return '{"data":{"runs":[],"strength":[],"foods":[]}}'
    except Exception:
        return '{"error":"read failed"}'


def _respond(start_response, status, body, ctype='application/json; charset=utf-8'):
    if isinstance(body, str):
        body = body.encode('utf-8')
    start_response(status, [
        ('Content-Type', ctype),
        ('Content-Length', str(len(body))),
    ])
    return [body]


def application(environ, start_response):
    path = environ.get('PATH_INFO', '/')
    method = environ.get('REQUEST_METHOD', 'GET')

    # ---- API: automatyczna synchronizacja ----
    if path == '/api/data':
        if method == 'GET':
            return _respond(start_response, '200 OK', _read_data())
        if method == 'POST':
            try:
                length = int(environ.get('CONTENT_LENGTH') or 0)
                payload = environ['wsgi.input'].read(length).decode('utf-8')
                parsed = json.loads(payload)  # validate JSON
                if not isinstance(parsed, dict) or 'data' not in parsed:
                    raise ValueError('brak klucza "data"')
                with open(DATA_FILE, 'w', encoding='utf-8') as f:
                    f.write(payload)
                return _respond(start_response, '200 OK', '{"ok":true}')
            except Exception as e:
                return _respond(start_response, '400 Bad Request', '{"ok":false,"error":"%s"}' % str(e))
        return _respond(start_response, '405 Method Not Allowed', '405', 'text/plain; charset=utf-8')

    # ---- Pliki statyczne ----
    if path == '/':
        path = '/index.html'

    filepath = os.path.join(BASE_DIR, path.lstrip('/'))

    if os.path.isfile(filepath):
        ctype = mimetypes.guess_type(filepath)[0] or 'text/html'
        if filepath.endswith('.js'):
            ctype = 'application/javascript; charset=utf-8'
        elif filepath.endswith('.css'):
            ctype = 'text/css; charset=utf-8'
        elif filepath.endswith('.html'):
            ctype = 'text/html; charset=utf-8'
        with open(filepath, 'rb') as f:
            body = f.read()
        start_response('200 OK', [
            ('Content-Type', ctype),
            ('Content-Length', str(len(body))),
        ])
        return [body]

    return _respond(start_response, '404 Not Found', '404 Not Found', 'text/plain; charset=utf-8')
