class GameObject{
  constructor(options){
  this.createdAt = options.createdAt;
  this.dimensions = options.dimensions;
  }
  destroy() {
  return `Game Over.`
}
}

class CharacterStats extends GameObject{
  constructor(characterOptions){
    super(characterOptions);
     this.hp = characterOptions.hp;
     this.name = characterOptions.name;
    this.level = characterOptions.level
  }

    takeDamage() {
  let messageOptions = [
    `don't duck in time`,
    `almost but don't quite get out of the way`,
    `fail to do anything about it`,
    `don't even see it coming`,
    `are too busy staring at ${this.pronouns[1]} phone to avoid it`,
  ]
  return `${this.name} ` + messageOptions[Math.floor(Math.random()*messageOptions.length)]
};

  genericTakeDamage() {
  let messageOptions = [
    `doesn't duck in time`,
    `almost but doesn't quite get out of the way`,
    `fails to do anything about it`,
    `doesn't even see it coming`,
    `is too busy staring at ${this.pronouns[1]} phone to avoid it`,
  ]
  return `${this.name} ` + messageOptions[Math.floor(Math.random()*messageOptions.length)]
};
};
 class Humanoid extends CharacterStats{
   constructor(humanoidOptions){
     super (humanoidOptions);
     this.weapons = humanoidOptions.weapons;
     this.pronouns = humanoidOptions.pronouns;
   };
   greet() {
  return `${this.name} offers a greeting in ${this.language}.`
};
 };

 class GenericHero extends Humanoid{
   constructor(gHeroOptions){
     super(gHeroOptions);
   this.level = gHeroOptions.level;
   this.equippedWeapon = this.weapons[0];
   this.potions = 4;
   this.adverbs = [
     'heroically',
     'bravely',
     'boldly',
     'courageously',
     'fearlessly',
     'valorously',
     'valiantly',
     'gallantly',
     'intrepedly',
   ];
   this.adjectives = [
     'light and fluffy',
     'hearty',
     'well-conditioned',
     'wholesome',
   ];
    this.pronouns = [
     'it',
     'its',
     'was',
     'is',
     'it',
     ];
   }
   heal(){
     let healNum = Math.floor(Math.random() * this.level);
     if (healNum === 0) {
       return
     }
     else {
       this.potions -= 1;
       this.hp += healNum;
     }
   }
 attack(opponent) {
   let damageNum = Math.floor(Math.random() * this.level);
   if (damageNum === 0) {
     let genericHeroMissedAttackMessages = [
       `${this.name} attempted to hold a mirror up to your life, but dropped and shattered the mirror instead.`,
       `${this.name} wanted to call a bunch of people who could prove its point, but just got a new phone and can't remember any of their phone numbers.`,
       `${this.name} starts to attack you but gets distracted by its own reflection`,
       `${this.name} takes a step toward you and trips. Pretty ironic that ${this.name} doesn't know where its own feet are.`,
     ];

     return genericHeroMissedAttackMessages[Math.floor(Math.random()*genericHeroMissedAttackMessages.length)];
   }
   opponent.hp -= damageNum;
   if (opponent.hp <= 0) {
     return `${this.name} burns away your shroud of delusion. You realize your antics would not be out of place in a cartoon about a moose and squirrel. You abandon your zany schemes in favor of learning taxidermy. ` + opponent.destroy();
   }

   let genericHeroAttackMessages = [
     `${this.name} tells you that you are doing that thing again. It cuts deep. You lose ${damageNum} HP.`,
     `${this.name} constructs a particularly well thought out analogy that illustrates you as the jerk in this story. ` + opponent.takeDamage() + ` and lose ${damageNum} HP.`,
     `${this.name} draws a Venn diagram comparing your master plan with a Bond villain. You `+ opponent.takeDamage() + ` and lose ${damageNum} HP.`,
     `${this.name} files a scathing review of your previous plans. You lose ${damageNum} HP.`,
     `${this.name} blinds you with the realization that you have lived too long. Where once you were the hero, now you have become the villain. You begin to consider retirement.`
   ]
   return genericHeroAttackMessages[Math.floor(Math.random()*genericHeroAttackMessages.length)];
 }; //end attack
 }
 //END GENERIC
 class PlayerVillain extends Humanoid{
   constructor(pVillainOptions){
     super(pVillainOptions);
     this.name = 'You';
     this.leve = 5;
     this.equippedWeapon = this.weapons[0];
     this.potions = 4;
     this.pronouns = [
     'you',
     'your',
     'were',
     'are',
     'you',
     ];
     this.adverbs = [
     'evilly',
     'wickedly',
     'spitefully',
     'villainously',
     'meanly',
     'malevolently',
     'maliciously',
     ];
     this.adjectives = [
     'evil',
     'dark and stormy',
     'noxious',
     'mischievous',
     'wicked',
     'pestiferous',
     ]
   }
  heal() {
   if (this.potions === 0) {
     return `You drink something out of a bottle in your bag. You're pretty sure there are some other things you could be angry about, but none are coming to mind. Huh. Looks like you're out of healing potions.`;
   }
   let healNum = Math.floor(Math.random() * this.level);
   if (healNum === 0) {
     return `Oops you can't get the top off of the healing salve bottle. Darn childproof tops. Darn children.`;
   }
   this.potions -= 1;
   this.hp += healNum;
   let healMessageOptions = [
     `The healing potion is bitter, and you remember how the townsfolk laughed at your invention that one time. Well you'll show them! Your relove to do violence in increased and you gain ${healNum} HP`,
     `The healing potion's salty taste reminds you of how children laughed when you tried to bring capes back into fashion. Your resolve is bolstered by ${healNum} HP.`,
     `The bitter potion brings to mind the time the council called your proposed policy revisions ineffectual and confusing. You can't possibly be the villain! You recover ${healNum} HP.`
   ]
  return healMessageOptions[Math.floor(Math.random()*healMessageOptions.length)];
 } //end heal
 attack(opponent) {
   // if (this.hp <= 0) {
   //   return `Uhhhhhh? You died. You can't attack anyone. Because you're dead. This isn't a zombie game.`;
   // }
   // if (opponent.hp <= 0) {
   //   return `Hey, ${opponent.name} is already out of the game. You won. Stop beating a dead horse. Go back to your evil lair and do something evil.`;
   // }
   let damageNum = Math.floor(Math.random() * this.level);
   if (damageNum === 0) {
     this.hp -= 1;
     return `You ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} tried to attack with your ${this.weapons[Math.floor(Math.random()*this.weapons.length)]} but missed. You dropped it on your foot instead. -1 HP. Great job.`;
   }
   opponent.hp -= damageNum;
   if (opponent.hp <= 0) {
      return `You manage to capture ${opponent.name} and put it in a tiny, metaphorical box. On a forgotten, metaphorical shelf. Where it can't do any harm to your grandiose and convoluted plans for local government. ` + opponent.destroy();
   }

   return `You hurl your ${this.weapons[Math.floor(Math.random()*this.weapons.length)]} at ${opponent.name}. ` + opponent.genericTakeDamage() + `.`;
   if ((opponent.hp < 5) && (opponent.potions > 0)){
     opponent.heal();
   }
 }; //attack

};

   const opponent = new GenericHero({
   createdAt: new Date(),
   hp: 20,
   name: 'Self Awareness',
   weapons: [
     'mirror',

   ],
   level: 6,
 });




   const player = new PlayerVillain({
   createdAt: new Date(),
   hp: 20,
   name: 'You',
   weapons: [
     'poison decoder ring',
     'foldable dagger from the town flea market',
     `rabid flying monkey sidekick`,
     `sheer sense of self-denial`,
   ],
   level: 5,
 });

