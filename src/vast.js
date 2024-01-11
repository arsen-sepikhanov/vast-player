(function () {
    var myPlayer = videojs('vast-player');
    var vastClient = new VAST.VASTClient();

    vastClient.get('./vast-linear-tag-test.xml')
        .then(function (res) {
            console.log(res);

            myPlayer.src([
                res.ads[0].creatives[0].mediaFiles[0].fileURL
            ]);

            myPlayer.ready(function () {
                myPlayer.play();
            });
        })
        .catch(function (err) {
            console.log(err);
        });



}());
