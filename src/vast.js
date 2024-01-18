(function () {
    document.addEventListener("DOMContentLoaded", function() {
        beginVast()
    });
}());

function beginVast() {
    console.log('Page loaded')
    let vastClient = new VAST.VASTClient();

    const elements = document.querySelectorAll(`[id^="alfadart_"]`);
    elements.forEach(function (elem) {
        if (elem.classList.contains('alfadart_video')) {
            let section = elem.id.replace('alfadart_', '')
            vastClient.get('http://localhost:5000/adserver?section=' + section)
                .then(function (res) {
                    console.log("Successfully parsed xml vast file for section=" + section)
                    console.log(res);

                    createPlayer(res, elem, vastClient)
                })
        }
    })
}

function createPlayer(vastObject, parent, vastClient) {
    let mf = vastObject?.ads[0]?.creatives[0]?.mediaFiles[0]
    console.log(mf)
    let fileUrl = mf?.fileURL
    if (!fileUrl) {
        return
    }

    let player = document.createElement('video')
    player.autoplay = true
    player.controls = true
    parent.appendChild(player)
    let source = document.createElement('source');
    source.src = fileUrl
    source.type = mf.mimeType
    source.width = mf.width
    source.height = mf.height
    player.appendChild(source)

    const vastTracker = new VAST.VASTTracker(vastClient, vastObject.ads[0], vastObject.ads[0].creatives[0]);

    player.ontimeupdate = function() {
        vastTracker.setProgress(player.currentTime)
    };

    player.addEventListener('click', (event) => {
        vastTracker.click()
    })

    player.addEventListener('ended', (event) => {
        vastTracker.complete()
    })
}