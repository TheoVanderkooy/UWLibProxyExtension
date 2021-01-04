function setTestText(text) {
    document.getElementById("testoutput").textContent = text;
}

var x = Math.floor(Math.random() * 1000);
document.addEventListener("DOMContentLoaded", () => setTestText("testing " + x));
