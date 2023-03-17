
var player
var cursors
var position = 800
var positionCrypte = 0


class menu extends Phaser.Scene{
    constructor(){
        super("menu");
    }

    preload(){
        //ici le code de la fonction preload
        this.load.image('menu', 'menu.png');
        this.load.image('play', 'play.png');  
    }

    create(){
        //ici le code de la fonction create
        this.add.image(960, 540, 'menu');
        var bouton = this.add.image(960, 540, 'play').setInteractive();

        bouton.once('pointerup',this.sceneExterieur,this);
    }

    update(){
        //ici le code de la fonction update      
    }

    sceneExterieur(){
        this.scene.start("jardin")
    }

};

class jardin extends Phaser.Scene{
    constructor(){
        super("jardin");
    }
    preload(){
        //ici le code de la fonction preload
        this.load.image('jardin', 'jardin.png');
        this.load.spritesheet('perso','perso.png',
        { frameWidth: 32, frameHeight: 48 });     
    }

    create(){
        //ici le code de la fonction create
        this.add.image(960, 540, 'jardin');

        player = this.physics.add.sprite(960, 200, 'perso');
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
            frameRate: 10,
            repeat: -1
        });
    
        cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        //ici le code de la fonction update
        if (cursors.left.isDown){ //si la touche gauche est appuyée
            player.setVelocityX(-130); //alors vitesse négative en X
            player.anims.play('left', true); //et animation => gauche
            }
        else if (cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(130); //alors vitesse positive en X
            player.anims.play('right', true); //et animation => droite
        }
        else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            player.setVelocityY(0); //vitesse nulle
            player.anims.play('turn'); //animation fait face caméra
            }
        if (cursors.up.isDown){
            player.setVelocityY(-130); //alors vitesse positive en X
            player.anims.play('turn', true); //et animation => droite
            }
        else if (cursors.down.isDown){ //sinon si la touche droite est appuyée
                player.setVelocityY(130); //alors vitesse positive en X
                player.anims.play('turn', true); //et animation => droite
        }

        if (player.y <= 50){ 
            this.sceneCimetiere();
        };
            
    }

    sceneCimetiere(){
            this.scene.start("cimetiere")
    }

};

class cimetiere extends Phaser.Scene{
    constructor(){
        super("cimetiere");
    }

    init(data){this.position=data.positionCrypte;}


    preload(){
        //ici le code de la fonction preload
        this.load.image('cimetiere', 'cimetiere.png');
        this.load.spritesheet('perso','perso.png',
        { frameWidth: 32, frameHeight: 48 });     
    }

    create(){
        //ici le code de la fonction create

        this.add.image(960, 540, 'cimetiere');

        player = this.physics.add.sprite(960, this.position, 'perso');
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
            frameRate: 10,
            repeat: -1
        });
    
        cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        //ici le code de la fonction update
        if (cursors.left.isDown){ //si la touche gauche est appuyée
            player.setVelocityX(-130); //alors vitesse négative en X
            player.anims.play('left', true); //et animation => gauche
            }
        else if (cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(130); //alors vitesse positive en X
            player.anims.play('right', true); //et animation => droite
        }
        else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            player.setVelocityY(0); //vitesse nulle
            player.anims.play('turn'); //animation fait face caméra
            }
        if (cursors.up.isDown){
            player.setVelocityY(-130); //alors vitesse positive en X
            player.anims.play('turn', true); //et animation => droite
            }
        else if (cursors.down.isDown){ //sinon si la touche droite est appuyée
                player.setVelocityY(130); //alors vitesse positive en X
                player.anims.play('turn', true); //et animation => droite
        }

        if (player.y <= 50){ 
            this.sceneCrypte();
        };

        if (player.y >= 1000){
            this.sceneJardin();
        }

    }


    sceneCrypte(){
        this.scene.start("crypte")
    }

    sceneJardin(){
        this.scene.start("jardin")
    }
};

class crypte extends Phaser.Scene{
    constructor(){
        super("crypte");
    }
    preload(){
        //ici le code de la fonction preload
        this.load.image('crypte', 'crypte.png');
        this.load.spritesheet('perso','perso.png',
        { frameWidth: 32, frameHeight: 48 });     
    }

    create(){
        //ici le code de la fonction create
        this.add.image(960, 540, 'crypte');

        player = this.physics.add.sprite(960, 850, 'perso');
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
            frameRate: 10,
            repeat: -1
        });
    
        cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        //ici le code de la fonction update
        if (cursors.left.isDown){ //si la touche gauche est appuyée
            player.setVelocityX(-130); //alors vitesse négative en X
            player.anims.play('left', true); //et animation => gauche
            }
        else if (cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(130); //alors vitesse positive en X
            player.anims.play('right', true); //et animation => droite
        }
        else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            player.setVelocityY(0); //vitesse nulle
            player.anims.play('turn'); //animation fait face caméra
            }
        if (cursors.up.isDown){
            player.setVelocityY(-130); //alors vitesse positive en X
            player.anims.play('turn', true); //et animation => droite
            }
        else if (cursors.down.isDown){ //sinon si la touche droite est appuyée
                player.setVelocityY(130); //alors vitesse positive en X
                player.anims.play('turn', true); //et animation => droite
        }

        if (player.y >= 900){
            this.sceneCimetiere();
        }
    }

    sceneCimetiere(){
        this.scene.start("cimetiere",{positionCrypte: 200})
    }

};



var config = {
    type: Phaser.AUTO,
    width: 1920, height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
        debug: false
        }},
    scene: [menu,jardin,cimetiere,crypte],
        
};

new Phaser.Game(config);
