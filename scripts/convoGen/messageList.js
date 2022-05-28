class MessageList {
    constructor() {
        this.msgs = []
        this.nMsgs = 0
    }

    add(msg, force_msg_header=false) {
        let last_msg
        if (this.msgs.length) last_msg = this.msgs[this.msgs.length - 1]
        this.msgs.push(msg)
        msg.id = this.nMsgs
        if (force_msg_header || !last_msg) msg.show(false)
        else msg.show(last_msg.author == msg.author)
        this.nMsgs++
    }

    remove(msg) {
        msg.remove()
        this.nMsgs--
    }
}