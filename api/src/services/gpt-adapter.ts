import axios from 'axios';
import config from 'config';
import 'dotenv/config';
import S3Adapter from './s3-adapter';


const chatGptKey = process.env.CHAT_GPT_KEY as string;

export default class GPTAdapter {
    private apiUrl: string;
    private interviewTranscriptsBucket: string;
    private s3Adapter: S3Adapter;

    constructor (s3Adapter: S3Adapter) {
        this.apiUrl = config.get('chatGPT.apiUrl');
        this.interviewTranscriptsBucket = config.get('s3.interviewTranscriptsBucket');

        this.s3Adapter = s3Adapter;
    }

    async evaluateInterviewGrammar(respondentEmail: string) {
        try {
            const interviewTranscriptKey = respondentEmail.replaceAll('@', '_').replaceAll('.', '_') + '.txt';
            const transcriptUrl = this.s3Adapter.getPresignedS3Url(
                this.interviewTranscriptsBucket,
                interviewTranscriptKey,
            );
    
            const transcript = await this.getTranscript(transcriptUrl);
    
            const data = await this.askGPTQuestion(transcript);
    
            const evaluationString = data.choices[0].message.content;
            const evaluationNumber = parseInt(evaluationString, 10);
    
            return isNaN(evaluationNumber) ? 0 : evaluationNumber * 10;
        } catch (error) {
            console.error("Failed to evaluate transcript", error);

            return 0;
        }
    }

    getTranscript = async (transcriptUrl) => {
        const response = await axios.get(transcriptUrl);

        return response.data;
    }

    askGPTQuestion = async (sentence: string) => {
        const body = {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `\
Could you evaluate grammar of the quoted sentence \
and respond me only with a number evaluating it on scale from 1 to 10, \
without mentioning the original sentence?: \"${sentence}\". \
Please answer using this format, in english: \"X\"`
              }
            ]
        };

        const response = await axios.post(
            this.apiUrl,
            body, {
                headers: {
                    'authorization': `Bearer ${chatGptKey}`
                },
            }
        );

        const { data } = response;

        return data;
    }
}