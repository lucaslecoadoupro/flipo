# Flipo

Des cartes de révision (flashcards) créées par les enseignants, pour les élèves : apprendre, retourner les cartes, puis se tester.
© Lucas Le Coadou - Professeur d'espagnol dans l'académie de Montpellier

## Ce que voient les élèves

- **Paquets** : une carte par paquet publié, avec le nom du professeur et la progression de l'élève (cartes acquises). Filtres par professeur et par classe.
- **Recherche** dans toutes les cartes de tous les paquets.
- Dans chaque paquet :
  - **Apprendre** : la liste recto / verso, avec la possibilité de cacher un côté pour s'auto-interroger.
  - **Cartes** : des cartes à retourner. « À revoir » remet la carte dans le paquet, « Je sais » la range dans les cartes acquises.
  - **Me tester** : choix multiple ou réponse écrite, dans un sens ou dans l'autre. Correction immédiate, puis « Refaire mes erreurs ».
- **Défi** : un test qui mélange plusieurs paquets, pour réviser avant une évaluation.

La progression est enregistrée dans le navigateur de l'élève : aucun compte, aucune donnée envoyée.

## Mise en ligne (une seule fois)

1. Crée un dépôt **public** sur GitHub, nommé `flipo`.
2. Dépose dedans `index.html`, `data.json` et le fichier `.nojekyll`.
3. Dans le dépôt, va dans **Settings > Pages**. Choisis **Deploy from a branch**, la branche `main` et le dossier `/ (root)`, puis enregistre.
4. Au bout d'une minute environ, le site est en ligne à l'adresse `https://<ton-pseudo>.github.io/flipo/`.

## Plusieurs enseignants

Chaque enseignant a son propre compte GitHub et sa propre clé. Ses paquets sont signés avec son nom GitHub : il ne peut modifier ou supprimer que les siens. Le propriétaire du dépôt peut tout modifier.

**Ajouter un collègue** (le propriétaire du dépôt) : dans le dépôt, **Settings > Collaborators > Add people**, puis saisis son pseudo GitHub. Il doit accepter l'invitation reçue par mail.

**Créer sa clé d'accès** (chaque enseignant, une seule fois) :

- **Le propriétaire du dépôt** : **Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token**. Dans **Repository access**, choisis **Only select repositories** puis `flipo`. Dans **Permissions > Repository permissions**, règle **Contents** sur **Read and write**. Tu peux aussi ajouter `flipo` à ta clé existante de Lexi, Conju ou Focus.
- **Un collègue invité** : GitHub n'accepte pas les fine-grained tokens sur le dépôt d'un autre compte. Il faut une clé **classic** avec la seule case **public_repo** cochée. Ce lien ouvre le formulaire déjà rempli : https://github.com/settings/tokens/new?scopes=public_repo&description=Flipo
- Choisis une date d'expiration (par exemple la fin de l'année scolaire), génère la clé, copie-la et range-la dans ton gestionnaire de mots de passe.

Deux enseignants peuvent enregistrer en même temps : Flipo relit toujours la dernière version avant d'enregistrer, personne n'écrase le travail d'un collègue.

## Au quotidien

1. Ouvre le site et clique sur **Espace enseignant** en bas de la page.
2. Colle ta clé. Coche « Rester connecté » seulement sur ton ordinateur personnel.
3. Clique sur **Nouveau paquet**, ou sur le crayon d'un de tes paquets.
4. Saisis ou colle les cartes, vérifie l'aperçu à droite, puis **Enregistrer**.
5. Les élèves voient les changements une à deux minutes plus tard.

Chaque paquet peut être **visible** ou en **brouillon** (toi seul le vois).

### Écrire les cartes

Une ligne par carte :

```
## Dates
1789 = Prise de la Bastille | 14 juillet
1792 = Proclamation de la République

## Notions
Souveraineté nationale = Le pouvoir appartient à la nation
```

- `recto = verso` : les deux faces de la carte.
- `| indice` : un exemple ou un indice facultatif, affiché au dos.
- `## Titre` : ouvre une catégorie.
- `/` : plusieurs réponses acceptées dans le test écrit (`the phone / the mobile`).
- `( )` : une précision facultative, la réponse est acceptée avec ou sans.

**Langue du recto** : pour une langue vivante, choisis-la dans le paquet. Les élèves ont alors le bouton « Écouter », un clavier d'accents, et les accents oubliés comptent comme « Presque » dans le test.

### Import CSV

- **Dans un paquet** : bouton **Ajouter depuis un CSV**. Les cartes s'ajoutent à la zone de saisie, tu vérifies, puis tu enregistres.
- **Import de masse** : sur la page d'accueil en mode enseignant, **Importer un CSV**. Avec une colonne `paquet`, un seul fichier crée ou complète plusieurs paquets d'un coup. Les nouveaux paquets arrivent en brouillon, et une carte déjà présente (même recto) n'est pas ajoutée deux fois.

Le bouton **Modèle CSV** télécharge un fichier d'exemple. Colonnes reconnues (dans n'importe quel ordre, première ligne = en-têtes) :

| Colonne | Obligatoire | Autres noms acceptés |
|---|---|---|
| `recto` | oui | question, terme, mot, notion |
| `verso` | oui | réponse, définition, traduction |
| `exemple` | non | indice, aide |
| `catégorie` | non | thème, rubrique |
| `paquet` | non | séquence, chapitre |
| `classe` | non | niveau |

Sans ligne d'en-têtes, l'ordre est : recto, verso, exemple, catégorie. Le séparateur (`;` d'Excel en français, `,` ou tabulation) est détecté tout seul.

## Donner un lien direct aux élèves

- `…/flipo/#/s/<paquet>` (la liste à apprendre)
- `…/flipo/#/s/<paquet>/cartes` (les cartes)
- `…/flipo/#/s/<paquet>/test` (directement le test)
- `…/flipo/#/defi` (le défi qui mélange les paquets)

## En cas de problème

Si une clé est perdue ou a fuité, supprime-la sur GitHub (dans la même page que pour la créer) et crée-en une nouvelle. L'ancienne cesse immédiatement de fonctionner.

Pour retirer l'accès à un collègue : **Settings > Collaborators**, puis retire-le. Ses paquets restent en ligne.

## Développement

`node test.mjs` vérifie la lecture des CSV, la saisie des cartes, l'import et la correction.
