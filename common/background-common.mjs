
// configuration
const proxy_host = ".proxy.lib.uwaterloo.ca";

// Function to translate the URL to the proxy URL. Returns null if the URL can't be translated.
function translateURL(fullurl) {
    // make sure URL is defined
    if (!fullurl) {
        return null;
    }

    let url = fullurl.split("://")[1]; // remove protocol from URL
    if (!url) {
        // make sure the URL has a protocol
        console.error("no protocol in the url", fullurl);
        return null;
    }
    let url_parts = url.split("/"); // split by /
    let hostname = url_parts.shift(); // hostname needs to be changed

    // check if it is already a proxy link, null indicates nothing to translate
    if (hostname.includes(proxy_host)) {
        console.warn("attempted to access the proxy when already using a proxy ling");
        return null;
    }

    // construct new URL
    let res = `https://${hostname.replaceAll(".","-")}${proxy_host}/${url_parts.join("/")}`;
    return res;
}

// Listener function to create a new tab with the translated URL
function listener(br, tab) {
    // new URL
    let proxyURL = translateURL(tab.url);

    // do nothing if the link couldn't be translated or is already a proxy link
    if (!proxyURL) {
        return;
    }

    br.tabs.create({
        active: true,
        openerTabId: tab.id,
        index: tab.index + 1,
        url: proxyURL,
    })
    // Note: automatically uses the same tab group UNLESS current tab is the last in the group
}

// Function to call on startup to register the button listener
export function registerListener(br, act) {
    act.onClicked.addListener(tab => listener(br, tab));
}
