let cnv
let colors
let fonts
let pfps
let img_pfp_mask
let msg

const AuthorTypes = Object.freeze({
    USER: 0,
    BOT: 1,
    SYSTEM: 2,
})

function preload() {
    setup_fonts()
    setup_images()
}

function setup() {
    setup_colors()
    setup_canvas()

    textFont(fonts[0])
    textSize(16)
    imageMode(CENTER)

    msg = new EMessage()
}

function draw() {
    background(colors["bg_dark"])
    
    msg.on_draw(32)
}

function allDone() {
    saveCanvas(cnv, 'fakeConversation', 'png')
}

function setup_colors() {
    colors = {
        "bg_light": color(255, 255, 255),
        "bg_dark": color(54, 57, 63),
        "maintext_light": color(220, 221, 222),
        "maintext_dark": color(46, 51, 56),
        "dimtext_light": color(124, 127, 131),
        "dimtext_dark": color(151, 157, 164),
    }
}

function setup_fonts() {
    fonts = [
        loadFont("/assets/whitneymedium.otf"),
        loadFont("/assets/whitneybold.otf"),
    ]
}

function setup_images() {
    pfps = {
        "boto_o": loadImage("/assets/boto_o.png"),
    }
    img_pfp_mask = loadImage("/assets/pfp_mask.png")
}

function setup_canvas() {
    cnv = createCanvas(724, 420)
    cnv.parent("main")
    cnv.style('margin-left', 'auto')
    cnv.style('margin-right', 'auto')
    cnv.style('display', 'block')
    cnv.style('margin-bottom', '18px')
    cnv.style('max-width', '100%')
    cnv.style('object-fit', 'contain')
    cnv.style('box-shadow', '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4)')
    cnv.style('border-radius', '10px')
}
