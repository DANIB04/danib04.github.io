from flask import Flask, jsonify, render_template, request, redirect, session, url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import random
import string
import os
from datetime import date, datetime

app = Flask(__name__)
app.secret_key = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# ================================
# 👤 MODELO USUARIO
# ================================
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    score = db.Column(db.Integer, default=0)

    # 🚦 Permisos
    can_access_tasks = db.Column(db.Boolean, default=True)
    can_access_music = db.Column(db.Boolean, default=True)
    can_access_scoreboard = db.Column(db.Boolean, default=True)


# ================================
# 📝 MODELO CATEGORÍA Y TAREA
# ================================
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('name', 'user_id', name='uq_category_user'),
    )

    user = db.relationship('User', backref='categories')


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    due_date = db.Column(db.Date, nullable=True)
    completed = db.Column(db.Boolean, default=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    order = db.Column(db.Integer, default=0)

    category = db.relationship('Category', backref='tasks')
    user = db.relationship('User', backref='tasks')


# ================================
# 🎵 CONFIGURACIÓN DE MÚSICA
# ================================
MUSIC_FOLDER = os.path.join('Musica')
ALLOWED_EXTENSIONS = {'.mp3', '.wav', '.ogg', '.flac', '.m4a'}


def get_songs():
    songs = []
    try:
        for file in os.listdir(MUSIC_FOLDER):
            filepath = os.path.join(MUSIC_FOLDER, file)
            if os.path.isfile(filepath):
                ext = os.path.splitext(file)[1].lower()
                if ext in ALLOWED_EXTENSIONS:
                    display_name = os.path.splitext(file)[0].replace('_', ' ').title()
                    songs.append({
                        'name': display_name,
                        'filename': file
                    })
    except Exception as e:
        print(f"Error leyendo carpeta de música: {e}")
    return songs


# ================================
# 📦 INICIALIZACIÓN Y USUARIO ADMIN
# ================================
with app.app_context():
    db.create_all()

    if not User.query.filter_by(username='ADMIN').first():
        hashed_pw = generate_password_hash('D4N13L2304l')
        admin_user = User(username='ADMIN', password=hashed_pw, is_admin=True)
        db.session.add(admin_user)
        db.session.commit()
        print("✅ Usuario administrador 'ADMIN' creado.")

    admin = User.query.filter_by(username='ADMIN').first()
    if admin:
        if not Category.query.filter_by(name='Personal', user_id=admin.id).first():
            db.session.add(Category(name='Personal', user_id=admin.id))
        if not Category.query.filter_by(name='Trabajo', user_id=admin.id).first():
            db.session.add(Category(name='Trabajo', user_id=admin.id))
        db.session.commit()

    if not os.path.exists(MUSIC_FOLDER):
        os.makedirs(MUSIC_FOLDER)
        print(f"📁 Carpeta '{MUSIC_FOLDER}' creada.")
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)


# ================================
# 🤫 RUTAS TONTAS
# ================================
@app.route('/open_projects')
def open_projects():
    return render_template('open_projects.html')


@app.route('/skills')
def skills():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('skills.html')


