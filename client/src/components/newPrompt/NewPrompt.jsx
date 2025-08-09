import { IKImage } from "imagekitio-react";
import Upload from "../upload/Upload";
import "./newPrompt.css";
import { useEffect, useRef, useState } from "react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      // maxOutputTokens:100,
    },
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [answer, prompt, img.dbData]);

  const add = async (text) => {
    try {
      setPrompt(text);

      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );

      //Stream the response
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      setImg({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
      });
    } catch (error) {
      console.log("response error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    if (!text) return;

    add(text);

    
  };

  return (
    <>
      {/* add new chat */}
      {img.isLoading && <div className="loading">Uploading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {prompt && <div className="message user">{prompt}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
