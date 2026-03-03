
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";
import { AuditResult } from "../types";

// Factory for the AI client to ensure the most up-to-date API key from environment
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Institutional Base64 Helpers
 */
export function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Decodes raw PCM audio data into an AudioBuffer
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    companyName: { type: Type.STRING },
    readinessScore: { type: Type.STRING, enum: ["Ready", "Partially Ready", "Not Ready"] },
    scoreValue: { type: Type.INTEGER },
    sectorPeerAverage: { type: Type.INTEGER },
    scoreBreakdown: {
      type: Type.OBJECT,
      properties: {
        doubleMateriality: { type: Type.INTEGER },
        valueChain: { type: Type.INTEGER },
        dataGranularity: { type: Type.INTEGER },
        strategyGovernance: { type: Type.INTEGER },
        frameworkAlignment: { type: Type.INTEGER }
      }
    },
    executiveSummary: { type: Type.STRING },
    doubleMaterialityMatrix: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          financialScore: { type: Type.INTEGER },
          impactScore: { type: Type.INTEGER },
          category: { type: Type.STRING },
          reasoning: { type: Type.STRING }
        }
      }
    },
    financialImpact: {
      type: Type.OBJECT,
      properties: {
        totalRevenue: { type: Type.NUMBER },
        revenueAtRiskPercentage: { type: Type.NUMBER },
        currency: { type: Type.STRING },
        estimatedRevenueAtRisk: { type: Type.STRING },
        compliancePenaltyExposure: { type: Type.STRING },
        marketValuationRisk: { type: Type.STRING },
        costOfCapitalImpactBps: { type: Type.INTEGER },
        taxonomy: {
          type: Type.OBJECT,
          properties: {
            aligned: { type: Type.NUMBER },
            eligible: { type: Type.NUMBER },
            nonEligible: { type: Type.NUMBER }
          }
        },
        scope1And2Tonnage: { type: Type.NUMBER },
        carbonIntensityMetric: { type: Type.STRING },
        scenarios: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { scenario: { type: Type.STRING }, estimatedImpact: { type: Type.STRING }, likelihood: { type: Type.STRING } } } },
        climateScenarios: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { temp: { type: Type.STRING }, riskLevel: { type: Type.STRING }, revenueImpactMultiplier: { type: Type.NUMBER }, valuationImpactMultiplier: { type: Type.NUMBER }, keyRiskDriver: { type: Type.STRING } } } }
      }
    },
    mandatoryDisclosures: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING },
          description: { type: Type.STRING },
          status: { type: Type.STRING, enum: ["Present", "Missing"] },
          fixRecommendation: { type: Type.STRING },
          evidence: {
            type: Type.OBJECT,
            properties: {
              quote: { type: Type.STRING },
              page: { type: Type.INTEGER }
            },
            nullable: true
          }
        }
      }
    },
    roadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING },
          action: { type: Type.STRING },
          details: { type: Type.STRING },
          impactOnScore: { type: Type.INTEGER },
          financialSavingEstimate: { type: Type.STRING }
        }
      }
    },
    detailedFrameworks: { 
      type: Type.ARRAY, 
      items: { 
        type: Type.OBJECT, 
        properties: { 
          name: { type: Type.STRING }, 
          alignmentScore: { type: Type.INTEGER }, 
          status: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
          missingCriticals: { type: Type.ARRAY, items: { type: Type.STRING } },
          evidenceCount: { type: Type.INTEGER }
        } 
      } 
    },
    peerBenchmarks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, score: { type: Type.INTEGER }, insight: { type: Type.STRING } } } },
    esrsTopics: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { code: { type: Type.STRING }, name: { type: Type.STRING }, score: { type: Type.INTEGER }, status: { type: Type.STRING } } } },
    subsidiaries: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, region: { type: Type.STRING }, readinessScore: { type: Type.INTEGER }, status: { type: Type.STRING }, topGap: { type: Type.STRING } } } }
  }
};

const tryRepairJson = (jsonString: string): string => {
  let cleaned = jsonString.trim();
  cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
  const stack: string[] = [];
  let inString = false;
  let escaped = false;
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === '"' && !escaped) inString = !inString;
    escaped = char === "\\" && !escaped;
    if (!inString) {
      if (char === "{" || char === "[") stack.push(char);
      else if (char === "}" || char === "]") stack.pop();
    }
  }
  if (inString) cleaned += '"';
  while (stack.length > 0) {
    const last = stack.pop();
    if (last === "{") cleaned += "}";
    if (last === "[") cleaned += "]";
  }
  return cleaned;
};

export const analyzeDocument = async (
  fileBase64: string | null,
  mimeType: string | null,
  textInput: string | null,
  onStreamUpdate: (text: string) => void
): Promise<AuditResult> => {
  const ai = getAi();
  const model = 'gemini-3-flash-preview'; 
  const prompt = `Act as an institutional CSRD auditor. Perform a 5-pillar analysis. Return ONLY valid JSON.`;

  const parts: any[] = [{ text: prompt }];
  if (fileBase64 && mimeType) {
    parts.push({ inlineData: { data: fileBase64, mimeType } });
  } else if (textInput) {
    parts.push({ text: `Source context: ${textInput}` });
  }

  const responseStream = await ai.models.generateContentStream({
    model,
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.1
    }
  });

  let fullText = "";
  for await (const chunk of responseStream) {
    if (chunk.text) {
      fullText += chunk.text;
      onStreamUpdate(chunk.text);
    }
  }

  const result = JSON.parse(tryRepairJson(fullText));
  return { ...result, timestamp: new Date().toISOString() } as AuditResult;
};

export const generateBriefingAudio = async (text: string): Promise<string> => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Generate a professional CFO briefing voice memo: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Zephyr' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
};

export const connectLiveAssistant = (auditContext: AuditResult, callbacks: any) => {
  const ai = getAi();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: `You are Audit Crystal Live. Using context: ${JSON.stringify(auditContext)}. Be data-driven and professional.`,
      speechConfig: {
        voiceConfig: {prebuiltVoiceConfig: {voiceName: 'Zephyr'}},
      },
      outputAudioTranscription: {},
    },
  });
};

export const askAuditAssistant = async (question: string, context: AuditResult): Promise<{ text: string, links: any[] }> => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ role: 'user', parts: [{ text: `Context: ${context.companyName}. Question: ${question}` }] }],
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  
  const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
    uri: c.web?.uri,
    title: c.web?.title
  })).filter((l: any) => l.uri) || [];

  return { text: response.text || "No response synthesized.", links };
};

export const generateESRSPolicy = async (code: string, description: string, context: AuditResult): Promise<string> => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ role: 'user', parts: [{ text: `Draft board policy for ESRS ${code}: ${description}` }] }],
    config: { temperature: 0.1 }
  });
  return response.text || "Draft failed.";
};

export const fetchPeerIntelligence = async (companyName: string): Promise<any> => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ role: 'user', parts: [{ text: `Compare ${companyName} with 3 major industry peers on CSRD readiness. Include 'Net Zero mentions in 10-K' context if found. Return a JSON array: [{name, readinessScore, keyGap, reportUrl}]` }] }],
    config: { tools: [{ googleSearch: {} }] }
  });
  
  try {
    return JSON.parse(tryRepairJson(response.text || "[]"));
  } catch (e) {
    console.error("Peer Intel JSON Parse Error", e);
    return [];
  }
};

export const generateBoardVideo = async (auditResult: AuditResult): Promise<string> => {
  const ai = getAi();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Cinematic dashboard for ${auditResult.companyName}. Futuristic crystal geometric forms representing ESG data points. Business-centric lighting.`,
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
