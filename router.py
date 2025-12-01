from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.students import (
     get_all_students,
        get_student,
        create_student

)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


class StudentRouter(BaseHTTPRequestHandler):
     
   def do_OPTIONS(self):
        # Why OPTIONS exists:
        # Browsers enforce security rules.
        # Before a POST/PUT/DELETE request, browsers send a test request: OPTIONS.
        # Server must respond with CORS headers.
        # Without it, frontend fetch() will fail, even if your backend works.
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

   def do_GET(self):
       path = urlparse(self.path).path
       if path == "/api/students":
           return get_all_students(self)
       return send_404(self)
   
   def do_POST(self):
        if self.path == "/api/students":
            return create_student(self)
        return send_404(self)

   def log_message(self, format, *args):
       timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
       print(f"[{timestamp}] [Server] {format % args}")