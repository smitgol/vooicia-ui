# Vooicia UI - AI Voice Agent Platform

A modern, responsive web application for Vooicia, an AI-powered voice agent platform that automates customer support calls. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring real-time voice interactions and seamless user experience.

## 🚀 Features

- **24/7 AI Voice Support**: Automated customer service with natural voice interactions
- **Real-time Voice Communication**: Powered by Pipecat AI for seamless voice conversations
- **Multilingual Support**: Communicate with customers in their preferred language
- **Interactive Demo**: Try the AI assistant directly from the landing page
- **Responsive Design**: Modern UI that works across all devices
- **Customizable AI Agents**: Configure prompts, voice, and behavior for your brand
- **Analytics & Monitoring**: Track performance and customer interactions
- **Easy Integration**: Connect with existing CRM and business tools

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn
- **Animations**: Framer Motion
- **Voice AI**: Pipecat AI client
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel (with Analytics)

## 📦 Dependencies

### Core Dependencies
- `next`: 15.3.2 - React framework
- `react`: 19.0.0 - UI library
- `typescript`: 5.x - Type safety
- `tailwindcss`: 4.x - CSS framework


## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Environment variables configured

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vooicia-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SERVER_URL=your_voice_ai_server_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── call/          # Voice call endpoint
│   │   └── contact/       # Contact form endpoint
│   ├── about/             # About page
│   ├── case-studies/      # Case studies page
│   ├── privacy-policy/    # Privacy policy page
│   ├── terms/             # Terms of service page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── sections/          # Page sections
│   │   ├── hero.tsx       # Hero section with voice demo
│   │   ├── features.tsx   # Features showcase
│   │   ├── how-it-works.tsx # Process explanation
│   │   ├── contact.tsx    # Contact form
│   │   └── ...
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   └── ...
│   ├── navigation.tsx     # Site navigation
│   ├── footer.tsx         # Site footer
│   └── theme-provider.tsx # Theme management
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── utils.ts           # General utilities
│   └── scroll-utils.ts    # Scroll utilities
├── prompts/               # AI prompt configurations
│   └── demoPrompts.ts     # Demo conversation prompts
└── utils/                 # Additional utilities
    ├── phone.ts           # Phone number utilities
    └── rateLimiter.ts     # API rate limiting
```

## 🎯 Key Features Implementation

### Voice AI Integration
The application integrates with Pipecat AI for real-time voice conversations:

```typescript
// Voice client configuration
const RTVIConfig: RTVIClientOptions = {
  transport: new WebSocketTransport(),
  params: {
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    endpoints: { connect: "/create_voice_assistant_session" },
    requestData: {
      prompt: prompt?.content,
      language: prompt?.language,
      voice_id: prompt?.voice_id,
      initial_message: prompt?.initial_message,
    }
  },
  enableMic: true,
  enableCam: false,
  // ... callbacks
};
```

### Interactive Demo
The hero section features a live voice demo where users can:
- Start/stop voice conversations
- See real-time connection status
- Experience the AI assistant directly

### Responsive Design
Built with mobile-first approach using Tailwind CSS:
- Responsive grid layouts
- Adaptive typography
- Touch-friendly interactions
- Smooth animations and transitions

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SERVER_URL` | Voice AI server endpoint | Yes |

### AI Prompt Configuration
Customize AI behavior in `src/prompts/demoPrompts.ts`:

```typescript
export const demoPrompts: DemoPrompt[] = [
  {
    id: 'customer_support',
    language: 'en',
    title: 'Customer Support',
    content: `[Role] You are Mira, an AI-powered Customer Support Specialist...`,
    voice_id: 'c6SfcYrb2t09NHXiT80T',
    initial_message: "Hello, how can I help you today?"
  }
];
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Voice features require HTTPS in production and microphone permissions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation