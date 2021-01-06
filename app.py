from flask import Flask, render_template
import sqlite3

application = Flask(__name__)


@application.route('/')
def main():
    # konek db
    con = sqlite3.connect('database.db')
    # menggunakan objek row untuk mengembalikan hasil query
    con.row_factory = sqlite3.Row
    # untuk mengeksekusi perintah SQL atau query.
    cur = con.cursor()
    cur.execute("SELECT * FROM berita ORDER BY id DESC LIMIT 3")
    # mengambil semua record
    rows = cur.fetchall()
    # render template dan tampilkan value rows di index.html
    return render_template('index.html', rows=rows)


if __name__ == '__main__':
    # untuk menjalankan aplikasi, debug=true unntuk debugging
    application.run(debug=True)
