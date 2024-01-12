(function () {
    var vastClient = new VAST.VASTClient();

    initVast('vast-video-ok', vastClient,'./vast-linear-tag-test.xml')
    initVast('vast-video-hidden', vastClient,'./vast-linear-tag-test-empty.xml')
}());

function initVast(id, vastClient, link) {
    let player = videojs(id);
    vastClient.get(link)
        .then(function (res) {
            console.log("Successfully parsed xml vast file " + link)
            console.log(res);


            let fileUrl = res?.ads[0]?.creatives[0]?.mediaFiles[0]?.fileURL
            if (!fileUrl) {
                player.dispose()
                return
            }

            player.src([fileUrl]);

            player.ready(function () {
                player.play();
            });

            const vastTracker = new VAST.VASTTracker(vastClient, res.ads[0], res.ads[0].creatives[0]);

            player.on('ended',()=>{
                vastTracker.complete()
            });

            player.on('timeupdate',function() {
                vastTracker.setProgress(this.currentTime())
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}