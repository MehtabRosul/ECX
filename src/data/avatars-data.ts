export interface Avatar {
  id: string;
  name: string;
  url: string;
  category: string;
}

export const avatarCategories = [
  'Professional',
  'Casual',
  'Creative',
  'Gaming',
  'Abstract',
  'Nature',
  'Tech',
  'Minimalist',
] as const;

export const avatars: Avatar[] = [
  // Professional Category (5 avatars)
  {
    id: 'prof-1',
    name: 'Business Professional',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_PROF_1',
    category: 'Professional',
  },
  {
    id: 'prof-2',
    name: 'Executive',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_PROF_2',
    category: 'Professional',
  },
  {
    id: 'prof-3',
    name: 'Corporate',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_PROF_3',
    category: 'Professional',
  },
  {
    id: 'prof-4',
    name: 'Manager',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_PROF_4',
    category: 'Professional',
  },
  {
    id: 'prof-5',
    name: 'Leader',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_PROF_5',
    category: 'Professional',
  },
  
  // Casual Category (5 avatars)
  {
    id: 'casual-1',
    name: 'Friendly',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CASUAL_1',
    category: 'Casual',
  },
  {
    id: 'casual-2',
    name: 'Relaxed',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CASUAL_2',
    category: 'Casual',
  },
  {
    id: 'casual-3',
    name: 'Chill',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CASUAL_3',
    category: 'Casual',
  },
  {
    id: 'casual-4',
    name: 'Easygoing',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CASUAL_4',
    category: 'Casual',
  },
  {
    id: 'casual-5',
    name: 'Comfortable',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CASUAL_5',
    category: 'Casual',
  },
  
  // Creative Category (5 avatars)
  {
    id: 'creative-1',
    name: 'Artist',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CREATIVE_1',
    category: 'Creative',
  },
  {
    id: 'creative-2',
    name: 'Designer',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CREATIVE_2',
    category: 'Creative',
  },
  {
    id: 'creative-3',
    name: 'Innovator',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CREATIVE_3',
    category: 'Creative',
  },
  {
    id: 'creative-4',
    name: 'Visionary',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CREATIVE_4',
    category: 'Creative',
  },
  {
    id: 'creative-5',
    name: 'Creator',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_CREATIVE_5',
    category: 'Creative',
  },
  
  // Gaming Category (5 avatars)
  {
    id: 'gaming-1',
    name: 'Gamer',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_GAMING_1',
    category: 'Gaming',
  },
  {
    id: 'gaming-2',
    name: 'Player',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_GAMING_2',
    category: 'Gaming',
  },
  {
    id: 'gaming-3',
    name: 'Champion',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_GAMING_3',
    category: 'Gaming',
  },
  {
    id: 'gaming-4',
    name: 'Pro Gamer',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_GAMING_4',
    category: 'Gaming',
  },
  {
    id: 'gaming-5',
    name: 'Legend',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_GAMING_5',
    category: 'Gaming',
  },
  
  // Abstract Category (5 avatars)
  {
    id: 'abstract-1',
    name: 'Geometric',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_ABSTRACT_1',
    category: 'Abstract',
  },
  {
    id: 'abstract-2',
    name: 'Pattern',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_ABSTRACT_2',
    category: 'Abstract',
  },
  {
    id: 'abstract-3',
    name: 'Modern',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_ABSTRACT_3',
    category: 'Abstract',
  },
  {
    id: 'abstract-4',
    name: 'Unique',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_ABSTRACT_4',
    category: 'Abstract',
  },
  {
    id: 'abstract-5',
    name: 'Artistic',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_ABSTRACT_5',
    category: 'Abstract',
  },
  
  // Nature Category (5 avatars)
  {
    id: 'nature-1',
    name: 'Forest',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_NATURE_1',
    category: 'Nature',
  },
  {
    id: 'nature-2',
    name: 'Ocean',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_NATURE_2',
    category: 'Nature',
  },
  {
    id: 'nature-3',
    name: 'Mountain',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_NATURE_3',
    category: 'Nature',
  },
  {
    id: 'nature-4',
    name: 'Sunset',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_NATURE_4',
    category: 'Nature',
  },
  {
    id: 'nature-5',
    name: 'Wildlife',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_NATURE_5',
    category: 'Nature',
  },
  
  // Tech Category (5 avatars)
  {
    id: 'tech-1',
    name: 'Developer',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_TECH_1',
    category: 'Tech',
  },
  {
    id: 'tech-2',
    name: 'Coder',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_TECH_2',
    category: 'Tech',
  },
  {
    id: 'tech-3',
    name: 'Engineer',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_TECH_3',
    category: 'Tech',
  },
  {
    id: 'tech-4',
    name: 'Innovator',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_TECH_4',
    category: 'Tech',
  },
  {
    id: 'tech-5',
    name: 'Digital',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_TECH_5',
    category: 'Tech',
  },
  
  // Minimalist Category (5 avatars)
  {
    id: 'minimal-1',
    name: 'Simple',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_MINIMAL_1',
    category: 'Minimalist',
  },
  {
    id: 'minimal-2',
    name: 'Clean',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_MINIMAL_2',
    category: 'Minimalist',
  },
  {
    id: 'minimal-3',
    name: 'Elegant',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_MINIMAL_3',
    category: 'Minimalist',
  },
  {
    id: 'minimal-4',
    name: 'Pure',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_MINIMAL_4',
    category: 'Minimalist',
  },
  {
    id: 'minimal-5',
    name: 'Refined',
    url: 'https://drive.google.com/uc?export=view&id=PLACEHOLDER_MINIMAL_5',
    category: 'Minimalist',
  },
];

// Helper function to get avatars by category
export const getAvatarsByCategory = (category: string): Avatar[] => {
  return avatars.filter(avatar => avatar.category === category);
};

// Helper function to get all categories
export const getAllCategories = (): string[] => {
  return Array.from(new Set(avatars.map(avatar => avatar.category)));
};

