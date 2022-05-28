class EAuthor {
    constructor(name = "?????", tag = AuthorTypes.SYSTEM, role_color = color(245, 199, 15), pfp="/assets/old_favicon_index.ico") {
        this.name = name
        this.type = tag
        this.role_color = role_color
        this.pfp = pfp
    }
}