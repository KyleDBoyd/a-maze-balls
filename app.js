window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    var platforms, player;
    var SPEED = 500;
    var BOUNCE = 0.2;

    var projectiles;
    var nextFire;
    var fireRate = 500;

    function preload () {

	    game.load.image('back', 'res/tile-back.png');
    	game.load.spritesheet('link', 'res/link.png', 90, 90);
    	//game.load.spritesheet('fireball', 'res/fireball.png', 64, 64);
    	game.load.spritesheet('projectile', 'res/orb.png', 32, 32);


    }

    function create () {

	    //  We're going to be using physics, so enable the Arcade Physics system
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //Set the game boundaries so we can move outside the bounds of the screen
	    game.world.setBounds(0, 0, 1600, 1200);
	 
	    //  A simple background for our game
	    back = game.add.tileSprite(0, 0, 1600, 1200, 'back');
	    //back.fixedToCamera = true;
	 
	    player = game.add.sprite(game.world.width/2, game.world.height/2, 'link');

	    //Moving inside this Rectangle will not cause the camera to move.
    	//game.camera.deadzone = new Phaser.Rectangle(0, 0, 3000, 3000);

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
    
	    //Camera lock on the player
	    game.camera.follow(player);
    	//game.camera.focusOnXY(player.body.position.x+45, player.body.position.y+45);

    	//  Reset the players velocity (movement)
	    player.body.velocity.x = player.body.velocity.y = 0;

	    //Projectiles
	    nextFire = game.time.now;
	    projectiles = game.add.group();
	    projectiles.enableBody = true;
	    projectiles.physicsBodyType = Phaser.Physics.ARCADE;
	    projectiles.createMultiple(30, 'projectile', 0, false);
	    projectiles.setAll('anchor.x', 0.5);
	    projectiles.setAll('anchor.y', 0.5);
	    projectiles.setAll('checkWorldBounds', true);
	    
    }

    function update() {

    	//SWITCH to CURSORS
    	var keyboard = game.input.keyboard;
    	var cursors = game.input.keyboard.createCursorKeys();

        if (keyboard.isDown(Phaser.Keyboard.LEFT))
	    {
	    	player.body.velocity.y = 0;
	        //  Move to the left
	        player.body.velocity.x = -SPEED;
	 
	        player.animations.play('left');
	    }
	    else if (keyboard.isDown(Phaser.Keyboard.RIGHT))
	    {
	    	player.body.velocity.y = 0;
	        //  Move to the right
	        player.body.velocity.x = SPEED;
	 
	        player.animations.play('right');
	    }
	    else if (keyboard.isDown(Phaser.Keyboard.UP))
	    {
	    	player.body.velocity.x = 0;
	        //  Move to the right
	        player.body.velocity.y = -SPEED;
	 
	        player.animations.play('up');
	    }
	    else if (keyboard.isDown(Phaser.Keyboard.DOWN))
	    {
	    	player.body.velocity.x = 0;
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

	    if (keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	    {
	    	console.log("SPACE PRESSED");
			var orb = game.add.sprite(player.x, player.y, 'orb');
			game.physics.arcade.enable(orb);
			orb.body.velocity.x = player.body.velocity.x;
			orb.body.velocity.y = player.body.velocity.y;
	    }

	    if (game.input.activePointer.isDown)
	    {
	    	console.log("MOUSE PRESSED");
	        fire();
	    }

	}

	function fire () { 
		
		if (game.time.now > nextFire) 
	    {
	        nextFire = game.time.now;// + fireRate;
	        var projectile = projectiles.getFirstExists(false);
	        projectile.reset(player.x+45, player.y+45);
	        projectile.rotation = game.physics.arcade.moveToPointer(projectile, 1000, game.input.activePointer, 500);
		}

	}

};