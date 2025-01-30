// taking the picture and display
let choosePhoto = document.getElementById("choosePhoto")
let pickColor = document.getElementById("pickColor")
let inputFile = document.getElementById("inputFile")
let imageContainer = document.getElementById("imageContainer")
let colorDisplay = document.getElementById("colorDisplay")

choosePhoto.addEventListener("click",()=>{
    inputFile.click()
})

inputFile.addEventListener("change",()=>{
    let file = inputFile.files[0]
    if(file && file.type.startsWith("image/")){
        imageContainer.innerHTML = ""
        const image = document.createElement("img")
        image.src = URL.createObjectURL(file)
        image.style.width ="100%"
        image.style.height="100%"
        imageContainer.appendChild(image)
        
    }
    else{
        alert("insert only the image file")
    }
})


// displaying the copied text 

let paste1=document.getElementById("paste1")
let paste2=document.getElementById("paste2")
let copiedPara = document.getElementById("copiedPara")


// Copying the color code
const copyButton1 = document.getElementById("paste1");
const copyButton2 = document.getElementById("paste2");
const textInput1 = document.getElementById("rgb");
const textInput2 = document.getElementById("hex");

copyButton1.addEventListener("click", () => {
    const textToCopy = textInput1.value;

    navigator.clipboard.writeText(textToCopy).then(() => {
        copiedPara.style.display="block"
        setTimeout(()=>{
            copiedPara.style.display="none"
        },2000)

    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
});

copyButton2.addEventListener("click", () => {
    const textToCopy = textInput2.value;

    navigator.clipboard.writeText(textToCopy).then(() => {
            copiedPara.style.display="block"
    setTimeout(()=>{
        copiedPara.style.display="none"
    },2000)

    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
});

pickColor.addEventListener("click",()=>{
    if (!window.EyeDropper) {
        alert("EyeDropper API not supported.");
        return;
    }

    const eyeDropper = new EyeDropper();
    const openResult = eyeDropper.open();
    openResult.then(result => {
        color = result.sRGBHex
        textInput1.value = color
        textInput2.value = hexToRgb(color)
        colorDisplay.style.backgroundColor = color
    }).catch(error => {
        console.error("Error:", error);
    });
})

function hexToRgb(hex) {
    hex = hex.replace('#', '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
}