'use struct'
function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName];	
}
function Startmove(obj,json,options){
	options=options||{};
	options.duration=options.duration||500;
	options.easing=options.easing||'linear';
	var start={};
	var dis={};
	for(var name in json){
		if(name=='opacity'){
			//IE8以下，透明度不给默认值，直接改变的话会报错
			if(isNaN(getStyle(obj,name))){
				obj.style.opacity=1;
				obj.style.filter='alpha(opacity:100)';	
			}	
		}
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	var count=Math.floor(options.duration/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*Math.pow(a,3);
					break;	
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
					break;
				default:
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
			}
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';	
			}else{
				obj.style[name]=cur+'px';	
			}
			obj.style[name]=cur+'px';
			//最后一步清除定时器
			if(n==count){
				clearInterval(obj.timer);
				options.complete&&options.complete();	
			}
		}	
	},50)
}
//到父级的距离
function getPost(obj){
	var json={
		top:0,
		left:0
	};
	while(obj.offsetParent){
		json.top+=obj.offsetTop;
		json.left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
	return json;
}
//穿墙 
function getDir(obj,ev,H){
	//obj.offsetParent.offsetLeft+350+
	//obj.offsetParent.offsetTop+350+
	
	var x=getPost(obj).left+obj.offsetWidth/2-ev.clientX;
	var y=getPost(obj).top+obj.offsetHeight/2-ev.clientY-H;
	//alert(document.documentElement.scrollTop);
	//console.log(H);
	// 根据x、y，取反正切，求得转过的角度，再转化为弧度，再转化为四个方位对应的case值，
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;	
}
function through(obj,H){
	var oS=obj.children[0];
	
	obj.onmouseenter=function (ev){
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent,H);
		
		switch(dir){
			case 0:
				oS.style.left=250+'px';
				oS.style.top=0;
				break;
			case 1:
				oS.style.left=0;
				oS.style.top=250+'px';
				
				break;
			case 2:
				oS.style.left=-250+'px';
				oS.style.top=0;
				break;
			case 3:
				oS.style.left=0;
				oS.style.top=-250+'px';
				break;
		}
		Startmove(oS,{left:0,top:0});
		//alert(dir)
	};
	obj.onmouseleave=function (ev){
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent,H);
		//document.title=dir;
		switch(dir){
			case 0:
				Startmove(oS,{left:250,top:0});
				break;
			case 1:
				Startmove(oS,{left:0,top:250});
				break;
			case 2:
				Startmove(oS,{left:-250,top:0});
				break;
			case 3:
				Startmove(oS,{left:0,top:-250});
				break;
		}
	};
}

