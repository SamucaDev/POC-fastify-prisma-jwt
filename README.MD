# Fastify Auth User System

## :star: Goal
My goal with this project is to create a Fastify project that is responsible for managing user authentication.

## :hammer: Quick start

| Dependencies   | Version       |
| -------------  | ------------- |
| Node           | >= 18         | 
| Npm            | >= 8          | 
| Docker         | 24.x          |

- Use these commands to install and start the application

```bash
  npm install
  docker-composer up
  npm run start
```

## :bar_chart: Project
The project has a simple user system able to do all the user stuff, creation, authentication and management, using famous patterns of marketing and OWASP rules.

Therefore the authentication was made using JWT pattern, all the private routes have to send the Bearer token to get access to the application.


## :file_folder: Folders Structure

![MarineGEO circle logo](https://imgur.com/wsf2lr1.png "Folders Structure")

## :sparkles: Architecture
The project was create using functional paradigm also the project uses like a reference the clean architecture concepts.

The concepts used goals:
- Facilitate maintenance of the code;
- The next developer can undestand the code faster;
- Easy to create tests.

