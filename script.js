
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')



const updateGame = (p1, p2, gameState) => {
  // Updates the DOM with the names and health
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health

  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true
    gameState = game.isOver
    resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
    return gameState
  }
}


class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  strike(player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg)
    enemy.health -= damageAmount
    updateGame(p1, p2, game.isOver)
    return `${player.name} attacks ${enemy.name} for ${damageAmount} damage!`
  }
  // Heals the player
  heal(player) {
    let hpAmount = Math.ceil(Math.random() * 5)
    player.health += hpAmount
    //  Updates the game and DOM
    updateGame(p1, p2, game.isOver)
    return `${player.name} heals for ${hpAmount} HP!`
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }
  declareWinner(isOver, p1, p2) {
    let message = "TIE!"
    if (isOver = true && p1.health <= 0) {
      message = `${p2.name} Wins!`
    }
    else if (isOver = true && p2.health <= 0) {
      message = `${p1.name} Wins!`
    }
    // victory sound
    document.getElementById('victory').play()
    return message
  }

  reset(p1, p2) {
    p1.health = 100
    p2.health = 100
    gameState.isOver = false
    resultDiv.innerText = ''
    updateGame(p1, p2, gameState)
  }

  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    game.reset(p1, p2)
    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2, p1, p2.attackDmg)
      p1.heal(p1)
    }
    game.declareWinner(game.isOver, p1, p2)
  }
}

let player1 = new Player('Nir', 100, 10)
let player2 = new Player('Lance', 100, 10)

let p1 = player1
let p2 = player2

let game = new Game()

let gameState = game

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  if (e.key == 'q' && p2.health > 0 && gameState.isOver == false) {
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById('p1attack').play()
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == 'a' && p1.health > 0 && gameState.isOver == false) {
    p1.heal(p1)
    document.getElementById('p1heal').play()
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  if (e.key == 'p' && p1.health > 0 && gameState.isOver == false) {
    p2.strike(p2, p1, p2.attackDmg)
    document.getElementById('p2attack').play()
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == 'l' && p2.health > 0 && gameState.isOver == false) {
    p2.heal(p2)
    document.getElementById('p2heal').play()
  }
});
updateGame(p1, p2, gameState)