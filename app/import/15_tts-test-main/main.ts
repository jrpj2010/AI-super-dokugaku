import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import wav from 'wav';

dotenv.config();

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Please set GOOGLE_GENERATIVE_AI_API_KEY environment variable');
  console.error('Get your API key from: https://makersuite.google.com/app/apikey');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function main() {
  console.log('Gemini 2.5 Flash Preview TTS - Multi-Speaker Demo...');
  
  const ttsModel = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash-preview-tts'
  });

  // 複数話者の会話を含むプロンプト
  const prompt = `TTS the following conversation between Joe and Jane:
Joe: やあ、元気？
Jane: うん、元気だよ!
Joe: 今日は何をしているの？
Jane: 今日は友達と遊びに行く予定だよ。`;

  try {
    console.log('Generating multi-speaker audio...');
    
    // 音声生成のリクエスト（複数話者設定を含む）
    const result = await ttsModel.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        response_modalities: ['AUDIO'],
        speech_config: {
          multi_speaker_voice_config: {
            speaker_voice_configs: [
              {
                speaker: 'Joe',
                voice_config: {
                  prebuilt_voice_config: {
                    voice_name: 'Kore'
                  }
                }
              },
              {
                speaker: 'Jane',
                voice_config: {
                  prebuilt_voice_config: {
                    voice_name: 'Puck'
                  }
                }
              }
            ]
          }
        }
      }
    } as any);
    
    const response = await result.response;
    
    // 音声データの取得
    if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
      const audioData = response.candidates[0].content.parts[0].inlineData;
      const audioBuffer = Buffer.from(audioData.data, 'base64');
      
      console.log(`\nAudio format: ${audioData.mimeType}`);
      console.log(`File size: ${audioBuffer.length} bytes`);
      
      // WAVファイルとして保存
      await saveAsWav('output.wav', audioBuffer);
      
      console.log('\n✅ Multi-speaker audio saved to: output.wav');
      console.log('\n🎵 音声ファイルの再生:');
      console.log('- Mac: afplay output.wav');
      console.log('- Windows: Windows Media Playerで再生');
      console.log('- Linux: aplay output.wav');
      
    } else {
      console.log('No audio data in response');
      console.log('Response:', JSON.stringify(response, null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// WAVファイルとして保存する関数
async function saveAsWav(
  filename: string,
  pcmBuffer: Buffer,
  channels = 1,
  sampleRate = 24000
): Promise<void> {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels,
      sampleRate,
      bitDepth: 16
    });

    writer.write(pcmBuffer);
    writer.end();

    writer.on('finish', () => {
      console.log(`Wrote ${filename}`);
      resolve();
    });

    writer.on('error', (err) => {
      console.error(`Error writing ${filename}:`, err);
      reject(err);
    });
  });
}

main().catch(console.error);