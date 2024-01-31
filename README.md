# HRnet: Employee Management Application

## Project Description

HRnet is an internal web application designed for managing employee records. This project represents a modernization effort, transitioning from an older jQuery-based application to a more performant and maintainable React-based application. Key features include the creation of employee records and the display of an employee list.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux and Redux Toolkit**: For efficient state management in React applications.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A modern frontend development tool that significantly improves the development experience.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: A JavaScript runtime environment. You can download it from the [Node.js website](https://nodejs.org/).
- **npm** or **yarn**: Package managers for JavaScript and Node.js. npm is distributed with Node.js, which means that when you download Node.js, you automatically get npm installed on your computer. Yarn can be installed separately from the [Yarn website](https://yarnpkg.com/).
- **serve**: A static server for serving your production build. This is necessary for previewing the production build. Install it globally via npm:
  ```bash
  npm install -g serve
  ```

## Installation

To set up the HRnet application on your local environment, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Krock13/Wealth-Health_Front_React.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Wealth-Health_Front_React
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

Once the installation is complete, you can run the application using the following commands:

- To start the development server:
  ```bash
  npm run dev
  ```
- To build the application for production:
  ```bash
  npm run build
  ```
- To preview the production build :
  ```bash
  serve -s dist
  ```

## Project Structure

The application is organized into several key directories:

- `components`: Contains reusable UI components like DatePicker, EmployeeForm, and Modal.
- `pages`: Includes the main pages of the application such as EmployeeList, Home, and NotFound.
- `redux`: Houses Redux logic, including slices for state management and the store configuration.

## Component Library

The `TableComponent` used in this application is part of a custom-built component library designed for React applications with TypeScript support. It provides a sortable and searchable table that enhances the user experience by efficiently rendering and updating employee data.

To include this component in your project, you can install it from npm:

```bash
npm install react-typescript-table
```

For more information and usage instructions, please visit the [react-typescript-table](https://www.npmjs.com/package/react-typescript-table) package on npm.

## Contributors

This project is part of a development training program and is not open for external contributions.

Thank you for exploring HRnet!
