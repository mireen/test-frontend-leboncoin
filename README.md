# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercice :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

**As your application can be used by millions of users, make sure to provide some robust safety guards.**

### Sketches :

Obvisouly, it is up to you to make something nice and pretty, you are free to design it the way you like. The sketches are here to give you an idea on how it should look.

<details>
  <summary>Click to see the sketches</summary>
  
Mobile list :

![](./sketches/list-mobile.jpg)

Desktop list :

![](./sketches/list-desktop.jpg)

Mobile conversation :

![](./sketches/conv-mobile.jpg)

Desktop conversation :

![](./sketches/conv-desktop.jpg)

</details>

### API :

You can find the API swagger file in `docs/api-swagger.yaml`.

For a better readibility, you can view it on [https://leboncoin.tech/frontend-technical-test/](https://leboncoin.tech/frontend-technical-test/).

---

## Bonus 1 :

We provide some conversation samples, but can you improve the app so the user can now create new conversations ?

## Bonus 2 :

Our infrastructure is a bit shaky.. Sometimes the servers are crashing. “It’s not you, it’s me”, but maybe you can display something nice to warn the user and handle it gracefully.

## Do you want to make the app even better ?

Feel free to make as many improvements as you like.
We love creativity and technical challenges.

If you are out of ideas, here are some thoughts :

- As we want to reach our users anywhere, we need to make sure the app is performing well. What can you do to make it really fast ?

- Our goal is to support everybody in the country, including people with disabilities. As a good citizen and a good developer, can you make sure the app is accessible for everyone ?

- We all love to relax after a hard day’s work. It would be a shame if we didn’t feel confident enough about the upcoming automatic deployment. Are you sure everything has been tested thoroughly ?

## Choix techniques et documentation

J'ai décidé de créer 4 composants différents :

- conversationsList : qui affiche la liste des conversations de l'utilisateur
- conversationView : qui affiche les messages d'une conversation sélectionnée
- newMessageTextBox : qui affiche l'input permettant d'écrire et d'envoyer un nouveau message
- newConversation : qui affiche une pop-up permettant à l'utilisateur de créer une nouvelle conversation en choisissant à qui l'envoyer ainsi qu'en écrivant le message

Ayant pour habitude sur mon projet actuel d'organiser mes composants ainsi, j'ai décidé de faire de même ici :

- Un fichier index.js, qui gère la logique du composant. C'est ici que je déclare les states ainsi que les fonctions qui seront utiles au composant
- Un fichier component.js, qui ne sert qu'à rendre le contenu du composant

Pour les requêtes j'ai décidé d'utiliser axios. En effet sur mon projet actuel je n'ai pas pour habitude de gérer les requêtes via des fetch ou autre. Nous utilisons une librairie (react-admin) qui gère cela d'une manière assez particulière. Ayant déjà utilisé Axios lors d'un stage pendant mes études, j'ai décidé de le réutiliser ici.

Pour le style j'ai l'habitude d'utiliser styled-components et de mettre un fichier styles.js dans chacun de mes composants. Etant donné que c'est une petite application ici, j'ai utilisé le dossier styles mis à disposition et je me suis adaptée de façon à ce que mes fichiers de style soient comme celui déjà présent (Home.module.css)

Pour les tests, j'ai l'habitude d'utiliser enzyme, mais react 18 n'est pas encore supporté par enzyme, et il n'existe pas encore d'adaptateur non plus à ma connaissance. J'ai essayé de monter en compétence rapidement sur testing-library afin de tester au maximum l'application, mais quelques notions me manquent encore pour pouvoir tout tester comme je l'aurais souhaité... Sur mon projet actuel, nous sommes à plus de 80% de test unitaires. J'ai laissé un test en commentaire car je n'ai pas réussi à le faire, j'aurai bien aimé savoir pourquoi donc je l'ai laissé au cas où vous voudriez regarder et m'éclairer. Il en est de même pour tester les fonctions que je déclare dans l'index et que je passe directement au composant enfant ensuite. Avec enzyme je peux faire un wrapper.prop('mafonction')() et l'appeler ainsi mais je n'ai pas trouver comment faire pour tester ici sans cela.

J'ai décidé d'ajouter material UI au projet afin d'avoir à disposition des composants pouvant répondre à mes besoins.

Pour l'accessibilité de la plateforme, il faut penser à mettre des couleurs contrastées avec le background, ne pas oublier les prop "alt" lors de l'ajout d'image par exemple, mettre des aria-label etc.

Pour le BONUS 1, lorsque je soumet le formulaire pour créer une nouvelle conversation, mes requêtes partent bien, mes données s'affichent dans le fichier db.json mais elles ne remontent pas ensuite côté front. J'ai sûrement dû rater une étape quelque part !

J'ai appris à développer en react.js sur mon projet actuel, sur lequel je suis depuis plus de 3 ans et demi, et je serai curieuse de voir comment ça se passe ailleurs et d'évoluer sur cette techno dont j'ai encore à apprendre.

J'ai essayé de faire au mieux, ce n'est pas parfait mais j'espère que cela vous conviendra ;)
Au plaisir d'échanger avec vous sur une éventuelle solution complète que vous pourrez me fournir.
