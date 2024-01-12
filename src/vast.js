(function () {
    var player = videojs('vast-video-ok');
    var vastClient = new VAST.VASTClient();

    vastClient.get('./vast-linear-tag-test.xml')
        .then(function (res) {
            console.log("Successfully parsed xml vast file")
            console.log(res);

            player.src([
                res.ads[0].creatives[0].mediaFiles[0].fileURL
            ]);

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


}());
