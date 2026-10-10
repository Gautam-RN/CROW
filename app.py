from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    projects = [
        {
            'number': '01',
            'title': 'Night Shift',
            'category': 'Brand identity / Digital',
            'year': '2025',
            'class': 'project-night',
            'description': 'A sharp visual system for a culture journal built after dark.'
        },
        {
            'number': '02',
            'title': 'Northstar',
            'category': 'Strategy / Campaign',
            'year': '2024',
            'class': 'project-north',
            'description': 'Making a new generation of outdoor gear impossible to ignore.'
        },
        {
            'number': '03',
            'title': 'Still / Moving',
            'category': 'Art direction / Film',
            'year': '2024',
            'class': 'project-still',
            'description': 'A cinematic portrait of motion, material, and the human hand.'
        }
    ]
    return render_template('index.html', projects=projects)


if __name__ == '__main__':
    app.run(debug=True)
