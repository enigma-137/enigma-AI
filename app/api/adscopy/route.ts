import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const intructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: "You are a marketing ads copy generator, you must write only marketable ads copy based the information provided"
}

// call API
export async function POST(req: Request) {
  try {
    // check for user
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check for openAi Key
    if (!openai.apiKey) {
      return new NextResponse("OpenAI Api Key not Configured", { status: 500 });
    }
// check for messages
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit()

    if(!freeTrial) {
      return new NextResponse("Free trial is expired", {status: 403})
    }

    // Get response
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [intructionMessage, ...messages]
    });


    await increaseApiLimit();

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("Code error", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
