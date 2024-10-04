import { useState } from "react"
import {HamburgerIcon, LogoIcon, BoyIcon, FlowerIcon}  from "./icons";
import { Flashcard } from "./Flashcard";
import { questions } from "./question";
export const App = () => {

  const [startTesting, setStartTesting] = useState(false);
  const [flip, setFlip] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [btnColor, setBtnColor]= useState('white')
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [finalAlert, setFinalAlert]= useState(false);
  
  return (
    <>
    <div className="notification">For mobile devices only!</div>
    <div className="frame">
      <div className="list">
        <div className="head">
          <div className="title">
          <div><LogoIcon /></div>
           <div>Medilab</div>
           <div>
<HamburgerIcon />
</div>
          </div>
        </div>
      </div>
    </div>
    {!startTesting ? <div className="container">
      {!finalAlert ? <>
      <div className="pre_testing_alert">Ви прослухали лекцію за 03.10.2024 року. Пропонуємо Вам пройти тестування!
      </div> <div> <div className="option startBtn" onClick={() => setStartTesting(true)}>Почати</div></div>
      </>: <><div className="pre_testing_alert">Щиро дякую за відповіді! <BoyIcon /><FlowerIcon /></div>
      </>}
      
    </div> : null}
    { startTesting ? <div className="container">
      <Flashcard flashcard={questions[currentQuestion.id]} flip={flip}/>
      
      <div className="options">
      {currentQuestion.options.map((item, idx) => <div key={idx} style={{backgroundColor: currentQuestion.correct === item ? `${btnColor}` : `white`}}className="option" 
      onClick={() => {
        if(currentQuestion.correct !== item) return;
        setBtnColor("yellow");
        setTimeout(() => {
          setFlip(true);
          setBtnColor('aquamarine');
        }, 1500);
        setTimeout(() => {
        setShowNextBtn(true);
        }, 2500);
        }}>{item}</div>)}
      </div>
      <div className="nextDiv"><div className="option nextBtn" style={{display: showNextBtn ? `block`: `none`}} onClick={() => {
        setFlip(false)
        setCurrentQuestion(prev => questions[prev.id + 1]);
        setBtnColor(`white`);
        setShowNextBtn(false);
        if (currentQuestion.id === 4) {
          setStartTesting(false);
          setFinalAlert(true)
        }
      }}>{currentQuestion.id === 4 ? 'Завершити' : 'Далі'}</div></div>
    </div> : null}

  </>
  )
}
