let msg_list
let dt_today
let c_menu
let authors

const AuthorTypes = Object.freeze({
    USER: 0,
    BOT: 1,
    SYSTEM: 2,
})

const MediaTypes = Object.freeze({
    EMPTY: 0,
    IMAGE: 1,
    VIDEO: 2,
    EMBED: 3,
})

const SystemMsgTypes = Object.freeze({
    PIN: 0,
    CALL: 1,
    SEPARATOR: 2,
})

function setup() {
    noCanvas()
    dt_today = new Date()
    c_menu = new EditMenu()
    authors = [
        new EAuthor(),
    ]

    msg_list = new MessageList();
    msg_list.add(new EMessage())
}

function show_edit_menu(msg_id) {
    c_menu.toggle(msg_id)
}

function show_sysedit_menu(msg_id) {
    c_menu.toggle(msg_id, true)
}

function all_done() {
    select('#bg').style("border-radius", '0px')
    html2canvas(bg, {"scale": 2}).then(function(canvas) {
        saveCanvas(canvas, 'fakeConvo', 'png')
        select('#bg').style("border-radius", '4px')
    })
}

function date2text(date, absolute = false, wordy = false) {
    if (absolute) {
        if (wordy)
            return date.getDate().toString().padStart(2, '0') + " "
            + date.toLocaleString('default', { month: 'long' }) + " "
            + date.getFullYear()
        else
            return date.getDate().toString().padStart(2, '0') + "/"
            + date.getMonth().toString().padStart(2, '0') + "/"
            + date.getFullYear()
    }

    else {
        s = ""
        day = date.getDate()
        today = new Date()
        today = today.getDate()
        if (today == day) 
            s += "Today at " + date.getHours() + ":" + date.getMinutes().toString().padStart(2, '0')
        else if (today == day + 1) 
            s += "Yesterday at " + date.getHours() + ":" + date.getMinutes().toString().padStart(2, '0')
        else if (today == day - 1) 
            s += "Tomorrow at " + date.getHours() + ":" + date.getMinutes().toString().padStart(2, '0')
        else s = date2text(date, true)
        return s
    }
}
