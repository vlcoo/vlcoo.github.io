class EMessage {
    constructor() {
        this.has_header = false
        this.id = 0
        this.author = authors[0]
        this.content_text = "Default message. Click to see options..."
        this.date = dt_today
        this.media = new EMedia(this)

        this.dom_msg_header
        this.dom_author
        this.dom_timestamp
        this.dom_authortag
        this.dom_line
        this.dom_content
        this.dom_message
        this.dom_pfp
    }
    
    do_msg_header() {
        this.has_header = true
        this.dom_msg_header = createP()
        this.dom_author = createSpan(this.author.name)
        this.dom_author.style("color", this.author.role_color)
        this.dom_timestamp = createSpan(date2text(this.date))
        
        let tag = ""
        if (this.author.type == AuthorTypes.BOT) tag = "BOT"
        else if (this.author.type == AuthorTypes.SYSTEM) tag = "SYSTEM"
        if (tag) this.dom_authortag = createSpan(tag)
        else if (!tag && this.dom_authortag) this.dom_authortag.style("display", "none")
        
        this.dom_msg_header.class("msg_header")
        this.dom_author.class("author")
        if (this.dom_authortag) this.dom_authortag.class("authortag")
        this.dom_timestamp.class("timestamp")

        this.dom_author.parent(this.dom_msg_header)
        if (this.dom_authortag) this.dom_authortag.parent(this.dom_msg_header)
        this.dom_timestamp.parent(this.dom_msg_header)
    }

    show(same_author=false) {
        // that's a lot of doms...
        this.dom_line = createDiv()
        this.dom_content = createDiv()
        this.dom_message = createP(this.content_text)
        
        this.dom_content.class("content")
        this.dom_message.class("message")
        
        this.dom_line.parent(bg)
        if (same_author) {
            this.dom_line.class("line-noheader")
            this.dom_pfp = createImg("/assets/empty.png")
            this.has_header = false
        }

        else {
            this.dom_line.class("line line-first")
            this.dom_pfp = createImg(this.author.pfp)
            this.do_msg_header()
            this.dom_msg_header.parent(this.dom_content)
            this.has_header = true
        }
        this.media.show()
        this.dom_pfp.class("pfp")
        this.dom_pfp.parent(this.dom_line)
        this.dom_content.parent(this.dom_line)
        this.dom_message.parent(this.dom_content)

        this.dom_line.mouseOver(this.highlight_bg)
        this.dom_line.mouseOut(this.unhighlight_bg)
        this.dom_line.mousePressed(this.on_click)
        this.dom_line.id = this.id
    }

    remove() {
        if (this.dom_line) this.dom_line.remove()
    }

    highlight_bg() {
        this.style("background-color", "#00000020")
    }

    unhighlight_bg() {
        this.style("background-color", "#00000000")
    }

    on_click() {
        show_edit_menu(this.id)
    }
}
