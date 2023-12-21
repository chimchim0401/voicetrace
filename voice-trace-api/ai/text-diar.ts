import { AssemblyAI } from 'assemblyai'
import fs from 'fs'
import TextSpeech from './text-speecht'
import {} from 'multer'


const client = new AssemblyAI({
  apiKey: '7008b89e20b94206b3cfbb9c08b71dfd'
})


async function transcribe(url?: string) : Promise<TextSpeech[]> {

  // url audio
  const audio = url ||
    'https://github.com/AssemblyAI-Examples/' +
    'audio-examples/raw/main/20230607_me_canadian_wildfires.mp3'


  const transcript = await client
    .transcripts
    .transcribe({
      audio, 
      speaker_labels: true,
    })

  if(!transcript.utterances){
    return []
  }

  return transcript
    .utterances
    .map(
      u => ({
        speaker: u.speaker,
        text: u.text
      })
    )

}



export default transcribe