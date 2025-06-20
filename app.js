const { useState, useEffect } = React;
const { Calendar, Plus, BookOpen, Clock, Mail, Bell, AlertTriangle, Check } = lucide;

const AcademicTaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      subject: 'Matemáticas',
      title: 'Examen Final',
      description: 'Cálculo integral y diferencial',
      dueDate: '2025-06-25',
      type: 'Examen',
      completed: false
    },
    {
      id: 2,
      subject: 'Historia',
      title: 'Ensayo sobre la Revolución',
      description: 'Análisis de las causas y consecuencias',
      dueDate: '2025-06-22',
      type: 'Ensayo',
      completed: false
    },
    {
      id: 3,
      subject: 'Física',
      title: 'Laboratorio de Óptica',
      description: 'Informe de experimentos con lentes',
      dueDate: '2025-06-21',
      type: 'Laboratorio',
      completed: false
    },
    {
      id: 4,
      subject: 'Literatura',
      title: 'Análisis de "Cien años de soledad"',
      description: 'Ensayo crítico sobre realismo mágico',
      dueDate: '2025-06-20',
      type: 'Ensayo',
      completed: false
    }
  ]);

  const [newTask, setNewTask] = useState({
    subject: '',
    title: '',
    description: '',
    dueDate: '',
    type: 'Tarea'
  });

  const [view, setView] = useState('list');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Función para calcular el estado automático basado en la fecha
  const getTaskStatus = (dueDate, completed) => {
    if (completed) return 'completed';
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'overdue'; // Rojo - Vencido
    if (diffDays === 0) return 'due-today'; // Rojo - Vence hoy
    if (diffDays === 1) return 'due-tomorrow'; // Naranja - Vence mañana
    if (diffDays <= 3) return 'due-soon'; // Amarillo - Por vencer
    return 'on-time'; // Verde - A tiempo
  };

  // Función para obtener el color y estilo automático
  const getStatusStyle = (status) => {
    const styles = {
      completed: {
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        text: 'text-gray-600',
        icon: Check,
        label: 'Completado'
      },
      overdue: {
        bg: 'bg-red-100',
        border: 'border-red-500',
        text: 'text-red-800',
        icon: AlertTriangle,
        label: 'Vencido'
      },
      'due-today': {
        bg: 'bg-red-50',
        border: 'border-red-400',
        text: 'text-red-700',
        icon: Clock,
        label: 'Vence hoy'
      },
      'due-tomorrow': {
        bg: 'bg-orange-100',
        border: 'border-orange-400',
        text: 'text-orange-800',
        icon: Clock,
        label: 'Vence mañana'
      },
      'due-soon': {
        bg: 'bg-yellow-100',
        border: 'border-yellow-400',
        text: 'text-yellow-800',
        icon: Clock,
        label: 'Por vencer'
      },
      'on-time': {
        bg: 'bg-green-100',
        border: 'border-green-400',
        text: 'text-green-800',
        icon: Check,
        label: 'A tiempo'
      }
    };
    return styles[status];
  };

  // Simulación de notificaciones automáticas
  useEffect(() => {
    const checkNotifications = () => {
      const newNotifications = [];
      tasks.forEach(task => {
        if (!task.completed) {
          const status = getTaskStatus(task.dueDate, task.completed);
          if (status === 'due-today' || status === 'due-tomorrow' || status === 'overdue') {
            newNotifications.push({
              id: task.id,
              message: `${task.subject}: ${task.title} - ${getStatusStyle(status).label}`,
              type: status,
              timestamp: new Date()
            });
          }
        }
      });
      setNotifications(newNotifications);
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 60000); // Revisa cada minuto
    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = () => {
    if (newTask.subject && newTask.title && newTask.dueDate) {
      setTasks([...tasks, {
        id: Date.now(),
        ...newTask,
        completed: false
      }]);
      setNewTask({
        subject: '',
        title: '',
        description: '',
        dueDate: '',
        type: 'Tarea'
      });
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} días atrasado`;
    if (diffDays === 0) return 'Vence hoy';
    if (diffDays === 1) return 'Vence mañana';
    return `${diffDays} días restantes`;
  };

  // Vista de calendario
  const CalendarView = () => {
    const groupedTasks = tasks.reduce((acc, task) => {
      const date = task.dueDate;
      if (!acc[date]) acc[date] = [];
      acc[date].push(task);
      return acc;
    }, {});

    return React.createElement('div', 
      { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" },
      Object.entries(groupedTasks).sort().map(([date, dayTasks]) =>
        React.createElement('div', 
          { key: date, className: "bg-white rounded-lg shadow p-3 sm:p-4" },
          React.createElement('h3', 
            { className: "font-semibold text-base sm:text-lg text-gray-800 mb-2 sm:mb-3" },
            formatDate(date)
          ),
          React.createElement('div', 
            { className: "space-y-2" },
            dayTasks.map(task => {
              const status = getTaskStatus(task.dueDate, task.completed);
              const style = getStatusStyle(status);
              const IconComponent = style.icon;
              
              return React.createElement('div',
                {
                  key: task.id,
                  className: `p-2 sm:p-3 rounded-lg border-l-4 ${style.bg} ${style.border}`
                },
                React.createElement('div',
                  { className: "flex items-center justify-between mb-2" },
                  React.createElement('div',
                    { className: "flex items-center space-x-2" },
                    React.createElement(IconComponent, { size: 12, className: style.text }),
                    React.createElement('span',
                      { className: `text-xs px-2 py-1 rounded-full ${style.bg} ${style.text} font-medium` },
                      style.label
                    )
                  ),
                  React.createElement('button',
                    {
                      onClick: () => toggleTask(task.id),
                      className: `w-4 h-4 sm:w-5 sm:h-5 rounded border-2 ${
                        task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`
                    }
                  )
                ),
                React.createElement('div', {},
                  React.createElement('p', { className: "font-medium text-gray-800 text-sm" }, task.subject),
                  React.createElement('p', { className: "text-xs sm:text-sm text-gray-600 truncate" }, task.title),
                  React.createElement('p', { className: "text-xs text-gray-500 mt-1" }, task.type)
                )
              );
            })
          )
        )
      )
    );
  };

  return React.createElement('div', 
    { className: "min-h-screen bg-gray-50 p-2 sm:p-4" },
    React.createElement('div', 
      { className: "max-w-7xl mx-auto" },
      
      // Header
      React.createElement('div', 
        { className: "bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-4 sm:mb-6" },
        React.createElement('div', 
          { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0" },
          React.createElement('div', 
            { className: "flex items-center space-x-2 sm:space-x-3" },
            React.createElement(BookOpen, { className: "text-blue-600", size: 24 }),
            React.createElement('div', {},
              React.createElement('h1', 
                { className: "text-lg sm:text-2xl font-bold text-gray-900" },
                "Gestor Académico"
              ),
              React.createElement('p', 
                { className: "text-xs sm:text-sm text-gray-600" },
                "Etiquetado automático por colores"
              )
            )
          ),
          React.createElement('div', 
            { className: "flex items-center space-x-3 sm:space-x-4" },
            notifications.length > 0 && React.createElement('div', 
              { className: "relative" },
              React.createElement(Bell, { className: "text-orange-500", size: 20 }),
              React.createElement('span', 
                { className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center" },
                notifications.length
              )
            ),
            React.createElement('div', 
              { className: "flex items-center space-x-1 sm:space-x-2" },
              React.createElement(Mail, { 
                size: 16, 
                className: emailNotifications ? 'text-blue-500' : 'text-gray-400' 
              }),
              React.createElement('button',
                {
                  onClick: () => setEmailNotifications(!emailNotifications),
                  className: `w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    emailNotifications ? 'bg-blue-500' : 'bg-gray-300'
                  }`
                },
                React.createElement('div', 
                  { 
                    className: `w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                      emailNotifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5 sm:translate-x-1'
                    }` 
                  }
                )
              )
            )
          )
        )
      ),

      // Leyenda de colores
      React.createElement('div', 
        { className: "bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6" },
        React.createElement('h3', 
          { className: "font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base" },
          "Sistema de Etiquetado Automático"
        ),
        React.createElement('div', 
          { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3" },
          React.createElement('div', 
            { className: "flex items-center space-x-2" },
            React.createElement('div', { className: "w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded" }),
            React.createElement('span', { className: "text-xs sm:text-sm" }, "A tiempo (+4 días)")
          ),
          React.createElement('div', 
            { className: "flex items-center space-x-2" },
            React.createElement('div', { className: "w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded" }),
            React.createElement('span', { className: "text-xs sm:text-sm" }, "Por vencer (2-3 días)")
          ),
          React.createElement('div', 
            { className: "flex items-center space-x-2" },
            React.createElement('div', { className: "w-3 h-3 sm:w-4 sm:h-4 bg-orange-400 rounded" }),
            React.createElement('span', { className: "text-xs sm:text-sm" }, "Vence mañana")
          ),
          React.createElement('div', 
            { className: "flex items-center space-x-2" },
            React.createElement('div', { className: "w-3 h-3 sm:w-4 sm:h-4 bg-red-400 rounded" }),
            React.createElement('span', { className: "text-xs sm:text-sm" }, "Vence hoy / Vencido")
          ),
          React.createElement('div', 
            { className: "flex items-center space-x-2" },
            React.createElement('div', { className: "w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded" }),
            React.createElement('span', { className: "text-xs sm:text-sm" }, "Completado")
          )
        )
      ),

      // Alertas
      notifications.length > 0 && React.createElement('div', 
        { className: "bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6" },
        React.createElement('div', 
          { className: "flex items-center space-x-2 mb-2" },
          React.createElement(AlertTriangle, { className: "text-orange-600", size: 16 }),
          React.createElement('h3', 
            { className: "font-semibold text-orange-800 text-sm sm:text-base" },
            "Alertas Activas"
          )
        ),
        React.createElement('div', 
          { className: "space-y-1" },
          notifications.slice(0, 3).map((notif, index) =>
            React.createElement('p', 
              { key: index, className: "text-xs sm:text-sm text-orange-700" },
              `• ${notif.message}`
            )
          ),
          notifications.length > 3 && React.createElement('p', 
            { className: "text-xs sm:text-sm text-orange-600" },
            `... y ${notifications.length - 3} alertas más`
          )
        )
      ),

      // Navegación
      React.createElement('div', 
        { className: "bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6" },
        React.createElement('div', 
          { className: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4" },
          React.createElement('button',
            {
              onClick: () => setView('list'),
              className: `px-3 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm ${
                view === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`
            },
            React.createElement(BookOpen, { size: 14 }),
            React.createElement('span', {}, "Lista de Tareas")
          ),
          React.createElement('button',
            {
              onClick: () => setView('calendar'),
              className: `px-3 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm ${
                view === 'calendar' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`
            },
            React.createElement(Calendar, { size: 14 }),
            React.createElement('span', {}, "Vista de Calendario")
          )
        )
      ),

      // Formulario
      React.createElement('div', 
        { className: "bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6" },
        React.createElement('h3', 
          { className: "font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base" },
          "Agregar Nueva Tarea"
        ),
        React.createElement('div', 
          { className: "space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4" },
          React.createElement('input',
            {
              type: "text",
              placeholder: "Asignatura",
              value: newTask.subject,
              onChange: (e) => setNewTask({...newTask, subject: e.target.value}),
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          ),
          React.createElement('input',
            {
              type: "text",
              placeholder: "Título de la tarea",
              value: newTask.title,
              onChange: (e) => setNewTask({...newTask, title: e.target.value}),
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          ),
          React.createElement('select',
            {
              value: newTask.type,
              onChange: (e) => setNewTask({...newTask, type: e.target.value}),
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            },
            React.createElement('option', { value: "Tarea" }, "Tarea"),
            React.createElement('option', { value: "Examen" }, "Examen"),
            React.createElement('option', { value: "Ensayo" }, "Ensayo"),
            React.createElement('option', { value: "Proyecto" }, "Proyecto"),
            React.createElement('option', { value: "Laboratorio" }, "Laboratorio")
          ),
          React.createElement('input',
            {
              type: "date",
              value: newTask.dueDate,
              onChange: (e) => setNewTask({...newTask, dueDate: e.target.value}),
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          ),
          React.createElement('button',
            {
              onClick: addTask,
              className: "w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 flex items-center justify-center space-x-2 text-sm font-medium"
            },
            React.createElement(Plus, { size: 14 }),
            React.createElement('span', {}, "Agregar")
          )
        )
      ),

      // Vista principal
      view === 'list' ? 
        React.createElement('div', 
          { className: "space-y-4" },
          tasks.map(task => {
            const status = getTaskStatus(task.dueDate, task.completed);
            const style = getStatusStyle(status);
            const IconComponent = style.icon;
            
            return React.createElement('div',
              {
                key: task.id,
                className: `bg-white rounded-lg shadow-sm border-l-4 ${style.border} p-4 sm:p-6`
              },
              React.createElement('div',
                { className: "flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0" },
                React.createElement('div',
                  { className: "flex items-start space-x-3 sm:space-x-4 flex-1" },
                  React.createElement('button',
                    {
                      onClick: () => toggleTask(task.id),
                      className: `mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        task.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`
                    },
                    task.completed && React.createElement(Check, { size: 12 })
                  ),
                  React.createElement('div',
                    { className: "flex-1 min-w-0" },
                    React.createElement('div',
                      { className: "flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2" },
                      React.createElement('h3',
                        { 
                          className: `font-semibold text-sm sm:text-base ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }` 
                        },
                        `${task.subject}: ${task.title}`
                      ),
                      React.createElement('div',
                        { className: "flex items-center space-x-2" },
                        React.createElement('span',
                          { className: `px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}` },
                          style.label
                        ),
                        React.createElement('span',
                          { className: "text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded" },
                          task.type
                        )
                      )
                    ),
                    task.description && React.createElement('p',
                      { className: "text-gray-600 text-xs sm:text-sm mb-2" },
                      task.description
                    ),
                    React.createElement('div',
                      { className: "flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500" },
                      React.createElement('span', {}, `📅 ${formatDate(task.dueDate)}`),
                      React.createElement('span', {}, `⏰ ${getDaysUntilDue(task.dueDate)}`)
                    )
                  )
                ),
                React.createElement('div',
                  { className: "flex items-center justify-end sm:justify-center" },
                  React.createElement(IconComponent, { size: 16, className: style.text })
                )
              )
            );
          })
        ) : 
        React.createElement(CalendarView),

      // Footer
      React.createElement('div', 
        { className: "mt-6 sm:mt-8 bg-white rounded-lg shadow-sm p-3 sm:p-4" },
        React.createElement('div', 
          { className: "text-center text-xs sm:text-sm text-gray-600 space-y-1" },
          React.createElement('p', {}, "✨ Sistema de etiquetado automático activado"),
          React.createElement('p', {}, `🔔 Notificaciones ${emailNotifications ? 'activadas' : 'desactivadas'}`),
          React.createElement('p', {}, `📊 ${tasks.filter(t => !t.completed).length} tareas pendientes de ${tasks.length} totales`)
        )
      )
    )
  );
};

// Renderizar la aplicación
ReactDOM.render(React.createElement(AcademicTaskManager), document.getElementById('root'));
