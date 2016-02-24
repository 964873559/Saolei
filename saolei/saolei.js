//默认生成的是9X9方格
window.onload = function () {
    create(9,9,1); 
}

var height = 0;
var length = 0;
var label = 0;
var boom_num = 0;
var setClass = 0;
//生成扫雷表格的额函数
function create (h,l,lab) {
	height = h;
	length = l;
	label = lab;
	//table标签中的内容
	var html = ' ';		
	//td的个数和内容
	var td = ' ';
	//获取主div对象
	var obj = document.getElementById('main');
	//循环构造出td，即列数
	for (var i = 0; i < length; i++) {
		td = td + '<td onmousedown="javascript:change(this)"></td>';
	};
	//循环构造出行数
	for (var i = 0; i < height; i++) {
		html = html + '<tr>'+ td + '</tr>';
	};
	//修改获取的div对象的内容
	obj.innerHTML = '<table id="table1">' + html +'</table>';
	var table = document.getElementById ('table1');
	var rows = table.rows;
	for (var i = 0; i < rows.length; i++) {
		for (var j = 0; j < rows[0].cells.length; j++) {
			rows[i].cells[j].flag = '';
			rows[i].cells[j].click = 0;
		};
	};
	//控制table中右键无法弹窗
    table.oncontextmenu = function ()
    {
        return false;
    }
    //控制div对象的大小
	if (label==1) {
		obj.style.width = '308px';
		//newBoom(height,length,10);
		document.getElementById('boom').innerHTML = 10;
		boom_num = 10;
	}else if (label==2) {
		obj.style.width = '546px';
		//newBoom(height,length,40);
		document.getElementById('boom').innerHTML = 40;
		boom_num = 40;
	}else{
		obj.style.width = '1000px';
		//newBoom(height,length,99);
		document.getElementById('boom').innerHTML = 99;
		boom_num = 99;
	}
}

//随机产生雷的方法
function newBoom (rows,cells,num) {
	//定义i,j为第几行第几列
	var i = 0,j = 0,k=0;
	//循环产生雷区
	while(k<num) {
		//获取当前表格内容
		var table = document.getElementById ('table1');
		//获取表格的所有行
		var hang = table.rows;
		i = Math.floor((rows*Math.random())%rows);
		j = Math.floor((cells*Math.random())%cells);
		if (hang[i].cells[j].flag != -10 ) {
			//产生雷区
			hang[i].cells[j].flag = -10;
			//hang[i].cells[j].style.background = 'black';
			k++;
			//雷区四周的方块显示周围雷的数量
			if (i>=1) {
				if (hang[i-1].cells[j].flag!=-10){
					hang[i-1].cells[j].flag++;
				};
				if (j>=1&&hang[i-1].cells[j-1].flag!=-10){
					hang[i-1].cells[j-1].flag++;
				};
				if (j<cells-1&&hang[i-1].cells[j+1].flag!=-10){
					hang[i-1].cells[j+1].flag++;
				};
			};
			if (i<rows-1) {
				if (hang[i+1].cells[j].flag!=-10){
					hang[i+1].cells[j].flag++;
				};
				if (j>=1&&hang[i+1].cells[j-1].flag!=-10){
					hang[i+1].cells[j-1].flag++;
				};
				if (j<cells-1&&hang[i+1].cells[j+1].flag!=-10){
					hang[i+1].cells[j+1].flag++;
				};
			};
			if (j>=1&&hang[i].cells[j-1].flag!=-10){
				hang[i].cells[j-1].flag++;
			};
			if (j<cells-1&&hang[i].cells[j+1].flag!=-10){
				hang[i].cells[j+1].flag++;
			};
		};
	};
}
//鼠标点击后执行事件
function change (obj) {
	var m = 0, n = 0;
	//获取window事件
	var e=window.event;   
	//获取当前表格内容
	var table = document.getElementById ('table1');
	//获取表格的所有行
	var hang = table.rows;
	//获取当前对象所在的位置
	for (var i = 0; i < hang.length; i++) {
		for (var j = 0; j < hang[i].cells.length; j++) {
			if(hang[i].cells[j]==obj){
				m = i;
				n = j;
			}
		};
	};
	//如果执行的是鼠标左键则button == 0
    if(e.button=="0"&&obj.click==0){  
    	obj.click = 1;
        if (obj.flag == -10) {
        	for (var i = 0; i < hang.length; i++) {
				for (var j = 0; j < hang[i].cells.length; j++) {
					if(hang[i].cells[j].flag < 0){
						hang[i].cells[j].style.backgroundImage = 'url(boom.png)';
					}
				};
			};
			var shadow = document.getElementById('shadow');
			shadow.style.display = 'block';
        	alert('GAME OVER!');
        }else if (obj.flag!='') {
        	obj.style.background = 'orange';
        	obj.innerHTML = obj.flag;
        }else {
        	scan(hang,m,n);
        }
    }else if ((e.button=="2"&&obj.click==0)||(e.button=="2"&&obj.click==2)) {
    	if (obj.style.background == 'red') {
    		obj.click = 0;
    		obj.style.backgroundImage = 'url(rect.png)';
    		document.getElementById('boom').innerHTML++;
    	}else{
    		if (document.getElementById('boom').innerHTML>0) {
    			obj.click = 2;
	        	obj.style.background = 'red';
	        	document.getElementById('boom').innerHTML--;
        	}
    	}
    }; 
    Is_win(hang); 
}

