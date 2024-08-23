from fasthtml.common import *

hdrs = (MarkdownJS(), HighlightJS(langs=['python', 'javascript', 'html', 'css']), )

app, rt = fast_app(hdrs=hdrs)

with open('src/posts/first.md') as f: 
    post = f.read()

def Home():
    return Titled("Exploratory Data Analysis", Div(post, cls="marked"))

@rt('/')
def get(req):
    return Home()

serve()
