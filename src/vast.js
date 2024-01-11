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
        })
        .catch(function (err) {
            console.log(err);
        });
}());
