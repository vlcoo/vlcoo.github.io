class EMessage {
    constructor() {
        this.author = "VlC"
        this.role_color = color(255, 224, 58)
        this.pfp = "/assets/favicon_index.ico"
        this.author_type = AuthorTypes.SYSTEM
        this.content_text = "Come back later. I haven't finished this tool yet."
        this.date = dt_today
        this.media = undefined
    }
    
    do_msg_header() {
        let msg_header = createP()
        let author = createSpan(this.author)
        author.style("color", this.role_color)
        let timestamp = createSpan(date2text(this.date))
        
        let tag = ""
        let authortag;
        if (this.author_type == AuthorTypes.BOT) tag = "BOT"
        else if (this.author_type == AuthorTypes.SYSTEM) tag = "SYSTEM"
        if (tag) authortag = createSpan(tag)
        
        msg_header.class("msg_header")
        author.class("author")
        if (authortag) authortag.class("authortag")
        timestamp.class("timestamp")

        author.parent(msg_header)
        if (authortag) authortag.parent(msg_header)
        timestamp.parent(msg_header)

        return msg_header
    }

    show(same_author=false) {
        let line = createDiv()
        let content = createDiv()
        let pfp = createImg()
        let message = createP(this.content_text)

        
        pfp.class("pfp")
        content.class("content")
        message.class("message")
        
        line.parent(bg)
        pfp.parent(line)
        if (same_author) {
            line.class("line-noheader")
            pfp.attribute("src", "/assets/empty.png")
        }

        else {
            line.class("line line-first")
            pfp.attribute("src", this.pfp)
            this.do_msg_header().parent(content)
        }
        content.parent(line)
        message.parent(content)
    }

    remove() {

    }
}
