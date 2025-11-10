// api/events.tsx
import axios from 'axios';

// Définir l'interface pour un événement
interface Event {
  id: string;
  title: string;
  start: string; // ou Date, selon vos besoins
  end?: string;  // ou Date
  [key: string]: any; // Pour tout autre champ supplémentaire
}

const API_URL = 'http://localhost:3000/calendirie/calendar'; // Remplacez par l'URL de votre API

// Fonction pour récupérer les événements
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get<Event[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    return []; // Retourne une liste vide en cas d'erreur
  }
};
