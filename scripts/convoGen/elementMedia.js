class EMedia {
    constructor(parent_line) {
        this.type = MediaTypes.EMPTY
        this.values = {
            "PicURL": "/assets/metatag_banner.png",
            "VidTitle": "cool speedrun.webm",
            "VidSubtitle": "1.85 MB",
            "EmbedColor": color(120, 255, 120),
            "EmbedTitle": "Generic embed",
            "EmbedDesc": "No content yet. Click to edit...",
            "EmbedSubtA": "",
            "EmbedSubdescA": "",
            "EmbedSubtB": "",
            "EmbedSubdescB": "",
            "EmbedFooter": "",
        }
        this.parent = parent_line
    }

    show() {
        switch (this.type) {
            case MediaTypes.EMPTY:
                break
            
            case MediaTypes.IMAGE:
                if (this.values["PicURL"] == -1) this.values["PicURL"] = "/assets/metatag_banner.png"
                this.dom_media = createImg(this.values["PicURL"])
                this.dom_media.class("media_img")
                this.dom_media.parent(this.parent.dom_message)
                break
            
            case MediaTypes.VIDEO:
                if (this.values["PicURL"] == -1) this.values["PicURL"] = "/assets/metatag_banner.png"
                this.dom_media = createDiv()
                this.dom_media.class("media_img")
                this.dom_media.parent(this.parent.dom_message)
                this.aux_img = createImg(this.values["PicURL"])
                this.aux_img.class("media_img")
                this.aux_img.parent(this.dom_media)
                this.dom_media_overlay = createDiv()
                this.dom_media_overlay.class("media_overlay")
                this.dom_media_overlay.parent(this.dom_media)
                this.dom_media_overlay.position(0, 0)
                this.dom_overlay_title = createP("<b>" + this.values["VidTitle"] +"</b>")
                this.dom_overlay_title.parent(this.dom_media_overlay)
                this.dom_overlay_title.class("media_overlay_title")
                this.dom_overlay_subtitle = createP(this.values["VidSubtitle"])
                this.dom_overlay_subtitle.parent(this.dom_media_overlay)
                this.dom_overlay_subtitle.class("media_overlay_subtitle")
                break
            
            case MediaTypes.EMBED:
                this.dom_media = createDiv()
                this.dom_media.class("media_embed")
                this.dom_media.parent(this.parent.dom_message)
                this.dom_media.style(
                    "background-image",
                    "linear-gradient(90deg, " + this.values["EmbedColor"] + " 4px, #0000 1px"
                )
                let dom_coll = createDiv()
                dom_coll.parent(this.dom_media)
                let dom_colr = createDiv()
                dom_colr.class("embed_colr")
                dom_colr.parent(this.dom_media)
                
                this.embed_title = createP(this.values["EmbedTitle"])
                this.embed_title.class("embed_title")
                this.embed_title.parent(dom_coll)
                this.embed_desc = createP(this.values["EmbedDesc"].replaceAll("\n", "<br>"))
                this.embed_desc.class("embed_desc")
                this.embed_desc.parent(dom_coll)
                if (this.values["EmbedSubtA"] !== "") {
                    this.embed_subtA = createP(this.values["EmbedSubtA"])
                    this.embed_subtA.class("embed_subt")
                    this.embed_subtA.parent(dom_coll)
                    this.embed_subdescA = createP(this.values["EmbedSubdescA"].replaceAll("\n", "<br>"))
                    this.embed_subdescA.class("embed_subdesc")
                    this.embed_subdescA.parent(dom_coll)
                }
                if (this.values["EmbedSubtB"] !== "") {
                    this.embed_subtB = createP(this.values["EmbedSubtB"])
                    this.embed_subtB.class("embed_subt")
                    this.embed_subtB.parent(dom_coll)
                    this.embed_subdescB = createP(this.values["EmbedSubdescB"].replaceAll("\n", "<br>"))
                    this.embed_subdescB.class("embed_subdesc")
                    this.embed_subdescB.parent(dom_coll)
                }
                this.embed_footer = createP(this.values["EmbedFooter"])
                this.embed_footer.class("embed_footer")
                this.embed_footer.parent(dom_coll)
                if (this.values["PicURL"] != -1) {
                    this.embed_img = createImg(this.values["PicURL"])
                    this.embed_img.class("embed_img")
                    this.embed_img.parent(dom_colr)
                }
                break
        }
    }
}