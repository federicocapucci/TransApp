<h1>TransApp - A simple Budget App</h1>


<img src="https://i.ibb.co/f4SvZ4G/main-app-screen.png" style="width:100%" alt="Xamp Config">

## Table of contents

- [About this project](#about)
- [Instructions](#instructions)
- [Autor](#autor)
<br><br>


##  About this project <a name = "about"></a>

<p>This was a challenge requested by Alkemy for joining their talent course. It required completing a simple full-stack application  managing transactions/budget. It allows for Adding/editing and deleting transactions as well as displaying the balance. User may sort or filter the transaction list.
</p>

<p>Technologies used:</p>

<p><b>Front: HTML, CSS, Vanilla JS</p>
<p>Back: NodeJS, Express, Sequelise, CORS</p>
<p>Other: GIT, Xampp, Heidi SQL</b></p>

<br><br>

## Instructions <a name = "instructions"></a>

Please follow the below instructions in order to install the application on your computer.
<br><br>

## Prerequisites

You must have:
- [Visual Code](https://code.visualstudio.com/) installed, with the extension 'Live server'.
- [NodeJS](https://nodejs.org/) installed.
- [XAMPP](https://www.apachefriends.org/es/index.html) installed.
- [HeidiSQL](https://www.heidisql.com/download.php)  installed, or any similar apps to host and manage requests to a database.
<br><br>

### Installation

Follow the steps below in the correct order to install the project from Github:
Sigue los pasos a continuacion para poder instalar el proyecto desde Github

1- Choose a system folder, then launch a Command prompt (Windows key + R, write 'CMD' and click ok, or shift + right click > Open Powershell window, then clone the repository with the following command:

```
git clone https://github.com/federicocapucci/TransApp.git
```

2- Afterwards, open Visual code from inside the downloaded folder, (or click on file > 'Open folder' alternatively). Then run the following command in a VSC terminal, to install the necessary packages/dependencies.

```
npm install express cors sequelize mysql2 
```

3- Next, please open Xampp program. Click start on the 'MySQL' option, in the default port (3306).
<br><br>
<img src="https://i.ibb.co/3FTvgRt/Xampp.png" alt="Xamp Config">
<br><br><br><br>

4- Once Xamp is running, Open 'HeidiSQL' and create a new session with default options, You may call it 'TransApp' for example > Then open it.

<br><br>
<img src="https://i.ibb.co/jJq9XQv/Screenshot-2022-08-01-155747.png" alt="Heidi Session setup">
<br><br><br><br>

5- On Heidi, select to load SQL file. Then from the repository folder, select the SQL file 'TransApp.sql'. It contains the commands to create the database. After this, the Database is ready to go.
<br><br>
<img src="https://i.ibb.co/JBYGsZs/Heidi-Load-SQLFile.png" alt="Heidi Load SQL">
<br><br><br><br>

6- To start the Backend server, please run the following code in a Visual code terminal

```
node back.js
```
7- On Visual Code, and if you have installed the Visual code extension 'Live server', click on 'Go live' option, located at the bottom right. Front will load, and you should be able to start adding transactions.

<br><br>
<img src="https://i.ibb.co/sy7Q2VP/Screenshot-2022-08-01-155331.png" alt="Go live">
<br><br>

## Autor <a name = "autor"></a>

- [federicocapucci](https://github.com/federicocapucci)
