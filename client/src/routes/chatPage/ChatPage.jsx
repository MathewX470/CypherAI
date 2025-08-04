
import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/newPrompt";

const ChatPage = () => {
  

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test Message ai lore</div>
          <div className="message user">
            Test Message user Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Corrupti illo debitis doloribus iusto, amet
            similique asperiores sequi at deleniti esse exercitationem
            reiciendis minus molestias accusantium maiores, ratione sapiente
            nostrum quasi?
          </div>
          <div className="message">Test Message ai</div>
          <div className="message user">Test Message user</div>
          <div className="message">Test Message ai</div>
          <div className="message user">Test Message user</div>
          <div className="message">Test Message ai</div>
          <div className="message user">Test Message user</div>
          <div className="message">Test Message ai</div>
          <div className="message user">Test Message user</div>
          <div className="message">Test Message ai</div>
          <div className="message user">Test Message user</div>


          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
