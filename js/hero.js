class GameObject{
  constructor(options){
  this.createdAt = options.createdAt;
  this.dimensions = options.dimensions;
  }
  destroy() {
  return `${this.name} was removed from the game.`
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
 heal() {
  if (this.salves === 0) {
    return `${this.name} attempted to use a healing salve but forgot ${this.pronouns[1]} ran out. `;
  }
  let healNum = Math.floor(Math.random() * this.level);
  if (healNum === 0) {
    return `Oops ${this.name} can't get the top off of the healing salve bottle. Darn childproof tops. Darn children.`;
  }
  this.salves -= 1;
  this.hp += healNum;
  return `${this.name} used an abnormally bitter healing salve and it really got the evil blood pumping again! ${healNum} HP restored and ${this.pronouns[0]} ${this.pronouns[3]} now at ${this.hp} HP. `;
} //end heal


attack(opponent) {
  if (opponent.name === this.name) {
    if (this.hp <= 0) {
      return `Hey ${this.name}, I hate to have to remind you of this (because you kind of scare me), but you're dead and you can't attack anyone when you're dead. Not even yourself.`;
    }
    this.hp -= 1;
    if (this.hp <= 0) {
      return `Wooooooow, ${this.name}. You just managed to drop your ${this.equippedWeapon} on your foot, killing yourself.` + this.destroy() + `.`;
    }
    return `Did... did you just try to attack yourself, ${this.name}? Fine. You dropped your ${this.equippedWeapon} on your foot and lost 1 HP. You are now at ${this.hp} HP.`;
  }
  if (this.hp <= 0) {
    return `Uhhhhhh ${this.name}? You died. You can't attack anyone. Because you're dead. This isn't a zombie game.`;
  }
  if (opponent.hp <= 0) {
    return `Hey, ${opponent.name} is already out of the game. You won. Stop beating a dead horse. Go back to your evil lair and do something evil.`;
  }
  let damageNum = Math.floor(Math.random() * this.level);
  if (damageNum === 0) {
    return `${this.name} ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} tried to attack with ${this.pronouns[1]} ${this.adjectives[Math.floor(Math.random()*this.adjectives.length)]}  ${this.equippedWeapon} but missed.`;
  }
  opponent.hp -= damageNum;
  if (opponent.hp <= 0) {
    return `Well I guess today goes to the forces of evil. The attack lands and decimates the hero. ` + opponent.destroy();
  }
  return `${this.name} ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} hurls ${this.pronouns[1]} ${this.adjectives[Math.floor(Math.random()*this.adjectives.length)]} ${this.equippedWeapon} at ${opponent.name} for a possible ${damageNum} HP damage. ` + opponent.takeDamage() + ` and are now at ${opponent.hp} HP.`;
}; //attack
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
   this.pronouns = [
    'you',
    'your',
    'were',
    'are',
    'you',
    ];
  }
  heal() {
  if (this.salves === 0) {
    return `${this.name} attempted to use a healing salve from that nice witch but forgot ${this.pronouns[0]} ran out. If the darn things weren't so tasty...`;
  }
  let healNum = Math.floor(Math.random() * this.level);
  if (healNum === 0) {
    return `Oops ${this.pronouns[0]} can't get the top off of the healing salve bottle. Darn childproof tops. But child safety is important so ${this.pronouns[0]}\'ll just try again later when feeling stronger than a child.`;
  }
  this.salves -= 1;
  this.hp += healNum;
  return `${this.name} used a delicious healing salve and feel much better. ${healNum} HP restored and ${this.pronouns[0]} ${this.pronouns[3]} now at ${this.hp} HP. `;
} //end heal
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
        return `${this.name} ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} tried to attack with ${this.pronouns[1]} ${this.adjectives[Math.floor(Math.random()*this.adjectives.length)]} ${this.equippedWeapon} but missed. You dropped it on your foot instead for -1 HP. You are now at ${this.hp} HP.`;
      }
      opponent.hp -= damageNum;
      if (opponent.hp <= 0) {
        return `YEAH FORCES OF LIGHT! The attack lands and lands hard enough to kill. Wait are heroes supposed to kill people? ` + opponent.destroy();
      }
      return `${this.name} ${this.adverbs[Math.floor(Math.random()*this.adverbs.length)]} throw ${this.pronouns[1]} ${this.adjectives[Math.floor(Math.random()*this.adjectives.length)]} ${this.equippedWeapon} at ${opponent.name} for a possible maximum ${damageNum} HP damage. ` + opponent.genericTakeDamage() + ` and is now at ${opponent.hp} HP.`;
    }; //end successfull attack


}//end PlayerHero


const opponent = new GenericVillain({
  createdAt: new Date(),
  hp: 20,
  name: 'Moral Dilemma of Violence',
  weapons: [
    'poison apple',
    'that creepy mirror',
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

}
