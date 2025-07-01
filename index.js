function get_OS() {
    let userAgent = window.navigator.userAgent;
    let os = "";

    if (userAgent.indexOf("Win") != -1) os = "windows";
    if (userAgent.indexOf("Mac") != -1) os = "macos";
    if (userAgent.indexOf("X11") != -1) os = "linux";
    if (userAgent.indexOf("Linux") != -1) os = "linux";

    return os
}

async function get_version_name() {
    const json = await fetch("https://api.github.com/repos/ikemen-engine/Ikemen-GO/releases/latest").then((response) => response.json())
    return json.name;
}

async function set_release_data() {
    let name = await get_version_name()
    let os = get_OS();
    let release_url = "https://github.com/ikemen-engine/Ikemen-GO/releases/latest";
    let nightly_url = "https://github.com/ikemen-engine/Ikemen-GO/releases/tag/nightly";

    if (os != "") {
        release_url = "https://github.com/ikemen-engine/Ikemen-GO/releases/download/" + name + "/Ikemen_GO-" + name + "-" + os + ".zip";
        nightly_url = "https://github.com/ikemen-engine/Ikemen-GO/releases/download/nightly/Ikemen_GO-dev-" + os + ".zip";
    }

    document.getElementsByClassName("releases-button")[0].href = release_url;
    document.getElementsByClassName("nightly-button")[0].href = nightly_url;

    if (name[0] == "v") {name = name.slice(1)}
    document.getElementById("version").innerText = "Download latest version: " + name;
}

set_release_data()