function checkHP(){
  if (player.hp <= 0) {
    document.getElementById('message-area').innerHTML = `${opponent.name} burns away your shroud of delusion. You realize your antics would not be out of place in a cartoon about a moose and squirrel. You abandon your zany schemes in favor of learning taxidermy. ` + opponent.destroy();
    document.getElementById('start-over').innerHTML = `Start Over`;
    document.getElementById('restart-button').classList.remove('hidden');
    document.getElementById('villain-heal').classList.add('hidden');
    document.getElementById('villain-fight').classList.add('hidden');
  }
  if (opponent.hp <= 0){
    document.getElementById('message-area').innerHTML = `You manage to capture ${opponent.name} and put it in a tiny, metaphorical box. On a forgotten, metaphorical shelf. Where it can't do any harm to your grandiose and convoluted plans for local government. ` + opponent.destroy();
    document.getElementById('start-over').innerHTML = `Start Over`;
    document.getElementById('restart-button').classList.remove('hidden');
    document.getElementById('villain-heal').classList.add('hidden');
    document.getElementById('villain-fight').classList.add('hidden');
  }
}

window.setInterval(checkHP, 1000);

document.getElementById('villain-fight').addEventListener('click', function(){
  let success = Math.floor(Math.random()*10);
  if (success < 5){
      document.getElementById('message-area').innerHTML = opponent.attack(player);
      document.getElementById('player-hp').innerHTML = player.hp;
  }
  else {
    document.getElementById('message-area').innerHTML = player.attack(opponent);
    document.getElementById('player-hp').innerHTML = player.hp;
  };
});


document.getElementById('villain-heal').addEventListener('click', function(){
    document.getElementById('message-area').innerHTML = player.heal();
    document.getElementById('player-hp').innerHTML = player.hp;
    document.getElementById('player-potions').innerHTML = player.potions;
});
