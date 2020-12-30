from flask import Flask, render_template
import sqlite3

application = Flask(__name__)


@application.route('/')
def main():
    con = sqlite3.connect('database.db')
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("SELECT * FROM berita LIMIT 3")
    rows = cur.fetchall()
    return render_template('index.html', rows=rows)


if __name__ == '__main__':
    application.run(debug=True)
