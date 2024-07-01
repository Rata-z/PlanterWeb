<div align="center">
  <img src="client/src/assets/icons/logoLong.svg" alt="Logo" />
  <h1> PlanterWeb </h1>
</div>


### Table of Contents
* [Intro](#intro)
* [Tech Stack](#tech-stack)
* [Key Features](#key-features)
* [Hosting](#hosting)
* [Future Updates](#future-updates)

## Intro
PlanterWeb is a comprehensive full -stack application designed for plant enthusiasts to create, explore, and engage with a plant care oriented blogs. Its primary function is to provide practical tips and guides for users about various aspects of plant care. Additionaly, PlanterWeb is seamlessly integrated with its related mobile application [Planter](https://github.com/Rata-z/Planter). This compatibility allows users to track their plant's watering cycles and other care parameters directly from their web interface. 
## Tech Stack
| Library                                    | Version    | Category             |
|--------------------------------------------|------------|----------------------|
| Next.js                                    | 13.4.5     | Framework            |
| React                                      | 18.2.0     | UI Framework         |
| Node.js                                    | 18.16.0    | Runtime Environment  |
| MongoDB                                    | 5.1.0      | Database             |
| TypeScript                                 | 5.3.0      | Language             |
| Express.js                                 | 4.18.2     | Server Framework     |
| NextUI                                     | 2.3.0      | UI Components        |
| Firebase                                   | 9.23.0     | Development Tools    |
| Vercel                                     | 28.0.2     | Deployment Platform  |
| Micromark                                  | 4.0.4      | Markdown Processor   |
| Tailwind CSS                               | 3.3.1      | CSS Framework        |
| Docker                                     | 24.0.5     | Containerization     |
| Firestore                                  | 9.23.0     | Cloud Database       |
| REST                                       | -          | API Architecture     |
## Key Features
#### User Authentication
Users can register and sign in using their email address and password, with an additional layer of security provided by email verification.
Alternatively, users can also sign in using their Google account.

#### Blogs
Users can write, read, comment and like posts. Posts are created using a markdown editor integrated directly into the site, allowing for easy and intuitive content creation.

#### Plant Watering Tracker
Users can track the watering cycle of their plants, previously added through the mobile application.

#### Account Synchronization and Management
Users can log in with their mobile app accounts and additionally manage their accounts by changing their password, updating their username, or deleting their account.

## Hosting
The app is currently hosted on Vercel, with the backend containerized using Docker and hosted on Fly.io.

## Future Updates
#### Plant Management
Allowing users to add, edit, and delete plants from their list, synchronized with the mobile application.

#### Blog Filtering
Users will be able to filter posts by keywords and tags for a more refined browsing experience.

