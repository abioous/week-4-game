

function generateRandomInteger(min, max) {
	return parseInt(min + Math.random()*(max-min));
}


var game = {
	target: 0,//random selected number that user will try to hit from 19 to 120
	userCounter:0,// holds sum of clicked crystal values.
	crystals : [0,0,0,0],
	winsCount : 0,
	lossesCount : 0,


	generateCrystalNumbers:function(needOddNumber) {
		var hasOddNumerGenerated = false
		for(var i=0; i<this.crystals.length;i++){
			this.crystals[i] = generateRandomInteger(1, 12);
			var isOddNuber = this.crystals[i] % 2 != 0;
			if(isOddNuber) {
				hasOddNumerGenerated = true;
			}
		}
		//check if odd number is requried but 
		// non of the generated crystal is odd, then generate 
		// all crystals number again.
		if(needOddNumber && !hasOddNumerGenerated) {
			this.generateCrystalNumbers(needOddNumber);
		}
	},


	start:function(){
		this.userCounter = 0;
		this.target = generateRandomInteger(19, 120);
		var isTargetOdd = this.target % 2 != 0
		this.generateCrystalNumbers(isTargetOdd)

		
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
	
	$('.crystal').click(function() {
		var clickBtn = $(this);
		var crystalId = clickBtn.attr('data-id');
		game.selectCrystal(crystalId);
		
		
	})

	
})


