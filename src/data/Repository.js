import json  from "./words.json"
import axios from 'axios';
const API_URL = 'http://localhost:3000';

export default {


  async getWordExist(userWord) {
    try {
      const length = userWord.length
      const firstLetter = userWord[0];
      const response = await axios.get(`${API_URL}/word/${length}/${firstLetter}`);
      const words = response.data;
      // Vérifie si le mot de l'utilisateur est présent dans la liste des mots
      const wordExists = words.includes(userWord.toLowerCase());
      console.log(wordExists);
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
  async getListOfTheDay() {
    try {
      const response = await axios.get(`${API_URL}/list`);
      const list = response.data;
      return list;
    } catch (error) {
      console.log(error);
    }
  }
}
