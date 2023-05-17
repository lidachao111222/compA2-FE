# Old Phone Deals (COMP5347 Assignment2 Frontend Project)

This is a project built using React.js and Vite as the frontend, aiming to provide services such as user login, registration, user information and password modification, as well as purchasing used phones.

***important note:*** Backend code is in **other repository**. Here is the [link](https://github.sydney.edu.au/COMP5347-COMP4347-2023/COMP5347-A2-BE).

## Installation

To install the required dependencies, run the following command in the project root directory:
```shell
npm i
```


## Getting Started

To start the project, run the following command:
```shell
npm run dev
```

This will run the project in development mode.

The project will run locally and listen on port http://localhost:3000/.


For production mode,run the following command:

```shell
npm run build
```

## Project Structure

- Phone images are stored in the `/public/images` directory.
- `/src` is the folder that contains the logic and UI of the pages.
  - `/src/components` contains the component files.
  - `/src/pages` contains the files categorized by pages.
  - `/src/stateManagement` contains files for managing global state.
  - `/src/utils` contains utility files.
    - `/src/utils/fetch.js` is used for managing GET and POST requests.
    - `/src/utils/Router.jsx` is used for managing frontend page routing.
  - `/src/main.jsx` is the root file of the project.

## Configuration

- `/src/utils/fetch.js` is used for managing GET and POST requests.
- `/src/utils/Router.jsx` is used for managing frontend page routing.
- `/src/main.jsx` serves as the root file to manage global UI, routing, and state.

## Development Guide

This project uses React as the frontend UI library and is developed using Vite. You can create new components and pages in the `/src/components` and `/src/pages` directories as needed, and configure routing and global state management in `/src/main.jsx`.

### Other dependencies for this project:

1. [axios](https://axios-http.com/): Axios is a simple promise based HTTP client for the browser and node.js.
2. [chakra-ui](https://chakra-ui.com/): Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.
3. [react-router](https://reactrouter.com/en/main/start/overview): React Router enables "client side routing".
4. [jotai](https://jotai.org/): Primitive and flexible state management for React.
5. [react-icons](https://react-icons.github.io/react-icons/): Include popular icons in your React projects easily with react-icons.
6. [sweetalert2](https://sweetalert2.github.io/v9.html): A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES.
7. [SWR](https://swr.vercel.app/): React Hooks for Data Fetching
8. [Vite](https://vitejs.dev/): Next Generation Frontend Tooling.



## Build and Deployment

To build and deploy the project, use the following command:

```shell
npm run build
```


## Contributing

Thanks to all the members and contributors for their efforts on this project! 

[Chao Li](https://github.sydney.edu.au/chli5632)  [personal github](https://github.com/lidachao111222) 
Group member

[Haoyu Hu](https://github.sydney.edu.au/hahu9023)
Group member

[Shengwen Ye](https://github.sydney.edu.au/shye8591)
Group member


## License

This project is licensed under the MIT License. For more information, please see the [LICENSE](https://mit-license.org/) file.

Made with ❤️ in 🇦🇺 🇨🇦 🇨🇳
