import axios from 'axios';
const API_URL = 'https://french-words-api.vercel.app';

export default {

  // ? Récupère un Array de la liste de mots français existants
  async getWordExist(userWord) {
    try {
      const length = userWord.length
      const firstLetter = userWord[0];
      const response = await axios.get(`${API_URL}/word/${length}`);
      const words = response.data;
      // Vérifie si le mot de l'utilisateur est présent dans la liste des mots
      const wordExists = words.includes(userWord.toLowerCase());
      console.log(userWord + "" + wordExists);
      return wordExists;
    } catch (error) {
      console.log(error);
    }
  },
  async getWordOfTheDay() {
    try {
      const response = await axios.get(`${API_URL}/day`);
      const word = response.data;
      return word;
    } catch (error) {
      console.log(error);
    }
  },

  async getRandomWord() {
    try {
      const response = await axios.get(`${API_URL}/word`);
      const word = response.data;
      return word;
    } catch (error) {
      console.log(error);
    }
  },

  async getSuiteOfTheDay() {
    try {
      const response = await axios.get(`${API_URL}/day/suite`);
      const word = response.data;
      return word;
    } catch (error) {
      console.log(error);
    }
  },

}
