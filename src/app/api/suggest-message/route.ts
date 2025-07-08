import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {


    try{
        const prompt="create a list of three open-ended and engaging questions formatted as single string. Each question should be separated by ||. there question for an annonymouns social mesaging platfrom,like Qooh.me,and should be suitable for a devierse audience.Avoid personal or sensitve topics,focusing insted on universal thems that encourage friendly interaction.for 'What's a hobby you've recently started || if you could have dinner with any historical figure,who would it be? || question are intriguing,foster curiosity,and contribute to a positive and welcoming conversational environment"
const { messages } = await req.json();

const result = streamText({
    model: openai('gpt-4o'),
    messages,
    prompt
  });

  return result.toDataStreamResponse();
    }catch(e){
        console.log("error occus in suggest message", e)
        return Response.json({ success: false, message: "error occus in suggest message" }, { status: 500 })
    }

  
}
