    const API = {
      addTask: () => {
        const title = document.getElementById('task-input').value.trim();
        const dueDate = document.getElementById('task-date').value;
        const categoryId = document.getElementById('category-select').value;

        if (!title) return alert('Tarea vacía');

        fetch('/task/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ title, due_date: dueDate, category_id: categoryId })
        })
        .then(r => r.json())
        .then(data => {
          if (data.success) location.reload();
        });
      },
      toggleTask: (id) => {
        fetch(`/task/toggle/${id}`, { method: 'POST' })
          .then(() => location.reload());
      },
      deleteTask: (id) => {
        if (confirm('¿Eliminar tarea?')) {
          fetch(`/task/delete/${id}`, { method: 'POST' })
            .then(() => location.reload());
        }
      },
      editTask: (id) => {
        const task = document.querySelector(`[data-id="${id}"]`);
        const title = prompt('Editar:', task.querySelector('.task-title').innerText);
        if (!title) return;
        const dueDate = prompt('Fecha (YYYY-MM-DD) o vacío:', task.querySelector('.time-left').dataset.date || '');
        fetch(`/task/edit/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ title, due_date: dueDate })
        }).then(() => location.reload());
      },
      reorder: (ids) => {
        fetch('/task/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task_ids: ids })
        });
      },
      addCategory: () => {
        const name = document.getElementById('new-category').value.trim();
        if (!name) return alert('Nombre vacío');
        fetch('/category/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ name })
        }).then(r => r.json()).then(() => location.reload());
      },
      deleteCategory: (id) => {
        if (confirm('¿Eliminar categoría?')) {
          fetch(`/category/delete/${id}`, { method: 'POST' })
            .then(() => location.reload());
        }
      }
    };

    // === EVENTOS PRINCIPALES ===
    document.addEventListener('DOMContentLoaded', () => {
      // Añadir tarea
      document.getElementById('add-task-btn').onclick = API.addTask;

      // Añadir categoría
      document.getElementById('add-category-btn').onclick = API.addCategory;

      // Manejar checkboxes (completar tarea)
      document.querySelectorAll('.task-item input[type="checkbox"]').forEach(cb => {
        cb.onchange = (e) => {
          const id = e.target.closest('.task-item').dataset.id;
          API.toggleTask(id);
        };
      });

      // Botones de eliminar tarea
      document.querySelectorAll('.task-item .delete').forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.closest('.task-item').dataset.id;
          API.deleteTask(id);
        };
      });

      // Botones de editar tarea
      document.querySelectorAll('.task-item .edit').forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.closest('.task-item').dataset.id;
          API.editTask(id);
        };
      });

      // Eliminar categoría
      document.querySelectorAll('.category-tag .delete').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const id = e.target.closest('.category-tag').dataset.id;
          API.deleteCategory(id);
        };
      });

      // === FILTROS DE TAREAS ===
      document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
          // Actualizar botón activo
          document.querySelectorAll('.filter-btn').forEach(btn => 
            btn.classList.remove('active')
          );
          button.classList.add('active');

          const filter = button.dataset.filter;
          const tasks = document.querySelectorAll('.task-item');

          tasks.forEach(task => {
            const isCompleted = task.classList.contains('completed');

            if (filter === 'pending' && isCompleted) {
              task.style.display = 'none';
            } else if (filter === 'completed' && !isCompleted) {
              task.style.display = 'none';
            } else {
              task.style.display = 'flex'; // Ajusta si usas 'block' en CSS
            }
          });
        });
      });

      // === DRAG & DROP ===
      let draggedItem = null;
      document.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('dragstart', () => {
          draggedItem = item;
          item.classList.add('dragging');
        });
        item.addEventListener('dragend', () => {
          draggedItem = null;
          item.classList.remove('dragging');
        });
        item.addEventListener('dragover', e => e.preventDefault());
        item.addEventListener('drop', () => {
          if (draggedItem !== item) {
            const parent = item.parentNode;
            const reference = item.nextSibling === draggedItem ? item : item;
            parent.insertBefore(draggedItem, reference);
          }
        });
      });

      // Guardar orden al salir
      window.addEventListener('beforeunload', () => {
        const ids = Array.from(document.querySelectorAll('.task-item'))
                         .map(li => parseInt(li.dataset.id));
        if (ids.length > 0 && !isNaN(ids[0])) {
          API.reorder(ids);
        }
      });
    });