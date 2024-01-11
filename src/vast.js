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
            // tracker complete example
            // will automatically call
            //      <Tracking event="complete">http://example.com/tracking/complete</Tracking>
            // inside vastTracker.complete()
            // and then fire vastTracker.on('completed'
            vastTracker.complete();
            vastTracker.on('completed', () => {
                console.log('Tracker completed')
                // urls were called
            });

        })
        .catch(function (err) {
            console.log(err);
        });


}());