# ================================
# 🏠 RUTAS PRINCIPALES
# ================================
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/home')
def home():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('home.html',
                         username=session['username'],
                         is_admin=session.get('is_admin', False))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            session['username'] = username
            session['is_admin'] = user.is_admin
            return redirect(url_for('home'))
        return render_template('index.html', error='Usuario o contraseña incorrectos')
    return render_template('index.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        raw_password = request.form['password']
        user_code = request.form['security_code'].strip().upper()
        server_code = session.get('security_code')

        if not server_code:
            return "Error interno: código no generado.", 500

        if user_code != server_code:
            return render_template('register.html', reg_error='⚠️ Código incorrecto. Contacta al operador.')

        if User.query.filter_by(username=username).first():
            return render_template('register.html', reg_error='⚠️ Usuario ya existe')

        hashed_password = generate_password_hash(raw_password)
        user = User(username=username, password=hashed_password)
        db.session.add(user)
        db.session.commit()

        default_categories = ['Personal', 'Trabajo']
        for cat_name in default_categories:
            db.session.add(Category(name=cat_name, user_id=user.id))
        db.session.commit()

        session.pop('security_code', None)
        return redirect(url_for('login'))

    code = ''.join(random.choices(string.digits, k=6))
    session['security_code'] = code
    print(f"🛡️ Código de validación generado: {code}")
    return render_template('register.html', show_register=True, security_code=code)


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


# ================================
# 📊 SCOREBOARD
# ================================
@app.route('/scoreboard')
def scoreboard():
    if 'username' not in session:
        return redirect(url_for('login'))
    user = User.query.filter_by(username=session['username']).first()
    if not user.can_access_scoreboard:
        return "🚫 No tienes permiso para acceder al scoreboard.", 403
    users = User.query.filter_by(is_admin=False).order_by(User.score.desc()).all()
    return render_template('scoreboard.html', users=users)


# ================================
# 👨‍💻 ADMIN PANEL
# ================================
@app.route('/admin')
def admin_panel():
    if not session.get('is_admin'):
        return redirect(url_for('home'))
    users = User.query.filter_by(is_admin=False).all()
    return render_template('admin_panel.html', users=users)


@app.route('/edit_score/<int:user_id>', methods=['POST'])
def edit_score(user_id):
    if not session.get('is_admin'):
        return redirect(url_for('home'))
    user = User.query.get_or_404(user_id)
    try:
        new_score = int(request.form['score'])
        user.score = new_score
        db.session.commit()
    except ValueError:
        return "Puntaje inválido", 400
    return redirect(url_for('admin_panel'))


@app.route('/delete_user/<int:user_id>', methods=['POST'])
def delete_user(user_id):
    if not session.get('is_admin'):
        return redirect(url_for('home'))
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect(url_for('admin_panel'))


@app.route('/toggle_permission/<int:user_id>/<string:perm>', methods=['POST'])
def toggle_permission(user_id, perm):
    if not session.get('is_admin'):
        return redirect(url_for('home'))

    user = User.query.get_or_404(user_id)
    if not hasattr(user, perm):
        return "❌ Permiso inválido", 400

    current_value = getattr(user, perm)
    setattr(user, perm, not current_value)
    db.session.commit()
    return redirect(url_for('admin_panel'))


# ================================
# 🎧 MÚSICA
# ================================
@app.route('/music')
def music_player():
    if 'username' not in session:
        return redirect(url_for('login'))
    user = User.query.filter_by(username=session['username']).first()
    if not user.can_access_music:
        return "🚫 No tienes permiso para acceder a música.", 403
    songs = get_songs()
    return render_template('music_player.html', songs=songs)


@app.route('/musica/<filename>')
def serve_music(filename):
    return send_from_directory(MUSIC_FOLDER, filename)


# ================================
# 📝 GESTOR DE TAREAS
# ================================
@app.route('/tasks')
def tasks():
    if 'username' not in session:
        return redirect(url_for('login'))
    user = User.query.filter_by(username=session['username']).first()
    if not user.can_access_tasks:
        return "🚫 No tienes permiso para acceder a tareas.", 403

    categories = Category.query.filter_by(user_id=user.id).all()
    tasks = Task.query.filter_by(user_id=user.id).order_by(Task.order).all()

    return render_template('proyects/proyect-1.html',
                         categories=categories,
                         tasks=tasks,
                         username=session['username'],
                         is_admin=session.get('is_admin', False),
                         date=date)

# ✅ Añadir tarea
@app.route('/task/add', methods=['POST'])
def add_task():
    if 'username' not in session:
        return jsonify({'error': 'No autorizado'}), 401

    user = User.query.filter_by(username=session['username']).first()
    title = request.form.get('title').strip()
    category_id = request.form.get('category_id')
    due_date_str = request.form.get('due_date')

    if not title or not category_id:
        return jsonify({'error': 'Faltan datos'}), 400

    try:
        due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date() if due_date_str else None
    except:
        due_date = None

    last_task = Task.query.filter_by(user_id=user.id).order_by(Task.order.desc()).first()
    order = (last_task.order + 1) if last_task else 0

    task = Task(
        title=title,
        due_date=due_date,
        completed=False,
        category_id=category_id,
        user_id=user.id,
        order=order
    )
    db.session.add(task)
    db.session.commit()

    return jsonify({'success': True, 'id': task.id})


# ✅ Editar tarea
@app.route('/task/edit/<int:task_id>', methods=['POST'])
def edit_task(task_id):
    if 'username' not in session:
        return jsonify({'error': 'No autorizado'}), 401

    task = Task.query.get_or_404(task_id)
    user = User.query.filter_by(username=session['username']).first()

    if task.user_id != user.id:
        return jsonify({'error': 'Acceso denegado'}), 403

    title = request.form.get('title').strip()
    due_date_str = request.form.get('due_date')

    if title:
        task.title = title
    try:
        task.due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date() if due_date_str else None
    except:
        pass

    db.session.commit()
    return jsonify({'success': True})


# ❌ Eliminar tarea
@app.route('/task/delete/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    if 'username' not in session:
        return jsonify({'error': 'No autorizado'}), 401

    task = Task.query.get_or_404(task_id)
    user = User.query.filter_by(username=session['username']).first()

    if task.user_id != user.id:
        return jsonify({'error': 'Acceso denegado'}), 403

    db.session.delete(task)
    db.session.commit()
    return jsonify({'success': True})


# ✅ Completar tarea
@app.route('/task/toggle/<int:task_id>', methods=['POST'])
def toggle_task(task_id):
    task = Task.query.get_or_404(task_id)
    user = User.query.filter_by(username=session['username']).first()

    if task.user_id != user.id:
        return jsonify({'error': 'Acceso denegado'}), 403

    task.completed = not task.completed
    db.session.commit()
    return jsonify({'success': True, 'completed': task.completed})


# 🔄 Reordenar tareas (Drag & Drop)
@app.route('/task/reorder', methods=['POST'])
def reorder_tasks():
    if 'username' not in session:
        return jsonify({'error': 'No autorizado'}), 401

    user = User.query.filter_by(username=session['username']).first()
    task_ids = request.json.get('task_ids', [])

    for index, task_id in enumerate(task_ids):
        task = Task.query.get(task_id)
        if task and task.user_id == user.id:
            task.order = index

    db.session.commit()
    return jsonify({'success': True})


# ➕ Añadir categoría
@app.route('/category/add', methods=['POST'])
def add_category():
    if 'username' not in session:
        return jsonify({'error': 'No autorizado'}), 401

    user = User.query.filter_by(username=session['username']).first()
    name = request.form.get('name').strip()

    if not name:
        return jsonify({'error': 'Nombre vacío'}), 400

    if Category.query.filter_by(name=name, user_id=user.id).first():
        return jsonify({'error': 'Ya existe'}), 400

    category = Category(name=name, user_id=user.id)
    db.session.add(category)
    db.session.commit()

    return jsonify({'success': True, 'id': category.id, 'name': category.name})


# ❌ Eliminar categoría
@app.route('/category/delete/<int:cat_id>', methods=['POST'])
def delete_category(cat_id):
    if 'username' not in session:
        return jsonify({'error': 'No autorizado'}), 401

    category = Category.query.get_or_404(cat_id)
    user = User.query.filter_by(username=session['username']).first()

    if category.user_id != user.id:
        return jsonify({'error': 'Acceso denegado'}), 403

    if Category.query.filter_by(user_id=user.id).count() <= 1:
        return jsonify({'error': 'Necesitas al menos una categoría'}), 400

    # Mover tareas a otra categoría
    other_category = Category.query.filter(Category.user_id == user.id, Category.id != cat_id).first()
    Task.query.filter_by(category_id=category.id).update({'category_id': other_category.id})

    db.session.delete(category)
    db.session.commit()
    return jsonify({'success': True})

# ================================
# 🚀 ARRANQUE
# ================================
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
