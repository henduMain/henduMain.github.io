/* JS Library */
"use strict";

function controlPanel(){
	this.effects = [];
	this.divs = [];
	this.longest = 0;
	this.show_hide = true;
}
controlPanel.prototype = {
	appendEffect: function(effect){
		this.effects.push(effect)
	},
	appendDesignerDiv: function(designerDiv) {
		this.divs.push(designerDiv)
	},
	newDesignerDiv: function(id) {
		const newDiv = new DesignerDiv(id)
		const textnode = document.createTextNode("newDiv "+id)
		newDiv.newDesignerDiv(textnode)
		this.divs.push(newDiv)
		const table1 = document.getElementById("Controltable1");
		table1.innerHTML = this.make_div_table();
		this.add_functions_to_buttons();
	},
	deleteDesignerDiv: function(index){
		const div = document.getElementById(this.divs[index].id);
		const checks = document.getElementById("checks"+this.divs[index].id);
		const editbutton = document.getElementById("editbutton"+this.divs[index].id);
		this.divs.splice(index, 1);
		if(checks){
		checks.remove();}
		if(editbutton){
		editbutton.remove();}
		div.remove();
		const table1 = document.getElementById("Controltable1");
		table1.innerHTML = this.make_div_table();
		this.add_functions_to_buttons();
		this.longest -= 1
	},
	OnOffEffect: function(index){
		if(this.effects[index].started === true){
		this.effects[index].end();}
		else{
			this.effects[index].Start_Waited();
		}
	},
	Show: function(){
		const controlPanel = document.createElement('div');
		controlPanel.id = "ControlPanelDesignerDiv"
		controlPanel.style.position = "fixed";
		controlPanel.style.top = "20px"
		controlPanel.style.right = "0"	
		const table1 = document.createElement('div');
		table1.id = "Controltable1"
		table1.style.float = "right";
		table1.innerHTML = this.make_div_table();
		const table2 = document.createElement('div');
		table2.id = "Controltable2"
		table2.innerHTML = this.make_effect_table();
		const show_hide = document.createElement('button');
		show_hide.innerText = "show/hide"
		show_hide.style.float = "right"
		show_hide.addEventListener("click", function() {
			if(this.show_hide === true){
				this.hide_panel();
				this.show_hide =  false;
			}
			else{
				this.show_panel();
				this.show_hide = true;
			}
		}.bind(this), false);
		show_hide.style.position = "fixed"
		show_hide.style.top = "0"
		show_hide.style.right = "0"	
		document.querySelector('body').appendChild(show_hide);
		controlPanel.appendChild(table2);
		controlPanel.appendChild(table1);
		document.querySelector('body').appendChild(controlPanel);
		document.onload = this.add_functions_to_buttons();
	},
	make_div_table:function(){
		var html = "<table id = DesignerdivTable1><tr><td>Current Divs</td></tr>";
		for (var i=0; i<this.divs.length; i++) {
		  html += "<tr id = Designertr"+this.divs[i].id+"><td><label>id:</label>" + this.divs[i].id + "</td>";
		  html += "<td><label>index:</label>" + i + "</td>";
		  html += "<td><button id=remove" + this.divs[i].id +" index="+i+">Remove</button></td></tr>";
		  
		}
		html += "<tr><td><button id= addnewDesignerDiv>Add new</button></td> </tr>";
		html += "</table>";
		return html;
	},
	make_effect_table:function(){
		var html = "<table id = DesignerdivTable2><tr><td>Current Particle effects</td></tr>";
		for (var i=0; i<this.effects.length; i++) {
		  html += "<tr id = Effecttr"+this.effects[i].id+"><td><label>id:</label>" + this.effects[i].id + "</td>";
		  html += "<td><label>index:</label>" + i + "</td>";
		  html += "<td><label>mod:</label>" + this.effects[i].mod + "</td>";
		  html += "<td><button id=effectswitch" + this.effects[i].id +" index="+i+">ON/OFF</button></td></tr>";
		}
		html += "<tr><td><button id= FrozenParticles>Freeze All</button></td></tr>";
		html += "</table>";
		return html;
	},
	hide_panel(){
		const panel = document.getElementById("ControlPanelDesignerDiv"); 
		panel.remove();
	},
	show_panel(){
		const controlPanel = document.createElement('div');
		controlPanel.id = "ControlPanelDesignerDiv"
		controlPanel.style.position = "fixed";
		controlPanel.style.top = "20px"
		controlPanel.style.right = "0"	
		const table1 = document.createElement('div');
		table1.id = "Controltable1"
		table1.style.float = "right";
		table1.innerHTML = this.make_div_table();
		const table2 = document.createElement('div');
		table2.id = "Controltable2"
		table2.innerHTML = this.make_effect_table();
		controlPanel.appendChild(table2);
		controlPanel.appendChild(table1);
		document.querySelector('body').appendChild(controlPanel);
		this.add_functions_to_buttons();
	},
	pause_all(){
		for(var k=0; k<this.effects.length ;k++){
			this.effects[k].pause()
		}
		const table2 = document.getElementById("Controltable2");
		table2.innerHTML = this.make_effect_table();
		this.add_functions_to_buttons();
	},
	add_functions_to_buttons(){
		const table1 = document.getElementById("DesignerdivTable1"); 
		table1.style.backgroundColor = "silver";
		var order = 0;
		for(var i = 0; i < this.divs.length; i++) { 
			const tr = document.getElementById("Designertr"+this.divs[i].id)
			const n = i;
			// button = document.getElementById("remove"+this.divs[i].id).onclick = this.deleteDesignerDiv(i)
			const button = document.getElementById("remove"+this.divs[i].id)
			button.addEventListener("click", function() {
				this.deleteDesignerDiv(n);
			}.bind(this), false);
			button.style.borderColor = "red"
			button.style.color = "black";
			button.style.backgroundColor = "white";
			button.addEventListener("click", function(){if(button.key != "red")
			{button.style.color = "red";button.style.backgroundColor = "orange"; button.key = "red"} 
			else{button.style.color = "black";button.style.backgroundColor = "white"; button.key = "black"} });
			if (order === 0){tr.style.backgroundColor = "black";tr.style.color = "white";tr.style.height = "30px" ; order=1;}
			else if (order === 1){tr.style.backgroundColor = "darkblue";tr.style.color = "aliceblue";tr.style.height = "30px" ; order=0;}
		  }
		const addnew = document.getElementById("addnewDesignerDiv")
		if(this.divs.length > this.longest){
			this.longest = this.divs.length
		}
		else{this.longest = this.longest + 1}
		
		addnew.addEventListener("click", function() {
			this.newDesignerDiv("AutoDiv_id_"+this.longest);
		}.bind(this), false);

		const Frozen = document.getElementById("FrozenParticles")
		Frozen.addEventListener("click", function() {
			this.pause_all()
		}.bind(this), false);

		const table2 = document.getElementById("DesignerdivTable2"); 
		table2.style.backgroundColor = "silver";
		order = 0;
		for(var i = 0; i < this.effects.length; i++) { 
			const tr = document.getElementById("Effecttr"+this.effects[i].id)
			const n = i;
			const button = document.getElementById("effectswitch"+this.effects[i].id)
			button.addEventListener("click", function() {
				this.OnOffEffect(n);
			}.bind(this), false);
			button.style.borderColor = "red"
			if(this.effects[i].started == true)
			{button.style.color = "red";button.style.backgroundColor = "orange"; button.key = "red"} 
			else{button.style.color = "black";button.style.backgroundColor = "white";}
			button.addEventListener("click", function(){if(button.key != "red")
			{button.style.color = "red";button.style.backgroundColor = "orange"; button.key = "red"} 
			else{button.style.color = "black";button.style.backgroundColor = "white";button.key = "black"} });
			if (order === 0){tr.style.backgroundColor = "black";tr.style.color = "white";tr.style.height = "30px" ; order=1;}
			else if (order === 1){tr.style.backgroundColor = "darkblue";tr.style.color = "aliceblue";tr.style.height = "30px" ; order=0;}
		  }
	}

}

