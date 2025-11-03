import { useEffect, useState } from "react"
import {HamburgerIcon, LogoIcon, BoyIcon, FlowerIcon, BearIcon}  from "./icons";
import { Flashcard } from "./Flashcard";
import { greeting, questions, gratitude, finalPhrase } from "./constants";
export const App = () => {
  const mutedQuestions = questions.map(item => { // don't forget change back to the questions
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
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const date = new Date();
  const stringifiedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  const [showBear, setShowBear] = useState(false)
  useEffect(() => {
    console.log(showBear)
  }, [showBear])
  return (
    <>
    <div className="notification">For mobile devices only!
    </div>
    <div className="frame">
      <div className="list">
        <div className="head">
          <div className="title">
          <div><LogoIcon /></div>
           <div>S&O</div>
           <div>
<HamburgerIcon />
</div>
          </div>
        </div>
      </div>
    </div>
    {!startTesting ? <div className="container">
      {!finalAlert ? <>
      <div className="pre_testing_alert" id="greeting"><div>Сьогодні {stringifiedDate}. </div>{greeting}
      </div> <div> <div className="option startBtn" onClick={() => setStartTesting(true)}>Почати</div></div>
      </>: null}
      {finalAlert && !showBear ? <><div className="pre_testing_alert">
        <div>Результат: {points} з {maxPoints} балів</div>
        <hr />
        <BoyIcon /><FlowerIcon />
        <div className="gratitude">{gratitude}</div></div>
      <div><div className="option startBtn" onClick={() => setShowBear(true)}>Забрати приз</div></div>
      </>: null}
      {showBear ? <><div className="pre_testing_alert"> 
        <div  className="finalPhrase" >{finalPhrase}</div><BearIcon /></div></> : null }
    </div> : null}
    { startTesting ? <div className="container">
      <Flashcard flashcard={mutedQuestions[currentQuestion.id]} flip={flip}/>
      
      <div className="options">
      {currentQuestion.options.map((item, idx) => <div  data-id={idx} key={idx} 
      style={{backgroundColor: item.isCorrect ? `${btnColor}` : clickedId === idx ? `yellow` : "white"}} className="option"
      onClick={() => {
        setTimeout(() => {
          setClickedId(idx);
          setShowNextBtn(true);
        }, 0);
        if(item.isCorrect) {
          setBtnColor("yellow");
          setPoints(prev => prev + 20)
        }
        setTimeout(() => {
          setFlip(true);
          setBtnColor('aquamarine');
        }, 1500);
        setTimeout(() => {
        setMaxPoints(prev => prev + 20)
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
      }}>{currentQuestion.id === 4 ? 'Завершити' : 'Далі'}</div>
      <div className="option nextBtn" style={{display: !showNextBtn ? `block`: `none`}}>
          {points} з {maxPoints} балів
      </div>
      </div>
    </div> : null}

  </>
  )
}
