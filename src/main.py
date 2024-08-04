from fasthtml.common import *
from fasthtml.components import Zero_md
from functools import partial

with open('src/posts/first.md') as f: 
    lesson_content = f.read()

def render_local_md(md, css = ''):
    css_template = Template(Style(css), data_append=True)
    return Zero_md(css_template, Script(md, type="text/markdown"))

lesson_content_html = render_local_md(lesson_content)

zeromd_headers = [Script(type="module", src="https://cdn.jsdelivr.net/npm/zero-md@3?register")]

app = FastHTML(hdrs=(zeromd_headers))

rt = app.route

def Home():
    return Div(lesson_content_html, cls="col-xs-5"),


@rt('/')
def get(): return Home()

serve()
