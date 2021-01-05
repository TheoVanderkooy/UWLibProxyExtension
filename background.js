
// configuration
const proxy_host = ".proxy.lib.uwaterloo.ca";


function translateURL(url) {
    url = url.split("://")[1]; // remove protocol from URL
    let url_parts = url.split("/"); // split by /
    let hostname = url_parts.shift(); // hostname needs to be changed

    // check if it is already a proxy link, null indicates nothing to translate
    if (hostname.includes(proxy_host)) {
        return null;
    }

    // construct new URL
    let res = "https://" + hostname.replaceAll(".","-") + proxy_host + "/" + url_parts.join("/");
    return res;
}


chrome.browserAction.onClicked.addListener(tab => {
    // new URL
    let proxyURL = translateURL(tab.url);

    // early return if we're already in the proxy
    if (!proxyURL) {
        alert("Already using the UWaterloo proxy.");
        return;
    }

    // open proxy in a new tab
    chrome.tabs.create({
        active: true,
        selected: true,
        openerTabId: tab.id,
        index: tab.index + 1,
        url: proxyURL,
    })
});
