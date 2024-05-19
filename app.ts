#! /usr/bin/env node

import inquirer from "inquirer";
 
import chalk from "chalk"

const apiLink : string ="https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"

let fetchData = async (data:string) => {
    let fetchQuiz : any = await fetch (data)
    let res = await fetchQuiz.json()
    return res.results;
}

let data = await fetchData (apiLink);

let startQuiz = async() => {
    let score :number = 0
    let name = await inquirer.prompt({
        type:"input",
        name:"userName",
        message:"What is ur name:"
    })
    for(let i=1; i<11; i++ ){
        let answers = [...data[i].incorrect_answers,data[i].correct_answer];
        let ans = await inquirer.prompt({
            type:"list",
            name:"quiz",
            message:data[i].question,
            choices:answers.map((val:any) => val)
        });
        if(ans.quiz == data[i].correct_answer){
            ++score
            console.log(chalk.bold.italic.green("Correct Answer"));
          }else{
            console.log(`Correct answer is ${chalk.bold.italic.redBright(data[i].correct_answer)}`); 
          }

        }
            console.log(`Dear, ${chalk.yellowBright.bold(name.userName)},Your score is ${chalk.blueBright.bold(score)} out of ${chalk.white.bold("10")}`);
            
            
    }
    startQuiz()