function particleeffect(id) {
	this.id = id;
	this.fireworkColor = ['#ff0000','#660000','#ffe6e6','#ff9933','#ff5c33','#ffff66','#ffff00','#ffbf00'];
	this.particles = [];
	this.maximum = 300;
	this.max_far = 30;
	this.max_size = 5;
	this.max_perframe = 30;
	this.X = 0;
	this.Y = 0;
	this.linecolor = '#ff0000';
	this.freshrate = 10;
	this.canvassizes = [0,0]
	this.started = false;
	this.mod = 0; //1: random dots from mouse 2:random lines from mouse 3:firework
	this.strated_intervel = null;
	this.martrixes = [];
}
particleeffect.prototype = {
	randomColor: function () {
		return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
	},
	randomFirework:function(){
		return this.fireworkColor[this.randomQun(this.fireworkColor.length+1)];
	},

	randomQun: function(max){
		return Math.floor(Math.random() * Math.floor(max));
	},
	randomRadius: function(max){
		return Math.random() * max;
	},
	randomDistributed: function(source){
		return (source/this.max_far)*Math.abs(source);
	},
	end: function(){
		if(this.started === true){
			this.started = false;
			clearInterval(this.strated_intervel)
			if(document.getElementById(this.id+"paper1")){
				document.getElementById(this.id+"paper1").remove();
			}
			if(document.getElementById(this.id+"paper2")){
				document.getElementById(this.id+"paper2").remove();
			}
			if (document.getElementById("Generated Circles"+this.id)){
				document.getElementById("Generated Circles"+this.id).remove();
			}
			if (document.getElementById("Matrix playground"+this.id)){
				document.getElementById("Matrix playground"+this.id).remove();
			}
		}
	},
	pause: function(){
		// console.log("pause")
		if(this.started === true){
			this.started = false;
			clearInterval(this.strated_intervel)
		}
	},
	generateParticle: function(color,transparent,left,top,radius) {
		const circle = document.createElement('div');
		circle.style = 'z-index:-9009; width: '+radius+'px; height: '+radius+'px; border-radius:50%; opacity: '+transparent+';position:absolute; top:'+top+'px; left:'+left+'px;';
		circle.style.backgroundColor = color;
		const body = document.querySelector('body');
		var container;
		if (document.getElementById("Generated Circles"+this.id)){
			container = document.getElementById("Generated Circles"+this.id)
		}
		else{
			container = document.createElement("div");
			container.id = "Generated Circles"+this.id
			container.position = "fixed"
			container.width = "90%"
			body.appendChild(container)
		}
		container.appendChild(circle)

		if(this.particles.length >= this.maximum){
			this.particles[0].remove();
			this.particles.shift();
		}
		this.particles.push(circle);
	},
	Start_Waited: function(){
		if(this.mod === 1){
			document.addEventListener('mousemove', this.mousepath.bind(this));

			this.strated_intervel =setInterval(this.mouseanimation.bind(this), this.freshrate);
		}
		else if(this.mod === 2){
			document.addEventListener('mousemove', this.mousepath.bind(this));

			this.strated_intervel = setInterval(this.mouselineanimation.bind(this), this.freshrate);
		}
		else if(this.mod === 3){
			this.strated_intervel =setInterval(this.fireworkSeries.bind(this), this.freshrate);
		}
		else if(this.mod === 4){
			this.strated_intervel =setInterval(this.Matrix.bind(this), this.freshrate);
		}
		else if(this.mod === 5){
			this.strated_intervel =setInterval(this.snow.bind(this), this.freshrate);
		}
		this.started = true;
	},
	waitMatrix: function(freshrate,maximum,max_perframe){
		this.freshrate =freshrate;
		this.maximum = maximum;
		this.max_perframe = max_perframe;
		this.mod = 4;
	},
	startMatrix: function(freshrate,maximum,max_perframe){
		this.mod = 4;
		this.maximum = maximum;
		this.max_perframe = max_perframe;
		this.freshrate =freshrate;
		this.started = true;
		this.strated_intervel =setInterval(this.Matrix.bind(this), this.freshrate);
	},
	Matrix: function(){
		var container;
		if (document.getElementById("Matrix playground"+this.id)){
			for(var n=0; n<this.max_perframe; n++)
			this.martrixes[this.randomQun(this.maximum)].style.color = (this.randomQun(2)===0?"green":"lightgreen")
			this.martrixes[this.randomQun(this.maximum)].innerText = this.randomQun(2)
		}
		else{
		this.martrixes = [];
		container = document.createElement("div");
		container.id = "Matrix playground"+this.id
		container.style.zIndex ="-50000"
		container.style.position = "fixed"
		container.style.top = "0"
		const body = document.querySelector('body');
		const number = this.maximum;
		const font_size = screen.width /80 +"px";
		for(var i=0; i<number; i++){
			 const zeroOne =  document.createElement("div");
			 zeroOne.style.color = (this.randomQun(2)===0?"green":"lightgreen")
			 zeroOne.style.float = "left"
			 zeroOne.style.fontSize = font_size
			 zeroOne.innerText = this.randomQun(2);
			 this.martrixes.push(zeroOne);
			 container.appendChild(zeroOne)
		}
		body.appendChild(container)
	}
	},
	waitSnow: function(max_size,max_far,max_perframe,maximum,freshrate){
		this.freshrate = freshrate;
		this.maximum = maximum;
		this.max_size = max_size;
		this.max_perframe = max_perframe;
		this.max_far = max_far;
		this.mod = 5;
	},

	startSnow: function(max_size,max_far,max_perframe,maximum,freshrate){
		this.freshrate = freshrate;
		this.maximum = maximum;
		this.max_size = max_size;
		this.max_perframe = max_perframe;
		this.max_far = max_far;
		this.mod = 5;
		this.started = true;
		this.strated_intervel =setInterval(this.snow.bind(this), this.freshrate);
	},
	snow: function(){
		const body = document.querySelector('body');
		for(var i=0; i<this.max_perframe; i++){
			this.generateParticle("white",0.5,this.randomRadius(screen.width*0.98),0,this.randomRadius(this.max_size))
		}
		for(var n=0; n<this.particles.length; n++){
			const move_x = this.randomRadius(this.max_far)-this.randomRadius(this.max_far)
			const move_y = this.randomRadius(this.max_far)
	
			const i =n;
			var top;
			top = parseInt(this.particles[i].style.top);

			this.particles[i].style.top = top + move_y+"px"
			if(parseInt(this.particles[i].style.left)+this.max_size*2+ move_x < screen.width*0.9){
			this.particles[i].style.left =this.particles[i].style.left+ move_x+"px"}
			else{
				this.particles[i].style.left =this.particles[i].style.left- move_x+"px"}
			
		
		}
	},
	waitmousetracklines: function(max_size,max_far,max_perframe,maximum,freshrate){
		this.freshrate = freshrate;
		this.maximum = maximum;
		this.max_size = max_size;
		this.max_perframe = max_perframe;
		this.max_far = max_far;
		this.mod = 2;
	},
	startmousetracklines: function(max_size,max_far,max_perframe,maximum,freshrate){
		this.freshrate = freshrate;
		this.maximum = maximum;
		this.max_size = max_size;
		this.max_perframe = max_perframe;
		this.max_far = max_far;
		this.started = true;
		this.mod = 2;
		document.addEventListener('mousemove', this.mousepath.bind(this));

		this.strated_intervel = setInterval(this.mouselineanimation.bind(this), this.freshrate);
	},

	mouselineanimation:function () {
		const qun = this.randomQun(this.max_perframe);
		for(var i =0; i<qun ;i++){
		var which_canvas;
		which_canvas = this.randomQun(2)
		var paper;
		const body = document.querySelector('body');
		if(document.getElementById(this.id+"paper"+which_canvas)){
			paper = document.getElementById(this.id+"paper"+which_canvas)
			if(this.canvassizes.reduce((a, b) => a + b, 0)>=this.maximum){
				this.canvassizes[which_canvas]=0
				paper.remove();
				paper = document.createElement('canvas')
				paper.id = this.id+"paper"+which_canvas;
				paper.width = screen.width;
				paper.height = screen.height;
				paper.style.position = "fixed";
				paper.style.zIndex = "-9999";
				paper.style.top = "0";
				body.append(paper);
			}
		}
		else{
			paper = document.createElement('canvas')
			paper.id = this.id+"paper"+which_canvas;
			paper.width = screen.width;
			paper.height = screen.height;
			paper.style.position = "fixed";
			paper.style.zIndex = "-9999";
			paper.style.top = "0";
			body.append(paper);
		}

		var pen = paper.getContext("2d");
		pen.strokeStyle = this.linecolor;
			const x_inter = this.randomDistributed(-this.randomRadius(this.max_far)+this.randomRadius(this.max_far))
			const y_inter =this.randomDistributed(-this.randomRadius(this.max_far)+this.randomRadius(this.max_far))
			pen.beginPath();
			pen.moveTo(this.X, this.Y);
			pen.lineTo(this.X+x_inter, this.Y+y_inter);
			pen.stroke();
			this.canvassizes[which_canvas]+=1;
		}
	},
	waitmouseTrackRandom: function (max_size,max_far,max_perframe,maximum,freshrate) {
		this.freshrate = freshrate;
		this.maximum = maximum;
		this.max_size = max_size;
		this.max_perframe = max_perframe;
		this.max_far = max_far;
		this.mod = 1;
	},
	startmouseTrackRandom: function (max_size,max_far,max_perframe,maximum,freshrate) {
		this.freshrate = freshrate;
		this.maximum = maximum;
		this.max_size = max_size;
		this.max_perframe = max_perframe;
		this.max_far = max_far;
		this.started = true;
		this.mod = 1;
		document.addEventListener('mousemove', this.mousepath.bind(this));

		this.strated_intervel =setInterval(this.mouseanimation.bind(this), this.freshrate);
	},
	mousepath:function (e) {
		e = e || window.event;
		e.preventDefault();
		this.X = e.clientX;
		this.Y = e.clientY;
		},

	mouseanimation:function () {
		const qun = this.randomQun(this.max_perframe);
		for(var i =0; i<qun ;i++){
			const x_inter = this.randomDistributed(-this.randomRadius(this.max_far)+this.randomRadius(this.max_far))
			const y_inter =this.randomDistributed(-this.randomRadius(this.max_far)+this.randomRadius(this.max_far))
			this.generateParticle(this.randomColor(),Math.random(),this.X + x_inter
				,this.Y + y_inter,this.randomRadius(this.max_size))
		}
	},
	waitFirework:function (max_far,freshrate,max_size,maximum,max_perframe){
		this.maximum = maximum;
		this.max_far = max_far;
		this.max_size = max_size;
		this.freshrate = freshrate;
		this.max_perframe = max_perframe;
		this.mod = 3;
	},
	startFirework:function (max_far,freshrate,max_size,maximum,max_perframe){
		this.maximum = maximum;
		this.max_far = max_far;
		this.max_size = max_size;
		this.max_perframe = max_perframe;
		this.started = true;
		this.mod = 3;
		this.strated_intervel =setInterval(this.fireworkSeries.bind(this), freshrate);
	},

	fireworkSeries: function(){
		const x = screen.width * Math.random() - window.innerWidth * Math.random();
		const y = screen.height * Math.random() -  window.innerHeight * Math.random();
		this.max_far = this.max_far/4;
		this.max_perframe =this.max_perframe/4;
		this.firework(x,y);
		this.max_far = this.max_far*2;
		this.max_perframe =this.max_perframe*2;
		setTimeout(this.firework(x,y), 20);
		setTimeout(this.firework(x,y), 20);
		this.max_far = this.max_far*2;
		this.max_perframe =this.max_perframe*2;
		setTimeout(this.firework(x,y), 20);
		setTimeout(this.firework(x,y), 20);
		this.max_far = this.max_far;
		this.max_perframe =this.max_perframe;
		setTimeout(this.firework(x,y), 10);
		setTimeout(this.firework(x,y), 20);
		setTimeout(this.firework(x,y), 10);
		this.max_far = this.max_far/2;
		this.max_perframe =this.max_perframe/2;
		setTimeout(this.firework(x,y), 10);
		setTimeout(this.firework(x,y), 20);
		setTimeout(this.firework(x,y), 10);
		this.max_far = this.max_far/2;
		this.max_perframe =this.max_perframe/2;
		setTimeout(this.firework(x,y), 20);
		setTimeout(this.firework(x,y), 10);
		this.max_far = this.max_far*4;
		this.max_perframe =this.max_perframe*4;
	},


	firework:function (x,y) {
		const qun = this.randomQun(this.max_perframe);
		for(var i =0; i<qun ;i++) {
			const x_inter = this.randomDistributed(-this.randomRadius(this.max_far) + this.randomRadius(this.max_far))
			const y_inter = this.randomDistributed(-this.randomRadius(this.max_far) + this.randomRadius(this.max_far))
			this.generateParticle(this.randomFirework(), Math.random(), x + x_inter
				, y + y_inter, this.randomRadius(this.max_size))
		}
	},

}

