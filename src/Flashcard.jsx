export const Flashcard = ({ flashcard, flip }) => {
  return (
    <div className={`card ${flip ? "flip" : ""}`}>
      <div className="front">
        <div className="cardHeader">Запитання {flashcard.id + 1} / 5</div>
        {flashcard.question}
      </div>
      <div className="back">{flashcard.correct}</div>
    </div>
  );
};
