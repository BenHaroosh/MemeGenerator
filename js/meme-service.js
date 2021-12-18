'use strict'

var gCanvas = []

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            color: '#FF0000',
            height: 0,
            width: 0
        },
        {
            txt: 'that\'s true!',
            size: 20,
            align: 'center',
            color: '#FF0000',
            height: 0,
            width: 0
        }
    ]
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getMeme() {
    return gMeme
}

function getImg() {
    const img = gImgsGallery.find(img => {
        return img.id === gMeme.selectedImgId
    })
    return img
}

function setLineTxt(txtVal) {
    var currMemeLine = gMeme.lines[gMeme.selectedLineIdx]
    currMemeLine.txt = txtVal
}

function setColorTxt(colorVal) {
    var currMemeLine = gMeme.lines[gMeme.selectedLineIdx]
    currMemeLine.color = colorVal
}

function changeFont(diff) {
    var currMemeLine = gMeme.lines[gMeme.selectedLineIdx]
    currMemeLine.size = currMemeLine.size + diff
}

function changeFocusLine(diff) {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx += diff
    }
}

function addLine() {
    const newLine = {
        txt: 'New Line',
        size: 20,
        align: 'center',
        color: '#FF0000',
        height: 0,
        width: 0
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function moveLine(diff) {
    gMeme.lines[gMeme.selectedLineIdx].height += diff
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx -= 1
}

function changeAlign(alignBy) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignBy
}

function saveMeme() {
    if (loadFromStorage('canvasDB')) gCanvas = loadFromStorage('canvasDB')
    gCanvas.push(gElCanvas.toDataURL())
    saveToStorage('canvasDB', gCanvas)

    // localStorage.setItem('canvasDB',gElCanvas.toDataURL());
}

function getSavedMemes() {
    if (loadFromStorage('canvasDB')) gCanvas = loadFromStorage('canvasDB')
    return gCanvas
}