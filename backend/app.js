import "dotenv/config"; // copie les cles valeurs de .env vers process.env*/
import express from "express"; // Importation du framework Express
import { PrismaClient } from "@prisma/client"; // Importation du client Prisma pour interagir avec la base de données
import bcrypt from "bcryptjs"; // Importation de bcrypt pour le hachage des mots de passe
import { v4 as uuidv4 } from "uuid"; // Importation de la fonction uuid pour générer des identifiants uniques
import cookieParser from "cookie-parser"; // Importation du middleware pour gérer les cookies
import jwt from "jsonwebtoken";

//import { sendMyMail } from '../frontend/use/use.js'        // Importation de la fonction d'envoi d'e-mails*/
import { sendMyMail, generateRandomCode } from "./lib/mail.js"; // Importation de la fonction pour générer des codes aléatoires

const prisma = new PrismaClient(); // Création d'une instance du client Prisma pour interagir avec la base de données

const app = express(); // Création d'une instance d'Express

const { sign } = jwt;

app.set("view engine", "ejs"); // Configuration du moteur de rendu pour utiliser EJS

//////////////////////////////////////////// ROUTE MIDDLEWARES //////////////////////////////////////////////////////////

//couche Cookiesparser: middleware pour parser les cookies
app.use(cookieParser());

//couche bodyparser: middleware pour parser les données du corps des requêtes (formulaires)
app.use(express.json());

//couche assets: middleware pour servir des fichiers statiques (assets)
app.use("/assets", express.static("./assets"));

app.get("/api/listAsso", async (req, res) => {
  const associations = await prisma.association.findMany({
    include: {
      sports: true,
      handicaps: true,
    },
  });
  res.json(associations);
});

app.get("/api/listSport", async (req, res) => {
  const sports = await prisma.sport.findMany();
  res.json(sports);
  console.log("Liste des sports", sports);
});

app.get("/api/listHandi", async (req, res) => {
  const handicaps = await prisma.handicap.findMany();
  res.json(handicaps);
  console.log("Liste des type de handicap", handicaps);
});

//CREATE ACCOUNT
app.post("/auth/create_account", async (req, res) => {
  const { email, password, password2 } = req.body; // Récupération des données du formulaire

  // Vérification si les mots de passe correspondent
  let user = await prisma.user.findUnique({
    where: { email }, // Recherche d'un utilisateur par e-mail
  });

  if (user) {
    // Si l'utilisateur existe déjà, affiche un message d'erreur
    res.sendStatus(400);
  } else {
    // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
    const hash_password = await bcrypt.hash(password, 3); // Hachage du mot de passe
    user = await prisma.user.create({
      data: {
        email,
        password: hash_password,
        role: "handispo-fan", // Rôle par défaut
      },
    });
    res.sendStatus(200); // Redirection vers la page de validation du compte
  }
});

//CHECK USER
app.post("/auth/check_user", async (req, res) => {
  const { email, password } = req.body; // Récupération des données du formulaire
  let user = await prisma.user.findUnique({ where: { email } }); // Recherche de l'utilisateur par e-mail

  if (user) {
    // Vérification du mot de passe
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      //Générer un token
      const createTokenFromJson = (jsonData, options = {}) => {
        try {
          const secretKey = "test";
          const token = jwt.sign(jsonData, secretKey, options);
          return token;
        } catch (error) {
          console.log("Error : ", error.message);
          return null;
        }
      };

      const token = createTokenFromJson({ email, password }, {expiresIn: '1h'});

      if (token) {
        //res.json({ status: true, token: token });
        const cookieOptions = {
         httpOnly: true, // Empêche l'accès au cookie via JavaScript
         secure: process.env.NODE_ENV === 'production', // Utiliser secure en production
         sameSite: 'Strict', // Prévenir les attaques CSRF
         expires: new Date(Date.now() + 3600000) // 1 heure en millisecondes
       };

        res.cookie('access_token', token, cookieOptions)
        res.sendStatus(200);
        console.log("TOKEEEEENN", token)
      }
    } else {
      // Si le mot de passe est incorrecte, affiche un message d'erreur sur la page de connexion
      res.sendStatus(403)
    }
  } else {
    // Si l'e-mail n'est pas trouvé dans la base de données, afficher un message d'erreur sur la page de connexion
    res.sendStatus(403);
  }
});



// Configuration du port d'écoute
const PORT = process.env.PORT || 3010; // Utilisation du port défini dans les variables d'environnement ou 3000 par défaut
app.listen(PORT, () => {
  // Affichage d'un message dans la console pour indiquer que le serveur est en cours d'exécution
  console.log(`Server listening on port http://localhost:${PORT}`);
});
