// JavaScript Document


function dCanvas(id,width,height){
  d=document.getElementById(id);
  d.width=width,d.height=height;
  dc=d.getContext('2d');
  this.d=d,this.dc=dc,this.width=d.width,this.height=d.height;
  self = this.self = this;
  //虚线
  this.solid=function(x,length){
	  var x0=x[0],y0=x[1];var end=x0+length;
      dc.beginPath();
	  for(x0;x0<=end;x0+=5){
		dc.moveTo(x0,y0);
		dc.lineTo(x0+2,y0);   
	  }
	  dc.stroke(); 
	   
  }
  //参考线
  this.baseLine=function(e){
	  if(typeof e == "undefined"){e = 20}
	  dc.beginPath();
      dc.strokeStyle="#cccccc";
	  dc.lineWidth=1;	  
	  for(var x=0;x<d.width;x+=d.width/e){
	    dc.moveTo(x,0);
		dc.lineTo(x,d.height);
	  } 
	  for(var y=0;y<d.height;y+=d.height/e){
	    dc.moveTo(0,y);
		dc.lineTo(d.width,y);
	  }
	  dc.stroke();
	  dc.closePath();
  }
  //复制
  this.copy = function(p,width,height){
	  var x0=p[0],y0=p[1];
	  imgData= dc.getImageData(x0,y0,width,height); 
  }
  //全屏复制
  this.fullcopy = function(){
      imgData= dc.getImageData(0,0,width,height);
	  return imgData;
  }
  //粘贴
  this.paste = function(p){
	  var x0=p[0],y0=p[1];
	  dc.putImageData(imgData,x0,y0);
  }
  //创建Npc对象
  this.Npc = function(p,size){
	this.p=p,this.size=size;	
	this.create = function(){
		var x0=this.p[0],y0=this.p[1];
		dc.beginPath();
		dc.rect(x0,y0,x0+size,y0+size);
		dc.stroke();
		dc.closePath();
	}
	this.moveRight =function(e){
	    var x0=this.p[0],y0=this.p[1];
		var l =0;
		
		var move = function(){	
		  if(l>e){return false}	  	  
		  dc.beginPath();
		  self.paste([0,0]);
		  dc.clearRect(x0+l-1,y0-1,x0+size,y0+size+2);
		  l++;
		  dc.rect(x0+l,y0,x0+size,y0+size);
		  dc.stroke();
		  dc.closePath();
		  p=[x0+l,y0];
		  
		}
		setInterval(function(){move()},1000/60);

	}   
	this.animate = function(e){}
	return this;
  }

  //dfy

  /*杜方宇*/

  //创建圆圈
  this.circle = function(p,r){
	  //jr,jd Math.Pi
	  if(typeof r == "undefined"){r = 50}
      var jr=0 ,jd=0,x=p[0],y=p[1],deg=Math.PI/60;
	  dc.moveTo(x+r,y);
	  dc.strokeStyle="rgba(222,222,222,0.5)";
	  function paintArc(){
		  if(jr>Math.PI*2){return false}
		  dc.beginPath();
		  jr+=deg;
		  dc.arc(x,y,r,0,jr);  
		  dc.stroke();
		  dc.closePath();
	  }
	  setInterval(function(){paintArc()},1000/60);  	      
  }
  //盒子
  this.box = function(x,y,w,h,d){
	   var p1=[x,y],p2=[x-d,y-d]
	   dc.rect(p1[0],p1[1],w,h);
	   dc.rect(p2[0],p2[1],w,h);
	   dc.moveTo(p1[0],p1[1]);
	   dc.lineTo(p2[0],p2[1]);
	   dc.moveTo(p1[0]+w,p1[1]);
	   dc.lineTo(p2[0]+w,p2[1]);
	   dc.moveTo(p1[0],p1[1]+h);
	   dc.lineTo(p2[0],p2[1]+h);
	   dc.moveTo(p1[0]+w,p1[1]+h);
	   dc.lineTo(p2[0]+w,p2[1]+h);
	   dc.stroke();
   } 
  return this;
}

