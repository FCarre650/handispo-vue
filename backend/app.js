import "dotenv/config"                             // copie les cles valeurs de .env vers process.env*/
import express from 'express'                      // Importation du framework Express
import {PrismaClient} from '@prisma/client'        // Importation du client Prisma pour interagir avec la base de données
import bcrypt from 'bcryptjs'                      // Importation de bcrypt pour le hachage des mots de passe 
import { v4 as uuidv4 } from 'uuid'                // Importation de la fonction uuid pour générer des identifiants uniques
import cookieParser from 'cookie-parser'           // Importation du middleware pour gérer les cookies 

//import { sendMyMail } from '../frontend/use/use.js'        // Importation de la fonction d'envoi d'e-mails*/
import {sendMyMail, generateRandomCode} from './lib/mail.js'  // Importation de la fonction pour générer des codes aléatoires


const prisma = new PrismaClient() // Création d'une instance du client Prisma pour interagir avec la base de données

const app = express()            // Création d'une instance d'Express

app.set('view engine', 'ejs')    // Configuration du moteur de rendu pour utiliser EJS


//////////////////////////////////////////// ROUTE MIDDLEWARES //////////////////////////////////////////////////////////

//couche Cookiesparser: middleware pour parser les cookies
app.use(cookieParser())                           

//couche bodyparser: middleware pour parser les données du corps des requêtes (formulaires)
app.use(express.json())      

//couche assets: middleware pour servir des fichiers statiques (assets)
app.use('/assets', express.static('./assets'))    

