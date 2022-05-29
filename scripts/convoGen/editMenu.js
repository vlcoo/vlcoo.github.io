class EditMenu {
    constructor() {
        this.curr_id
        this.curr_uploaded
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

    toggle(msg_id, is_sysedit = false) {
        if (msg_id == this.curr_id) {
            if (this.showing) this.hide()
            else {
                if (is_sysedit) this.show_sysedit(msg_id)
                else this.show(msg_id)
            }
        }
        else {
            this.hide()
            if (is_sysedit) this.show_sysedit(msg_id)
                else this.show(msg_id)
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
        this.dom_msg_new = createButton("✳️ Add element below...")
        this.dom_msg_new.class("context_button")
        this.dom_msg_new.parent(this.dom_menu_bg)
        this.dom_msg_new.mousePressed(this.new_elem_below)
        this.dom_msg_rem = createButton("❌ Remove message")
        this.dom_msg_rem.class("context_button")
        this.dom_msg_rem.parent(this.dom_menu_bg)
        this.dom_msg_rem.mousePressed(this.rem_msg)
        this.dom_msg_edit = createButton("✏️ Edit message")
        this.dom_msg_edit.class("context_button")
        this.dom_msg_edit.parent(this.dom_menu_bg)
        this.dom_msg_edit.mousePressed(this.show_msg_edit)
        if (msg_list.msgs[this.curr_id].has_header) {
            this.dom_author_edit = createButton("👤 Edit author")
            this.dom_author_edit.class("context_button")
            this.dom_author_edit.parent(this.dom_menu_bg)
            this.dom_author_edit.mousePressed(this.show_author_preset)
            this.dom_time_edit = createButton("🕑 Edit timestamp")
            this.dom_time_edit.class("context_button")
            this.dom_time_edit.parent(this.dom_menu_bg)
            this.dom_time_edit.mousePressed(this.show_timestamp_edit)
        }
        this.dom_media_edit = createButton("📎 Edit attachments")
        this.dom_media_edit.class("context_button")
        this.dom_media_edit.parent(this.dom_menu_bg)
        this.dom_media_edit.mousePressed(this.show_media_edit)
    }

    show_sysedit(msg_id) {
        this.curr_id = msg_id
        this.showing = true

        this.dom_menu_bg = createDiv()
        this.dom_menu_bg.class("context_menu")
        this.dom_menu_bg.parent(bg)
        this.x = mouseX+4
        this.y = mouseY+4
        this.dom_msg_new = createButton("✳️ Add element below...")
        this.dom_msg_new.class("context_button")
        this.dom_msg_new.parent(this.dom_menu_bg)
        this.dom_msg_new.mousePressed(this.new_elem_below)
        this.dom_msg_rem = createButton("❌ Remove element")
        this.dom_msg_rem.class("context_button")
        this.dom_msg_rem.parent(this.dom_menu_bg)
        this.dom_msg_rem.mousePressed(this.rem_msg)
        this.dom_menu_bg.position(this.x, this.y, 'fixed')
        this.dom_msg_new = createButton("⚙️ Change type")
        this.dom_msg_new.class("context_button")
        this.dom_msg_new.parent(this.dom_menu_bg)
        this.dom_msg_new.mousePressed(this.show_sysmsg_edit)
        this.dom_msg_new = createButton("✏️ Edit contents...")
        this.dom_msg_new.class("context_button")
        this.dom_msg_new.parent(this.dom_menu_bg)
        this.dom_msg_new.mousePressed(this.show_sysmsg_val)
    }

    new_elem_below() {
        c_menu.dom_menu_bg.remove()

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')
        c_menu.dom_msg_new = createButton("💬 Default message")
        c_menu.dom_msg_new.class("context_button")
        c_menu.dom_msg_new.parent(c_menu.dom_menu_bg)
        c_menu.dom_msg_new.mousePressed(c_menu.new_msg_below)
        if (msg_list.msgs[c_menu.curr_id].constructor.name === 'EMessage') {
            c_menu.dom_msg_new = createButton("⬇️ Message from same author")
            c_menu.dom_msg_new.class("context_button")
            c_menu.dom_msg_new.parent(c_menu.dom_menu_bg)
            c_menu.dom_msg_new.mousePressed(c_menu.new_msg_same)
        }
        c_menu.dom_msg_new = createButton("ℹ️ Discord info UI")
        c_menu.dom_msg_new.class("context_button")
        c_menu.dom_msg_new.parent(c_menu.dom_menu_bg)
        c_menu.dom_msg_new.mousePressed(c_menu.new_dcord_info)
    }

    new_msg_below() {
        msg_list.add(new EMessage(), c_menu.curr_id+1)
        c_menu.hide()
    }

    new_msg_same() {
        let m = new EMessage()
        m.author = msg_list.msgs[c_menu.curr_id].author

        msg_list.add(m, c_menu.curr_id+1)
        c_menu.hide()
    }

    new_dcord_info() {
        msg_list.add(new ESystem(), c_menu.curr_id+1)
        c_menu.hide()
    }

    rem_msg() {
        msg_list.remove(c_menu.curr_id)
        c_menu.hide()
    }

    show_sysmsg_edit() {
        if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()
        let curr_msg = msg_list.msgs[c_menu.curr_id]

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')
        c_menu.popup_sysmsg_edit = createSelect()
        c_menu.popup_sysmsg_edit.class("popup_select")
        c_menu.popup_sysmsg_edit.option("Pinned message")
        c_menu.popup_sysmsg_edit.parent(c_menu.dom_menu_bg)
        c_menu.popup_sysmsg_edit.selected(c_menu.popup_sysmsg_edit.elt[curr_msg.type].value)
        c_menu.popup_sysmsg_edit.changed(c_menu.hide_sysmsg_edit)

        c_menu.popup_done = createButton("❎ Cancel")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.cancel)
    }

    hide_sysmsg_edit() {
        msg_list.msgs[c_menu.curr_id].type = c_menu.popup_media_edit.elt.selectedIndex
        c_menu.hide()
    }

    show_sysmsg_val() {
        let type = msg_list.msgs[c_menu.curr_id].type
        if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')

        switch(type) {
            case SystemMsgTypes.PIN:
                c_menu.popup_author_preset = createSelect()
                c_menu.popup_author_preset.style("display", "block")
                c_menu.popup_author_preset.class("popup_select")
                var i = 0
                for (var a of authors) {
                    c_menu.popup_author_preset.option(i + " - " + a.name)
                    i++
                }
                createSpan("Who pinned? ").parent(c_menu.dom_menu_bg)
                c_menu.popup_author_preset.style("display", "inline")
                c_menu.popup_author_preset.parent(c_menu.dom_menu_bg)
                c_menu.popup_author_preset.selected(c_menu.popup_author_preset.elt[authors.indexOf(msg_list.msgs[c_menu.curr_id].values["Author"])].value)
                break;
        }

        createElement("br").parent(c_menu.dom_menu_bg)
        c_menu.popup_done = createButton("✅ Done")
        c_menu.popup_done.style("display", "inline")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_sysmsg_val)
        
        c_menu.popup_new_preset = createButton("✳️ New author...")
        c_menu.popup_new_preset.style("display", "inline")
        c_menu.popup_new_preset.class("context_button")
        c_menu.popup_new_preset.parent(c_menu.dom_menu_bg)
        c_menu.popup_new_preset.mousePressed(c_menu.show_author_edit)
    }

    hide_sysmsg_val() {
        msg_list.msgs[c_menu.curr_id].values["Author"] = authors[c_menu.popup_author_preset.elt.selectedIndex]
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
        
        c_menu.popup_done = createButton("✅ Done")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_msg_edit)
    }

    hide_msg_edit() {
        msg_list.msgs[c_menu.curr_id].content_text = c_menu.popup_msg_edit.value()
        c_menu.hide()
    }

    show_author_preset() {if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')
        c_menu.popup_author_preset = createSelect()
        c_menu.popup_author_preset.style("display", "block")
        c_menu.popup_author_preset.class("popup_select")
        var i = 0
        for (var a of authors) {
            c_menu.popup_author_preset.option(i + " - " + a.name)
            i++
        }
        createSpan("Preset authors: ").parent(c_menu.dom_menu_bg)
        c_menu.popup_author_preset.style("display", "inline")
        c_menu.popup_author_preset.parent(c_menu.dom_menu_bg)
        c_menu.popup_author_preset.selected(c_menu.popup_author_preset.elt[authors.indexOf(msg_list.msgs[c_menu.curr_id].author)].value)
        
        createElement("br").parent(c_menu.dom_menu_bg)
        c_menu.popup_done = createButton("✅ Done")
        c_menu.popup_done.style("display", "inline")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_author_preset)
        
        c_menu.popup_new_preset = createButton("✳️ New author...")
        c_menu.popup_new_preset.style("display", "inline")
        c_menu.popup_new_preset.class("context_button")
        c_menu.popup_new_preset.parent(c_menu.dom_menu_bg)
        c_menu.popup_new_preset.mousePressed(c_menu.show_author_edit)
    }

    hide_author_preset() {
        msg_list.msgs[c_menu.curr_id].author = authors[c_menu.popup_author_preset.elt.selectedIndex]
        c_menu.hide()
    }

    show_author_edit() {
        if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()
        let curr_author = msg_list.msgs[c_menu.curr_id].author
        if (!curr_author) curr_author = msg_list.msgs[c_menu.curr_id].values["Author"]

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')
        c_menu.popup_img_upload = createFileInput(c_menu.set_temp_upload)
        c_menu.popup_img_upload.class("popup_filein")
        createSpan("Profile pic: ").parent(c_menu.dom_menu_bg)
        c_menu.popup_img_upload.parent(c_menu.dom_menu_bg)
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
        
        createElement("br").parent(c_menu.dom_menu_bg)
        c_menu.popup_done = createButton("✅ Done")
        c_menu.popup_done.style("display", "inline")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_author_edit)
        c_menu.popup_cancel = createButton("❎ Cancel")
        c_menu.popup_cancel.style("display", "inline")
        c_menu.popup_cancel.class("context_button")
        c_menu.popup_cancel.parent(c_menu.dom_menu_bg)
        c_menu.popup_cancel.mousePressed(c_menu.cancel)
    }

    cancel() {
        c_menu.hide()
    }
    
    hide_author_edit() {
        let a = new EAuthor(
            c_menu.popup_name_edit.value(),
            c_menu.popup_tag_edit.elt.selectedIndex,
            c_menu.popup_role_color.color(),
            c_menu.curr_uploaded
        )
        authors.push(a)
        let m = msg_list.msgs[c_menu.curr_id]
        if (m.author != undefined) m.author = a
        else m.values["Author"] = a

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
        
        c_menu.popup_done = createButton("✅ Done")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_timestamp_edit)
    }

    hide_timestamp_edit() {
        msg_list.msgs[c_menu.curr_id].date = c_menu.popup_time_edit.elt.valueAsDate
        c_menu.hide()
    }

    show_media_edit() {
        if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()
        let curr_msg = msg_list.msgs[c_menu.curr_id]

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')
        c_menu.popup_media_edit = createSelect()
        c_menu.popup_media_edit.class("popup_select")
        c_menu.popup_media_edit.option("No attachment")
        c_menu.popup_media_edit.option("Picture")
        c_menu.popup_media_edit.parent(c_menu.dom_menu_bg)
        c_menu.popup_media_edit.selected(c_menu.popup_media_edit.elt[curr_msg.media.type].value)
        c_menu.popup_media_edit.changed(c_menu.hide_media_edit)
        c_menu.popup_media_val = createButton("✏️ Edit media contents...")
        c_menu.popup_media_val.class("context_button")
        c_menu.popup_media_val.parent(c_menu.dom_menu_bg)
        c_menu.popup_media_val.mousePressed(c_menu.show_media_val)

        c_menu.popup_done = createButton("❎ Cancel")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.cancel)
    }

    hide_media_edit() {
        msg_list.msgs[c_menu.curr_id].media.type = c_menu.popup_media_edit.elt.selectedIndex
        c_menu.hide()
    }

    show_media_val() {
        let type = msg_list.msgs[c_menu.curr_id].media.type
        if (!c_menu.showing || c_menu.curr_id > msg_list.nMsgs) return
        c_menu.dom_menu_bg.remove()

        c_menu.dom_menu_bg = createDiv()
        c_menu.dom_menu_bg.class("context_menu")
        c_menu.dom_menu_bg.parent(bg)
        c_menu.dom_menu_bg.position(c_menu.x, c_menu.y, 'fixed')

        switch(type) {
            case MediaTypes.EMPTY:
                let p = createP("No attachment! Try choosing<br>another media type.")
                p.style("fontSize", "12px")
                p.parent(c_menu.dom_menu_bg)
                break;
            
            case MediaTypes.IMAGE:
                c_menu.popup_img_upload = createFileInput(c_menu.set_temp_upload)
                c_menu.popup_img_upload.class("popup_filein")
                createSpan("Attached pic: ").parent(c_menu.dom_menu_bg)
                c_menu.popup_img_upload.parent(c_menu.dom_menu_bg)
                createElement("br").parent(c_menu.dom_menu_bg)
                break;
        }

        c_menu.popup_done = createButton("✅ Done")
        c_menu.popup_done.class("context_button")
        c_menu.popup_done.parent(c_menu.dom_menu_bg)
        c_menu.popup_done.mousePressed(c_menu.hide_media_val)
    }

    hide_media_val() {
        let type = msg_list.msgs[c_menu.curr_id].media.type
        switch(type) {
            case MediaTypes.EMPTY:
                break;
            
            case MediaTypes.IMAGE:
                if (c_menu.curr_uploaded)
                    msg_list.msgs[c_menu.curr_id].media.values["PicURL"] = c_menu.curr_uploaded
                break;
        }
        c_menu.hide()
    }

    hide() {
        if (this.dom_menu_bg) this.dom_menu_bg.remove()
        msg_list.undraw_all()
        msg_list.redraw_all()
        
        this.showing = false
        this.curr_id = undefined
        this.curr_uploaded = undefined
    }

    set_temp_upload(file) {
        if (file != undefined && file.type === 'image') {
            c_menu.curr_uploaded = file.data
          } else {
            c_menu.curr_uploaded = "/assets/unk.webp"
          }
    }
}