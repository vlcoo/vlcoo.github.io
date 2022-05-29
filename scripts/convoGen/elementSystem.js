class ESystem {
    constructor() {
        this.id
        this.type = SystemMsgTypes.PIN
        this.values = {
            "Author": authors[0],
            "CallDuration": "2 hours",
            "CallMissed": false,
        }
    }

    show() {
        switch (this.type) {
            case SystemMsgTypes.PIN:
                this.dom_line = createDiv()
                this.dom_line.class("line line-first")
                this.dom_line.parent(bg)
                this.dom_msg_icon = createImg("/assets/icon_pin.png")
                this.dom_msg_icon.class("pfp fixedsize")
                this.dom_msg_icon.parent(this.dom_line)
                let s_nA = createSpan(this.values["Author"].name)
                s_nA.style("color", this.values["Author"].role_color)
                let s_dimA = createSpan(" pinned ")
                s_dimA.style("color", color(124, 127, 131))
                let s_brA = createSpan("a message")
                s_brA.style("color", "white")
                let s_dimB = createSpan(" to this channel. See all ")
                s_dimB.style("color", color(124, 127, 131))
                let s_brB = createSpan("pinned messages.")
                s_brB.style("color", "white")
                this.dom_content = createP()
                s_nA.parent(this.dom_content)
                s_dimA.parent(this.dom_content)
                s_brA.parent(this.dom_content)
                s_dimB.parent(this.dom_content)
                s_brB.parent(this.dom_content)
                this.dom_content.class("message message-middle")
                this.dom_content.parent(this.dom_line)
                break;
            
            case SystemMsgTypes.CALL:
                this.dom_line = createDiv()
                this.dom_line.class("line line-first")
                this.dom_line.parent(bg)
                if (this.values["CallMissed"]) this.dom_msg_icon = createImg("/assets/icon_callmiss.png")
                else this.dom_msg_icon = createImg("/assets/icon_call.png")
                let s_nB = createSpan(this.values["Author"].name)
                s_nB.style("color", this.values["Author"].role_color)
                let s = ""
                if (this.values["CallDuration"] == -1) s = " started a call."
                else s = " started a call that lasted " + this.values["CallDuration"] + "."
                let s_dimC = createSpan(s)
                s_dimC.style("color", color(124, 127, 131))
                this.dom_content = createP()
                s_nB.parent(this.dom_content)
                s_dimC.parent(this.dom_content)
                this.dom_msg_icon.class("pfp fixedsize")
                this.dom_msg_icon.parent(this.dom_line)
                this.dom_content.class("message message-middle")
                this.dom_content.parent(this.dom_line)
                break;
        }

        this.dom_line.mouseOver(this.highlight_bg)
        this.dom_line.mouseOut(this.unhighlight_bg)
        this.dom_line.mousePressed(this.on_click)
        this.dom_line.id = this.id
    }

    update() {

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
        show_sysedit_menu(this.id)
    }
}