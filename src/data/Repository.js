export default {

    // ? Transforme tous les caractères spéciaux (accents) en caractère sans accent
    removeAccents(str) {
      const accents = [
        { from: "à", to: "a" },
        { from: "á", to: "a" },
        { from: "â", to: "a" },
        { from: "ä", to: "a" },
        { from: "ç", to: "c" },
        { from: "è", to: "e" },
        { from: "é", to: "e" },
        { from: "ê", to: "e" },
        { from: "ë", to: "e" },
        { from: "î", to: "i" },
        { from: "ï", to: "i" },
        { from: "ô", to: "o" },
        { from: "ö", to: "o" },
        { from: "ù", to: "u" },
        { from: "ú", to: "u" },
        { from: "û", to: "u" },
        { from: "ü", to: "u" },
        { from: "ÿ", to: "y" },
      ];
      for (let i = 0; i < accents.length; i++) {
        str = str.replace(new RegExp(accents[i].from, "g"), accents[i].to);
      }
      return str;
    },
  
     // ? Récupère un Array de la liste de mots français existants
     async ExistInWords(userWord) {
      try {
      const response = await fetch("/src/data/gutenberg.txt");
      const text = await response.text();
      const wordArray = text.split("\n").map((word) => this.removeAccents(word.trim()));
      // ? Vérifie si le mot existe dans la liste de mots
      if (wordArray.includes(this.removeAccents(userWord))) {
        console.log("Le mot "+this.removeAccents(userWord)+" existe !");
        return true;
      } else {
        console.log("Le mot "+this.removeAccents(userWord)+" n'existe pas.");
        return false;
      }
      } catch(error) {
      console.log(error);
      }
      },
  };