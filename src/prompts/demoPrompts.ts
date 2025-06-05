export type LanguageCode = 'en' | 'hi';

export interface DemoPrompt {
  id: string;
  assistantId: string;
  language: LanguageCode;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const demoPrompts: DemoPrompt[] = [
  {
    id: 'hr_interview_1',
    assistantId: 'hr_interview',
    language: 'en',
    title: 'Welcome Message',
    content: 'first greet the user and ask for their name and contact number',
    createdAt: new Date('2025-06-05'),
    updatedAt: new Date('2025-06-05'),
  },
  {
    id: 'lead_qualification_1',
    assistantId: 'lead_qualification',
    language: 'en',
    title: 'Lead Qualification',
    content: '',
    createdAt: new Date('2025-06-05'),
    updatedAt: new Date('2025-06-05'),
  },
  {
    id: 'feedback_1',
    assistantId: 'feedback',
    language: 'en',
    title: 'Feedback',
    content: '',
    createdAt: new Date('2025-06-05'),
    updatedAt: new Date('2025-06-05'),
  },
  {
    id: 'feedback_hindi_1',
    assistantId: 'feedback_hindi',
    language: 'hi',
    title: 'Feedback',
    content: '',
    createdAt: new Date('2025-06-05'),
    updatedAt: new Date('2025-06-05'),
  },
  {
    id: 'lead_qualification_hindi_1',
    assistantId: 'lead_qualification_hindi',
    language: 'hi',
    title: 'Lead Qualification',
    content: '',
    createdAt: new Date('2025-06-05'),
    updatedAt: new Date('2025-06-05'),
  },
];

// Helper functions
export const getPromptsByAssistant = (assistantId: string): DemoPrompt[] => {
  return demoPrompts.filter(prompt => prompt.assistantId === assistantId);
};

export const getPromptsByLanguage = (language: LanguageCode): DemoPrompt[] => {
  return demoPrompts.filter(prompt => prompt.language === language);
};

export const getPromptById = (id: string): DemoPrompt | undefined => {
  return demoPrompts.find(prompt => prompt.id === id);
};
