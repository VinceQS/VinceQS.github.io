function turnOver(obj){
 	
    var iNow=0;
    var bReady=false;
    if(bReady)return;
    bReady=true;
    iNow++;
    for(var i=0; i<obj.length; i++){
        obj[i].style.transition='1s all ease '+(obj[i].r+obj[i].c)*200+'ms';
        obj[i].style.transform='perspective(800px) rotateY(-180deg)';
    }

    obj[obj.length-1].addEventListener('transitionend', function(){
        for(var i=0; i<obj.length; i++){
            obj[i].style.transition='none';
            obj[i].style.transform='perspective(800px) rotateY(0deg)';
            obj[i].children[0].style.backgroundImage='url(../imgages/'+iNow%3+'.png)';
            obj[i].children[1].style.backgroundImage='url(../imgsges/'+(iNow+1)%3+'.png)';
        }
        bReady=false;
    }, false);

}
