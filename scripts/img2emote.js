let dom_img_in
let dom_width_sel
let dom_run_button
let dom_out_textarea
let curr_uploaded
let go = false


function setup() {
    noCanvas()
    background(color(0, 0, 0))
    dom_img_in = createFileInput(loadImg)
    dom_img_in.id("img_in")
    dom_img_in.style("width", "45%")
    dom_img_in.style("padding", "8 0 0 8")
    dom_img_in.attribute("accept", "image/*")
    dom_run_button = createButton("")
    let b_icon = createImg("../assets/icon_play.png")
    b_icon.class("icon")
    dom_run_button.mouseClicked(main)
    dom_run_button.style("vertical-align", "top")
    b_icon.parent(dom_run_button)
    dom_width_sel = createInput(26).style("width", "128px")
    dom_width_sel.attribute("type", "number")

    dom_img_in.parent("main")
    createSpan("&nbsp;&nbsp;").parent("main")
    dom_run_button.parent("main")
    createP().parent("main")
    createSpan("Width of the message (↑ number = ↑ resolution, but may not fit on screen): ").parent("main")
    dom_width_sel.parent("main")
    createP().parent("main")

    dom_out_textarea = createElement("textarea")
    dom_out_textarea.attribute("readonly", "")
    dom_out_textarea.style("display", "inline-block")
    dom_out_textarea.style("width", "85%")
    dom_out_textarea.style("height", "128px")
    dom_out_textarea.attribute("placeholder", "Output")
    dom_out_textarea.parent("main")

    createP().parent("main")
}


function draw() {
    if (go && curr_uploaded && curr_uploaded.height != 1 && curr_uploaded.width != 1) {
        to_file(convert(dom_width_sel.value()))
        go = false
    }
}


function to_file(seq) {
    dom_out_textarea.value(seq)
    navigator.clipboard.writeText(seq).then(function() {
            alert("Done! Output copied to clipboard - now paste it into your Discord message.");
        }, function(err) {
            alert("Done! But could not copy text automatically. Check the output box yourself.");
        }
    );
}


function convert(width) {
    let im = curr_uploaded
    im.resize(width, 0)
    contrast(im)
    let s = ""
    im.loadPixels()

    for (let i = 0; i < im.height; i++) {
        for (let j = 0; j < im.width; j++) {
            let p = im.get(j, i)
            s += comp_col(p) + ""
        }
        s += "\n"
    }

    return s
}


function main() {go = true}


function contrast(img) {
    img.loadPixels();
    for (let x = 0; x < img.width; x +=1) {
        for (let y = 0; y < img.height; y +=1) {
            let c = img.get(x,y);
            let contrast = 50;
            let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
            if (x === 0 && y === 0) {
                print(factor);
            }
            let nR = constrain(factor*(red(c)-128) + 128, 0, 255);
            let nG = constrain(factor*(green(c)-128) + 128, 0, 255);
            let nB = constrain(factor*(blue(c)-128) + 128, 0, 255);
            let nC = color(nR,nG,nB);
            img.set(x,y,nC);
        }
    }
    img.updatePixels();
}


function loadImg() {
    let file = dom_img_in.elt.files[0]
    let url = URL.createObjectURL(file)
    curr_uploaded = loadImage(url)
}


function similarity(c1, c2) {
    r1 = c1[0]
    g1 = c1[1]
    b1 = c1[2]
    r2 = c2[0]
    g2 = c2[1]
    b2 = c2[2]

    return sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2)
}


function comp_col(pA) {
    let m = 10000000
    let name = ""
    print(pA)
    for (let [key, value] of Object.entries((c))) {
        pB = value
        res = similarity(pA, pB)
        if (res < m) {
            name = key
            m = res
        }
    }
    return name
}


c = {':black_large_square:': [0, 0, 0], ':white_large_square:': [255, 255, 255], ':orange_square:': [244, 144, 12],
    ':blue_square:': [85, 172, 238], ':red_square:': [221, 46, 68], ':brown_square:': [193, 105, 79],
    ':purple_square:': [170, 142, 214], ':green_square:': [120, 177, 89], ':yellow_square:': [253, 203, 88]}
