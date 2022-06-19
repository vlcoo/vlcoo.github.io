let dom_img_in
let dom_width10_check
let dom_run_button
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
    dom_width10_check = createCheckbox("Canvas is of width 10 instead of 16")

    dom_img_in.parent("main")
    createSpan("&nbsp;&nbsp;").parent("main")
    dom_run_button.parent("main")
    createP().parent("main")
    dom_width10_check.parent("main")
    createP().parent("main")
}


function draw() {
    if (go && curr_uploaded && curr_uploaded.height != 1 && curr_uploaded.width != 1) {
        print("a")
        to_file(convert(dom_width10_check.checked() ? 10 : 16))
        go = false
    }
}


function to_file(seq) {
    let writer = createWriter("img2seq.moai")
    writer.write(seq)
    alert("Done! Download the sequence file and [↑ Load] it in the website.")
    writer.close()
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
            s += comp_col(p) + "|"
        }
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
    if (pA[3] < 127) name = "_pause.png"
    else {
        for (let [key, value] of Object.entries((c))) {
            pB = value
            res = similarity(pA, pB)
            if (res < m) {
                name = key
                m = res
            }
        }
    }
    return name.replace(".png", "")
}


c = {'💨.png': [71, 112, 76], 'terraria_reforge.png': [54, 51, 44], 'gdcrash.png': [170, 170, 170],
    'shaker.png': [253, 181, 76], 'amongdrip.png': [162, 150, 154], 'otto_off.png': [51, 51, 51],
    'ook.png': [254, 254, 254], 'celeste_spring.png': [162, 50, 0], 'bruh.png': [95, 100, 95],
    'mariopaint_flower.png': [248, 128, 0], 'adofaikick.png': [102, 51, 51], 'perfectfail.png': [255, 255, 255],
    'tab_rows.png': [44, 78, 218], 'eight.png': [141, 141, 141], 'whipcrack.png': [213, 200, 179],
    'tonk.png': [255, 0, 0], 'sm64_painting.png': [51, 0, 0], 'karateman_throw.png': [254, 254, 254],
    '_pause.png': [0, 0, 0], 'isaac_dead.png': [8, 0, 1], '🚨.png': [71, 112, 76], 'hoenn.png': [64, 64, 64],
    'tab_rooms.png': [215, 184, 16], 'ultrainstinct.png': [10, 10, 10], '🚫.png': [71, 112, 76],
    'isaac_hurt.png': [12, 0, 0], 'tab_actions.png': [196, 67, 177], 'ride2.png': [252, 231, 208],
    '🎺.png': [71, 112, 76], '🌟.png': [71, 112, 76], 'smw_kick.png': [255, 255, 255],
    'noteblock_bit.png': [23, 193, 67], 'karateman_hit.png': [253, 253, 253], 'noteblock_click.png': [205, 231, 231],
    'celeste_diamond.png': [255, 255, 255], 'fnf_death.png': [254, 254, 254], 'e.png': [198, 54, 71],
    '🦀.png': [71, 112, 76], 'karateman_offbeat.png': [254, 254, 254], '💿.png': [71, 112, 76],
    '🎉.png': [71, 112, 76], 'smm_scream.png': [3, 0, 0], 'bong.png': [53, 56, 153],
    'karateman_bulb.png': [254, 244, 156], 'gun.png': [153, 169, 179], 'skipshot.png': [171, 140, 124],
    'morshu.png': [16, 16, 16], 'gd_diamonds.png': [76, 105, 113], 'noteblock_bass.png': [171, 138, 88],
    'tab_sounds.png': [215, 35, 51], 'otto_happy.png': [51, 51, 51], 'pan.png': [59, 59, 59],
    'mariopaint_gameboy.png': [132, 132, 132], 'oof.png': [251, 251, 13], 'isaac_mantle.png': [219, 231, 251],
    'smw_spinjump.png': [80, 0, 0], 'undertale_crack.png': [254, 0, 0], 'gd_orbs.png': [76, 105, 113],
    'op.png': [158, 107, 88], 'rdmistake.png': [255, 8, 8], 'noteblock_harp.png': [40, 39, 32],
    'explosion.png': [234, 198, 83], 'bwomp.png': [0, 174, 74], 'buttonpop.png': [244, 176, 164],
    '👏.png': [71, 112, 76], 'undertale_hit.png': [254, 0, 0], 'noteblock_chime.png': [124, 165, 244],
    'americano.png': [222, 169, 157], 'subaluwa.png': [40, 20, 30], 'smw_coin.png': [247, 212, 25],
    '🍕.png': [71, 112, 76], 'minecraft_bell.png': [140, 140, 140], 'smw_1up.png': [255, 255, 255],
    'celeste_dash.png': [153, 74, 50], 'otto_on.png': [51, 51, 51], '🦢.png': [71, 112, 76], '🐶.png': [71, 112, 76],
    'buzzer.png': [220, 45, 67], 'mariopaint_star.png': [255, 255, 0], 'minecraft_explosion.png': [216, 46, 26],
    'midspin.png': [216, 182, 120], 'noteblock_pling.png': [69, 67, 44], 'mariopaint_swan.png': [189, 189, 189],
    'granddad.png': [255, 255, 255], 'adofaicymbal.png': [135, 41, 209], 'BABA.png': [255, 255, 255],
    'fnf_right.png': [248, 56, 62], 'noteblock_banjo.png': [185, 162, 16], 'gd_coin.png': [76, 105, 113],
    'terraria_pot.png': [20, 40, 64], '🏏.png': [71, 112, 76], 'mariopaint_luigi.png': [0, 82, 33],
    '🤬.png': [71, 112, 76], 'hehehehaw.png': [254, 254, 254], 'smw_stomp.png': [186, 115, 37],
    'yahoo.png': [97, 35, 33], 'YOU.png': [228, 82, 58], 'celeste_death.png': [255, 79, 79], 'amongus.png': [1, 0, 0],
    'cowbell.png': [80, 65, 46], 'mariopaint_cat.png': [248, 192, 128], 'toby.png': [255, 255, 255],
    'gnome.png': [203, 0, 0], 'amogus.png': [216, 236, 250], 'necoarc.png': [248, 215, 176],
    'noteblock_xylophone.png': [197, 193, 164], '🌄.png': [71, 112, 76], 'otto_stress.png': [62, 4, 50],
    '🪘.png': [71, 112, 76], 'mariopaint_mario.png': [82, 0, 0], '21.png': [51, 0, 0],
    'undertale_encounter.png': [239, 239, 239], 'fnf_down.png': [1, 254, 254], 'tab_decorations.png': [0, 195, 88],
    'megalovania.png': [255, 255, 255], '💀.png': [71, 112, 76], '!startpos.png': [59, 136, 195],
    'gaster.png': [51, 0, 0],
    '🥁.png': [71, 112, 76], 'whatsapp.png': [13, 193, 67], 'flipnote.png': [255, 100, 4],
    'noteblock_bell.png': [249, 250, 185], 'sm64_hurt.png': [44, 8, 8], '💢.png': [71, 112, 76],
    'slip.png': [255, 255, 255], 'yoda.png': [0, 0, 1], 'boom.png': [40, 38, 38], '👽.png': [71, 112, 76],
    'noteblock_snare.png': [226, 223, 183], 'sidestick.png': [238, 193, 118], '🔔.png': [71, 112, 76],
    'smw_stomp2.png': [198, 43, 19], 'bup.png': [253, 220, 166], 'hitmarker.png': [255, 255, 255],
    'fnf_up.png': [19, 250, 5], 'gdcrash_orbs.png': [252, 255, 254], 'fnf_left.png': [194, 75, 153],
    'hammer.png': [53, 0, 0], 'samurai.png': [237, 237, 7], 'thwomp.png': [5, 40, 77], '🎻.png': [71, 112, 76],
    'builttoscale.png': [230, 230, 230], 'preecho.png': [0, 1, 0], 'choruskid.png': [254, 254, 254],
    '❗.png': [71, 112, 76], 'stopposting.png': [51, 0, 0], 'SLAM.png': [164, 111, 86], '🦴.png': [71, 112, 76],
    'mariopaint_dog.png': [248, 248, 248], 'terraria_star.png': [76, 56, 5], 'DEFEAT.png': [130, 38, 28],
    'mariopaint_plane.png': [247, 247, 247], 'smw_yoshi.png': [248, 248, 248], '📲.png': [71, 112, 76],
    'mariopaint_baby.png': [248, 192, 128], '👌.png': [71, 112, 76], 'mariopaint_car.png': [248, 128, 0]}
