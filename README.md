# EnaaBrief02_HealthCareV2
Page unique “Pré-admission v2” comprenant :

1) Formulaire amélioré (mêmes champs que la v1) :

Nom, Prénom, Téléphone, Email, Motif, Date souhaitée

2) Expérience utilisateur (UX) :

Affichage d’un compteur : “X demandes au total”

Messages UI intégrés et visibles :

succès (ex: “Demande ajoutée”)

erreur (ex: “Veuillez compléter les champs obligatoires”)

Conserver : ajout + affichage dynamique + suppression (comme v1)

3) Recherche OU filtre (au choix, 1 seul maximum)

Recherche simple (nom / prénom / téléphone / email)

ou

Filtre par motif

==> Backlog technique

==> HTML & CSS

Structure HTML sémantique claire (sections, titres, zones : formulaire / liste / messages)

Formulaire accessible : label liés aux input, champs obligatoires identifiés

CSS propre et maintenable :

variables CSS (couleurs, espacements, radius)

mise en page cohérente (alignements, marges/paddings)

états : :focus, :hover, :disabled (boutons + inputs)

Responsive design obligatoire (mobile-first) :

3 formats minimum : mobile / tablette / desktop

sur mobile : champs larges + boutons accessibles

la liste doit rester lisible :

soit tableau avec scroll horizontal contrôlé,

soit affichage “cartes”

==> JavaScript

Validation minimale des champs obligatoires

Mise à jour cohérente du compteur

Recherche OU filtre (1 seul) appliqué à l’affichage

DOM : rendu propre (sans casser l’UI), suppression fonctionnelle

Événements : submit, click, input (si recherche)

Bonus Challenge — Mode sombre (Dark Mode)

Pour améliorer le confort d’utilisation (surtout en fin de journée ou en environnement peu lumineux), la clinique souhaite un mode sombre.

Attendu :

Ajouter un toggle (ex : bouton ou switch) : “Mode clair / Mode sombre”

Le mode choisi doit modifier au minimum :

le fond de page

les textes

les inputs (fond + bordures + texte)

les boutons

les messages UI (succès / erreur)

Le mode doit rester lisible (contrastes corrects) et garder une hiérarchie visuelle claire

Contraintes techniques :

Implémentation via variables CSS (recommandé) :

Variables par défaut = thème clair

Une classe (ex : .dark) sur body pour basculer en sombre
