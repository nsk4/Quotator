# Quotator

Quotator is a web application designed to provide users with random quotes while allowing them to
save their favorites, remove them if needed, and share quotes with others. Users can also filter
quotes by selecting from a set list of categories.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Development](#development)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
- [Using VSCode Devcontainers](#using-vscode-devcontainers)
    - [Prerequisites](#2-prerequisites)
    - [Getting Started](#getting-started)
- [Bug Reporting](#bug-reporting)
- [Contributing](#contributing)
- [License](#license)

## Features

- Get a random quote from one of the available categories.
- Add or remove quote from favorite quotess
- View favourite quotes on a dedicated page.
- Share quotes via social platforms or direct links.
- Locally store favourite quotes for persistance between sessions.

## Usage

1. Open the application in your web browser.
2. Select desired category from drop-down menu.
3. Click "Get Another Quote" button to get a new random quote.
4. Click the empty star icon to save a quote to your favorites.
5. Click star button in the navigation menu to visit the "Favorites" section and view saved quotes.
6. Use the share button to send a quote via social media or copy its link.
7. Click the full star icon to remove a quote from your list.

### Tech Stack

- [SvelteKit](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [Vite](https://vite.dev/)

## Development

Make sure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/en/) (v18 or higher)
    > Older versions will probably work but are not officially supported.

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/nsk4/Quotator.git
    cd Quotator
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

### Running the App

To run the application in development mode:

```sh
npx vite --port=4000
```

> This will start the Vite development server. Open your browser and navigate to
> http://localhost:4000.

## Using VSCode Devcontainers

This project includes a devcontainer configuration to set up a consistent development environment
using Visual Studio Code Dev Containers. You can read more about devcontainers
[HERE](https://code.visualstudio.com/docs/devcontainers/containers).

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Visual Studio Code](https://code.visualstudio.com/) installed.
- [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
  installed in Visual Studio Code.

### Getting Started

1. Clone the repository:

    ```sh
    git clone https://github.com/nsk4/Quotator.git
    cd Quotator
    ```

2. Open the project in Visual Studio Code.

3. If prompted, reopen the project in a container by clicking on the green "Open a Remote Window"
   button in the bottom left corner of the window, then select "Reopen in Container."

4. Visual Studio Code will now build the devcontainer image and start the container with the
   necessary dependencies for development.

5. Install dependencies:

    ```sh
    npm install
    ```

6. You are now ready to start developing inside the devcontainer.

## Bug Reporting

If you encounter any bugs or issues, please report them by creating a new issue in the
[GitHub Issues](https://github.com/nsk4/Quotator/issues/new?labels=bug) section of the repository.
Provide as much detail as possible, including steps to reproduce the issue, your environment, and
any relevant screenshots or logs.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch: git checkout -b feature/your-feature-name.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature/your-feature-name.
5. Open a pull request.

Please ensure your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.
