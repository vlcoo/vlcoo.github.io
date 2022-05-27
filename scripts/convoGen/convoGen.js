let msg_list
let dt_today;

const AuthorTypes = Object.freeze({
    USER: 0,
    BOT: 1,
    SYSTEM: 2,
})

function setup() {
    dt_today = new Date()

    msg_list = new MessageList();
    msg_list.add(new EMessage())
}

function all_done() {
    select('#bg').style("border-radius", '0px')
    html2canvas(bg).then(function(canvas) {
        saveCanvas(canvas, 'fakeConvo', 'png')
        select('#bg').style("border-radius", '4px')
    })
}

function date2text(date, absolute = false) {
    if (absolute) {
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
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
        else s = date2text(date, false)
        return s
    }
}
