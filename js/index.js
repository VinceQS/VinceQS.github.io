'use strict'

	window.onload=function(){
		document.title="祁帅-个人站";
		var oBox=document.getElementById('box');
		var oNav_list=document.getElementById('nav_list');
		var aNav_btn=oNav_list.children;
		var oNav=document.getElementById('nav');
		var oNun=document.getElementById('nun');//头部吸顶占位div
		var oHead=document.getElementById('head');
		var oGo=document.getElementById('go_back');
		//将锚点存成数组				
		for(var i=0;i<aNav_btn.length;i++){					
			aNav_btn[i].onmouseover=function(){
				var aEm=this.children;
				aEm[0].style.width=this.offsetWidth-4+'px';						
				aEm[1].style.width=this.offsetWidth-4+'px';
				aEm[0].style.display='block';
				aEm[1].style.display='block';
				Startmove(aEm[0],{top:0},{duration:300,complete:function(){
					aEm[2].style.background='#C14000';
					Startmove(aEm[0],{top:-23},{duration:100});							
				}});
				Startmove(aEm[1],{bottom:0},{duration:300,complete:function(){							
					Startmove(aEm[1],{bottom:-23},{duration:100});
				}});
				return false;
			};
			aNav_btn[i].onmouseout=function(){
				var aEm=this.children;
				aEm[0].style.display='none';
				aEm[1].style.display='none';
			};
			//当页面向下滚动一段距离时，再把a的背景换掉
		};
		//头部吸顶条效果
		var H=oNav.offsetTop;
		//var L=oNav.offsetLeft;
		//改变屏幕大小的时候，重新获取，oHead的大小
		var rH=oHead.offsetHeight;
		var rW=oHead.offsetWidth;
		createSpan();			
		window.onresize=function(){
			oHead.innerHTML=null;
			rW=oHead.offsetWidth;
			rH=oHead.offsetHeight;
			createSpan();
		};	
		var h=0;
		//当可视区进入。。柱状图动态显示
		var oS_bar=document.getElementById('skill_bar');
		var oS_bar1=document.getElementById('skill_bar1');
		var aEm_pic=document.querySelectorAll('#skill_bar li em');
		var aEm_pic1=document.querySelectorAll('#skill_bar1 li em');
		var oContent=oBox.children[1];
		var T=oContent.offsetTop+oS_bar.offsetTop+aEm_pic[0].parentNode.offsetHeight;
		var bOk=false;//在条状图在范围内，只执行一次for循环
		var t=document.documentElement.clientHeight||document.body.clientHeight;
		var arr=[0.9,0.85,0.75,0.8];
		var arr1=[0.9,0.85,0.75,0.8];
		window.onscroll=function(){
			h=document.documentElement.scrollTop||document.body.scrollTop;
			if(h>300){
				oGo.style.display='block';
			}
			else{
				setTimeout(function(){
					oGo.style.display='none';
					oGo.style.bottom='100px';
				},500);
			}
			if(h>=100&&h<300){
				oNav.style.left='0';
				oNav.style.top=parseInt(h)-100+'px';
				oNun.style.display='block';
			}else if(h>=300){
				oNun.style.display='none';
				oNav.style.position='absolute';
				Startmove(oNav,{top:0},{duration:500});
				for(var i=0;i<aNav_btn.length;i++){
					aNav_btn[i].children[2].style.background='#000';
				}
			}
			open();
		};
		open();
		function open(){
			if(h>=T&&h<T+t){
				if(bOk){
					for(var i=0;i<aEm_pic.length;i++){							
						//document.title=h+t-T;	
						aEm_pic[i].style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
						Startmove(aEm_pic[i],{width:arr[i]*(oS_bar.offsetWidth-40)},{easing:'ease-out',duration:1000});
						aEm_pic1[i].style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
						Startmove(aEm_pic1[i],{width:arr1[i]*(oS_bar.offsetWidth-40)},{easing:'ease-out',duration:1000});
				    }
					bOk=false;
				}						
			}else{
				for(var i=0;i<aEm_pic.length;i++){							
					//document.title=h+t-T;													
					Startmove(aEm_pic[i],{width:0},{easing:'ease-out',duration:1000});
					Startmove(aEm_pic1[i],{width:0},{easing:'ease-out',duration:1000});
				}
				bOk=true;
			}
		};
		oGo.onclick=function(){
			var nub=0;
			var count=20;
			var timer1=null;
			Startmove(oGo,{bottom:1500},{duration:500,easing:'ease-in'});
			timer1=setInterval(function(){	
				nub++;
				var a=1-nub/count;
				var cur=h-h*(1-Math.pow(a,3));
				document.documentElement.scrollTop=document.body.scrollTop=cur;
				if(nub==count){
					clearInterval(timer1);
				}						
			},50);					
		};
		//图片反转效果		   
        function createSpan(){
        	var R=6;
	    	var C=20;	
        	for(var r=0; r<R; r++){
                for(var c=0; c<C; c++){
                    var oSpan=document.createElement('span');
                    oSpan.style.width=rW/C+'px';
                    oSpan.style.height=rH/R+'px';
                    oHead.appendChild(oSpan);
                    oSpan.style.left=oSpan.offsetWidth*c+'px';
                    oSpan.style.top=oSpan.offsetHeight*r+'px';		
                    oSpan.innerHTML='<em class="front"></em><em class="back"></em>';
                    oSpan.children[0].style.backgroundPosition=-oSpan.offsetWidth*c+'px -'+oSpan.offsetHeight*r+'px';
                    oSpan.children[1].style.backgroundPosition=-oSpan.offsetWidth*c+'px -'+oSpan.offsetHeight*r+'px';		
                    oSpan.r=r;
                    oSpan.c=c;		           
                }
        	}
    	};
        // 翻转
        var aSpan=oHead.children;
        var iNow=0;
        var bReady=false;
        oHead.onclick=function(){
            if(bReady)return;
            bReady=true;
            iNow++;
            for(var i=0; i<aSpan.length; i++){
                aSpan[i].style.transition='1s all ease '+(aSpan[i].r+aSpan[i].c)*200+'ms';
                aSpan[i].style.transform='perspective(800px) rotateY(-180deg)';
            }	
            aSpan[aSpan.length-1].addEventListener('transitionend', function(){
                for(var i=0; i<aSpan.length; i++){
                    aSpan[i].style.transition='none';
                    aSpan[i].style.transform='perspective(800px) rotateY(0deg)';
                    aSpan[i].children[0].style.backgroundImage='url(images/'+iNow%3+'.png)';
                    aSpan[i].children[1].style.backgroundImage='url(images/'+(iNow+1)%3+'.png)';
                }
                bReady=false;
            }, false);
        };
		//当鼠标移入中间立方体时，宽度变大
		var oSkill=document.getElementById('skills');
		var aDiv=oSkill.children;
		var w1=parseInt(oSkill.offsetWidth);
		var w2=parseInt(oSkill.offsetWidth)*0.4;
		var arr_int=['超文本标记语言，标准通用标记语言下的一个应用','层叠样式表是一种用来表现HTML或XML等文件样式的计算机语言','jQuery是一个兼容多浏览器的javascript库','JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型','一种创建交互式网页应用的网页开发技术','新标签新属性、新样式'];
		var oCube=document.getElementById('cube');
		var aA=oCube.getElementsByTagName('a');
		var oInt=document.getElementById('introduce');
		aDiv[2].onmouseover=function(){
			
			//Startmove(aDiv[0],{width:w1});
			aDiv[0].className='left_show ggo';
			aDiv[1].className='right_show ggo';
			aDiv[2].className='center_show ggoo';
			//Startmove(aDiv[1],{width:w1});
			//Startmove(aDiv[2],{width:w2,left:w1});
			//每一个a点击的时候出文字				
			for(var i=0;i<aA.length;i++){
				//定义开关，字体显示完成之前不准再点。
				var oK=false;
				;(function(index){
					if(oK)return;
					oK=true;
					aA[index].onclick=function(){
						clearInterval(timer);
						oInt.innerHTML='';
						for(var j=0;j<arr_int[index].length;j++){
							var oS=document.createElement('span');
							oS.style.opacity=0;
							oS.innerHTML=arr_int[index].charAt(j);
							oS.style.color='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
							oInt.appendChild(oS);
						}
						var aS=oInt.children;
						var num=0;
						var timer=null;
						timer=setInterval(function(){
							Startmove(aS[num],{opacity:1});
							num++;
							if(num==aS.length){
								num=0;
								oK=false;
								clearInterval(timer);
							}
						},100)
					}
				})(i);
			}	
		};
		aDiv[2].onmouseout=function(){
			//Startmove(aDiv[0],{width:w2});
			//Startmove(aDiv[1],{width:w2});
			aDiv[0].className='left_show bback';
			aDiv[1].className='right_show bback';
			aDiv[2].className='center_show cback';
			//Startmove(aDiv[2],{width:w2/2,left:w2},{complete:function(){
				//oInt.innerHTML='';
			//}});					
		};
		//旋转：				
		var x=45;
		var y=-60;
		oCube.onmousedown=function(ev){
			var oEvent=ev||event;
			var disX=oEvent.clientX-y;
			var disY=oEvent.clientY-x;
			//document.title=1;
			document.onmousemove=function(ev){
				//document.title=2;
				var oEvent=ev||event;
				y=oEvent.clientX-disX;
				x=oEvent.clientY-disY;
				oCube.style.transform='perspective(800px) rotateY('+y+'deg) rotateX('+-x+'deg)';              
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oCube.releaseCapture&&oCube.releaseCapture();
			};
			return false;
			oCube.setCapture&&oCube.setCapture();					
		};
		//作品展示 穿墙
		var oThrough=document.getElementById('through');
		var aPic=oThrough.children;
		for(var i=0;i<aPic.length;i++){
			;(function(index){
				aPic[index].onmouseover=function(){
					through(aPic[index],h);
				}
			})(i);
		}
		//个人介绍，选项卡
		var aBtn_t=document.querySelectorAll('#bt a');
		var aInfor=document.querySelectorAll('#infor div');
		for(var i=0;i<aBtn_t.length;i++){
			;(function(index){
				aBtn_t[index].onclick=function(){
					this.style.transition='.4s all ease';
					for(var j=0;j<aBtn_t.length;j++){
						aBtn_t[j].className='';
						aInfor[j].className='';
					}
					aInfor[index].className='on';
					this.className='red';
				}
			})(i);
		}
		//个人作品点击跳转				
	};
