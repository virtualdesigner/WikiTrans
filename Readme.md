# Translator App

## Installation


A simple web application that allows users to translate text from one language to another.

## Table of Contents
1. Installation
2. Usage
3. API Documentation
4. Contributing
5. License

## 1. Installation
Prerequisites
```Python 3.6 or higher
Node.js v12 or higher
Python
```
Clone this repository:
```
git clone https://github.com/virtualdesigner/wikitrans.git
```

### Back-end installation

Change into the translator_server directory:
```
cd translator_server
```

Create a virtual environment and activate it:
```
python3 -m venv venv
source venv/bin/activate
```

Install the required packages:
```
pip install -r requirements.txt
```

Apply the database migrations:

```
python manage.py makemigrations
python manage.py migrate
```

### Front-end installation

Change into the translator-app directory:
```
cd ../translator-app
```

Install the required packages:
```
npm install
```

## Usage

Start the front-end server:
```
npm start
```

Start the back-end server:
```
python manage.py runserver
```

The front-end app should now be available at http://localhost:3000/ and the back-end app should be available at http://localhost:8000/.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.