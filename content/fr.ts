import type { SiteContent } from "./types";

const CENTER = "1765, boulevard Taschereau, Longueuil";
const TAX = "Taxes (TPS et TVQ) en sus, ajoutées au paiement en ligne.";

const fr: SiteContent = {
  labels: {
    services: "Services",
    subjects: "Matières",
    regions: "Régions",
    pricing: "Tarifs",
    about: "À propos",
    seeAll: "Tout voir",
    learnMore: "En savoir plus",
    faqTitle: "Questions fréquentes",
    otherServices: "Nos autres services",
    otherSubjects: "Les autres matières",
    otherRegions: "Les autres villes desservies",
    ctaTitle: "Prêt à commencer ?",
    ctaBody: "Choisissez votre formule et réservez vos heures en ligne. Nous vous contactons ensuite pour planifier les séances.",
    ctaButton: "Demander un tuteur",
    center: "Notre centre",
    centerAddress: CENTER,
    centerBody: "Les séances en présentiel ont lieu à domicile ou à notre centre, sur le boulevard Taschereau.",
    directions: "Itinéraire",
    mapTitle: "Carte du centre Mentou Academy",
    examples: "Exemples de réservation",
    regionsHome: "Présents sur la Rive-Sud",
    regionsHomeBody: "Tutorat à domicile et à notre centre à Longueuil, Brossard, Candiac, Saint-Constant et partout en Montérégie. En ligne partout au Québec.",
    monteregie: "Toute la Montérégie",
    breadcrumbHome: "Accueil",
    hoursTitle: "Heures d'ouverture",
    hoursWeekdays: "Lundi au vendredi",
    hoursWeekend: "Samedi et dimanche",
    hoursWeekdaysTime: "9 h à 21 h",
    hoursWeekendTime: "8 h à 18 h",
    open7: "Ouvert 7 jours sur 7",
  },

  hubs: {
    services: {
      metaTitle: "Nos services de tutorat",
      metaDescription: "Tutorat scolaire, développement personnel, tutorat à domicile, au centre ou en ligne, et préparation aux examens du ministère et à l'EUF.",
      kicker: "Services",
      title: "Un accompagnement complet, de la matière à la confiance",
      intro: "Choisissez le service qui répond aux besoins de votre enfant. Tous nos services peuvent se combiner.",
    },
    subjects: {
      metaTitle: "Matières enseignées au secondaire et au cégep",
      metaDescription: "Tutorat en mathématiques, sciences, physique, chimie, programmation et français, du secondaire 1 au cégep, profils régulier et enrichi.",
      kicker: "Matières",
      title: "Les matières que nous enseignons",
      intro: "Du secondaire 1 à 5, profils régulier et enrichi, jusqu'aux cours de sciences de la nature et de français au cégep.",
    },
    regions: {
      metaTitle: "Tutorat sur la Rive-Sud et en Montérégie",
      metaDescription: "Tutorat à domicile et au centre à Longueuil, Brossard, Candiac, Saint-Constant et partout en Montérégie. Tutorat en ligne partout au Québec.",
      kicker: "Régions desservies",
      title: "Tutorat sur la Rive-Sud et partout en Montérégie",
      intro: "Nos tuteurs se déplacent à domicile sur la Rive-Sud et vous accueillent à notre centre. Pour les autres régions du Québec, le tutorat en ligne est là.",
    },
    pricing: {
      metaTitle: "Tarifs du tutorat",
      metaDescription: "Forfait mensuel à 500 $ (12 h par semaine en présentiel), tutorat en présentiel à 45 $ de l'heure et en ligne à 30 $ de l'heure.",
      kicker: "Tarifs",
      title: "Des tarifs clairs, sans surprise",
      intro: "Trois formules simples. Les heures se réservent et se paient directement en ligne, en toute sécurité.",
    },
  },

  // ─── SERVICES ─────────────────────────────────────────────
  services: [
    {
      slug: "tutorat-scolaire",
      label: "Tutorat scolaire",
      summary: "Un suivi personnalisé dans les matières où votre enfant a besoin d'aide.",
      metaTitle: "Tutorat scolaire au secondaire et au cégep",
      metaDescription: "Tutorat scolaire personnalisé du secondaire 1 au cégep : aide aux devoirs, compréhension des notions, rattrapage et méthodes d'étude.",
      kicker: "Services",
      title: "Tutorat scolaire personnalisé",
      intro: "Un tuteur qui suit le programme de votre enfant, comble ses lacunes et l'aide à reprendre le contrôle de ses résultats.",
      image: "/images/site/service-tutorat-scolaire.jpg",
      imageAlt: "Élève qui travaille sur son ordinateur avec ses notes",
      blocks: [
        {
          type: "steps",
          title: "Une séance, concrètement",
          intro: "Chaque séance suit le même fil, pour que l'élève sache où il s'en va.",
          steps: [
            { title: "Le point sur la semaine", body: "Ce qui a été vu en classe, les devoirs à remettre, les évaluations qui approchent." },
            { title: "Les notions qui bloquent", body: "Le tuteur réexplique autrement, avec des exemples, jusqu'à ce que ce soit clair." },
            { title: "Les exercices guidés", body: "L'élève pratique pendant que le tuteur corrige la méthode, pas seulement la réponse." },
            { title: "Le plan pour la suite", body: "On repart avec deux ou trois objectifs précis d'ici la prochaine séance." },
          ],
        },
        {
          type: "levels",
          title: "Du secondaire 1 au cégep",
          intro: "Nous suivons le programme québécois, en profil régulier comme en enrichi.",
          groups: [
            { title: "Secondaire 1 à 5", items: ["Mathématiques", "Sciences", "Physique", "Programmation", "Français", "Examens du ministère"] },
            { title: "Cégep", items: ["Calcul différentiel et intégral", "Algèbre linéaire", "Mécanique", "Chimie générale", "Biologie cellulaire", "Français 101 à 103"] },
          ],
        },
        {
          type: "fit",
          title: "C'est pour vous, ou pas",
          yesTitle: "C'est pour vous si",
          yes: [
            "Les notes de votre enfant baissent et le retard s'accumule d'une étape à l'autre.",
            "Il vise le profil enrichi, un programme contingenté au cégep ou la réussite des examens du ministère.",
            "Il a déjà essayé de s'organiser seul, mais le plan n'a pas tenu deux semaines.",
            "Vous cherchez un suivi régulier, pas une aide de dernière minute la veille d'un examen.",
            "Vous voulez qu'il progresse dans ses notes, mais aussi en confiance et en autonomie.",
          ],
          noTitle: "Ce n'est pas pour vous si",
          no: [
            "Vous cherchez quelqu'un qui fait les devoirs à sa place.",
            "Vous voulez seulement les réponses, sans qu'il comprenne la méthode.",
            "Votre enfant n'est pas prêt à s'investir pendant les séances.",
          ],
        },
      ],
      faq: [
        { q: "Combien de séances faut-il pour voir des progrès ?", a: "Cela dépend de l'élève et de ses lacunes. Un suivi régulier, chaque semaine, donne généralement les meilleurs résultats. Le forfait mensuel (12 heures par semaine) est pensé pour cela." },
        { q: "Le tuteur suit-il le programme de l'école ?", a: "Oui. Le tuteur travaille à partir des notions vues en classe, des devoirs et des évaluations à venir de votre enfant." },
      ],
    },
    {
      slug: "developpement-personnel",
      label: "Développement personnel",
      summary: "Confiance, discipline et leadership pour réussir à l'école et au-delà.",
      metaTitle: "Développement personnel pour adolescents",
      metaDescription: "Accompagnement en développement personnel pour les jeunes : confiance en soi, discipline, organisation, prise de parole et leadership.",
      kicker: "Services",
      title: "Confiance, discipline, leadership",
      intro: "Les bonnes notes ne suffisent pas. Nous aidons aussi les jeunes à croire en eux, à s'organiser et à prendre leur place.",
      image: "/images/site/service-developpement.jpg",
      imageAlt: "Animateur qui présente devant un groupe attentif",
      blocks: [
        {
          type: "statement",
          text: "Un élève qui croit en ses moyens pose plus de questions, persévère plus longtemps et apprend mieux.",
          body: "C'est pour cela que le développement personnel fait partie de chaque accompagnement chez Mentou Academy.",
        },
        {
          type: "features",
          title: "Quatre compétences, travaillées en séance",
          image: "/images/site/service-developpement-groupe.jpg",
          imageAlt: "Groupe de jeunes en discussion",
          items: [
            { icon: "heart", title: "Confiance en soi", body: "Oser répondre, oser se tromper, reconnaître ses progrès." },
            { icon: "calendar", title: "Discipline", body: "Un horaire d'étude réaliste, et la constance pour le tenir." },
            { icon: "chat", title: "Prise de parole", body: "S'exprimer clairement en classe, en exposé, en entrevue." },
            { icon: "target", title: "Leadership", body: "Se fixer des objectifs, prendre des responsabilités, entraîner les autres." },
          ],
        },
        {
          type: "checklist",
          tone: "warn",
          title: "Vous reconnaissez votre enfant ?",
          items: [
            "Il se décourage vite ou dit qu'il « n'est pas bon »",
            "Il remet tout à la dernière minute",
            "Il n'ose pas poser de questions ni prendre la parole en classe",
            "Il a les capacités, mais pas la motivation",
          ],
        },
      ],
      faq: [
        { q: "Le développement personnel est-il offert séparément ?", a: "Il est intégré à notre accompagnement, en particulier dans le forfait mensuel qui combine tutorat et développement personnel. Parlez-nous de vos besoins et nous adapterons les séances." },
        { q: "À partir de quel âge ?", a: "Nous accompagnons les élèves du secondaire et du cégep." },
      ],
    },
    {
      slug: "tutorat-a-domicile",
      label: "À domicile et au centre",
      summary: "Des séances en personne chez vous ou à notre centre sur le boulevard Taschereau.",
      metaTitle: "Tutorat à domicile sur la Rive-Sud",
      metaDescription: "Tutorat en présentiel à domicile à Longueuil, Brossard, Candiac, Saint-Constant et en Montérégie, ou à notre centre au 1765, boulevard Taschereau.",
      kicker: "Services",
      title: "Tutorat en personne, chez vous ou à notre centre",
      intro: "Un tuteur aux côtés de votre enfant. Le format idéal pour les élèves qui ont besoin d'un cadre et de constance.",
      image: "/images/site/service-domicile.jpg",
      imageAlt: "Mère qui aide son enfant à faire ses devoirs à la maison",
      blocks: [
        {
          type: "compare",
          title: "Deux façons de faire du présentiel",
          intro: "Même tuteur, même tarif. Choisissez le lieu qui vous simplifie la vie.",
          columns: [
            {
              title: "À domicile",
              icon: "home",
              tag: "Rive-Sud et Montérégie",
              items: [
                "Le tuteur vient chez vous, à l'heure convenue",
                "Aucun déplacement pour votre enfant",
                "Il travaille dans son environnement habituel",
              ],
            },
            {
              title: "À notre centre",
              icon: "school",
              tag: "Boulevard Taschereau",
              featured: true,
              items: [
                "Un lieu calme, pensé pour l'étude",
                "Moins de distractions qu'à la maison",
                "Idéal pour séparer l'école de la maison",
              ],
            },
          ],
        },
        {
          type: "price",
          title: "Ce que ça coûte",
          body: "Payez à l'heure ou choisissez le forfait mensuel pour un suivi intensif.",
          offers: [
            { label: "À l'heure", value: "45 $", detail: "Le nombre d'heures de votre choix" },
            { label: "Forfait mensuel", value: "500 $", detail: "12 heures par semaine, facturé chaque mois" },
          ],
          examples: [
            { label: "4 heures", value: "180 $" },
            { label: "8 heures", value: "360 $" },
            { label: "12 heures", value: "540 $" },
          ],
          note: TAX,
        },
        {
          type: "map",
          title: "Le centre Mentou Academy",
          body: "Les séances au centre se planifient avec vous lors du premier contact. Nous vous confirmons alors l'horaire et les détails d'accès.",
        },
      ],
      faq: [
        { q: "Mon adresse est hors de ces villes. Est-ce possible ?", a: "Nous couvrons toute la Montérégie. Indiquez votre adresse dans le formulaire et nous vous confirmerons les options. Le tutorat en ligne reste disponible partout au Québec." },
        { q: "Peut-on alterner domicile et centre ?", a: "Oui. Le tarif est le même, vous choisissez le lieu au moment de planifier les séances." },
      ],
    },
    {
      slug: "tutorat-en-ligne",
      label: "Tutorat en ligne",
      summary: "Des séances en visioconférence, partout au Québec, à 30 $ de l'heure.",
      metaTitle: "Tutorat en ligne partout au Québec",
      metaDescription: "Tutorat en ligne par visioconférence pour le secondaire et le cégep, partout au Québec, à 30 $ de l'heure.",
      kicker: "Services",
      title: "Tutorat en ligne, partout au Québec",
      intro: "Le même accompagnement qu'en présentiel, sans déplacement, avec des horaires plus souples. À 30 $ de l'heure.",
      image: "/images/site/service-en-ligne.jpg",
      imageAlt: "Élève qui suit une séance en ligne sur son portable",
      blocks: [
        {
          type: "checklist",
          tone: "ok",
          title: "Ce qu'il vous faut",
          intro: "Rien de compliqué. Si votre enfant peut faire un appel vidéo, il peut suivre une séance.",
          items: [
            "Un ordinateur ou une tablette avec caméra et micro",
            "Une connexion internet stable",
            "Un coin calme pendant la séance",
            "Ses cahiers, ses devoirs ou son examen à travailler",
          ],
        },
        {
          type: "compare",
          title: "En ligne ou en personne ?",
          columns: [
            {
              title: "En ligne",
              icon: "laptop",
              tag: "30 $/h",
              featured: true,
              items: [
                "Partout au Québec",
                "Horaires plus flexibles",
                "Idéal à partir du secondaire 3 et au cégep",
              ],
            },
            {
              title: "En présentiel",
              icon: "home",
              tag: "45 $/h",
              items: [
                "À domicile ou à notre centre sur la Rive-Sud",
                "Plus de cadre pour les élèves qui décrochent",
                "Forfait mensuel disponible (500 $)",
              ],
            },
          ],
        },
        {
          type: "price",
          title: "Combien ça coûte",
          offers: [{ label: "En ligne, à l'heure", value: "30 $", detail: "Le nombre d'heures de votre choix" }],
          examples: [
            { label: "5 heures", value: "150 $" },
            { label: "10 heures", value: "300 $" },
            { label: "20 heures", value: "600 $" },
          ],
          note: TAX,
        },
      ],
      faq: [
        { q: "Le tutorat en ligne est-il aussi efficace ?", a: "Pour la plupart des élèves, oui, surtout à partir du secondaire 3 et au cégep. Pour les élèves qui ont du mal à se concentrer, nous recommandons plutôt le présentiel." },
        { q: "Comment se déroule la première séance ?", a: "Après votre réservation, nous vous contactons pour fixer l'horaire et vous envoyer le lien de la séance." },
      ],
    },
    {
      slug: "preparation-examens",
      label: "Préparation aux examens",
      summary: "Examens du ministère en secondaire 4 et 5 et épreuve uniforme de français au cégep.",
      metaTitle: "Préparation aux examens du ministère et à l'EUF",
      metaDescription: "Préparation aux examens du ministère de secondaire 4 et 5, profils régulier et enrichi, et à l'épreuve uniforme de français (EUF) au cégep.",
      kicker: "Services",
      title: "Préparation aux examens du ministère et à l'EUF",
      intro: "Les examens de fin d'année pèsent lourd dans la note finale. Une préparation ciblée fait toute la différence.",
      image: "/images/site/service-examens.jpg",
      imageAlt: "Diplômée souriante le jour de sa remise de diplôme",
      blocks: [
        {
          type: "compare",
          title: "Deux examens, deux préparations",
          columns: [
            {
              title: "Examens du ministère",
              icon: "school",
              tag: "Secondaire 4 et 5",
              items: [
                "Profils régulier et enrichi",
                "Révision des notions clés de l'année",
                "Exercices de type examen, chronométrés",
              ],
            },
            {
              title: "Épreuve uniforme de français",
              icon: "book",
              tag: "Cégep",
              featured: true,
              items: [
                "Obligatoire pour obtenir le DEC",
                "Analyse et structure de la dissertation critique",
                "Qualité de la langue et révision",
              ],
            },
          ],
        },
        {
          type: "steps",
          title: "Le compte à rebours",
          intro: "Plus on commence tôt, moins la dernière semaine est stressante.",
          steps: [
            { title: "Huit semaines avant", body: "Diagnostic : on repère les notions solides et celles à reprendre." },
            { title: "Six semaines avant", body: "Révision par thème, en commençant par les lacunes les plus importantes." },
            { title: "Trois semaines avant", body: "Simulations en conditions réelles, corrigées avec l'élève." },
            { title: "La dernière semaine", body: "Révision ciblée, gestion du temps et du stress. Pas de nouvelle matière." },
          ],
        },
      ],
      faq: [
        { q: "Il reste moins d'un mois. Est-ce trop tard ?", a: "Non. Nous adaptons le plan au temps qui reste et nous concentrons sur ce qui rapporte le plus de points." },
        { q: "Combien d'heures prévoir ?", a: "Cela dépend des lacunes. Le forfait mensuel (12 heures par semaine) convient à une préparation intensive ; quelques heures ciblées suffisent pour une révision." },
      ],
    },
  ],

  // ─── MATIÈRES ─────────────────────────────────────────────
  subjects: [
    {
      slug: "mathematiques",
      label: "Mathématiques",
      summary: "Du secondaire 1 au calcul intégral, profils régulier et enrichi.",
      metaTitle: "Tuteur en mathématiques, secondaire et cégep",
      metaDescription: "Tutorat en mathématiques du secondaire 1 à 5 (régulier et enrichi), examens du ministère, calcul différentiel et intégral, algèbre linéaire, probabilités et statistiques.",
      kicker: "Matières",
      title: "Tutorat en mathématiques",
      intro: "Les mathématiques sont la matière où les lacunes s'accumulent le plus vite. Un tuteur les repère et les comble avant qu'elles ne bloquent la suite.",
      image: "/images/site/matiere-mathematiques.jpg",
      imageAlt: "Cahier d'exercices de mathématiques et stylo",
      blocks: [
        {
          type: "levels",
          title: "Ce que nous couvrons",
          groups: [
            { title: "Secondaire 1 à 5", items: ["Profil régulier", "Profil enrichi", "Examens du ministère, secondaire 4 et 5"] },
            { title: "Cégep", items: ["Calcul différentiel", "Calcul intégral", "Algèbre linéaire", "Probabilités et statistiques"] },
          ],
        },
        {
          type: "text",
          title: "Passer au profil enrichi",
          body: "Le passage au profil enrichi demande plus d'abstraction et de rigueur. Nous travaillons les notions avancées et les méthodes de résolution, pour que l'élève suive le rythme dès le début de l'année.",
        },
      ],
      faq: [
        { q: "Mon enfant a des lacunes depuis le secondaire 1. Par où commencer ?", a: "Par un diagnostic des bases. Le tuteur reprend les notions manquantes tout en suivant ce qui est vu en classe, pour ne pas prendre de retard." },
      ],
    },
    {
      slug: "sciences",
      label: "Sciences",
      summary: "Sciences au secondaire, régulier et enrichi, et biologie cellulaire au cégep.",
      metaTitle: "Tuteur en sciences, secondaire et cégep",
      metaDescription: "Tutorat en sciences du secondaire 1 à 5, profils régulier et enrichi, préparation aux examens du ministère et biologie cellulaire au cégep.",
      kicker: "Matières",
      title: "Tutorat en sciences",
      intro: "Comprendre plutôt qu'apprendre par cœur : nous aidons l'élève à faire les liens entre la théorie, les laboratoires et les problèmes.",
      image: "/images/site/matiere-sciences.jpg",
      imageAlt: "Modèle de double hélice d'ADN",
      blocks: [
        {
          type: "levels",
          title: "Ce que nous couvrons",
          groups: [
            { title: "Secondaire 1 à 5", items: ["Profil régulier", "Profil enrichi", "Examens du ministère"] },
            { title: "Cégep", items: ["Biologie cellulaire"] },
          ],
        },
        {
          type: "text",
          title: "Les rapports de laboratoire",
          body: "Nous aidons l'élève à comprendre la démarche scientifique et à structurer ses rapports : hypothèse, protocole, résultats, analyse. Sans faire le travail à sa place.",
        },
      ],
      faq: [
        { q: "La biologie cellulaire est difficile à mémoriser. Comment l'aidez-vous ?", a: "Avec des schémas, des liens entre les processus et beaucoup de questions de type examen, plutôt que de la mémorisation pure." },
      ],
    },
    {
      slug: "physique",
      label: "Physique",
      summary: "Physique au secondaire et cours de physique de sciences de la nature au cégep.",
      metaTitle: "Tuteur en physique, secondaire et cégep",
      metaDescription: "Tutorat en physique au secondaire et au cégep : mécanique, électricité et magnétisme, ondes et physique moderne.",
      kicker: "Matières",
      title: "Tutorat en physique",
      intro: "La physique demande à la fois des bases solides en mathématiques et une bonne compréhension des phénomènes. Nous travaillons les deux.",
      image: "/images/site/matiere-physique.jpg",
      imageAlt: "Lancement d'une fusée au crépuscule",
      blocks: [
        {
          type: "levels",
          title: "Ce que nous couvrons",
          groups: [
            { title: "Secondaire", items: ["Physique"] },
            { title: "Cégep", items: ["Mécanique", "Électricité et magnétisme", "Ondes et physique moderne"] },
          ],
        },
        {
          type: "steps",
          title: "Une méthode pour chaque problème",
          steps: [
            { title: "Comprendre la situation", body: "Faire un schéma, identifier ce qu'on cherche et ce qu'on connaît." },
            { title: "Choisir le bon principe", body: "Quelle loi s'applique, et pourquoi." },
            { title: "Résoudre et vérifier", body: "Les calculs, puis les unités et l'ordre de grandeur du résultat." },
          ],
        },
      ],
      faq: [
        { q: "Mon enfant est bon en maths mais bloque en physique. Pourquoi ?", a: "La physique demande de traduire un problème concret en équations. C'est une compétence qui se travaille, avec une méthode claire." },
      ],
    },
    {
      slug: "chimie",
      label: "Chimie",
      summary: "Chimie générale et chimie des solutions au cégep.",
      metaTitle: "Tuteur en chimie au cégep",
      metaDescription: "Tutorat en chimie au cégep : chimie générale et chimie des solutions, en présentiel sur la Rive-Sud ou en ligne.",
      kicker: "Matières",
      title: "Tutorat en chimie",
      intro: "Stœchiométrie, équilibres, solutions : nous aidons les étudiants à maîtriser les cours de chimie de sciences de la nature.",
      image: "/images/site/matiere-chimie.jpg",
      imageAlt: "Élève qui fait des calculs avec une calculatrice",
      blocks: [
        {
          type: "levels",
          title: "Ce que nous couvrons",
          groups: [{ title: "Cégep", items: ["Chimie générale", "Chimie des solutions"] }],
        },
        {
          type: "text",
          title: "Notre approche",
          body: "Nous revenons aux concepts de base quand il le faut, puis nous multiplions les exercices de type examen pour gagner en rapidité et en confiance.",
        },
      ],
      faq: [
        { q: "Offrez-vous la chimie au secondaire ?", a: "Notre offre en chimie vise le cégep. Pour le secondaire, consultez nos services en sciences et en physique, ou parlez-nous de votre besoin." },
      ],
    },
    {
      slug: "programmation",
      label: "Programmation",
      summary: "Programmation au secondaire et programmation en sciences au cégep.",
      metaTitle: "Tuteur en programmation, secondaire et cégep",
      metaDescription: "Tutorat en programmation pour les élèves du secondaire et le cours de programmation en sciences au cégep.",
      kicker: "Matières",
      title: "Tutorat en programmation",
      intro: "Apprendre à penser comme un programmeur : décomposer un problème, écrire du code clair et trouver ses erreurs.",
      image: "/images/site/matiere-programmation.jpg",
      imageAlt: "Mains sur un clavier devant du code",
      blocks: [
        {
          type: "levels",
          title: "Ce que nous couvrons",
          groups: [
            { title: "Secondaire", items: ["Programmation"] },
            { title: "Cégep", items: ["Programmation en sciences"] },
          ],
        },
        {
          type: "text",
          title: "Partir de zéro, sans stress",
          body: "Aucune expérience n'est nécessaire. Nous partons du niveau de l'élève et avançons étape par étape, avec ses propres exercices et travaux.",
        },
      ],
      faq: [],
    },
    {
      slug: "francais",
      label: "Français",
      summary: "Français au secondaire, cours 101, 102 et 103 au cégep et préparation à l'EUF.",
      metaTitle: "Tuteur en français, secondaire et cégep",
      metaDescription: "Tutorat en français du secondaire 1 à 5, examens du ministère, cours de français 101, 102, 103 au cégep et préparation à l'épreuve uniforme de français.",
      kicker: "Matières",
      title: "Tutorat en français",
      intro: "Lecture, écriture, grammaire, analyse : le français touche toutes les matières. Nous aidons l'élève à s'exprimer avec clarté et assurance.",
      image: "/images/site/matiere-francais.jpg",
      imageAlt: "Livre ouvert, crayon et café sur un bureau",
      blocks: [
        {
          type: "levels",
          title: "Ce que nous couvrons",
          groups: [
            { title: "Secondaire 1 à 5", items: ["Lecture et écriture", "Grammaire et orthographe", "Examens du ministère"] },
            { title: "Cégep", items: ["Français 101", "Français 102", "Français 103", "Préparation à l'EUF"] },
          ],
        },
        {
          type: "text",
          title: "L'épreuve uniforme de français",
          body: "L'EUF est obligatoire pour obtenir le diplôme d'études collégiales. Nous travaillons la dissertation critique : compréhension des textes, plan, argumentation et qualité de la langue.",
        },
      ],
      faq: [],
    },
  ],

  // ─── RÉGIONS ──────────────────────────────────────────────
  regions: [
    {
      slug: "longueuil",
      label: "Longueuil",
      summary: "Tutorat à domicile dans tous les arrondissements et à notre centre.",
      metaTitle: "Tuteur à Longueuil, secondaire et cégep",
      metaDescription: "Tutorat à domicile dans le Vieux-Longueuil, à Saint-Hubert et à Greenfield Park, et à notre centre au 1765, boulevard Taschereau. Secondaire et cégep.",
      kicker: "Régions",
      title: "Tutorat à Longueuil",
      intro: "Du Vieux-Longueuil à Saint-Hubert, nos tuteurs se déplacent chez vous. Vous pouvez aussi venir à notre centre du boulevard Taschereau.",
      image: "/images/site/region-longueuil.jpg",
      imageAlt: "Parents qui accompagnent leur enfant à la maison",
      hero: "panel",
      facts: [
        { icon: "home", label: "À domicile", value: "Les trois arrondissements" },
        { icon: "pin", label: "Au centre", value: CENTER },
        { icon: "laptop", label: "En ligne", value: "30 $ de l'heure" },
      ],
      blocks: [
        {
          type: "chips",
          title: "Partout à Longueuil",
          body: "Le tutorat à domicile est offert dans les trois arrondissements de la ville.",
          chips: ["Le Vieux-Longueuil", "Saint-Hubert", "Greenfield Park"],
        },
        {
          type: "map",
          title: "Votre centre sur la Rive-Sud",
          body: "Notre centre est situé sur le boulevard Taschereau, l'axe qui relie Longueuil au reste de la Rive-Sud.",
        },
        {
          type: "nearby",
          title: "Pour les élèves d'ici",
          intro: "Nous accompagnons les élèves des écoles de Longueuil et les étudiants du cégep de la ville.",
          places: [
            { name: "Écoles secondaires de Longueuil", note: "Mathématiques et sciences (régulier et enrichi), physique, français, examens du ministère." },
            { name: "Cégep Édouard-Montpetit", note: "Calcul, algèbre linéaire, mécanique, chimie, biologie cellulaire, français 101 à 103 et EUF." },
          ],
        },
      ],
      faq: [
        { q: "Combien coûte un tuteur à domicile à Longueuil ?", a: "45 $ de l'heure, ou 500 $ par mois avec le forfait mensuel de 12 heures par semaine. Taxes en sus." },
      ],
    },
    {
      slug: "brossard",
      label: "Brossard",
      summary: "Tuteur à domicile ou au centre, sur le boulevard Taschereau.",
      metaTitle: "Tuteur à Brossard, secondaire et cégep",
      metaDescription: "Tutorat à domicile à Brossard et à notre centre sur le boulevard Taschereau. Mathématiques, sciences, physique, français, examens du ministère et cégep.",
      kicker: "Régions",
      title: "Tutorat à Brossard",
      intro: "Le boulevard Taschereau traverse Brossard, et notre centre est situé sur ce même boulevard. Nos tuteurs viennent aussi chez vous.",
      image: "/images/site/region-brossard.jpg",
      imageAlt: "Père qui aide son fils à faire ses devoirs",
      hero: "panel",
      facts: [
        { icon: "school", label: "Au centre", value: CENTER },
        { icon: "home", label: "À domicile", value: "Partout à Brossard" },
        { icon: "clock", label: "Forfait intensif", value: "12 h par semaine, 500 $/mois" },
      ],
      blocks: [
        {
          type: "compare",
          title: "À Brossard, vous avez le choix",
          columns: [
            {
              title: "Au centre",
              icon: "school",
              tag: "Sur le boulevard Taschereau",
              featured: true,
              items: [
                "Un lieu calme, sans les distractions de la maison",
                "Pratique en sortant de l'école",
                "45 $ de l'heure ou forfait mensuel",
              ],
            },
            {
              title: "À domicile",
              icon: "home",
              tag: "Partout à Brossard",
              items: [
                "Le tuteur vient chez vous",
                "Aucun déplacement pour votre enfant",
                "Même tarif qu'au centre",
              ],
            },
          ],
        },
        {
          type: "steps",
          title: "Secondaire 4 et 5 : l'année des examens",
          intro: "Nous préparons les élèves de Brossard aux examens du ministère, en régulier comme en enrichi.",
          steps: [
            { title: "Dès l'automne", body: "Consolider les notions de l'année en cours, au rythme de la classe." },
            { title: "Après les fêtes", body: "Repérer les points faibles et les reprendre un par un." },
            { title: "Au printemps", body: "Examens blancs chronométrés et corrections détaillées." },
          ],
        },
      ],
      faq: [
        { q: "Mon enfant étudie au cégep. Pouvez-vous l'aider ?", a: "Oui : calcul, algèbre linéaire, mécanique, électricité et magnétisme, chimie, biologie cellulaire, français 101 à 103 et préparation à l'EUF." },
      ],
    },
    {
      slug: "candiac",
      label: "Candiac",
      summary: "Le tuteur vient chez vous, à Candiac et dans les villes voisines.",
      metaTitle: "Tuteur à domicile à Candiac, secondaire et cégep",
      metaDescription: "Tutorat à domicile à Candiac, La Prairie, Delson et Saint-Philippe pour le secondaire et le cégep. Tutorat en ligne aussi disponible.",
      kicker: "Régions",
      title: "Tutorat à domicile à Candiac",
      intro: "À Candiac, c'est le tuteur qui se déplace. Votre enfant étudie chez lui, à l'heure qui vous convient.",
      image: "/images/site/region-candiac.jpg",
      imageAlt: "Famille qui lit ensemble à la maison",
      hero: "panel",
      facts: [
        { icon: "home", label: "Format principal", value: "Tutorat à domicile" },
        { icon: "laptop", label: "Pour plus de flexibilité", value: "En ligne, 30 $ de l'heure" },
        { icon: "pin", label: "Villes voisines", value: "La Prairie, Delson, Saint-Philippe" },
      ],
      blocks: [
        {
          type: "steps",
          title: "Comment ça se passe à domicile",
          steps: [
            { title: "Vous réservez en ligne", body: "Formule, nombre d'heures, matières et adresse : tout se fait dans le formulaire." },
            { title: "On vous appelle", body: "Nous fixons ensemble les jours et les heures qui conviennent à votre famille." },
            { title: "Le tuteur arrive chez vous", body: "Il apporte sa méthode ; votre enfant prépare ses cahiers et ses devoirs." },
            { title: "Vous êtes tenu au courant", body: "Un suivi régulier vous indique les progrès et les points à travailler." },
          ],
        },
        {
          type: "chips",
          title: "Candiac et les environs",
          body: "Nous nous déplaçons aussi dans les villes voisines.",
          chips: ["Candiac", "La Prairie", "Delson", "Saint-Philippe"],
        },
      ],
      faq: [
        { q: "Combien coûte un tuteur à domicile à Candiac ?", a: "45 $ de l'heure, ou 500 $ par mois avec le forfait mensuel de 12 heures par semaine. Taxes en sus." },
        { q: "Peut-on venir au centre depuis Candiac ?", a: "Oui, notre centre au 1765, boulevard Taschereau vous accueille aussi, au même tarif." },
      ],
    },
    {
      slug: "saint-constant",
      label: "Saint-Constant",
      summary: "Domicile et en ligne combinés, pour suivre le rythme de votre famille.",
      metaTitle: "Tuteur à Saint-Constant, secondaire et cégep",
      metaDescription: "Tutorat à domicile et en ligne à Saint-Constant, Sainte-Catherine, Delson et Saint-Mathieu pour le secondaire et le cégep.",
      kicker: "Régions",
      title: "Tutorat à Saint-Constant",
      intro: "Domicile quand c'est possible, en ligne quand l'horaire déborde. À Saint-Constant, beaucoup de familles combinent les deux.",
      image: "/images/site/region-saint-constant.jpg",
      imageAlt: "Famille réunie dans le salon",
      hero: "panel",
      facts: [
        { icon: "home", label: "À domicile", value: "45 $ de l'heure" },
        { icon: "laptop", label: "En ligne", value: "30 $ de l'heure" },
        { icon: "pin", label: "Villes voisines", value: "Sainte-Catherine, Delson, Saint-Mathieu" },
      ],
      blocks: [
        {
          type: "compare",
          title: "Combiner domicile et en ligne",
          intro: "Vous réservez les deux types d'heures selon les semaines.",
          columns: [
            {
              title: "À domicile",
              icon: "home",
              tag: "45 $/h",
              items: [
                "Pour les notions difficiles et les révisions importantes",
                "Le tuteur vient chez vous",
                "Plus de cadre pour garder le rythme",
              ],
            },
            {
              title: "En ligne",
              icon: "laptop",
              tag: "30 $/h",
              featured: true,
              items: [
                "Pour les devoirs et les questions de la semaine",
                "Aucun déplacement",
                "Plus économique pour un suivi régulier",
              ],
            },
          ],
        },
        {
          type: "price",
          title: "Exemple de mois combiné",
          body: "Une heure à domicile et une heure en ligne par semaine, pendant quatre semaines.",
          offers: [
            { label: "4 heures à domicile", value: "180 $", detail: "4 × 45 $" },
            { label: "4 heures en ligne", value: "120 $", detail: "4 × 30 $" },
          ],
          note: `Total de 300 $ pour 8 heures. ${TAX}`,
        },
        {
          type: "chips",
          title: "Saint-Constant et les environs",
          chips: ["Saint-Constant", "Sainte-Catherine", "Delson", "Saint-Mathieu"],
        },
      ],
      faq: [
        { q: "Les deux types d'heures se réservent-ils ensemble ?", a: "Chaque formule se réserve séparément dans le formulaire. Indiquez dans le champ « détails » que vous souhaitez combiner les deux." },
      ],
    },
  ],

  about: {
    slug: "a-propos",
    label: "À propos",
    summary: "Qui nous sommes et comment nous accompagnons les élèves.",
    metaTitle: "À propos de Mentou Academy",
    metaDescription: "Mentou Academy accompagne les élèves du secondaire et du cégep en tutorat scolaire et en développement personnel, sur la Rive-Sud et en ligne.",
    kicker: "À propos",
    title: "Faire réussir les élèves, et les faire grandir",
    intro: "Mentou Academy est née d'une conviction : un élève qui reprend confiance en lui progresse aussi dans ses notes.",
    image: "/images/site/about.jpg",
    imageAlt: "Étudiants qui travaillent dans une bibliothèque",
    blocks: [
      {
        type: "statement",
        text: "Notre mission : que chaque élève comprenne ses matières, gagne en autonomie et développe la confiance qui l'aidera toute sa vie.",
      },
      {
        type: "features",
        title: "Notre façon de travailler",
        image: "/images/site/about-travail.jpg",
        imageAlt: "Élève en séance de travail",
        items: [
          { icon: "users", title: "Un jumelage réfléchi", body: "Le tuteur est choisi selon le niveau, les matières et la personnalité de l'élève." },
          { icon: "book", title: "Le programme de l'école", body: "On travaille ce qui est vu en classe, pas un programme parallèle." },
          { icon: "spark", title: "Le développement personnel", body: "Confiance, discipline et leadership font partie des séances." },
          { icon: "chat", title: "Les parents informés", body: "Un suivi régulier sur les progrès et les points à travailler." },
        ],
      },
      {
        type: "map",
        title: "Où nous trouver",
        body: "Notre centre accueille les élèves sur rendez-vous. Nous offrons aussi le tutorat à domicile à Longueuil, Brossard, Candiac, Saint-Constant et partout en Montérégie, et en ligne partout au Québec.",
      },
    ],
    faq: [],
  },
};

export default fr;
