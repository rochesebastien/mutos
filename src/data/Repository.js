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
<<<<<<< HEAD
  
     // ? Récupère un Array de la liste de mots français existants
     async ExistInWords(userWord) {
      try {
      const response = await fetch("https://french-words-api.vercel.app/words");
      const words = await response.text();

      // ? Vérifie si le mot existe dans la liste de mots
      if (words.includes(this.removeAccents(userWord))) {
        console.log(words.includes(this.removeAccents(userWord)));
        return true;
      } else {
        console.log(words.includes(this.removeAccents(userWord)));
        return false;
      }
      } catch(error) {
      console.log(error);
      }
      },

      async getRandomWord(){
        try {
          const response = await fetch("https://french-words-api.vercel.app/word");
          const word = await response.text();
          return word;
          } catch(error) {
          console.log(error);
          }
      },
      async getDayWord(){
        try {
          const response = await fetch("https://french-words-api.vercel.app/day");
          const word = await response.text();
          return word;
          } catch(error) {
          console.log(error);
          }
      }

  };
=======
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
>>>>>>> f54e77d14a348e60512525fb4e67f2c1fbee1bcd
