var player;//youtube player
var currentPlay = 0;//recorder of which song it is playing currently

//since -youtube api- is ready
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",
      {
        height:"390",
        width:"640",
        videoId:playList[currentPlay],
        playerVars:{
            "autoplay":0,//是否自动播放
            "controls":0,//是否显示控制项
            "start":playTime[currentPlay][0],//开始播放秒数
            "end":playTime[currentPlay][1],//结束播放秒数
            "showinfo":0,//上分是否显示标题
            "rel":0,//结束时是否显示相关影片
            "iv_load_policy":3,//是否显示置入的行销链接
        },
        events:{
            "onReady":onPlayerReady,
            "onStateChange":onPlayerStateChange
        }
    });
}
//since -youtube player- is ready
function onPlayerReady(event){
    $("#playButton").click(function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}
//since  -player state- has changed
function onPlayerStateChange(event){
    
    if(event.data==1 &&
       (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]))//暂停后播放下一首
    {
        if(currentPlay < playList.length-1)
        {
        currentPlay++;
        player.loadVideoById({
            "videoId":playList[currentPlay],
            "startSeconds":playTime[currentPlay][0],
            "endSeconds":playTime[currentPlay][1],
            "suggestedQuality":"large"
        });
}else
    {
        //最后一首播完,先准备第一首
        currentPlay=0;
        player.cueVideoById({videoId:playList[currentPlay],
                            startSeconds:playTime[currentPlay][0],
                            endSeconds:playTime[currentPlay][1],
                            suggestedQuality:"large"});
    }
    }
if(player.getVideoLoadedFraction()>0)
{$("h2").text(player.getVideoData().title);}
}