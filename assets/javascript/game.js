



var game = {
	target: 0,//random selected number that user will try to hit from 19 to 120
	userCounter:0,// holds sum of clicked crystal values.
	crystals : [0,0,0,0],
	winsCount : 0,
	lossesCount : 0,

	start:function(){
		this.userCounter = 0;
		this.target = parseInt(19 + Math.random()*(120-19));
		for(var i=0; i<this.crystals.length;i++){
			this.crystals[i] = parseInt(1 + Math.random()*(12 -1));
		}
		this.render();
	},
	selectCrystal:function(index){
		var crystal = this.crystals[index];
		this.userCounter = this.userCounter + crystal;
		if(this.userCounter == this.target){
			this.winsCount++;
			this.start();

		}else if(this.userCounter > this.target){
			this.lossesCount++;
			this.start();
		}

		this.render();

	},
	render:function(){
		$('#target').text(this.target);
		$('#userCounter').text(this.userCounter);
		$('#winsCount').text(this.winsCount);
		$('#lossesCount').text(this.lossesCount);


	},

	print:function(){
		console.log('target: ' + this.target);
		console.log('userCounter: ' + this.userCounter);
		console.log('crystals: ' + this.crystals);
	}
};

$(document).ready(function(){

	game.start();
	game.print();

	$('.crystal').click(function() {
		var clickBtn = $(this);
		var crystalId = clickBtn.attr('data-id');
		game.selectCrystal(crystalId);
		
		
	})

	
})


