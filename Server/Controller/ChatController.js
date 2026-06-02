const OpenAI = require("openai");  // import openai client for chat completion

const ChatModel = require("../model/ChatModel"); // DataBase

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // api key
  baseURL: "https://openrouter.ai/api/v1", // base url for openrouter api
});

const sendMessage = async (req, res) => {
  try {

    const { prompt } = req.body;  // user prompt from frontend

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // console.log("PROMPT =>", prompt);

    const completion =
      await client.chat.completions.create({   // create chat completion using openai client

        model: "openai/gpt-3.5-turbo", // model name

        messages: [
          {
            role: "user",  // role of the message (user, assistant, system)
            content: prompt,  // user prompt content
          },
        ],

      });

    const aiResponse =
      completion.choices[0].message.content;  // get ai response from completion object

    // SAVE CHAT
    const newChat = await ChatModel.create({
      userId: req.user.id,
      prompt,
      response: aiResponse,
    });

    res.status(200).json({
      success: true,
      reply: aiResponse,
      chat: newChat,
    });

  } catch (error) {

    console.log("FULL ERROR =>",error);

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Server Error",
    });
  }
};

// Get all chat's
const getchats = async (req, res) => {

  try {

    const chats = await ChatModel.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      chats,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Delete Chat

const deletechat = async (req, res) => {

  try {

    await ChatModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Chat Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
  sendMessage,
  getchats,
  deletechat,
};