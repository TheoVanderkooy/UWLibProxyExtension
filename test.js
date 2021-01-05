function setTabURL() {

    chrome.tabs.query( {
            active: true,
            currentWindow: true,
            // lastFocusedWindow: true,
        },
        tabs => {
            document.getElementById("testoutput").textContent = tabs[0].url;
            // alert(tabs[0]?.url);
            // TODO -> parse out the URL and replace as appropriate
            // TODO on icon click event...
        });

}


document.addEventListener("DOMContentLoaded", setTabURL);
