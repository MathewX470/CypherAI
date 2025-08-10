import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Homepage = () => {
  // 1. Initialize typingStatus with "user" to match the first speaker in the sequence
  const [typingStatus, setTypingStatus] = useState("user");

  // const test = async () => {
   
  //     const response = await fetch("http://localhost:3000/api/test", {
  //       credentials: "include",
  //     });

  // };

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Cypher AI</h1>
        <h2>Your Private, Intelligent AI Chat Companion</h2>
        <h3>
          Whether youre seeking help, exploring knowledge, or building with AI,
          Cypher AI is your undercover ally — always observing, always learning,
          always ready.
        </h3>
        <Link to="/dashboard">Get Started</Link>
        {/* <button onClick={test}>TEST BACKEND AUTH</button> */}
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />{" "}
          {/* This 'bot' image is likely for static display outside the chat box */}
          <div className="chat">
            <img
              src={
                // 2. Simple check: if status is 'user', show user image, else show bot image
                typingStatus === "user"
                  ? "/human1.jpg" // Ensure this is the correct path for your user image
                  : "/bot.png" // Ensure this is the correct path for your bot image
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                "User: What is Cypher AI?", // User initiates a common question
                2000,
                () => {
                  setTypingStatus("bot"); // Set status to 'bot' when bot speaks
                },
                "Cypher AI: I am your private, intelligent AI chat companion.", // Bot responds
                2000,
                () => {
                  setTypingStatus("user"); // Set status back to 'user' when user speaks again
                },
                "User: Can I trust my data with you?", // User asks about privacy
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Cypher AI: Absolutely. Your privacy is our top priority.", // Bot assures privacy
                2000,
                () => {
                  setTypingStatus("user");
                },
                "User: What kind of things can we talk about?", // User explores capabilities
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Cypher AI: Anything from brainstorming to creative writing.", // Bot explains versatility
                2000,
                () => {
                  setTypingStatus("user"); // Reset for next loop
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
