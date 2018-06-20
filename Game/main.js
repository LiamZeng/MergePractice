var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;

//一開始網頁元件載入之後要做的事情
$(document).ready(function() {
    //遊戲地形設定
    //0可走 1障礙 2終點 3 敵人
    mapArray = [0,1,1,0,0,0,3,1,2];
    ctx = $("#myCanvas")[0].getContext("2d");
    
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMainX = 0;
    currentImgMainY = 0;
    imgMain.onload = function()
    {
        
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
    }
    

    //放上障礙物和敵人
    imgMountain = new Image();//障礙物
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();//敵人
    imgEnemy.src = "images/Enemy.png";
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(var x in mapArray)
            {
                if(mapArray[x]==1)//擺上障礙物
                {
                    ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);
                }else if(mapArray[x]==3)
                {
                     ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
                }
            }
        }
    }
});

//按按鍵後要處理的動作寫在此處
$(document).keydown(function(event) {
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    event.preventDefault();
    //alert(event.which);
    switch(event.which){
        case 37://往左走
            targetImgMainX = currentImgMainX-200;
            targetImgMainY = targetImgMainY;
            cutImagePositionX = 175;
            break;
        case 38://往上走
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-200;
            cutImagePositionX = 355;
            break;
        case 39://往右走
            targetImgMainX = currentImgMainX+200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case 40://往下走
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+200;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }
    if(targetImgMainX<=400 && targetImgMainX>=0 && targetImgMainY<=400 && targetImgMainY>=0)
    {
        targetBlock = targetImgMainX/200 + targetImgMainY/200*3;
    }
    else
    {
        targetBlock = -1;
    }
    
    ctx.clearRect(currentImgMainX, currentImgMainY, 200, 200);
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3)
    {
        //异常，有山，有人 =》不移动
    }else
    {
        $("#talkBox").text("");
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }
        ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);
        
        switch(mapArray[targetBlock])
            {
                case undefined:
                    $("#talkBox").text("邊界");
                    break;
                case 1:
                    $("#talkBox").text("有山");
                    break;
                case 2:
                    $("#talkBox").text("抵達終點");
                case 3:
                    $("#talkBox").text("HI~");
                break;
            }
});