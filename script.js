
// création des variables
var player
var cursors
var controller
var position = 3200
var positionCrypte = 0
var tileset
var keySpace
var jardinTocimetiere = false

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


class menu extends Phaser.Scene{
    constructor(){
        super("menu");
    }

    preload(){
        //ici le code de la fonction preload
        this.load.image('menu', 'assetsjeu/image/menu.png');
        this.load.image('play', 'assetsjeu/image/play.png');  
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

    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload(){

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu","assetsjeu/image/tileset.png");
        this.load.tilemapTiledJSON("cartejardin","assetsjeu/carte_jardin.json")

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
        carteDuJardin = this.add.tilemap("cartejardin");

        // chargement du jeu de tuile
        tileset = carteDuJardin.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage des calques
 

        calque_sous_sol_ja = carteDuJardin.createLayer(
            "soussol",
            tileset
        );

        calque_sol_ja = carteDuJardin.createLayer(
            "sol",
            tileset
        );

        calque_sur_sol_ja = carteDuJardin.createLayer(
            "sursol",
            tileset
        );

        calque_eau_ja = carteDuJardin.createLayer(
            "eau",
            tileset
        );
        
        calque_trou_ja = carteDuJardin.createLayer(
            "trou",
            tileset
        );

        calque_obstacle_ja = carteDuJardin.createLayer(
            "obstacle",
            tileset
        );

        calque_fontaine_ja = carteDuJardin.createLayer(
            "fontaine",
            tileset
        );

        calque_grille_ja = carteDuJardin.createLayer(
            "grille",
            tileset
        );

        // affichage du personnage
        player = this.physics.add.sprite(2080, 256, 'perso');


        // reprendre l'affichage du des calques en mettant le decor
        calque_decor_ja = carteDuJardin.createLayer(
            "decor",
            tileset
        );

        // afficher les animations du personnage lorsqu'il se déplace
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

        // affichage des ennemis
        // définition de leur comportement

        // définir les collisions

        calque_eau_ja.setCollisionByProperty({ solide: true });
        calque_trou_ja.setCollisionByProperty({ solide: true });
        calque_obstacle_ja.setCollisionByProperty({ solide: true });
        calque_fontaine_ja.setCollisionByProperty({ solide: true });


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

        this.physics.add.collider(player, calque_eau_ja,);
        this.physics.add.collider(player, calque_trou_ja,);
        this.physics.add.collider(player, calque_obstacle_ja,);
        this.physics.add.collider(player, calque_fontaine_ja,);

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
        if (cursors.left.isDown /*|| controller.left*/){ //si la touche gauche est appuyée
            player.setVelocityX(-200); //alors vitesse négative en X
            player.anims.play('left', true); //et animation => gauche
            }
        else if (cursors.right.isDown /*|| controller.right*/){ //sinon si la touche droite est appuyée
            player.setVelocityX(200); //alors vitesse positive en X
            player.anims.play('right', true); //et animation => droite
        }
        else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            player.setVelocityY(0); //vitesse nulle
            player.anims.play('turn'); //animation fait face caméra
            }
        if (cursors.up.isDown /*|| controller.up*/){
            player.setVelocityY(-200); //alors vitesse positive en X
            player.anims.play('turn', true); //et animation => droite
            }
        else if (cursors.down.isDown /*|| controller.down*/){ //sinon si la touche droite est appuyée
                player.setVelocityY(200); //alors vitesse positive en X
                player.anims.play('turn', true); //et animation => droite
        }

        if (player.y <= 50){ 
            this.sceneCimetiere();
            jardinTocimetiere = true;
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




    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload(){

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu","assetsjeu/image/tileset.png");
        this.load.tilemapTiledJSON("cartecimetiere","assetsjeu/carte_cimetiere.json")

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
        carteDuCimetiere = this.add.tilemap("cartecimetiere");

        // chargement du jeu de tuile
        tileset = carteDuCimetiere.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage des calques
 

        calque_sous_sol_ci = carteDuCimetiere.createLayer(
            "soussol",
            tileset
        );

        calque_sol_ci = carteDuCimetiere.createLayer(
            "sol",
            tileset
        );

        calque_sur_sol_ci = carteDuCimetiere.createLayer(
            "surssol",
            tileset
        );

        calque_obstacle_ci = carteDuCimetiere.createLayer(
            "obstacle",
            tileset
        );

        calque_trou_ci = carteDuCimetiere.createLayer(
            "trou",
            tileset
        );

        calque_eau_ci = carteDuCimetiere.createLayer(
            "eau",
            tileset
        );

        calque_grille_ci = carteDuCimetiere.createLayer(
            "grille",
            tileset
        );

        calque_chapelle_ci = carteDuCimetiere.createLayer(
            "chapelle",
            tileset
        );

        // affichage du personnage
        if (jardinTocimetiere == false){
            player = this.physics.add.sprite(2080, this.position, 'perso');
        }

        else if (jardinTocimetiere == true){
            player = this.physics.add.sprite(2080, 3200, 'perso');
        }

        calque_decor_ci = carteDuCimetiere.createLayer(
            "decor",
            tileset
        );

        calque_decor_bis_ci = carteDuCimetiere.createLayer(
            "decorbis",
            tileset
        );

        calque_decor_tres_ci = carteDuCimetiere.createLayer(
            "decortres",
            tileset
        );


        // reprendre l'affichage du des calques en mettant le decor


        // afficher les animations du personnage lorsqu'il se déplace
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

        // affichage des ennemis
        // définition de leur comportement

        // définir les collisions

        calque_eau_ci.setCollisionByProperty({ solide: true });
        calque_trou_ci.setCollisionByProperty({ solide: true });
        calque_obstacle_ci.setCollisionByProperty({ solide: true });


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

        this.physics.add.collider(player, calque_eau_ci,);
        //this.physics.add.collider(player, calque_trou_ci,);
        this.physics.add.collider(player, calque_obstacle_ci,);

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
        if (cursors.left.isDown /*|| controller.left*/){ //si la touche gauche est appuyée
            player.setVelocityX(-200); //alors vitesse négative en X
            player.anims.play('left', true); //et animation => gauche
            }
        else if (cursors.right.isDown /*|| controller.right*/){ //sinon si la touche droite est appuyée
            player.setVelocityX(200); //alors vitesse positive en X
            player.anims.play('right', true); //et animation => droite
        }
        else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            player.setVelocityY(0); //vitesse nulle
            player.anims.play('turn'); //animation fait face caméra
            }
        if (cursors.up.isDown /*|| controller.up*/){
            player.setVelocityY(-200); //alors vitesse positive en X
            player.anims.play('turn', true); //et animation => droite
            }
        else if (cursors.down.isDown /*|| controller.down*/){ //sinon si la touche droite est appuyée
                player.setVelocityY(200); //alors vitesse positive en X
                player.anims.play('turn', true); //et animation => droite
        }

        if (player.y <= 200){ 
            this.sceneCrypte();
        };

        if (player.y >= 3350){
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



        // reprendre l'affichage du des calques en mettant le decor


        // afficher les animations du personnage lorsqu'il se déplace
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
        if (cursors.left.isDown /*|| controller.left*/){ //si la touche gauche est appuyée
            player.setVelocityX(-200); //alors vitesse négative en X
            player.anims.play('left', true); //et animation => gauche
            }
        else if (cursors.right.isDown /*|| controller.right*/){ //sinon si la touche droite est appuyée
            player.setVelocityX(200); //alors vitesse positive en X
            player.anims.play('right', true); //et animation => droite
        }
        else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            player.setVelocityY(0); //vitesse nulle
            player.anims.play('turn'); //animation fait face caméra
            }
        if (cursors.up.isDown /*|| controller.up*/){
            player.setVelocityY(-200); //alors vitesse positive en X
            player.anims.play('turn', true); //et animation => droite
            }
        else if (cursors.down.isDown /*|| controller.down*/){ //sinon si la touche droite est appuyée
                player.setVelocityY(200); //alors vitesse positive en X
                player.anims.play('turn', true); //et animation => droite
        }

        if (player.y >= 3328){
            this.sceneCimetiere();
        }
    }

    sceneCimetiere(){
        this.scene.start("cimetiere",{positionCrypte: 416})
        jardinTocimetiere = false;
    }

};



var config = {
    type: Phaser.AUTO,
    width: 4160, height: 3456,
    physics: {
        default: 'arcade',
        arcade: {
        debug: true
    }},
    pixelArt:true,
    input:{gamepad:true},
    scene: [menu,jardin,cimetiere,crypte],
        
};

new Phaser.Game(config);


