//Last Updated: Ben Ray 1/13/22
import Player from "./Player";

const PlayerModal = ({ team, players, isVisible, closePlayerModal }) => {
  return (
    <>
      <div className={`players-modal ${isVisible}`}>
        <>
          <div className="header">
            <h2>{team}</h2>
            <div className="close-button" onClick={closePlayerModal}>
              Close
            </div>
          </div>
          <div>
            <div className="player header">
              <div className="jersey-number">No.</div>
              <div className="position">Poisition</div>
              <div className="full-name">Name</div>
              <div className="height">Height</div>
              <div className="weight">Weight</div>
              <div className="current-age">Age</div>
            </div>
            {players.map((player, i) => (
              <Player key={i} player={player} />
            ))}
          </div>
        </>
      </div>
    </>
  );
};

export default PlayerModal;
