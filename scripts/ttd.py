from browser import alert, document

def project(ev):
    DICT_NUMBERS = {
        "0": ":zero: ",
        "1": ":one: ",
        "2": ":two: ",
        "3": ":three: ",
        "4": ":four: ",
        "5": ":five: ",
        "6": ":six: ",
        "7": ":seven: ",
        "8": ":eight: ",
        "9": ":nine: ",
        }
    LIST_LETTERS = list(map(chr, range(97, 123)))

    t_in = document["form_python_input"].value
    t_out = ""
    for char in t_in.lower():
        if char in LIST_LETTERS:
            if (document["options_python_aalt"].checked and char == "a") or (document["options_python_balt"].checked and char == "b"):
                t_out += ":%s:​" % char
            else:
                t_out += ":regional_indicator_%s:​" % char
        elif char in DICT_NUMBERS:
            t_out += DICT_NUMBERS[char]
        elif char == " ":
            if document["options_python_space"].value == "text":
                t_out += " "
            elif document["options_python_space"].value == "ignore":
                continue
            else:
                t_out += ":black_large_square:​"
        else:
            if document["options_python_symbols"].value == "keep":
                t_out += char
            else:
                continue
        
    document["form_python_output"].value = t_out

document["form_python_btn"].bind("click", project)
