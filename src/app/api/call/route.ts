import { NextRequest, NextResponse } from "next/server";
import https from "https";
import axios, { AxiosError } from 'axios';
import { rateLimit } from "@/utils/rateLimiter";

// Validate required environment variables
const REQUIRED_ENV = ['NEXT_PUBLIC_SERVER_URL'];
const missingEnv = REQUIRED_ENV.filter(env => !process.env[env]);

if (missingEnv.length > 0 && process.env.NODE_ENV !== 'test') {
  throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}

// Configure axios instance with defaults
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({ rejectUnauthorized: process.env.NODE_ENV === 'production' })
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] Request to ${config.url}`, {
      method: config.method,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API] Response from ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error: AxiosError) => {
    console.error('[API] Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const rateLimitResponse = rateLimit(2, 60 * 1000)(request);
        if (rateLimitResponse.status !== 200) {
            return rateLimitResponse;
        }
        
        // Validate request body
        const body = await request.json();
        const { prompt, language, voice_id, initial_message } = body;
        
        if (!prompt || !language || !voice_id) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Missing required fields: prompt, language, and voice_id are required' 
                },
                { status: 400 }
            );
        }

        // Make the API call
        const { data } = await apiClient.post('/create_voice_assistant_session', {
            prompt,
            language,
            voice_id,
            user_ip: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown',
            initial_message: initial_message || 'Hello, how can I help you today?'
        });
        if (!data?.data) {
            throw new Error('Invalid response format from voice assistant service');
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'Call started successfully', 
                data: data.data 
            },
            { status: 200 }
        );
        
    } catch (error) {
        console.error('Call starting error:', error);
        
        let status = 500;
        let errorMessage = 'Failed to start call';
        
        if (axios.isAxiosError(error)) {
            status = error.response?.status || 500;
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        
        return NextResponse.json(
            { 
                success: false, 
                error: errorMessage,
                ...(process.env.NODE_ENV === 'development' && { 
                    stack: error instanceof Error ? error.stack : undefined
                })
            },
            { status }
        );
    }
}