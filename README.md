# Notepad

## Description

My motivation for this project was to make a simple program capable of recording notes and updating a database on the backend dynamically. 

## Installation

The webpage is available at https://github.com/zachcygan/notepad. Be sure to install any dependencies by typing in "npm i" in the console. This will install express, util, and uuidv4. 

## Dependencies Used
    - express
    - util
    - uuidv4

## Instructions

To begin installing the program, to be sure to type "npm i" inside the terminal to install any dependencies. To run the program type, "node index.js" inside the terminal. This will begin asking the user for a managers name, 
employee id,email, and office number. It will then prompt the user if they wish to add an engineer or intern, of if they wish to quit. If engineer is chose, it will prompt the user from their name, employee id, email, and
github username. IIf intern is selected it will prompt the user for the interns name, employee id, email, and school. This process will repeat until the user wishes to quit the program, at which point an index.html
file will be generated and opened automatically with cards that contain the teams information. Clicking on an email will open your default mailing app with an email create to that email. Similarly, clicking on an engineers github username will take you to that users github profile. 

## Video Demo

A video demonstration of this program can be found here: . 

## Screenshots

![screenshot of the website](public/assets/images/screenshot.png)
![screenshot of the website](public/assets/images/screenshot2.png)
![screenshot of the website](public/assets/images/screenshot3.png)


