<div align="center">
  <img src="client/src/assets/icons/logoLong.svg" alt="Logo" width="800" height="300" />
  <h1> PlanterWeb </h1>
</div>


### Table of Contents
* [Intro](#intro)
* [Tech Stack](#tech-stack)
* [Key Features](#key-features)
* [Hosting](#hosting)
* [Future Updates](#future-updates)


 <img align="center" alt="about page" src="/client/src/assets/demo/about.png" width="600" height="600"/>
## Intro
PlanterWeb is a comprehensive full -stack application designed for plant enthusiasts to create, explore, and engage with a plant care oriented blogs. Its primary function is to provide practical tips and guides for users about various aspects of plant care. Additionaly, PlanterWeb is seamlessly integrated with its related mobile application [Planter](https://github.com/Rata-z/Planter). This compatibility allows users to track their plant's watering cycles and other care parameters directly from their web interface. 



## Tech Stack
| Library                                    | Version    | Category             |
|--------------------------------------------|------------|----------------------|
| Next.js                                    | 14.2.4     | Framework            |
| React                                      | 18.2.0     | UI Framework         |
| Node.js                                    | 20.15.0    | Runtime Environment  |
| MongoDB/Mongoose                           | 8.4.0      | Database             |
| TypeScript                                 | 5.4.5      | Language             |
| Express.js                                 | 4.19.2     | Server Framework     |
| NextUI                                     | 2.2.5      | UI Components        |
| Firebase/Firebase-admin                    | 12.2.0     | Development Tools    |
| Vercel                                     |  -         | Deployment Platform  |
| Micromark                                  | 4.0.0      | Markdown Processor   |
| Tailwind CSS                               | 3.4.1      | CSS Framework        |
| Docker                                     | 4.31.1     | Containerization     |
| Firestore                                  | 7.7.0      | Cloud Database       |
| REST                                       | -          | API Architecture     |

## Themes

 | <img alt="Light Theme" src="/client/src/assets/demo/light.png" width="420" height="300"/> | <img alt="Dark Theme" src="/client/src/assets/demo/dark.png" width="420" height="300"/>|
 |:--:|:--: | 
| *Light*|*Dark* |



## Key Features
#### User Authentication
Users can register and sign in using their email address and password, with an additional layer of security provided by email verification.
Alternatively, users can also sign in using their Google account.

 
#### Blogs
Users can write, read, comment and like posts. Posts are created using a markdown editor integrated directly into the site, allowing for easy and intuitive content creation.

 <img alt="Blog Markdown" src="/client/src/assets/demo/editor.png" width="450" height="280"/>

#### Plant Watering Tracker
Users can track the watering cycle of their plants, previously added through the mobile application.

#### Account Synchronization and Management
Users can log in with their mobile app accounts and additionally manage their accounts by changing their password, updating their username, or deleting their account.

## Hosting
The app is currently hosted on Vercel, with the backend containerized using Docker and hosted on Fly.io.

[PlanterWeb](planter-web-git-main-ratas-projects-bed83137.vercel.app)

## Future Updates
#### Plant Management
Allowing users to add, edit, and delete plants from their list, synchronized with the mobile application.

#### Blog Filtering
Users will be able to filter posts by keywords and tags for a more refined browsing experience.

