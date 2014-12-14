window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    var platforms, player;
    var SPEED = 500;
    var BOUNCE = 0.2;

    function preload () {
	    game.load.image('square', 'res/square.png');
	    game.load.image('circle', 'res/circle.png');
	    game.load.image('back', 'res/windows-back.png');
    	game.load.spritesheet('zelda', 'res/zelda.png', 90, 90);
    }

    function create () {

	    //  We're going to be using physics, so enable the Arcade Physics system
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	 
	    //  A simple background for our game
	    game.add.sprite(0, 0, 'back');
	 
	    player = game.add.sprite(game.world.width/2, game.world.height-90, 'zelda');

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);
	 
	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = BOUNCE;
	    player.body.gravity.y = 0;
    	player.body.collideWorldBounds = true;
	 
	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3, 4], 10, true);
	    player.animations.add('right', [5, 6, 7, 8, 9], 10, true);
	  	player.animations.add('up', [10, 11, 12, 13, 14], 10, true);
	    player.animations.add('down', [15, 16, 17, 18, 19], 10, true);
    
    	//  Reset the players velocity (movement)
	    player.body.velocity.x = 0;
	    
    }

    function update() {

    	var cursors = game.input.keyboard.createCursorKeys();

        if (cursors.left.isDown)
	    {
	        //  Move to the left
	        player.body.velocity.x = -SPEED;
	 
	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.x = SPEED;
	 
	        player.animations.play('right');
	    }
	    else if (cursors.up.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.y = -SPEED;
	 
	        player.animations.play('up');
	    }
	    else if (cursors.down.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.y = SPEED;
	 
	        player.animations.play('down');
	    }
	    else
	    {
	    	player.body.velocity.x = player.body.velocity.y = 0;
	        //  Stand still
	        player.animations.stop();
	 
	        //player.frame = 17;
	    }
	    
	    if (cursors.space.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.y = SPEED;
	 
	        player.animations.play('down');
	    }
	}

};