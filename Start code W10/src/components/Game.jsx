import React, { useState } from "react";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random value in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: `${isPlayer ? "Player" : "Monster"} takes ${damage} damage`,
    color: isPlayer ? "purple" : "red",
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: `Player healed ${healing} life points`,
    color: "green",
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [health, setHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [gameOver, setGameOver] = useState(false); // Game over state

  const maxHealth = 100;

  // ----------------------------------------------------------------------------------------------------------
  // HELPER FUNCTION TO CHECK GAME OVER
  // ----------------------------------------------------------------------------------------------------------
  function checkGameOver(playerHealth, monsterHealth) {
    if (playerHealth <= 0) {
      setGameOver(true);
      setLogs([{ text: "Game Over! Monster wins!", color: "red" }]);
    } else if (monsterHealth <= 0) {
      setGameOver(true);
      setLogs([{ text: "Congratulations! You defeated the Monster!", color: "green" }]);
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // BUTTON EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function handleAttack() {
    if (gameOver) return;

    const playerDamage = getRandomValue(5, 10);
    const monsterDamage = getRandomValue(8, 12);

    setHealth((prevHealth) => {
      const newHealth = Math.max(prevHealth - monsterDamage, 0);
      checkGameOver(newHealth, monsterHealth);
      return newHealth;
    });

    setMonsterHealth((prevHealth) => {
      const newHealth = Math.max(prevHealth - playerDamage, 0);
      checkGameOver(health, newHealth);
      return newHealth;
    });

    setLogs((prevLogs) => [
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
      ...prevLogs,
    ]);
  }

  function handleHeal() {
    if (gameOver) return;

    const healing = getRandomValue(8, 12);
    setHealth((prevHealth) => Math.min(prevHealth + healing, maxHealth));
    setLogs((prevLogs) => [createLogHeal(healing), ...prevLogs]);
  }

  function handleSpecialAttack() {
    if (gameOver) return;

    const playerDamage = getRandomValue(10, 15);
    const monsterDamage = getRandomValue(15, 20);

    setHealth((prevHealth) => {
      const newHealth = Math.max(prevHealth - monsterDamage, 0);
      checkGameOver(newHealth, monsterHealth);
      return newHealth;
    });

    setMonsterHealth((prevHealth) => {
      const newHealth = Math.max(prevHealth - playerDamage, 0);
      checkGameOver(health, newHealth);
      return newHealth;
    });

    setLogs((prevLogs) => [
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
      ...prevLogs,
    ]);
  }

  function handleKillYourself() {
    setHealth(0);
    setGameOver(true);
    setLogs([{ text: "Game Over! You gave up!", color: "gray" }]);
  }

  function handleRestart() {
    setHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setGameOver(false);
  }

  // Health percentage calculations
  const healthPercentage = (health / maxHealth) * 100;
  const monsterHealthPercentage = (monsterHealth / maxHealth) * 100;

  // ----------------------------------------------------------------------------------------------------------
  // GAME OVER SCREEN
  // ----------------------------------------------------------------------------------------------------------
  if (gameOver) {
    return (
      <div className="game-over">
        <h1>Game Over</h1>
        <p style={{ fontSize: "20px", fontWeight: "bold", color: logs[0]?.color }}>
          {logs[0]?.text}
        </p>
        <button onClick={handleRestart}>New Game</button>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------------------------------
  // MAIN TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <div className="game">
      <div className="container">
        <h1>Monster Health</h1>
        <div className="healthbar">
          <div className="healthbar__value" style={{ width: `${monsterHealthPercentage}%` }}></div>
        </div>
      </div>
      <div className="container">
        <h1>Your Health</h1>
        <div className="healthbar">
          <div className="healthbar__value" style={{ width: `${healthPercentage}%` }}></div>
        </div>
      </div>
      <div className="buttonbar">
        <button onClick={handleAttack}>ATTACK</button>
        <button onClick={handleHeal}>HEAL</button>
        <button onClick={handleSpecialAttack}>SPECIAL!</button>
        <button onClick={handleKillYourself}>Kill Yourself</button>
      </div>

      {/* Logs Section */}
      <div className="log-container">
        <h2>Battle Log</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index} style={{ color: log.color, fontWeight: "bold" }}>
              {log.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Game;
