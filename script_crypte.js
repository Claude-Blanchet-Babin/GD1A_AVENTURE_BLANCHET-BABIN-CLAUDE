
// création des variables
var player
var cursors
var controller
var position = 3200
var positionCrypte = 0
var tileset
var keySpace
var atk
var shift
var interagir
var intangible = false
var collisiongrille
var PLAYER_SPEED = 200
var jardinTocimetiere
var positionCimetiere


// variables de la carte du jardin
var carteDuJardin
var calque_sous_sol_ja
var calque_sol_ja
var calque_sur_sol_ja
var calque_eau_ja
var calque_trou_ja
var calque_obstacle_ja
var calque_fontaine_ja
var calque_grille_ja
var calque_decor_ja
var calque_decor_bis_ja


// variables de la carte du cimetière
var carteDuCimetiere
var calque_sous_sol_ci
var calque_sol_ci
var calque_sur_sol_ci
var calque_obstacle_ci
var calque_trou_ci
var calque_eau_ci
var calque_grille_ci
var calque_chapelle_ci
var calque_decor_ci
var calque_decor_bis_ci
var calque_decor_tres_ci

// variables de la carte de la crypte

var carteDuCrypte
var calque_sol_cr
var calque_grille_cr
var calque_obstacle_cr
var calque_eau_cr
var calque_rocher_cr
var calque_trou_cr
var calque_decor_cr


export class crypte extends Phaser.Scene{
    constructor(){
        super("crypte");
    }
    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload(){

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu","assetsjeu/image/tileset.png");
        this.load.tilemapTiledJSON("cartecrypte","assetsjeu/carte_crypte.json")

        // chargement de l'interface utilisateur et des collectables


        // chargement du personnage
        this.load.spritesheet("perso","assetsjeu/image/perso.png",
        { frameWidth: 32, frameHeight: 48 });  
        
        // chargement des ennemis

    }

    // création des variables



    // création du niveau
    create(){

        // chargement de la carte 
        carteDuCrypte = this.add.tilemap("cartecrypte");

        // chargement du jeu de tuile
        tileset = carteDuCrypte.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage des calques
 

        calque_sol_cr = carteDuCrypte.createLayer(
            "sol",
            tileset
        );

        calque_grille_cr = carteDuCrypte.createLayer(
            "grille",
            tileset
        );

        calque_obstacle_cr = carteDuCrypte.createLayer(
            "obstacle",
            tileset
        );

        calque_eau_cr = carteDuCrypte.createLayer(
            "eau",
            tileset
        );

        calque_rocher_cr = carteDuCrypte.createLayer(
            "rocher",
            tileset
        );

        calque_trou_cr = carteDuCrypte.createLayer(
            "trou",
            tileset
        );

        calque_decor_cr = carteDuCrypte.createLayer(
            "decor",
            tileset
        );



        // affichage du personnage
        player = this.physics.add.sprite(2080, 3250, 'perso');
        player.setSize(24,3).setOffset(37,90);



        // reprendre l'affichage du des calques en mettant le decor


        // afficher les animations du personnage lorsqu'il se déplace
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:4}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'gauche',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'droite',
            frames: this.anims.generateFrameNumbers('perso', {start:20,end:24}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'dos',
            frames: this.anims.generateFrameNumbers('perso', {start:15,end:19}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'face',
            frames: this.anims.generateFrameNumbers('perso', {start:10,end:14}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attaque',
            frames: this.anims.generateFrameNumbers('perso', {start:25,end:29}),
            frameRate: 10,
            repeat: 0
        }); 

        // affichage des ennemis
        // définition de leur comportement

        // définir les collisions

        //calque_eau_cr.setCollisionByProperty({ solide: true });
        //calque_trou_cr.setCollisionByProperty({ solide: true });
        calque_obstacle_cr.setCollisionByProperty({ solide: true });


        // affichage de l'objet débloquant la nouvelle capacité

        // affichage des pièces pouvant être ramassées pour faire monter le score

        // affichage des fragments de lumière permettant de faire remonter la vie du personnage
    
        // création de la détéction du clavier
        cursors = this.input.keyboard.createCursorKeys();
        // intégration de la barre espace
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // intégrer les commandes d'une manette
        this.input.gamepad.once('connected', function (pad) {
            controller = pad;
        });

        // faire en sorte que le joueur collide avec les obstacles

        this.physics.add.collider(player, calque_eau_cr,);
        this.physics.add.collider(player, calque_trou_cr,);
        this.physics.add.collider(player, calque_obstacle_cr,);

        // création de la caméra
        // taille de la caméra
        this.cameras.main.setSize(708,400);

        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
        this.cameras.main.startFollow(player);
        this.cameras.main.setDeadzone(100,100);
        this.cameras.main.setBounds(0,0,4160,3456);

        // affichage de l'interface utilisateur

        // séparation des calques selon l'effet souhaité sur le personnage

        // le joueur prend des dégâts s'il touche l'eau

        // le joueur est téléporté au début du niveau s'il tombe dans un trou

        // le personnage perd de la vie s'il touche un ennemi

        // le score change s'il attrape une pièce

        // la vie remonte s'il ramasse un fragment de lumière

        // le personnage obtient une nouvelle capacité s'il ramasse un objet

        // création des différents niveaux de vie dans l'interface
    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update(){

        // ajout des moyens de déplacement du personnage
        if (cursors.left.isDown && (!cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown)){
            //this.playerState.isMoving = true;
            //this.player.direction = {x : -1, y : 0};
            player.setVelocityX(-PLAYER_SPEED); 
            player.setVelocityY(0);
            player.anims.play('gauche', true); 
        }

        if (cursors.left.isDown && cursors.up.isDown && (!cursors.right.isDown && !cursors.down.isDown)){
            player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2)/2); 
            player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2/2)); 
            player.anims.play('gauche', true); 
        }

        if (cursors.left.isDown && cursors.down.isDown && (!cursors.right.isDown && !cursors.up.isDown)){
            player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2/2));
            player.setVelocityY(PLAYER_SPEED * (Math.SQRT2/2));
            player.anims.play('gauche', true); 
        }


        if (cursors.right.isDown && (!cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown)){ //sinon si la touche droite est appuyée
            player.setVelocityX(PLAYER_SPEED);
            player.setVelocityY(0);
            player.anims.play('droite', true); 
        }

        if (cursors.right.isDown && cursors.down.isDown && (!cursors.left.isDown && !cursors.up.isDown)){
            player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            player.setVelocityY(PLAYER_SPEED * (Math.SQRT2)/2);
            player.anims.play('droite', true); 
        }

        if (cursors.right.isDown && cursors.up.isDown && (!cursors.left.isDown && !cursors.down.isDown)){
            player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2)/2);
            player.anims.play('droite', true); 
        }

        if (cursors.down.isDown && (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown)){
            player.setVelocityX(0);
            player.setVelocityY(PLAYER_SPEED);
            player.anims.play('face',true);
        }

        if (cursors.up.isDown && (!cursors.right.isDown && !cursors.down.isDown && !cursors.left.isDown)){
            player.setVelocityX(0);
            player.setVelocityY(-PLAYER_SPEED);
            player.anims.play('dos',true);
        }

        if (!cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown){ 
            player.setVelocityX(0);
            player.setVelocityY(0); 
            player.anims.play('idle',true); 
        }

        if (player.y >= 3328){
            this.sceneCimetiere();
            jardinTocimetiere = false
        }
    }

    sceneCimetiere(){
        this.scene.start("cimetiere",{entrance : "crypte"})
    }

};