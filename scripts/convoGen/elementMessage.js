class EMessage {
    constructor() {
        this.author = "boto_o"
        this.pfp = pfps[this.author]
        this.pfp.resize(48, 48)
        this.pfp.mask(img_pfp_mask)
        this.author_type = AuthorTypes.USER
        this.content = "I'm not real"
        this.media = undefined
    }

    on_draw(y_pos) {
        image(this.pfp, 42, y_pos + 2)
        fill(colors["maintext_light"])
        textFont(fonts[1])
        text(this.author, 78, y_pos)
        textFont(fonts[0])
        text(this.content, 78, y_pos + 22)
    }
}