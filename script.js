
let countSpan =document.querySelector(".count span");

let bullets =document.querySelector(".bullets")


let bulletsSpanContainer =document.querySelector(".bullets .spans")

let quizArea = document.querySelector(".quiz-area")


let answerArea =document.querySelector(".answer-area");


let submitButton = document.querySelector(".submit-button");

let resultContainer =document.querySelector(".ruselt");


let countdownElement =document.querySelector(".countdown");

//set option

let currentIndex =0;
let rightAnswer = 0;

let countDownInterval;






function getQuestions() {

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange =function () {

        if(this.readyState === 4 && this.status === 200) 
        {

            // console.log(this.responseText);

            
            let questionsObject = JSON.parse(this.responseText);


            let questionsCount = questionsObject.length;
                          // console.log(questionsCount);
            // console.log(questionsObject);


            //create bullets +set question count

            createBullets(questionsCount);

            //add question data

            addQuestionData(questionsObject[currentIndex], questionsCount);



            //sart countdown

            countdown(5, questionsCount);


            //click on submit

            submitButton.onclick = () => {

                //get right answer
                let theRightAnswer = questionsObject[currentIndex].right_answer;
                // console.log(theRightAnswer);

                //increase index
                currentIndex++;


                //check the answer
                checkAnswer(theRightAnswer, questionsCount);


                // remove previous question

                quizArea.innerHTML ="";
                answerArea.innerHTML= "";


                //add question data

            addQuestionData(questionsObject[currentIndex], questionsCount);

            //handle bullets class

            handleBullets();

            //start countdown

            clearInterval(countDownInterval);
            countdown(5,questionsCount);

                //show result

                //

                showResult(questionsCount);




            };


        }
    }; 
    
    myRequest.open("get","html_questions.json", true);

    myRequest.send();
}


getQuestions();


function createBullets(num) {


    countSpan.innerHTML =num;


    //create spans
    
    for(let i=0 ; i<num; i++ ) {

        //create span

        let theBullet =document.createElement("span");
        //check the first span
        if (i==0)
        {
            theBullet.className="on";
        }

        //append bullets to main bullet container

        bulletsSpanContainer.appendChild(theBullet);
    };

}


function addQuestionData(obj, count) {


    if(currentIndex < count) {


   
  // create h2 question title


  let questionTitle =document.createElement("h2");

  //create questiontext

  let questiontext = document.createTextNode(obj['title'])

//append text to h2
questionTitle.appendChild(questiontext);


//append h2 to the quiz area

quizArea.appendChild(questionTitle);


//create answers 


for(let i=1; i<= 4;i++)
{
    //create main answer div


    let minDiv =document.createElement("div");
    
    //add class to mindiv

    minDiv.className = 'answer'

    //create radio input

    let radioInput =document.createElement("input");

    // add type +name + id + data attribute

    radioInput.name = 'question';
    radioInput.type = 'radio';
    radioInput.id = `answer_${i}`;
    radioInput.dataset.answer =obj[`answer_${i}`];

    //make first option selected
    
    if(i==1){

        radioInput.checked =true;
    }

    //create label

    let theLabel =document.createElement("label");

    //add for attribute

    theLabel.htmlFor = `answer_${i}`;

    //create label text

    let theLabelText =document.createTextNode(obj[`answer_${i}`]);

      //add the text to label

      theLabel.appendChild(theLabelText);

      //add input + label to main div

      minDiv.appendChild(radioInput);
      minDiv.appendChild(theLabel);

      //append all divs to answer area

      answerArea.append(minDiv);

}
    }

}

function checkAnswer (rAnswe, count) {

    // console.log(rAnswe);
    // console.log(count);

    let answers =document.getElementsByName("question");
    let theChooseAnswer;

    for( let i=0; i<answers.length;i++){

        if(answers[i].checked){

            theChooseAnswer =answers[i].dataset.answer;


        }
    }

    // console.log(`right answer is :${rAnswe}`);
    // console.log(`choosen answer is:${theChooseAnswer}`);


    if(rAnswe === theChooseAnswer) {

        rightAnswer++;
        console.log("Good Answer");
    }

    function handleBullets() {


    }
}


function handleBullets() {

    let bulletsSpans = document.querySelectorAll(".bullets .spans span");

    let arrayOfSpan =Array.from(bulletsSpans);

    arrayOfSpan.forEach((span,index) =>{

        if(currentIndex === index) {

            span.className ="on";

        }

    })

} 


function showResult(count) {

    let theResults;


    if ( currentIndex === count) {


        quizArea.remove();
        answerArea.remove();
        submitButton.remove();
        bullets.remove();

        if(rightAnswer >(count /2) && rightAnswer <count) {

            theResults =`<span class ="good"> Good</span> , ${rightAnswer} From ${count} Is Good.`;

        } else if (rightAnswer == count) {

            theResults =`<span class ="perfect"> perfect</span> , All Answers Is Good.`;



        } else {

            theResults =`<span class ="bad"> Bad</span> , ${rightAnswer} From ${count} Is Bad.`;

        }

        // console.log("Question is Finished");

        resultContainer.innerHTML =theResults;

        resultContainer.style.padding ="10px";

        resultContainer.style.backgroundColor ="white";

        resultContainer.style.marginTop ="10px";




    }
}

function countdown(duration ,count) 

{

    if(currentIndex < count) {

        let minutes, second;
        countDownInterval = setInterval(function (){

            minutes =parseInt(duration /60);
            second =parseInt(duration % 60);

            minutes = minutes<10? `0${minutes} `: minutes;

            second = minutes<10? `0${second} `: minutes;


            countdownElement.innerHTML =`${minutes}:${second} `;

            if(--duration <0) {

                clearInterval(countDownInterval);
                // console.log("finished");

                submitButton.click();

            }
            



        },1000)
    }


}