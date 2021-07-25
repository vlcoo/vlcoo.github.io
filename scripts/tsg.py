from browser import alert, document

def project(ev):
    t_in = document["form_python_input"].value
    t_out = ""
    for char in t_in:
        t_out += "||" + char + "||"
    document["form_python_output"].value = t_out

document["form_python_btn"].bind("click", project)
