import json
import unicodedata

# Fonction pour enlever les accents
def remove_accents(input_str):
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return ''.join([c for c in nfkd_form if not unicodedata.combining(c)])

# Lire le fichier texte
with open('./gutenberg.txt', 'r') as f:
    data = f.read()

# Séparer les mots en une liste et enlever les accents et les espaces
words = [remove_accents(word.strip()) for word in data.split('\n')]

# Créer un objet avec la liste de mots
obj = {'words': words}

# Écrire l'objet dans un fichier JSON
with open('words.json', 'w') as f:
    json.dump(obj, f)
