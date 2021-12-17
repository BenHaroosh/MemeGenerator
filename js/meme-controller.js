'use strict'

var gElCanvas
var gCtx
var gTimeOutId;


function renderMeme() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    const imgMeme = getMeme()
    drawImg(imgMeme)
    const imgCurrLine = imgMeme.lines[imgMeme.selectedLineIdx]
    document.querySelector('.text-input').value = imgCurrLine.txt
    document.querySelector('.color-input').value = imgCurrLine.color
    if (gTimeOutId) clearTimeout(gTimeOutId)

    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}


function onSetImg(imgId) {
    setImg(imgId)
    document.querySelector('.editor-section').style.display = 'block'
    document.querySelector('.gallery-section').style.display = 'none'
    document.querySelector('.saved-gallery').style.display = 'none'
    document.querySelector('#search-choice').style.display = 'none'
    document.querySelector('.list-filters').style.display = 'none'
    renderMeme()
}

function onSetLineTxt(inpVal) {
    setLineTxt(inpVal)
    renderMeme()
}

function onSetColorTxt(colorVal) {
    setColorTxt(colorVal)
    renderMeme()
}

function onChangeFont(diff) {
    changeFont(diff)
    renderMeme()
}

function onChangeFocusLine(diff) {
    changeFocusLine(diff)
    renderMeme()
}

function onChangeAlign(alignBy) {
    changeAlign(alignBy)
    renderMeme()
}

function drawImg(imgMeme) {
    var img = new Image();
    var currImgPic = getImg()
    img.src = currImgPic.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(imgMeme)
    };
}

function drawText(imgMeme) {

    imgMeme.lines.map((imgCurrLine, idx) => {
        gCtx.font = `${imgCurrLine.size}pt IMPACT`;
        gCtx.textBaseline = 'top'
        gCtx.textAlign = imgCurrLine.align
        if (imgCurrLine.align === 'left') imgCurrLine.width = - (gElCanvas.width / 2)
        if (imgCurrLine.align === 'right') imgCurrLine.width = gElCanvas.width / 2
        if (imgCurrLine.align === 'center') imgCurrLine.width = 0
        gCtx.strokeStyle = imgCurrLine.color;
        if (idx === 0) {
            gCtx.strokeText(imgCurrLine.txt, gElCanvas.width / 2 + imgCurrLine.width, 50 + imgCurrLine.height);
        } else if (idx === 1) {
            gCtx.strokeText(imgCurrLine.txt, gElCanvas.width / 2 + imgCurrLine.width, gElCanvas.height - 50 + imgCurrLine.height);
        } else {
            gCtx.strokeText(imgCurrLine.txt, gElCanvas.width / 2 + imgCurrLine.width, gElCanvas.height / 2 + imgCurrLine.height);
        }
    })
}

function onMoveLine(diff) {
    moveLine(diff)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSaveMeme() {
    saveMeme()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    if (elContainer.offsetWidth < 500) elContainer.classList.add('main-layout')
    if (elContainer.offsetWidth > 500) elContainer.classList.remove('main-layout')
    gElCanvas.width = elContainer.offsetWidth
    if (gTimeOutId) clearTimeout(gTimeOutId)

    gTimeOutId = setTimeout(() => {
        renderMeme()
    }, 2000)
}

function onMoveNav() {
    document.querySelector('.list-header').classList.toggle('moving')
    document.querySelector('.toggle-menu-screen').classList.toggle('moving')
}


function onShowSavedMemes() {
    document.querySelector('.editor-section').style.display = 'none'
    document.querySelector('.gallery-section').style.display = 'none'
    document.querySelector('#search-choice').style.display = 'none'
    document.querySelector('.list-filters').style.display = 'none'
    document.querySelector('.saved-gallery').style.display = 'block'
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    if (!savedMemes || !savedMemes.length) {
        return document.querySelector('.saved-img-container').innerHTML = `<h2> No Saved Memes Yet! </h2>`
    }
    const strHtmls = savedMemes.map(savedMeme => {
        var strHtml = ''
        var img = new Image;
        img.src = savedMeme;
        return strHtml += `<img src="${img.src}" />`
    })
    document.querySelector('.saved-img-container').innerHTML = strHtmls.join('')
    if (gTimeOutId) clearTimeout(gTimeOutId)
}


function onShowGallery() {
    document.querySelector('.gallery-section').style.display = 'block'
    document.querySelector('#search-choice').style.display = 'block'
    document.querySelector('.list-filters').style.display = 'flex'
    document.querySelector('.editor-section').style.display = 'none'
    document.querySelector('.saved-gallery').style.display = 'none'
}

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}