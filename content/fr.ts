import type { SiteContent } from "./types";

const CENTER = "1765, boulevard Taschereau";

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
    relatedTitle: "À découvrir aussi",
    ctaTitle: "Prêt à commencer ?",
    ctaBody: "Choisissez votre formule et réservez vos heures en ligne. Nous vous contactons ensuite pour planifier les séances.",
    ctaButton: "Demander un tuteur",
    center: "Notre centre",
    centerAddress: CENTER,
    centerBody: "Les séances en présentiel ont lieu à domicile ou à notre centre, sur le boulevard Taschereau.",
    regionsHome: "Présents sur la Rive-Sud",
    regionsHomeBody: "Tutorat à domicile et à notre centre à Longueuil, Brossard, Candiac, Saint-Constant et partout en Montérégie. En ligne partout au Québec.",
    monteregie: "Toute la Montérégie",
    breadcrumbHome: "Accueil",
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
      image: "/images/tutorat.jpeg",
      imageAlt: "Élève qui travaille ses devoirs avec ses cahiers et son ordinateur",
      highlights: ["Secondaire 1 à 5 et cégep", "Profils régulier et enrichi", "À domicile, au centre ou en ligne"],
      sections: [
        {
          title: "Ce que nous travaillons ensemble",
          items: [
            "Aide aux devoirs et compréhension des notions vues en classe",
            "Rattrapage et remise à niveau après une étape difficile",
            "Préparation aux examens et aux évaluations",
            "Méthodes d'étude, prise de notes et organisation",
          ],
        },
        {
          title: "Un plan adapté à chaque élève",
          body: "Lors du premier contact, nous faisons le point sur les difficultés, les objectifs et l'horaire de votre enfant. Le tuteur construit ensuite un plan de travail qui suit le rythme du programme scolaire et s'ajuste au fil des séances.",
        },
        {
          title: "Pour qui ?",
          items: [
            "L'élève dont les notes baissent ou qui a échoué une étape",
            "L'élève qui vise le profil enrichi ou une admission sélective",
            "L'étudiant au cégep qui bloque sur un cours de sciences ou de français",
          ],
        },
      ],
      faq: [
        { q: "Combien de séances faut-il pour voir des progrès ?", a: "Cela dépend de l'élève et de ses lacunes. Un suivi régulier, chaque semaine, donne généralement les meilleurs résultats. Le forfait mensuel (12 heures par semaine) est pensé pour cela." },
        { q: "Le tuteur suit-il le programme de l'école ?", a: "Oui. Le tuteur travaille à partir des notions vues en classe, des devoirs et des évaluations à venir de votre enfant." },
      ],
    },
    {
      slug: "developpement-personnel",
      label: "Développement personnel",
      summary: "Confiance, discipline et leadership pour réussir à l'école et au-delà.",
      metaTitle: "Développement personnel pour adolescents",
      metaDescription: "Accompagnement en développement personnel pour les jeunes : confiance en soi, discipline, organisation, prise de parole et leadership.",
      kicker: "Services",
      title: "Développement personnel : confiance, discipline, leadership",
      intro: "Les bonnes notes ne suffisent pas. Nous aidons aussi les jeunes à croire en eux, à s'organiser et à prendre leur place.",
      image: "/images/mentorat.jpeg",
      imageAlt: "Jeunes qui travaillent ensemble devant un tableau blanc",
      highlights: ["Confiance en soi", "Discipline et organisation", "Prise de parole et leadership"],
      sections: [
        {
          title: "Les compétences que nous développons",
          items: [
            "Confiance et estime de soi",
            "Discipline, gestion du temps et organisation du travail",
            "Prise de parole et communication",
            "Leadership, autonomie et sens des responsabilités",
          ],
        },
        {
          title: "Intégré au tutorat",
          body: "Le développement personnel fait partie de notre accompagnement. Pendant les séances, le tuteur aide l'élève à se fixer des objectifs, à tenir ses engagements et à gérer le stress des examens. Le forfait mensuel combine tutorat scolaire et développement personnel.",
        },
        {
          title: "Les signes qu'il en a besoin",
          items: [
            "Il se décourage vite ou dit qu'il « n'est pas bon »",
            "Il remet tout à la dernière minute",
            "Il n'ose pas poser de questions ou prendre la parole en classe",
          ],
        },
      ],
      faq: [
        { q: "Le développement personnel est-il offert séparément ?", a: "Il est intégré à notre accompagnement, en particulier dans le forfait mensuel. Parlez-nous de vos besoins et nous adapterons les séances." },
        { q: "À partir de quel âge ?", a: "Nous accompagnons les élèves du secondaire et du cégep." },
      ],
    },
    {
      slug: "tutorat-a-domicile",
      label: "À domicile et au centre",
      summary: "Des séances en personne chez vous ou à notre centre sur le boulevard Taschereau.",
      metaTitle: "Tutorat à domicile sur la Rive-Sud",
      metaDescription: "Tutorat en présentiel à domicile à Longueuil, Brossard, Candiac, Saint-Constant et en Montérégie, ou à notre centre au 1765, boulevard Taschereau.",
      kicker: "Services",
      title: "Tutorat à domicile et à notre centre",
      intro: "Un tuteur aux côtés de votre enfant, chez vous ou à notre centre. Le format idéal pour les élèves qui ont besoin d'un cadre.",
      image: "/images/junior.jpg",
      imageAlt: "Élève qui travaille sur une tablette pendant une séance",
      highlights: ["45 $ de l'heure", "Forfait mensuel 500 $", "Rive-Sud et Montérégie"],
      sections: [
        {
          title: "Deux options en présentiel",
          items: [
            "À domicile : le tuteur se déplace chez vous, sur la Rive-Sud et en Montérégie",
            `À notre centre : au ${CENTER}, dans un environnement calme et propice à l'étude`,
          ],
        },
        {
          title: "Pourquoi le présentiel ?",
          body: "La présence d'un tuteur aide l'élève à rester concentré, à s'organiser et à garder le rythme. C'est souvent le format le plus efficace pour un élève qui décroche ou qui manque de motivation.",
        },
        {
          title: "Villes desservies",
          items: ["Longueuil", "Brossard", "Candiac", "Saint-Constant", "Partout en Montérégie"],
        },
      ],
      faq: [
        { q: "Quel est le tarif en présentiel ?", a: "45 $ de l'heure, ou 500 $ par mois pour le forfait mensuel qui comprend 12 heures par semaine. Taxes en sus." },
        { q: "Mon adresse est hors de ces villes. Est-ce possible ?", a: "Nous couvrons toute la Montérégie. Indiquez votre adresse dans le formulaire et nous vous confirmerons les options. Le tutorat en ligne reste disponible partout au Québec." },
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
      intro: "La même qualité d'accompagnement qu'en présentiel, sans déplacement, avec des horaires plus souples.",
      image: "/images/tutorat1.jpeg",
      imageAlt: "Élève en séance de tutorat en ligne avec sa tutrice",
      highlights: ["30 $ de l'heure", "Partout au Québec", "Horaires flexibles"],
      sections: [
        {
          title: "Comment ça se passe",
          items: [
            "Séances en visioconférence avec partage d'écran",
            "Travail sur les exercices, les devoirs et les examens de l'élève",
            "Un simple ordinateur ou une tablette avec une connexion internet suffit",
          ],
        },
        {
          title: "Idéal pour",
          items: [
            "Les familles hors de la Rive-Sud",
            "Les horaires chargés (sport, travail, transport)",
            "Les étudiants au cégep autonomes qui veulent un coup de pouce ciblé",
          ],
        },
      ],
      faq: [
        { q: "Le tutorat en ligne est-il aussi efficace ?", a: "Pour la plupart des élèves, oui, surtout au secondaire 3 et plus et au cégep. Pour les élèves qui ont du mal à se concentrer, nous recommandons plutôt le présentiel." },
        { q: "Quel matériel faut-il ?", a: "Un ordinateur ou une tablette avec caméra, micro et connexion internet." },
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
      intro: "Les examens de fin d'année comptent beaucoup dans la note finale. Une préparation ciblée fait la différence.",
      image: "/images/lecture.jpeg",
      imageAlt: "Pile de livres sur un bureau d'étude",
      highlights: ["Secondaire 4 et 5", "Régulier et enrichi", "EUF au cégep"],
      sections: [
        {
          title: "Examens du ministère, secondaire 4 et 5",
          body: "Nous préparons les élèves aux épreuves du ministère en profil régulier et enrichi : révision des notions clés, exercices de type examen et gestion du temps.",
        },
        {
          title: "Épreuve uniforme de français (EUF)",
          body: "Au cégep, l'EUF est obligatoire pour obtenir le diplôme d'études collégiales. Nous travaillons l'analyse, la structure de la dissertation critique et la qualité de la langue.",
        },
        {
          title: "Notre méthode",
          items: [
            "Diagnostic des forces et des lacunes",
            "Plan de révision réparti sur les semaines avant l'examen",
            "Simulations en conditions réelles",
            "Stratégies de gestion du stress",
          ],
        },
      ],
      faq: [
        { q: "Quand faut-il commencer à se préparer ?", a: "Idéalement plusieurs semaines avant l'examen, pour réviser sans pression. Mais il n'est jamais trop tard pour une révision intensive." },
      ],
    },
  ],

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
      image: "/images/tutorat.jpeg",
      imageAlt: "Élève qui fait des exercices de mathématiques",
      highlights: ["Régulier et enrichi", "Examens du ministère", "Cours de cégep"],
      sections: [
        {
          title: "Au secondaire (1 à 5)",
          items: [
            "Mathématiques, profil régulier",
            "Mathématiques, profil enrichi",
            "Préparation aux examens du ministère de secondaire 4 et 5",
          ],
        },
        {
          title: "Au cégep",
          items: ["Calcul différentiel", "Calcul intégral", "Algèbre linéaire", "Probabilités et statistiques"],
        },
      ],
      faq: [
        { q: "Mon enfant veut passer au profil enrichi. Pouvez-vous l'aider ?", a: "Oui. Nous travaillons les notions plus avancées et les méthodes de résolution pour l'aider à réussir en enrichi." },
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
      image: "/images/mentorat.jpeg",
      imageAlt: "Jeunes qui travaillent ensemble sur un projet",
      highlights: ["Régulier et enrichi", "Examens du ministère", "Biologie cellulaire"],
      sections: [
        {
          title: "Au secondaire (1 à 5)",
          items: [
            "Sciences, profil régulier",
            "Sciences, profil enrichi",
            "Préparation aux examens du ministère de secondaire 4",
          ],
        },
        {
          title: "Au cégep",
          items: ["Biologie cellulaire"],
        },
      ],
      faq: [
        { q: "Aidez-vous pour les rapports de laboratoire ?", a: "Oui, nous aidons l'élève à comprendre la démarche et à structurer ses rapports, sans faire le travail à sa place." },
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
      image: "/images/tutorat1.jpeg",
      imageAlt: "Séance de tutorat devant un écran",
      highlights: ["Secondaire", "Mécanique", "Électricité et magnétisme"],
      sections: [
        { title: "Au secondaire", items: ["Physique"] },
        {
          title: "Au cégep",
          items: ["Mécanique", "Électricité et magnétisme", "Ondes et physique moderne"],
        },
      ],
      faq: [
        { q: "Mon enfant est bon en maths mais bloque en physique. Pourquoi ?", a: "La physique demande de traduire un problème concret en équations. C'est une compétence qui se travaille, avec des méthodes de résolution claires." },
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
      image: "/images/lecture.jpeg",
      imageAlt: "Livres et notes d'étude",
      highlights: ["Chimie générale", "Chimie des solutions", "Cégep"],
      sections: [
        { title: "Au cégep", items: ["Chimie générale", "Chimie des solutions"] },
        {
          title: "Notre approche",
          body: "Nous revenons aux concepts de base quand il le faut, puis nous multiplions les exercices de type examen pour gagner en rapidité et en confiance.",
        },
      ],
      faq: [
        { q: "Offrez-vous la chimie au secondaire ?", a: "Notre offre en chimie vise le cégep. Pour le secondaire, consultez nos services en sciences et en physique, ou parlez-nous de votre besoin." },
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
      image: "/images/tutorat1.jpeg",
      imageAlt: "Élève devant un ordinateur",
      highlights: ["Secondaire", "Programmation en sciences", "Logique et résolution de problèmes"],
      sections: [
        { title: "Au secondaire", items: ["Programmation"] },
        { title: "Au cégep", items: ["Programmation en sciences"] },
      ],
      faq: [
        { q: "Mon enfant n'a jamais programmé. Est-ce un problème ?", a: "Non. Nous partons de son niveau et avançons étape par étape." },
      ],
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
      image: "/images/lecture.jpeg",
      imageAlt: "Pile de livres sur un bureau",
      highlights: ["Secondaire 1 à 5", "Français 101, 102, 103", "Préparation à l'EUF"],
      sections: [
        {
          title: "Au secondaire (1 à 5)",
          items: ["Français, lecture et écriture", "Grammaire et orthographe", "Préparation aux examens du ministère"],
        },
        {
          title: "Au cégep",
          items: ["Français 101", "Français 102", "Français 103", "Préparation à l'épreuve uniforme de français (EUF)"],
        },
      ],
      faq: [
        { q: "Qu'est-ce que l'EUF ?", a: "L'épreuve uniforme de français est un examen obligatoire pour obtenir le diplôme d'études collégiales. Elle porte sur la dissertation critique." },
      ],
    },
  ],

  regions: [
    {
      slug: "longueuil",
      label: "Longueuil",
      summary: "Tutorat à domicile, au centre et en ligne à Longueuil.",
      metaTitle: "Tuteur à Longueuil, secondaire et cégep",
      metaDescription: "Tutorat à domicile à Longueuil et à notre centre au 1765, boulevard Taschereau. Mathématiques, sciences, physique, chimie, français, du secondaire au cégep.",
      kicker: "Régions",
      title: "Tutorat à Longueuil",
      intro: "Vous habitez Longueuil ? Nos tuteurs se déplacent chez vous, ou accueillent votre enfant à notre centre du boulevard Taschereau.",
      image: "/images/junior.jpg",
      imageAlt: "Élève en séance de tutorat",
      highlights: ["À domicile", "Au centre, boulevard Taschereau", "Secondaire et cégep"],
      sections: [
        {
          title: "Nos services à Longueuil",
          items: [
            "Tutorat à domicile dans tous les secteurs de Longueuil",
            `Séances à notre centre au ${CENTER}`,
            "Tutorat en ligne si vous préférez rester à la maison",
          ],
        },
        {
          title: "Pour les élèves du secondaire et du cégep",
          body: "Nous accompagnons les élèves des écoles secondaires de Longueuil et les étudiants des cégeps de la Rive-Sud en mathématiques, sciences, physique, chimie, programmation et français.",
        },
      ],
      faq: [
        { q: "Où se trouve votre centre ?", a: `Au ${CENTER}. Nous vous confirmons les détails d'accès lors de la planification des séances.` },
      ],
    },
    {
      slug: "brossard",
      label: "Brossard",
      summary: "Tutorat à domicile et en ligne à Brossard, à deux pas de notre centre.",
      metaTitle: "Tuteur à Brossard, secondaire et cégep",
      metaDescription: "Tutorat à domicile à Brossard et à notre centre sur le boulevard Taschereau. Aide en mathématiques, sciences, physique et français, du secondaire au cégep.",
      kicker: "Régions",
      title: "Tutorat à Brossard",
      intro: "Les familles de Brossard profitent d'un tuteur à domicile ou de notre centre, tout proche sur le boulevard Taschereau.",
      image: "/images/tutorat.jpeg",
      imageAlt: "Élève qui fait ses devoirs",
      highlights: ["À domicile", "Centre à proximité", "Secondaire et cégep"],
      sections: [
        {
          title: "Nos services à Brossard",
          items: [
            "Tutorat à domicile partout à Brossard",
            `Séances à notre centre au ${CENTER}`,
            "Tutorat en ligne à 30 $ de l'heure",
          ],
        },
        {
          title: "Préparation aux examens",
          body: "Nous préparons les élèves de secondaire 4 et 5 de Brossard aux examens du ministère, en profil régulier et enrichi.",
        },
      ],
      faq: [
        { q: "Combien coûte un tuteur à domicile à Brossard ?", a: "45 $ de l'heure, ou 500 $ par mois avec le forfait mensuel de 12 heures par semaine. Taxes en sus." },
      ],
    },
    {
      slug: "candiac",
      label: "Candiac",
      summary: "Tutorat à domicile et en ligne à Candiac.",
      metaTitle: "Tuteur à Candiac, secondaire et cégep",
      metaDescription: "Tutorat à domicile à Candiac pour les élèves du secondaire et du cégep : mathématiques, sciences, physique, chimie, programmation et français.",
      kicker: "Régions",
      title: "Tutorat à Candiac",
      intro: "À Candiac, nos tuteurs viennent chez vous pour accompagner votre enfant dans ses matières et dans sa confiance.",
      image: "/images/mentorat.jpeg",
      imageAlt: "Jeunes en séance de travail",
      highlights: ["À domicile", "En ligne", "Secondaire et cégep"],
      sections: [
        {
          title: "Nos services à Candiac",
          items: [
            "Tutorat à domicile à Candiac",
            "Tutorat en ligne pour plus de flexibilité",
            "Séances possibles à notre centre sur le boulevard Taschereau",
          ],
        },
        {
          title: "Un accompagnement complet",
          body: "En plus du tutorat scolaire, nous aidons les jeunes de Candiac à gagner en confiance, en discipline et en autonomie.",
        },
      ],
      faq: [
        { q: "Les tuteurs se déplacent-ils à Candiac ?", a: "Oui, le tutorat à domicile est offert à Candiac. Indiquez votre adresse dans le formulaire de demande." },
      ],
    },
    {
      slug: "saint-constant",
      label: "Saint-Constant",
      summary: "Tutorat à domicile et en ligne à Saint-Constant.",
      metaTitle: "Tuteur à Saint-Constant, secondaire et cégep",
      metaDescription: "Tutorat à domicile à Saint-Constant pour le secondaire et le cégep : mathématiques, sciences, physique, chimie et français. Tutorat en ligne aussi disponible.",
      kicker: "Régions",
      title: "Tutorat à Saint-Constant",
      intro: "À Saint-Constant, profitez d'un tuteur à domicile ou de séances en ligne, selon votre horaire.",
      image: "/images/tutorat1.jpeg",
      imageAlt: "Séance de tutorat en ligne",
      highlights: ["À domicile", "En ligne", "Secondaire et cégep"],
      sections: [
        {
          title: "Nos services à Saint-Constant",
          items: [
            "Tutorat à domicile à Saint-Constant",
            "Tutorat en ligne à 30 $ de l'heure",
            "Préparation aux examens du ministère et à l'EUF",
          ],
        },
        {
          title: "Matières enseignées",
          body: "Mathématiques (régulier et enrichi), sciences, physique, programmation et français au secondaire, et les principaux cours de sciences de la nature et de français au cégep.",
        },
      ],
      faq: [
        { q: "Peut-on combiner domicile et en ligne ?", a: "Oui. Vous pouvez réserver des heures en présentiel et des heures en ligne selon vos besoins." },
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
    image: "/images/mentorat.jpeg",
    imageAlt: "Jeunes qui travaillent ensemble",
    highlights: ["Tutorat scolaire", "Développement personnel", "Rive-Sud et en ligne"],
    sections: [
      {
        title: "Notre mission",
        body: "Accompagner chaque élève du secondaire et du cégep pour qu'il comprenne ses matières, gagne en autonomie et développe la confiance, la discipline et le leadership qui l'aideront toute sa vie.",
      },
      {
        title: "Notre approche",
        items: [
          "Un jumelage réfléchi entre l'élève et son tuteur",
          "Un plan de travail qui suit le programme scolaire",
          "Le développement personnel intégré aux séances",
          "Un suivi régulier avec les parents",
        ],
      },
      {
        title: "Où nous trouver",
        body: `Notre centre est situé au ${CENTER}. Nous offrons aussi le tutorat à domicile à Longueuil, Brossard, Candiac, Saint-Constant et partout en Montérégie, ainsi qu'en ligne partout au Québec.`,
      },
    ],
    faq: [],
  },
};

export default fr;
