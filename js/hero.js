class GameObject{
  constructor(options){
  this.createdAt = options.createdAt;
  this.dimensions = options.dimensions;
  }
  destroy() {
  return `${this.name} has been vanquished.`
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
    `are too busy staring at your phone to avoid it`,
  ]
  return `You ` + messageOptions[Math.floor(Math.random()*messageOptions.length)]
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
 };

class GenericVillain extends Humanoid{
  constructor(gVillainOptions){
    super(gVillainOptions);
    this.equippedWeapon = this.weapons[0];
    this.potions = 4;
    this.pronouns = [
    'it',
    'its',
    'was',
    'is',
    'it',
    ];
    this.adverbs = [
    'evilly',
    'wickedly',
    'spitefully',
    'villainously',
    'malevolently',
    'maliciously',
    ];
    this.adjectives = [
    'abiguous',
    'dark and stormy',
    'noxious',
    'mischievous',
    'wicked',
    'pestiferous',
    ]
  }
attack(opponent) {
  let damageNum = Math.floor(Math.random() * this.level);
  if (damageNum === 0) {
    let genericVillainMissedAttackMessages = [
      `${this.name} attempts to attack you with its ${this.weapons[Math.floor(Math.random()*this.weapons.length)]} but misses.`,
      `${this.name} starts to take a step toward you but sees a tiny bug in its path and doesn't want to hurt it.`,
      `${this.name} moves like it's going to attack but its phone rings.`,
      `${this.name} takes a swing at you but just ends up hitting itself like a cartoon.`
    ]
    return genericVillainMissedAttackMessages[Math.floor(Math.random()*genericVillainMissedAttackMessages.length)];
  }
  opponent.hp -= damageNum;
  if (opponent.hp <= 0) {
    return `Well I guess today goes to ${this.name}. A soul-shattering monologue about the butterfly effect and innocent victims of violence lands directly on your psyche and you are destroyed. `
  }
  let opponentAttackMessageOptions = [
    `${this.name} launches into an impassioned speech about personal autonomy and otological theory. ` + opponent.takeDamage() +  ` and lose ${damageNum} HP.`,
    `${this.name} reminds you of all the problems inherent in controlling feral cat populations. ` + opponent.takeDamage() +  ` and it smarts to the tune of ${damageNum} HP.`,
    `${this.name} tells you to calm down. You're upset for perfectly understandable reasons, and being told to calm down just makes you lose it. You lose ${damageNum} HP.`,
  ]
  return  opponentAttackMessageOptions[Math.floor(Math.random()*opponentAttackMessageOptions.length)]
}; //generic villain attack
}

class PlayerHero extends Humanoid{
  constructor(pHeroOptions){
    super(pHeroOptions);
   this.name = 'You';
  this.level = 5;
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
  }
  heal() {
  if (this.potions === 0) {
    return `You still remember those things from earlier, but they're foggy and don't do anything.`;
  }
  let healNum = Math.floor(Math.random() * this.level);
  if (healNum === 0) {
    return `Oops, you can't get the top off of the healing salve bottle. Darn childproof tops. But child safety is important so you'll just try again later when feeling stronger than a child.`;
  }
  this.potions -= 1;
  this.hp += healNum;
  let healMessageOptions = [
    `The healing potion reminds you of sweet summer nights with friends in simpler times. You are revived by ${healNum} HP.`,
    `The healing potion is sweet, and you remember how soft kittens are and the warm and fuzzies heal your soul. You are revived by ${healNum} HP.`,
    `The smell of the potion floods your senses with memories of beach days with your puppy. You recover ${healNum} HP.`
  ]
  return healMessageOptions[Math.floor(Math.random()*healMessageOptions.length)];
} //end player heal
attack(opponent) {
      if (this.hp <= 0) {
        return `Uhhhhhh? You died. You can't attack anyone. Because you're dead. This isn't a zombie game.`;
      }
      if (opponent.hp <= 0) {
        return `Look, ${opponent.name} is already out of the game. Light triumphed over darkness. Stop beating a dead horse.`;
      }
      let damageNum = Math.floor(Math.random() * this.level);
      if (damageNum === 0) {
        this.hp -= 1;
        return `You ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} tried to attack with your ${this.weapons[Math.floor(Math.random()*this.weapons.length)]} but missed. You dropped it on your foot instead for -1 HP. Well done. You are now at ${this.hp} HP.`;
      }
      opponent.hp -= damageNum;
      if (opponent.hp <= 0) {
        return `You attack and kill ${opponent.name} with your ${this.equippedWeapon}. The irony is not lost on you.` + opponent.destroy();
      }
      return `You ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} throw your ${this.weapons[Math.floor(Math.random()*this.weapons.length)]} at your opponent. ` + opponent.genericTakeDamage() +`.`;
      if ((opponent.hp < 5) && (opponent.potions > 0)){
        opponent.heal();
      }
    }; //end player successfull attack


}//end PlayerHero


const opponent = new GenericVillain({
  createdAt: new Date(),
  hp: 20,
  name: 'The Moral Dilemma of Violence',
  weapons: [
    'lengthy speech',
    'projection of your own violent memories',
    `sassy protest signs`,
  ],
  level: 7,
})

const player = new PlayerHero({
  createdAt: new Date(),
  hp: 20,
  name: 'You',
  weapons: [
    'sword',
    'frying pan',
    `comically large axe`,
  ],
  level: 6,
})

function checkHP(){
  if (player.hp <= 0) {
    document.getElementById('message-area').innerHTML = `Well I guess today goes to ${opponent.name}. A soul-shattering monologue about the butterfly effect and innocent victims of violence lands directly on your psyche and you are destroyed. `;
    document.getElementById('start-over').innerHTML = `Start Over`;
    document.getElementById('restart-button').classList.remove('hidden');
    document.getElementById('hero-heal').classList.add('hidden');
    document.getElementById('hero-fight').classList.add('hidden');
  }
  if (opponent.hp <= 0){
    document.getElementById('message-area').innerHTML = `You attack and kill ${opponent.name} with your ${this.equippedWeapon}. The irony is not lost on you.` + opponent.destroy();
    document.getElementById('start-over').innerHTML = `Start Over`;
    document.getElementById('restart-button').classList.remove('hidden');
    document.getElementById('hero-heal').classList.add('hidden');
    document.getElementById('hero-fight').classList.add('hidden');
  }
}

window.setInterval(checkHP, 1000);

document.getElementById('hero-fight').onclick = function(){
  let success = Math.floor(Math.random()*10);
  if (success < 5){
      document.getElementById('message-area').innerHTML = opponent.attack(player);
      document.getElementById('player-hp').innerHTML = player.hp;
  }
  else {
    document.getElementById('message-area').innerHTML = player.attack(opponent);
  };
};

document.getElementById('hero-heal').onclick = function(){
    document.getElementById('message-area').innerHTML = player.heal();
    document.getElementById('player-hp').innerHTML = player.hp;
    document.getElementById('player-potions').innerHTML = player.potions;
};
