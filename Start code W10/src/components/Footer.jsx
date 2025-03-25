import React, { useState, useEffect } from "react";

function createLogAttack(isPlayer, damage) {
    return {
      isPlayer: isPlayer,
      isDamage: true,
      text: `${isPlayer ? "Player" : "Monster"} takes ${damage} damage`,
    };
  }

  function createLogHeal(healing) {
    return {
      isPlayer: true,
      isDamage: false,
      text: `Player healed ${healing} life points`,
    };
  }

function Footer() {
    const [logs, setLogs] = useState([]);
    const isPlayer = true;
    const isDamage = true;
    const text = "";


    return (
        <div className="container">
            <h1>Battle Log</h1>
            <ul>
                {logs.map((log, index) => (
                    <li key={index} className={log.isPlayer ? "player" : "monster"}>
                        {log.isDamage ? "Player" : "Monster"} {log.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Footer;