class MessageList {
    constructor() {
        this.msgs = []
        this.nMsgs = 0
        this.window_scroll = 0
    }

    redraw_all() {
        let last_msg
        let i = 0
        for(var msg of this.msgs) {
            msg.id = i
            if (!last_msg) msg.show(false)
            else msg.show(last_msg.author == msg.author)
            last_msg = msg
            i++
        }
        this.nMsgs = this.msgs.length
        window.scrollTo(0, this.window_scroll)
    }

    undraw_all() {
        this.window_scroll = window.scrollY
        for(var msg of this.msgs) {
            msg.remove()
        }
    }

    add(msg, at_index=-1) {
        this.undraw_all()
        if (at_index == -1) this.msgs.push(msg)
        else this.msgs.splice(at_index, 0, msg)
        this.redraw_all()
    }

    remove(index) {
        this.undraw_all()
        this.msgs.splice(index, 1)
        this.redraw_all()
    }
}