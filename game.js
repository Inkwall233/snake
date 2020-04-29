//创建游戏
(function(){
	
	var that = null
	//设置定时器
	window.timer = null
	
	function Game(map,speed){
		this.snake = new Snake()
		this.food = new Food()
		this.map = map
		this.speed = speed || 150
		that = this
	}
	

	//小蛇移动
	Game.prototype.runSnake = function(food,map,speed){
		clearInterval(timer)
		//设置x轴最长距离
		var maxX = map.offsetWidth/this.snake.width-2	//减去边框
		var maxY = map.offsetHeight/this.snake.height-2
		//定义小蛇头的坐标
		var headX = this.snake.body[0].x
		var headY = this.snake.body[0].y
		//定义食物坐标
		var foodX = food.x
		var foodY = food.y
		
		//设置小蛇一直走
		timer = setInterval(function(){
			//小蛇当前坐标
			headX = this.snake.body[0].x
			headY = this.snake.body[0].y
			//食物当前坐标
			foodX = food.x
			foodY = food.y
			this.snake.init(map)
			this.snake.move(this.food,this.map)
			
			//设置撞墙，游戏结束
			if(headX >= maxX || headX <0){
				
				alert("游戏结束!!!")
				clearInterval(timer)
				window.toHome()
			}
			if(headY >= maxY || headY <0){
				alert("游戏结束!!!")
				clearInterval(timer)
				window.toHome()
			}
			return window.timer = timer					
			clearInterval(timer)
		}.bind(that),speed)
		
	}
	
	//绑定键盘值
	Game.prototype.bindKey = function(snake,speed){
		
		//获取用户按键，改变小蛇移动
		document.addEventListener("keydown",function(e){
		
				switch(e.keyCode){
					case 40 :{
						if(snake.direction !== 'up'){
							snake.direction = "down"
						}
						break
					}
					case 38 :{
						if(snake.direction !== "down"){
							snake.direction = 'up'
						}
						break
					}
					case 37 :{
						if(snake.direction !== "right"){
							snake.direction = "left"
						}
						break
					}
					case 39 :{
						if(snake.direction !== "left")
						snake.direction = "right"
						break
					}
				}
			
		},false)
	}
	

	Game.prototype.init = function(){
		//初始化食物
		this.food.init(this.map)
		//根据按键改变方向
		this.bindKey(this.snake,this.speed)
		//小蛇移动
		this.runSnake(this.food,this.map,this.speed)
		
	}
	return window.Game = Game
}())