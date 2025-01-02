
import React from 'react';
import ReactDOM from 'react-dom';
import { Chat } from '@progress/kendo-react-conversational-ui';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.user = {
            id: 1,
            avatarUrl: "https://via.placeholder.com/24/008000/008000.png"
        };
        this.bot = { id: 0 };
        this.state = {
            messages: [
                {
                    author: this.bot,
                    timestamp: new Date(),
                    text: "Hello I am Jessie.Make me say happy birthday to you"
                }
            ],
            specialCharUsed:false
        };
    }

    addNewMessage = (event) => {
        let botResponce = Object.assign({}, event.message);
        botResponce.text = this.getTheAnswer(event.message.text);
        botResponce.author = this.bot;
        this.setState((prevState) => ({
            messages: [
                ...prevState.messages,
                event.message
            ]
        }));
        setTimeout(() => {
            this.setState(prevState => ({
                messages: [
                    ...prevState.messages,
                    botResponce
                ]
            }));
        }, 10);
    };

    getTheAnswer = (question) => {
     
      let specialCharEntered=false;
      let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/~]/;
      let answer='',questionVal='';
      questionVal=format.test(question)?'ERROR ERROR.Use of special Character breaks the chatbot':question.replace(/you/gi, "me");
      if(format.test(question))
      this.setState((prevState) => ({
            specialCharUsed:true
        }));
    answer=this.state.specialCharUsed?question:questionVal;
          return answer;
    }

    render() {
        return (
            <div>
                <Chat user={this.user}
                id = {this.user.id}
                    messages={this.state.messages}
                    onMessageSend={this.addNewMessage}
                    placeholder={"Type a message..."}
                    width={400}>
                </Chat>
				<div className='win'  style={{
    display:this.state.specialCharUsed?'':'none'}}  >
					<h1>Congratulations</h1>
					<h2>You won this level!</h2>
				  </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);

