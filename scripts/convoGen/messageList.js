class MessageList {
    constructor() {
        this.msgs = [];
    }

    add(msg) {
        let last_msg
        if (this.msgs.length) last_msg = this.msgs[this.msgs.length - 1]
        this.msgs.push(msg)
        if (last_msg) msg.show(last_msg.author == msg.author)
        else msg.show(false)
    }

    remove(msg) {
        this.msgs.pop(msg)
        msg.remove()
    }
}