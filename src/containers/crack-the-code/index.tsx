import { useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";

import { TimeMachine } from "../time-machine";
import { QUESTION_MORSE_CODE, SAMPLE_MORSE_CODE } from "./morse-code.constant";

export function CrackTheCode() {
  const [showTimeMachine, setShowTimeMachine] = useState(false);

  return (
    <div>
      <div>
        <p>
          You are a brave one! For accepting the mission! And a smart one too for cracking the Prophesy. You have reached the
          location where the time machine is!
        </p>
        <p>Time Machine is already set to correct destination, but you will need a keyword to enter the future.</p>
        <p>
          Liberators wanted to test your puzzle solving knowledge before allowing you into the future, to make sure you are the
          one true Messiah. They sent you an encrypted message, the answer of the encrypted message will give you the keyword to
          enter in the time machine!
        </p>
        <p>
          But Oh oh! AI somehow got hold of this encrypted message and messed up with the encryption little bit and made it hard
          to debug! Decrypt the message and find the keyword to enter the future! A true Messiah is more than capable of
          decrypting the messages!
        </p>
      </div>

      <div>
        <p>Encrypted Message:</p>
        <ReactSyntaxHighlighter language="javascript" style={undefined}>
          {[QUESTION_MORSE_CODE]}
        </ReactSyntaxHighlighter>
      </div>

      <div>
        <p>GuideLines: </p>
        <p>It's a morse code with a twist</p>
        <div>
          If you use an online Morse decoder, it will fail to decode the message. For example, if you encode "awesome" and
          "eyesome", their encodings will be the same after removing the spaces :
          <ReactSyntaxHighlighter language="javascript">{[SAMPLE_MORSE_CODE]}</ReactSyntaxHighlighter>
          (try in any online Morse code editor for more understanding).
          <p>
            Your task is to find the correct popular phrase from the Morse code message and that will act as the password for the
            <b onClick={() => setShowTimeMachine(true)} style={{ cursor: "pointer" }}>
              {" "}
              TimeMachine.
            </b>
          </p>
        </div>
      </div>

      {showTimeMachine && <TimeMachine />}
    </div>
  );
}
