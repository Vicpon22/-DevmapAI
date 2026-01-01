export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  modules: Module[];
  createdAt: Date;
  estimatedHours: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'code' | 'video' | 'quiz';
  examples: CodeExample[];
  flowcharts: Flowchart[];
  mindmaps: MindMap[];
  duration: number;
  completed: boolean;
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface Flowchart {
  id: string;
  title: string;
  mermaidCode: string;
  description: string;
}

export interface MindMap {
  id: string;
  title: string;
  mermaidCode: string;
  description: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  language: string;
  starterCode: string;
  solution: string;
  tests: Test[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Test {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
}

export interface Book {
  id: string;
  courseId: string;
  title: string;
  author: string;
  modules: BookModule[];
  coverImage?: string;
  createdAt: Date;
}

export interface BookModule {
  id: string;
  title: string;
  content: string;
  order: number;
  codeExamples: CodeExample[];
  diagrams: (Flowchart | MindMap)[];
}
