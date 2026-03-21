export type Tech = 'Flutter' | 'Firebase' | 'API' | 'Figma';

export interface Project {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly techs: readonly Tech[];
  readonly duration: string;
  readonly inProgress?: boolean;
  readonly accent: string;
  readonly images: readonly string[];
}

export const ALL_TECHS: readonly Tech[] = ['Flutter', 'Firebase', 'API', 'Figma'];

export const PERSONAL_PROJECTS: readonly Project[] = [
  {
    id: 1,
    title: 'Movie App',
    description:
      'Application de découverte de films avec recherche avancée et interface moderne.',
    techs: ['Flutter', 'API'],
    duration: '2 semaines',
    accent: '#00b4d8',
    images: [
      'assets/images/projects/personal/movie/movie.jpg',
      'assets/images/projects/personal/movie/home_screen.png',
      'assets/images/projects/personal/movie/search_screen.png',
      'assets/images/projects/personal/movie/search_result_screen.png',
      'assets/images/projects/personal/movie/detail_screnn.png',
    ],
  },
  {
    id: 2,
    title: 'QuizDuel',
    description:
      'Jeu de quiz interactif avec salles multijoueurs et classements en temps réel.',
    techs: ['Flutter', 'Firebase'],
    duration: '2 mois',
    accent: '#7c3aed',
    images: [
      'assets/images/projects/personal/quizDuel/quizDuel.jpg',
      'assets/images/projects/personal/quizDuel/home_screen.png',
      'assets/images/projects/personal/quizDuel/login_screen.png',
      'assets/images/projects/personal/quizDuel/register_screen.png',
      'assets/images/projects/personal/quizDuel/game_screen.png',
      'assets/images/projects/personal/quizDuel/leaderboard_screen.png',
      'assets/images/projects/personal/quizDuel/winner_screen.png',
    ],
  },
  {
    id: 3,
    title: 'Weather App',
    description:
      "Application météo avec Clean Architecture et intégration d'une API météo.",
    techs: ['Flutter', 'API'],
    duration: '1 semaine',
    accent: '#0ea5e9',
    images: [
      'assets/images/projects/personal/weather/weatherApp.jpg',
      'assets/images/projects/personal/weather/home_screen.png',
      'assets/images/projects/personal/weather/home_screen_result.png',
      'assets/images/projects/personal/weather/home_screen_sugest.png',
    ],
  },
  {
    id: 4,
    title: 'Meditation App',
    description:
      'Ma première app Flutter — design Figma reproduit fidèlement pixel par pixel.',
    techs: ['Flutter', 'Figma'],
    duration: '1 mois',
    accent: '#ec4899',
    images: [
      'assets/images/projects/personal/meditation/meditation.jpg',
      'assets/images/projects/personal/meditation/Onboarding_screen.png',
      'assets/images/projects/personal/meditation/login_screen.png',
      'assets/images/projects/personal/meditation/sign_up_screen.png',
      'assets/images/projects/personal/meditation/home_page_screen.png',
      'assets/images/projects/personal/meditation/meditate_page_screen.png',
      'assets/images/projects/personal/meditation/sleep_page_screen.png',
    ],
  },
];

export const FREELANCE_PROJECTS: readonly Project[] = [
  {
    id: 5,
    title: 'LivePulp',
    description: 'Projet en cours de développement — lancement imminent.',
    techs: ['Flutter', 'Firebase'],
    duration: 'En cours',
    inProgress: true,
    accent: '#00ff88',
    images: [
      'assets/images/projects/freelance/livepulp/livepulp.jpg',
      'assets/images/projects/freelance/livepulp/launch_screen.png',
      'assets/images/projects/freelance/livepulp/accueil.png',
      'assets/images/projects/freelance/livepulp/login.png',
      'assets/images/projects/freelance/livepulp/register.png',
      'assets/images/projects/freelance/livepulp/register_end.png',
      'assets/images/projects/freelance/livepulp/chat.png',
      'assets/images/projects/freelance/livepulp/chat_screen.png',
      'assets/images/projects/freelance/livepulp/profil.png',
      'assets/images/projects/freelance/livepulp/frien.png',
      'assets/images/projects/freelance/livepulp/forget_password.png',
    ],
  },
  {
    id: 6,
    title: 'Projet Freelance',
    description:
      'Application mobile complète développée pour un client, de la conception à la livraison.',
    techs: ['Flutter'],
    duration: '2 mois',
    accent: '#f59e0b',
    images: [],
  },
];
