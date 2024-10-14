import { useState } from "react"
import {HamburgerIcon, LogoIcon, BoyIcon, FlowerIcon}  from "./icons";
import { Flashcard } from "./Flashcard";
import { questions } from "./question";
export const App = () => {
  const mutedQuestions = questions.map(item => {
    const newOptions = item.options.map(option => {
      const correctness = option === item.correct ? true : false;
      return {optionName: option, isCorrect: correctness}
    })
    return {...item, options: newOptions}
  })
  const [startTesting, setStartTesting] = useState(false);
  const [flip, setFlip] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(mutedQuestions[0]);
  const [btnColor, setBtnColor]= useState('white')
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [finalAlert, setFinalAlert]= useState(false);
  const [clickedId, setClickedId] = useState(null);
  const date = new Date();
  const stringifiedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
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
      <div className="pre_testing_alert">Пропонуємо Вам пройти тестування за {stringifiedDate}!
      </div> <div> <div className="option startBtn" onClick={() => setStartTesting(true)}>Почати</div></div>
      </>: <><div className="pre_testing_alert">Щиро дякую за відповіді! <BoyIcon /><FlowerIcon /></div>
      </>}
      
    </div> : null}
    { startTesting ? <div className="container">
      <Flashcard flashcard={mutedQuestions[currentQuestion.id]} flip={flip}/>
      
      <div className="options">
      {currentQuestion.options.map((item, idx) => <div  data-id={idx} key={idx} 
      style={{backgroundColor: item.isCorrect ? `${btnColor}` : clickedId === idx ? `yellow` : "white"}} className="option"
       id={true ? "pending" : ""}
      onClick={() => {
        setTimeout(() => {
          setClickedId(idx);
        }, 0);
        if(item.isCorrect) {
          setBtnColor("yellow");
        }
        setTimeout(() => {
          setFlip(true);
          setBtnColor('aquamarine');
        }, 1500);
        setTimeout(() => {
        setShowNextBtn(true);
        }, 2500);
        }}>{item.optionName}</div>)}
      </div>
      <div className="nextDiv"><div className="option nextBtn" style={{display: showNextBtn ? `block`: `none`}} onClick={() => {
        setClickedId(null);
        setFlip(false)
        setCurrentQuestion(prev => mutedQuestions[prev.id + 1]);
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
