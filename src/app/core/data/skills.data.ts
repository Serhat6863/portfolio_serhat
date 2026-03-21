export interface Skill {
  readonly name: string;
  readonly icon: string;
}

export interface SkillCategory {
  readonly name: string;
  readonly skills: readonly Skill[];
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    name: 'Mobile',
    skills: [
      { name: 'Flutter', icon: '💙' },
      { name: 'Dart', icon: '🎯' },
    ],
  },
  {
    name: 'Web',
    skills: [
      { name: 'Angular', icon: '🔺' },
      { name: 'HTML/CSS', icon: '🌐' },
    ],
  },
  {
    name: 'Backend & Cloud',
    skills: [
      { name: 'Firebase', icon: '🔥' },
      { name: 'REST APIs', icon: '🔗' },
    ],
  },
  {
    name: 'Outils',
    skills: [
      { name: 'Git', icon: '🌿' },
      { name: 'Figma', icon: '🎨' },
    ],
  },
];
