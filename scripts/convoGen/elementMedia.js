class EMedia {
    constructor(parent_line) {
        this.type = MediaTypes.EMPTY
        this.values = {
            "PicURL": "/assets/metatag_banner.png",
        }
        this.parent = parent_line
    }

    show() {
        switch (this.type) {
            case MediaTypes.EMPTY:
                break
            
            case MediaTypes.IMAGE:
                this.dom_media = createImg(this.values["PicURL"])
                this.dom_media.class("media_img")
                this.dom_media.parent(this.parent.dom_message)
                break
        }
    }
}