//判断游戏是否胜利
function Is_win (hang) {
	var number = 0;
	var shadow = document.getElementById('shadow');
	for (var i = 0; i < hang.length; i++) {
		for (var j = 0; j < hang[i].cells.length; j++) {
			if (hang[i].cells[j].style.background=='orange') {
				number++;
			};
		};
	};
	if (label==1) {
		if ((length*height-boom_num)==number) {
			alert('恭喜您获得胜利！');
			shadow.style.display = 'block';
		};
	}else if (label==2) {
		if ((length*height-boom_num)==number) {
			alert('恭喜您获得胜利！');
			shadow.style.display = 'block';
		};
	}else {
		if ((length*height-boom_num)==number) {
			alert('恭喜您获得胜利！');
			shadow.style.display = 'block';
		};
	}
}

//判断是否到达边界
function isout(rows,i,j){
    if(i < 0  || j < 0 || i > rows.length-1 || j > rows[0].cells.length-1){
        return true;}
    return false;

}

//自动扫雷函数

function scan (rows,i,j) {
   //扫描过后，颜色改变为黄色
	rows[i].cells[j].style.background = 'orange';
	//从左上角按顺时针方向扫描
    scan_1(rows,i-1,j-1);
    scan_1(rows,i-1,j);
   	scan_1(rows,i-1,j+1);
   	scan_1(rows,i,j+1);
	scan_1(rows,i+1,j+1);
	scan_1(rows,i+1,j);
    scan_1(rows,i+1,j-1);
    scan_1(rows,i,j-1);
}

//点击后自动扫雷显示
function scan_1 (rows,i,j) {
	//如果超出边界直接返回
	if(isout(rows,i,j)) return;
	//获取当前对象
    var obj = rows[i].cells[j];
    //如果已经扫过直接返回
    if(obj.style.background == 'orange'){
        return;
    }
    //如果扫到有数字也返回
	if (obj.flag>0) {
		obj.style.background = 'orange';
		//将数字显示出
		obj.innerHTML = obj.flag;
		return;
	};
	//若未扫过，以该点递归
    if(obj.flag == ''){
        scan(rows,i,j);
        return;
    }
	return;
}

var start_button_num = 0;
//开始游戏
function start () {

	start_button_num++;
	var start_button = document.getElementById('start');
	var shadow = document.getElementById('shadow');
	if (start_button_num %2==1) {
		start_button.innerHTML = '重新开始';
		shadow.style.display ='none';
		var boomNum = document.getElementById('boom').innerHTML;
		newBoom(height,length,boomNum);
	
		time_start();
		setClass = 1;
	};
	if (start_button_num %2==0) {
		start_button.innerHTML = '开始游戏';
		shadow.style.display ='block';
		create(height,length,label);
		var time = document.getElementById('time');
		time.innerHTML = 0;
		clearTimeout(t);
		setClass = 0;
	};
}
var t = null;
//计时噐开始计时
function time_start () {
	var time = document.getElementById('time');
	time.innerHTML++;
	t = setTimeout('time_start()',1000);
}

function setBoomNum(num){
	document.getElementById('boom').innerHTML = num;
	boom_num = num;
}

function disp_prompt(){
	if(setClass == 0){
		var num = prompt("请输入雷数","10");
    	if(num != null && num != "" && height*length > num&&num > 0){
        	setBoomNum(num);
    	}
	}
    
}
