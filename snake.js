// 创建小蛇
(function(win){
	
	var elements = [];//存储小蛇的div
	function Snake(width,height,direction){
		this.width = width || 15
		this.height = height || 15
		
		this.direction = direction || "right"
		//小蛇的身体
		this.body = [
			{x:3,y:2,color:"black"},		//头
			{x:2,y:2,color:"black"},
			{x:1,y:2,color:"black"},
		]
		
	}
	
	//创建原型方法--初始化小蛇
	Snake.prototype.init = function(map){
		//先清除以前的小蛇
		remove()
		for(var i=0 ; i<this.body.length ; i++){
			//创建div
			var div = document.createElement('div')
			map.appendChild(div)
			//设置样式
			div.style.height = this.height + 'px'
			div.style.width = this.width + 'px'
			div.style.backgroundColor = this.body[i].color
			div.style.position = "absolute"
			div.style.left = this.body[i].x * this.width + 'px'
			div.style.top = this.body[i].y * this.height + 'px'
			//存起来
			elements.push(div)
		}
	}
	
	//创建原型方法--小蛇移动
	Snake.prototype.move = function(food,map){
		
		var i = this.body.length-1
		for( ; i>0 ; i--){
			this.body[i].x = this.body[i-1].x
			this.body[i].y = this.body[i-1].y
		}
		switch(this.direction){
			case "up": {
				this.body[0].y--
				break
			}
			case "down": {
				this.body[0].y++
				break
			}
			case "right": {
				this.body[0].x++
				break
			}
			case "left": {
				this.body[0].x--
				break
			}
		}
		//小蛇当前坐标
		headX = this.body[0].x
		headY = this.body[0].y
		//食物当前坐标
		foodX = food.x
		foodY = food.y
		var last
		//设置吃食物,小蛇长度增加
		if(headX == foodX && headY == foodY){
			// alert("碰头了")
			//更新食物
			food.init(map)
			//小蛇长度加一
			last = this.body[this.body.length-1]
			this.body.push({
				x: last.x,
				y: last.y,
				color:last.color
			})
		}
		//判断小蛇吃自己
		var j = this.body.length-1
		
		for(j=1; j<this.body.length ; j++){
			if(headX === this.body[j].x && headY === this.body[j].y){
				
				clearInterval(timer)
				alert('游戏结束')
				window.toHome()
			}	
		}
		
		
	}
	
	//创建私有函数--清除小蛇
	function remove(){
		var i = elements.length-1
		for( ; i>=0 ; i--){
			//清除div元素
			var ele= elements[i]
			ele.parentNode.removeChild(ele)
			//清空elements数组
			elements.splice(i,1)
		}
	}
	
	return win.Snake = Snake
}(window))
