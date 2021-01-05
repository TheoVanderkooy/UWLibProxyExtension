// function setTabURL() {
//     chrome.tabs.query( {
//             active: true,
//             currentWindow: true,
//             // lastFocusedWindow: true,
//         },
//         tabs => {
//             document.getElementById("testoutput").textContent = tabs[0].url;
//         });
// }
// document.addEventListener("DOMContentLoaded", setTabURL);

const proxy_host = ".proxy.lib.uwaterloo.ca";


function translateURL(url) {
    url = url.split("://")[1]; // remove protocol from URL
    let url_parts = url.split("/"); // split by /
    let hostname = url_parts.shift(); // hostname needs to be changed

    // check if it is already a proxy link, null indicates nothing to translate
    if (hostname.includes(proxy_host)) {
        return null;
    }

    // construct and return new URL
    let res = "https://" + hostname.replaceAll(".","-") + proxy_host + "/" + url_parts.join("/");

    return res;
}


chrome.browserAction.onClicked.addListener(tab => {
    // chrome.tabs.query( {
    //         active: true,
    //         currentWindow: true,
    //     },
    //     tabs => {
    //         var url = tabs[0].url;
    //         // alert(translateURL(url));
    //     });

    // new URL
    let proxyURL = translateURL(tab.url);

    // alert(proxyURL);

    // early return if we're already in the proxy
    if (!proxyURL) return;
    // TODO!!! maybe show an error message?

    chrome.tabs.create({
        active: true,
        selected: true,
        openerTabId: tab.id,
        index: tab.index + 1,
        url: proxyURL,
    })
});


// .proxy.lib.uwaterloo.ca
