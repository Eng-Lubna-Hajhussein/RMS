import { useRef, useState } from "react";
import { Button, Grid, SvgIcon, Typography } from "@basetoolkit/ui";
import { getBotMsg } from "appHelper/appFunctions";
import "./Chatbot.css";

function Chatbot() {
  const chatCircle = useRef();
  const chatBox = useRef();
  const userInput = useRef();
  const [chat, setChat] = useState([]);

  return (
    <>
      <div>
        <div
          id="chat-circle"
          class="btn btn-raised"
          ref={chatCircle}
          onClick={() => {
            chatBox.current.style.display = "grid";
            chatCircle.current.style.display = "none";
          }}
        >
          <div id="chat-overlay"></div>
          <SvgIcon icon="chat" variant="filled" color="white" />
        </div>
        <div class="chat-box" ref={chatBox}>
          <div class="chat-box-header">
            ChatBot
            <span
              class="chat-box-toggle"
              onClick={() => {
                chatBox.current.style.display = "none";
                chatCircle.current.style.display = "grid";
              }}
            >
              <SvgIcon icon="close" color="white" />
            </span>
          </div>
          <div class="chat-box-body">
            <div class="chat-box-overlay"></div>
            <div class="chat-logs">
              <Grid container>
                {chat.map((message) => (
                  <Grid
                    container
                    justifyContent={message?.isBot ? "right" : "left"}
                  >
                    {message?.isBot && (
                      <Grid
                        item
                        xs={12}
                        p={1}
                        container
                        justifyContent={message?.isBot ? "right" : "left"}
                      >
                        <Typography sx={{ fontSize: "14px", color: "#555" }}>
                          {message?.question}
                        </Typography>
                      </Grid>
                    )}
                    {message?.isBot && (
                      <Grid
                        item
                        xs={12}
                        container
                        justifyContent={message?.isBot ? "right" : "left"}
                      >
                        {message?.options?.map((opt) => (
                          <Grid item p={1}>
                            <Button
                              variant="outlined"
                              key={opt}
                              value={opt}
                              onClick={(e) => {
                                const userMsg = {
                                  msg: e.target.value,
                                  type: "constant",
                                  isBot: false,
                                };
                                const botMsg = {
                                  ...getBotMsg(userMsg),
                                  isBot: true,
                                };
                                setChat([
                                  ...chat,
                                  { ...userMsg },
                                  { ...botMsg },
                                ]);
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {opt}
                              </Typography>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                    {!message?.isBot && (
                      <Grid
                        item
                        xs={12}
                        container
                        justifyContent={message?.isBot ? "right" : "left"}
                      >
                        <Typography sx={{ fontSize: "14px", color: "#000" }}>
                          {message?.msg}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
          <div class="chat-input">
            <input type="text" id="chat-input" ref={userInput} />
            <button
              class="chat-submit"
              id="chat-submit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const userMsg = {
                  msg: userInput.current.value,
                  type: "dynamic",
                  isBot: false,
                };
                const botMsg = { ...getBotMsg(userMsg), isBot: true };
                setChat([...chat, { ...userMsg }, { ...botMsg }]);
                userInput.current.value = "";
              }}
            >
              <SvgIcon icon="send" variant="filled" color="secondary" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
