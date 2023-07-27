import { useState } from "react";
import ShowText from "./ShowText";


function App() {
  const [text, setText] = useState("");
  const [showText, setShowText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const getLengths = (str) => {
    const characterLength = str.length;

    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode <= 0x7f) {
        byteLength += 1;
      } else if (charCode <= 0x7ff) {
        byteLength += 2;
      } else if (charCode >= 0xd800 && charCode <= 0xdfff) {
        // Surrogate pair: These take 4 bytes in UTF-8 and 2 chars in UCS-2
        // (Assume next char is the other [valid] half and just skip it)
        byteLength += 4; i++;
      } else {
        byteLength += 3;
      }
    }

    return (byteLength - characterLength) / 2 / characterLength > 0.5 ? true : false;
  }

  const handleEnter = (e) => {
    const isLanguage = getLengths(text) ? "英文" : "中文";

    const url = "https://ai.fakeopen.com/v1/chat/completions";

    if (e.key === "Enter") {
      fetch(url, {
        method: "POST",
        headers: {
          "Authorization": "Bearer fk-LYBTWDHMH5_IwLNls_WJVTdkgOJCKG7G_fZs6YMpmHY",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "max_tokens": 100,
          "messages": [
            {
              "role": "system",
              "content": "你是一个翻译助手，精通中英文翻译"
            },
            {
              "role": "user",
              "content": `请将以下文本翻译成 ${isLanguage}：${text}`,
            }
          ]
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          setShowText(res.choices[0].message.content);
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="w-[300px] m-0 p-0 bg-red-100">
      <div className="flex justify-center pt-3">
        <h4>划词翻译</h4>
      </div>
      <div className="w-full flex items-center justify-center">
        <textarea value={text} onChange={handleChange} onKeyDown={handleEnter} className="resize max-w-full w-[95%] h-14 mt-2" placeholder="按下Enter键，也可以翻译文本框的文本"></textarea>
      </div>
      <ShowText title={"ChatGPT"} content={showText} />
    </div>
  );
}

export default App;
