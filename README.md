# Proufalme - Modern Music Streaming Platform

Proufalme is a full-featured music streaming application built with Next.js 14, offering a modern and intuitive user interface for music lovers. The application provides a seamless experience for discovering, playing, and managing music collections.

## 🎵 Features

- **Music Player**: Full-featured music player with play/pause, skip, and volume controls
- **Album Management**: Browse and manage your music albums
- **Search Functionality**: Search for songs and albums
- **User Authentication**: Secure user authentication using Supabase
- **Liked Songs**: Save and manage your favorite tracks
- **Responsive Design**: Beautiful UI that works across all devices
- **Modern Stack**: Built with the latest web technologies

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit & Zustand
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **UI Components**: 
  - Radix UI
  - React Icons
  - React Select
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Audio**: use-sound

## 🚀 Getting Started

### Prerequisites

- Node.js 16.15.1 or higher
- npm 5.6.1 or higher
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/proufalme.git
   cd proufalme
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
proufalme/
├── app/                 # Next.js app directory
│   ├── album/          # Album-related pages
│   ├── LikedSongs/     # Liked songs feature
│   ├── search/         # Search functionality
│   └── (site)/         # Main site pages
├── components/         # Reusable UI components
├── actions/           # Server actions
├── hooks/             # Custom React hooks
├── providers/         # Context providers
├── public/            # Static assets
└── supabase/          # Supabase configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- All contributors who have helped shape this project

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue.
Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.


## System Requirements

To get started with development, you need to install few tools

1. git 
   
   `git` version 2.13.1 or higher. Download [git](https://git-scm.com/downloads) if you don't have it already.

   To check your version of git, run:

   ```shell
    git --version
   ```

2. node 
   
   `node` version 16.15.1 or higher. Download [node](https://nodejs.org/en/download/) if you don't have it already.

   To check your version of node, run:

   ```shell
    node --version
   ```

3. npm
  
   `npm` version 5.6.1 or higher. You will have it after you install node.

   To check your version of npm, run:

   ```shell
    npm --version
   ```

## Setup

To set up a development environment, please follow these steps:

1. Clone the repo

   ```shell
    git clone https://github.com/JavaScript-Mastery-PRO/project1_team4_repository.git
   ```

2. Change directory to the project directory

    ```shell
    cd project1_team4_repository
    ```

3. Install the dependencies
   
    ```shell
     npm install
    ```

    If you get an error, please check the console for more information.

    If you don't get an error, you are ready to start development.

4. Run the app
   
    ```shell
    npm run dev
    ```

    Project will be running in the browser.

    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Issues

You've found a bug in the source code, a mistake in the documentation or maybe you'd like a new feature? You can help us by [submitting an issue on GitHub](https://github.com/orgs/JavaScript-Mastery-PRO/projects/8). Before you create an issue, make sure to search the issue archive -- your issue may have already been addressed!

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.


## Pull Request

There are 2 main work flows when dealing with pull requests:

* Pull Request from a [forked repository](https://help.github.com/articles/fork-a-repo)
* Pull Request from a branch within a repository

Here we are going to focus on 2. Creating a Topical Branch:


1. First, we will need to create a branch from the latest commit on master. Make sure your repository is up to date first using

   ```bash
    git pull origin main
   ```

   *Note:* `git pull` does a `git fetch` followed by a `git merge` to update the local repo with the remote repo. For a more detailed explanation, see [this stackoverflow post](http://stackoverflow.com/questions/292357/whats-the-difference-between-git-pull-and-git-fetch).

2. To create a branch, use `git checkout -b <new-branch-name> [<base-branch-name>]`, where `base-branch-name` is optional and defaults to `main`. 
   
   Use a standard convention for branch names. For example, `<your-name>-dev`. It will be easier to track your pull requests if you use this convention.
   
   I'm going to create a new branch called `jsm-dev` from the `main` branch and push it to github.

   ```bash
    git checkout -b jsm-dev main
    git push origin jsm-dev
   ```

3. To create a pull request, you must have changes committed to your new branch.

4. Go to [Pull Requests](https://github.com/JavaScript-Mastery-PRO/project1_team4_repository/pulls) and click on the `New Pull Request` button.

5. Select the `main` branch as the `base` branch and the `jsm-dev` branch as the `compare` branch.

6. Follow the template and fill in the proper information for the pull request.

7. Click on the `Submit` button.

8. You have successfully created a pull request. Now wait for mentor approval. Once approved, you can merge the pull request.

#
