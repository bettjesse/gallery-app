# Gallery App
Welcome to the Gallery App, where users can share photos and engage with the community by liking photos. This application is built using Next.js, NeonDB, Uploadthing, TypeScript, and Tailwind CSS.





## Key Features

1. User Authentication with NextAuth: Users can sign up, log in, and log out securely. Only logged-in users can like photos, including their own.

2. Photo Posting using Uploadthing: Users can upload and share photos with the community .

3. Liking Photos: Logged-in users can like photos posted by others or themselves.

4. Real-time Updates: Likes and posts are updated in real-time using NeonDB, ensuring a dynamic user experience.

5. Responsive Design: The app is designed to be fully responsive, ensuring a seamless experience across devices.
   
# Getting Started
To run the Gallery App locally, follow these steps:

### Clone the Repository:
```shell
gt clone https://github.com/bettjesse/gallery-app.git
 ```

### Install Dependencies: 
```shell
 npm install
```

```shell
 npm run dev 
```


# ENV file
```js
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

```


# Configure GitHub OAuth


Go to GitHub Developer Settings.
Click on "OAuth Apps" in the left sidebar.
Click "New OAuth App".
Fill in the details:
Application name: Gallery App
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
Click "Register application" to get your Client ID and Client Secret.

