class EditMenu {
    constructor() {
        this.curr_id
        this.curr_pfp
        this.showing = false
        this.x = 0
        this.y = 0

        this.dom_menu_bg
        this.dom_msg_edit
        this.dom_author_edit
        this.dom_time_edit
        this.dom_msg_new
        this.popup_msg_edit
        this.popup_done
    }

    toggle(msg_id) {
        if (msg_id == this.curr_id) {
            if (this.showing) this.hide()
            else this.show(msg_id)
        }
        else {
            this.hide()
            this.show(msg_id)
        }
    }

    show(msg_id) {
        this.curr_id = msg_id
        this.showing = true

        this.dom_menu_bg = createDiv()
        this.dom_menu_bg.class("context_menu")
        this.dom_menu_bg.parent(bg)
        this.x = mouseX+4
        this.y = mouseY+4
        this.dom_menu_bg.position(this.x, this.y, 'fixed')
        this.dom_msg_rem = createButton("Remove message")
        this.dom_msg_rem.class("context_button")
        this.dom_msg_rem.parent(this.dom_menu_bg)
        this.dom_msg_rem.mousePressed(this.rem_msg)
        this.dom_msg_edit = createButton("Edit message")
        this.dom_msg_edit.class("context_button")
        this.dom_msg_edit.parent(this.dom_menu_bg)
        this.dom_msg_edit.mousePressed(this.show_msg_edit)
        if (msg_list.msgs[this.curr_id].has_header) {
            this.dom_author_edit = createButton("Edit author")
            this.dom_author_edit.class("context_button")
            this.dom_author_edit.parent(this.dom_menu_bg)
            this.dom_author_edit.mousePressed(this.show_author_edit)
            this.dom_time_edit = createButton("Edit timestamp")
            this.dom_time_edit.class("context_button")
            this.dom_time_edit.parent(this.dom_menu_bg)
            this.dom_time_edit.mousePressed(this.show_timestamp_edit)
            // this.dom_media_edit = createButton("Edit attachments")
            // this.dom_media_edit.class("context_button")
            // this.dom_media_edit.parent(this.dom_menu_bg)
            // this.dom_media_edit.mousePressed(this.show_media_edit)
        }
        this.dom_msg_new = createButton("New message (default author)")
        this.dom_msg_new.class("context_button")
        this.dom_msg_new.parent(this.dom_menu_bg)
        this.dom_msg_new.mousePressed(this.new_msg_below)
        this.dom_msg_new = createButton("New message (same author)")
        this.dom_msg_new.class("context_button")
        this.dom_msg_new.parent(this.dom_menu_bg)
        this.dom_msg_new.mousePressed(this.new_msg_same)
    }

    new_msg_below() {
        msg_list.add(new EMessage(), true)
        c_menu.hide()
    }

    new_msg_same() {
        let m = new EMessage()
        m.author = msg_list.msgs[msg_list.nMsgs-1].author

        msg_list.add(m)
        c_menu.hide()
    }

    rem_msg() {
        msg_list.remove(msg_list.msgs[c_menu.curr_id])
        c_menu.hide()
    }

    show_msg_edit() {
        if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')
        c_menu.popup_msg_edit = createElement("textarea", msg_list.msgs[c_menu.curr_id].content_text)
        c_menu.popup_msg_edit.class("popup_textin")
        c_menu.popup_msg_edit.id("popup_msg_edit")
        c_menu.popup_msg_edit.parent(c_menu.dom_menu_bg)
        
        c_menu.popup_done = createButton("Done")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_msg_edit)
    }

    hide_msg_edit() {
        msg_list.msgs[c_menu.curr_id].content_text = c_menu.popup_msg_edit.value()
        c_menu.hide()
    }

    show_author_edit() {
        if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()
        let curr_author = msg_list.msgs[c_menu.curr_id].author

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')
        c_menu.popup_pfp_edit = createFileInput(c_menu.set_temp_pfp)
        c_menu.popup_pfp_edit.class("popup_filein")
        createSpan("Profile pic: ").parent(c_menu.dom_menu_bg)
        c_menu.popup_pfp_edit.parent(c_menu.dom_menu_bg)
        createElement("br").parent(c_menu.dom_menu_bg)
        c_menu.popup_name_edit = createInput(curr_author.name)
        c_menu.popup_name_edit.class("popup_textin")
        c_menu.popup_name_edit.parent(c_menu.dom_menu_bg)
        c_menu.popup_role_color = createColorPicker(curr_author.role_color)
        c_menu.popup_role_color.parent(c_menu.dom_menu_bg)
        c_menu.popup_tag_edit = createSelect()
        c_menu.popup_tag_edit.class("popup_select")
        c_menu.popup_tag_edit.option("USER")
        c_menu.popup_tag_edit.option("BOT")
        c_menu.popup_tag_edit.option("SYSTEM")
        c_menu.popup_tag_edit.parent(c_menu.dom_menu_bg)
        c_menu.popup_tag_edit.selected(c_menu.popup_tag_edit.elt[curr_author.type].value)
        
        c_menu.popup_done = createButton("Done")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_author_edit)
    }

    set_temp_pfp(file) {
        if (file.type === 'image') {
            c_menu.curr_pfp = file.data
          } else {
            c_menu.curr_pfp = "/assets/unk.webp"
          }
    }

    hide_author_edit() {
        let a = new EAuthor(
            c_menu.popup_name_edit.value(),
            c_menu.popup_tag_edit.elt.selectedIndex,
            c_menu.popup_role_color.color(),
            c_menu.curr_pfp
        )
        authors.push(a)
        msg_list.msgs[c_menu.curr_id].author = a

        c_menu.hide()
    }

    show_timestamp_edit() {
        if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')
        c_menu.popup_time_edit = createElement("input")
        c_menu.popup_time_edit.attribute("type", "datetime-local")
        c_menu.popup_time_edit.elt.valueAsDate = msg_list.msgs[c_menu.curr_id].date
        c_menu.popup_time_edit.class("popup_timedate")
        c_menu.popup_time_edit.parent(c_menu.dom_menu_bg)
        
        c_menu.popup_done = createButton("Done")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_timestamp_edit)
    }

    hide_timestamp_edit() {
        msg_list.msgs[c_menu.curr_id].date = c_menu.popup_time_edit.elt.valueAsDate
        c_menu.hide()
    }

    show_media_edit() {

    }

    hide_media_edit() {

    }

    hide() {
        if (this.dom_menu_bg) {
            this.dom_menu_bg.remove()
            if (msg_list.msgs[c_menu.curr_id]) msg_list.msgs[c_menu.curr_id].update()
        }
        
        this.showing = false
        this.curr_id = undefined
        this.curr_pfp = undefined
    }
}