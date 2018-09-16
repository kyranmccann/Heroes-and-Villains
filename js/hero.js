class GameObject{
  constructor(options){
  this.createdAt = options.createdAt;
  this.dimensions = options.dimensions;
  }
  destroy() {
  return `${this.name} has been vaquished.`
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
    this.salves = 4;
    this.pronouns = [
    'she',
    'her',
    'was',
    'is',
    'her',
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
attack(opponent) {
  let damageNum = Math.floor(Math.random() * this.level);
  if (damageNum === 0) {
    return `${this.name} ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} tried to attack with ${this.pronouns[1]} ${this.adjectives[Math.floor(Math.random()*this.adjectives.length)]}  ${this.equippedWeapon} but missed.`;
  }
  opponent.hp -= damageNum;
  if (opponent.hp <= 0) {
    return `Well I guess today goes to the forces of evil. The attack lands and decimates the hero. ` + opponent.destroy();
  }
  let opponentAttackMessageOptions = [
    `${this.name} launches into an impassioned speech about personal autonomy and otological theory. ` + opponent.takeDamage() +  ` and are now at ${opponent.hp} HP.`,
    `${this.name} reminds you of all the problems inherent in controlling feral cat populations. ` + opponent.takeDamage() +  ` and are now at ${opponent.hp} HP.`,
    `${this.name} tells you to calm down. You're upset for perfectly understandable reasons, and being told to calm down just makes you lose it for some reason. You lose ${damageNum} HP and are now at ${opponent.hp} HP.`,
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
  this.salves = 4;
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
  }
  heal() {
  if (this.salves === 0) {
    return `You remember those things from earlier, but they're foggy and don't do anything.`;
  }
  let healNum = Math.floor(Math.random() * this.level);
  if (healNum === 0) {
    return `Oops, you can't get the top off of the healing salve bottle. Darn childproof tops. But child safety is important so you'll just try again later when feeling stronger than a child.`;
  }
  this.salves -= 1;
  this.hp += healNum;
  let healMessageOptions = [
    `The healing potion reminds you of sweet summer nights with friends in simpler times. You are revived by ${healNum} HP and are now at ${this.hp} HP.`,
    `The healing potion is sweet, and you remember how soft kittens are and the warm and fuzzies heal your soul. You are revived by ${healNum} HP and are now at ${this.hp} HP.`,
  ]
  return healMessageOptions[Math.floor(Math.random()*messageOptions.length)];
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
        return `You ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} tried to attack with your ${this.adjectives[Math.floor(Math.random()*this.adjectives.length)]} ${this.equippedWeapon} but missed. You dropped it on your foot instead for -1 HP. You are now at ${this.hp} HP.`;
      }
      opponent.hp -= damageNum;
      if (opponent.hp <= 0) {
        return `You attack and kill ${opponent.name} with your ${this.equippedWeapon}. The irony is not lost on you.` + opponent.destroy();
      }
      return `You ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} throw your ${this.adjectives[Math.floor(Math.random()*this.adjectives.length)]} ${this.equippedWeapon} at ${opponent.name} for a possible maximum ${damageNum} HP damage. ` + opponent.genericTakeDamage() +`.`;
    }; //end player successfull attack


}//end PlayerHero


const opponent = new GenericVillain({
  createdAt: new Date(),
  hp: 20,
  name: 'Moral Dilemma of Violence',
  weapons: [
    'a lengthy speech',
    'your memories of past indescretions',
  ],
  level: 5,
})

const player = new PlayerHero({
  createdAt: new Date(),
  hp: 20,
  name: 'Snow White',
  weapons: [
    'attack dwarf',
    'frying pan',
  ],
  level: 6,
})



document.getElementById('hero-fight').onclick = function(){
  let success = Math.floor(Math.random()*10);
  if (success < 4){
      document.getElementById('message-area').innerHTML = opponent.attack(player);
  }
  else {
    document.getElementById('message-area').innerHTML = player.attack(opponent);
  };
};

document.getElementById('hero-heal').onclick = function(){
    document.getElementById('message-area').innerHTML = player.heal();
};
