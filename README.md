This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


# Todoing Client

Todoing is a single page to-do application which helps users create to-do lists and organize to-dos.

## Server Repository

[Todoing-Rest-Api](https://github.com/umutcanbolat/Todoing-Rest-Api)

Todoing client needs the RESTful web service running on the same machine at port 8080.

## Features

- Create&delete to-do lists.
- Add items on to-do lists.
- Add dependency between to-do items. To-do items which have dependency cannot be completed if dependent to-do items are not completed.
- Filter to-do items by status (completed or not), expired, name.
- Order to-do items on a to-do list by create date, deadline, name, or status.

## Installation

### For Debian based distros, Ubuntu

You need nodejs and npm installed on your system to run the project. If you don't have, go for the following commands to install. Otherwise pass this step.

```sh
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt install nodejs
```
cd into the application directory and run the commands below. The browser will open the application on http://localhost:3000 automatically.

```sh
npm install
npm run
```

### For Windows

Download and install nodejs from [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and run the following commands in project directory:

```sh
npm install
npm run
```

## Screenshots
- Main Page <br> <img src="https://user-images.githubusercontent.com/10065235/46321550-90608b00-c5ec-11e8-8295-ea3af781e605.png" width="720" height="405"> <br>
- Adding dependency <br> <img src="https://user-images.githubusercontent.com/10065235/46321551-90608b00-c5ec-11e8-907d-0151553a66b5.png" width="720" height="405">  <br>
- Filtering to-do items <br> <img src="https://user-images.githubusercontent.com/10065235/46321549-8fc7f480-c5ec-11e8-9b9d-aa8b528548c8.png" width="720" height="405"> <br>

## Credits
Design and programming by [Umut Canbolat](https://github.com/umutcanbolat).

## License
This project is licensed under the GNU General Public License v3.0 (GPL 3.0) - see the [LICENSE](LICENSE.md) file for details