//食物
(function(win){
	//用来保存食物
	var elements = []
	//食物构造函数
	 function Food(x,y,width,height,color){ 
		 this.x = x || 0
		 this.y = y || 0
		 this.width = width || "15"
		 this.height = height || "15"
		 this.color = color || "black"
	 }
	 
	 //初始化食物，作为原型的方法
	 Food.prototype.init = function(map){
		//清除食物
		remove()
		//创建div
		var div = document.createElement("div")
		map.appendChild(div)
		//设置div样式
		div.style.position = "absolute"
		div.style.width = this.width + 'px'
		div.style.height = this.height + 'px'
		div.style.background = this.color
		//随机出现食物位置
		this.x = parseInt(Math.random()*(map.offsetWidth/this.width-2))
		
		this.y = parseInt(Math.random()*(map.offsetHeight/this.height-2))
		div.style.left = this.x*this.width + "px"
		div.style.top = this.y*this.height + "px"
		//把创建的div加入到elements里面
		elements.push(div)	
	 }
	 
	 //删除食物，作为原型方法
	 function remove(){
		 for(var i=0 ; i<elements.length ; i++){
			var ele = elements[i]
			 //找到这个元素的父元素，然后删除子元素
			 ele.parentNode.removeChild(ele)
			 //删除数组
			 elements.splice(i,1)
		 }
	 }
	 
	 return win.Food = Food
}(window));