//Last Updated: Ben Ray 1/13/22
import React, { useState, useEffect } from "react";

import teamServices from "../services/teamServices";

const Player = ({ player }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    teamServices
      .fetchPlayerLink(player.person.link)
      .then((res) => res.json())
      .then(
        (result) => {
          setHeight(result.people[0].height);
          setWeight(result.people[0].weight);
          setAge(result.people[0].currentAge);
        },

        (error) => {
          console.log(error);
        }
      );
  });

  return (
    <>
      <div className="player">
        <div className="jersey-number">{player.jerseyNumber}</div>
        <div className="position">{player.position.name}</div>
        <div className="full-name">{player.person.fullName}</div>
        <div className="height">{height}</div>
        <div className="weight">{weight}</div>
        <div className="current-age">{age}</div>
      </div>
    </>
  );
};

export default Player;