function DesignerDiv(id) {
	this.id = id;
	this.style =
		"z-index:2147 ; position: absolute; background-color: gray; border: 5px solid blue; text-align: center; padding: 10px; color:white;";
	this.div = [];
	this.positionY = 0;
	this.oriY = 0;
	this.oriX = 0;
	this.positionX = 0;
	this.ondrag = false;
	this.left = "0";
	this.top = "50";
	this.height = "40";
	this.width = "100";
	this.designMod = true;
	this.editable = true;
}
DesignerDiv.prototype = {
	newDesignerDiv: function(content){
		const newDiv = document.createElement('div');
		newDiv.id = this.id;
		newDiv.style = this.style+"left:"+this.left+"px; top:"+this.top+"px; height:"+this.height+"px;"+" width:"+this.width+"px;";
		newDiv.appendChild(content);
		const container = document.querySelector('body');
		container.appendChild(newDiv);
		this.div.push(newDiv);

		if(this.designMod){
			const checks = document.createElement('div');
			checks.id ="checks"+this.id
			checks.style = "position: absolute; top:"+(this.top-20)+"px; left:"+this.left+"px;";
			checks.style.backgroundColor = '#1ac6ff';
			const checkbox1lab = document.createElement('div');
			checkbox1lab.style ="font-size: 15px; float:left";
			checkbox1lab.innerHTML ="Zoom";
			const checkbox1 = document.createElement('input');
			checkbox1.type = 'checkbox';
			checkbox1.style = " float:left";
			checkbox1.id = 'check1'+this.id;
			checkbox1.value = "Zoom";
			checkbox1.checked = false;
			const checkbox2lab = document.createElement('div');
			checkbox2lab.innerHTML ="Drag";
			checkbox2lab.style ="font-size: 15px; float:left"
			const checkbox2 = document.createElement('input');
			checkbox2.type = 'checkbox';
			checkbox2.id = 'check2'+this.id;
			checkbox2.value = "Drag";
			checkbox2.checked = false;
			checks.appendChild(checkbox1lab);
			checks.appendChild(checkbox1);
			checks.appendChild(checkbox2lab);
			checks.appendChild(checkbox2);
			this.div.push(checks);
			container.appendChild(checks)
		}
		if(this.editable){
			const editbutton = document.createElement('button');
			editbutton.id = "editbutton"+this.id
			editbutton.innerHTML = "Edit :"+this.id;
			editbutton.style.backgroundColor = "gray";
			const tp = parseInt(this.top)+30+parseInt(this.height);
			editbutton.style = "position: absolute; top:"+tp+"px; left:"+this.left+"px;";
			editbutton.onclick = this.startEdit.bind(this);
			this.div.push(editbutton)
			container.appendChild(editbutton);
		}
		
		this.dragElement();
	},
	startEdit: function(){
		const donebutton = document.createElement('button')
		donebutton.innerHTML = "Update"
		donebutton.style.position = "absolute"
		donebutton.style.top = "80%"
		donebutton.style.width = "10%"
		donebutton.style.left = "45%"
		donebutton.onclick = this.finishEdit.bind(this);
		const editcontainer = document.createElement('div');
		editcontainer.id = "edit_con"+this.id;
		editcontainer.style.position = 'absolute'
		editcontainer.style.zIndex = "4999"
		editcontainer.style.width = "100%";
		editcontainer.style.height = "100%";
		editcontainer.style.top = "0"
		editcontainer.style.background = "gray";
		const editwindow = document.createElement('TEXTAREA');
		editwindow.id = "edit"+this.id;
		editwindow.style.position = 'absolute'
		editwindow.style.left = "15%"
		editwindow.style.top = "10%"
		editwindow.style.zIndex = "10000"
		editwindow.style.width = "70%";
		editwindow.style.height = "70%";
		editwindow.style.fontSize ="large"
		var t = document.createTextNode(document.getElementById(this.id).innerHTML);
  		editwindow.appendChild(t);
		editcontainer.appendChild(editwindow);
		editcontainer.appendChild(donebutton);
		const container = document.querySelector('body');
		container.appendChild(editcontainer);

	},
	finishEdit: function(){
		const text = document.getElementById("edit"+this.id).value;
		//alert("If the text area can not be selected, please diable all the particle effects firstly and try again. It is posiible to be a z-index fault")
		document.getElementById(this.id).innerHTML = text;
		const old_container = document.getElementById("edit_con"+this.id);
		old_container.remove();

	},
	getStyle: function () {
		console.log(this.id+"\n"+this.style+"left:"+this.left+"px; top:"+this.top+"px; height:"+this.height+"px;"+" width:"+this.width+"px;");
		return this.style+"left:"+this.left+"px; top:"+this.top+"px; height:"+this.height+"px;"+" width:"+this.width+"px;";
	},

	changeStyleDesignerDiv: function (newStyle) {
	this.style = newStyle;

	if(this.div.length >= 1){
	this.div[0].style = newStyle;
	this.div[0].style.height = this.height + "px";
	this.div[0].style.width = this.width + "px";
	this.div[0].style.left = this.left + "px";
	this.div[0].style.top = this.top + "px";
	}
	},

	getDiv: function (key,newStyle) {
		return this.div[0]
	},

	dragElement: function() {
			this.div[0].addEventListener('mousedown',this.dragStart.bind(this))
			document.addEventListener('mousemove',this.elementDrag.bind(this))
			document.addEventListener('mouseup',this.dragEnd.bind(this))
	},

	dragStart: function(e){
		if(this.designMod&& document.getElementById("check2"+this.id) && document.getElementById("check2"+this.id).checked ===true){
			document.getElementById("check1"+this.id).checked = false;
			this.div[0].style.cursor = 'move';
			e = e || window.event;
			e.preventDefault();
			this.positionX = e.clientX;
			this.positionY = e.clientY;
			this.ondrag = true;
			this.div[0].style.top = (this.positionY) + "px";
			this.top =(this.positionY);
			this.div[0].style.left = (this.positionX) + "px";
			this.left =(this.positionX);
			if(this.designMod){
				this.div[1].style.top = (this.positionY-20) + "px";
				this.div[1].style.left = (this.positionX) + "px";
			}
			if(this.editable){
				this.div[2].style.top = (parseInt(this.positionY)+parseInt(this.height)+30) + "px";
				this.div[2].style.left = (this.positionX) + "px";
			}
		}
		else if(this.designMod && document.getElementById("check1"+this.id)&& document.getElementById("check1"+this.id).checked ===true){
			e = e || window.event;
			e.preventDefault();
			this.div[0].style.cursor = 'nesw-resize';
			this.positionX = e.clientX;
			this.oriX = e.clientX;
			this.positionY = e.clientY;
			this.oriY = e.clientY;
			this.ondrag = true;
		}
	},

	dragEnd: function(){
		if(this.ondrag){
		this.div[0].style.cursor = 'default';
		this.ondrag = false;
		this.getStyle();
		if(this.editable){
			this.div[2].style.top = (parseInt(this.div[0].style.top)+parseInt(this.div[0].style.height)+30) + "px";
			this.div[2].style.left = (this.div[0].style.left) + "px";}
	}
	},

	elementDrag :function(e){
		if(this.designMod && document.getElementById("check2"+this.id)&& document.getElementById("check2"+this.id).checked === true){
		e = e || window.event;
		e.preventDefault();
		if(this.ondrag) {
		this.positionX = e.clientX;
		this.positionY = e.clientY;
		this.div[0].style.top = (this.positionY) + "px";
		this.top =(this.positionY);
		this.div[0].style.left = (this.positionX) + "px";
		this.left =(this.positionX);
		if(this.editable){
			this.div[2].style.top = (parseInt(this.positionY)+parseInt(this.height)+30) + "px";
			this.div[2].style.left = (this.positionX) + "px";
			}
		
		if(this.designMod){
			this.div[1].style.top = (this.positionY-20) + "px";
			this.div[1].style.left = (this.positionX) + "px";
			}
		}

		}
		else if(this.designMod && document.getElementById("check1"+this.id)&& document.getElementById("check1"+this.id).checked ===true){
			e = e || window.event;
			e.preventDefault();
			if(this.ondrag) {
				this.positionX = e.clientX;
				this.positionY = e.clientY;
				this.div[0].style.height = (this.positionY - this.oriY) + "px";
				this.height = (this.positionY - this.oriY);
				this.div[0].style.width = (this.positionX - this.oriX ) + "px";
				this.width = (this.positionX - this.oriX );
				if(this.editable){
					this.div[2].style.top = (parseInt(this.div[0].style.top)+parseInt(this.div[0].style.height)+30) + "px";
					this.div[2].style.left = (this.div[0].style.left) + "px";}
			}
		}
	},
}



