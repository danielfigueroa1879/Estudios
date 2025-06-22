// React components and application logic for the Academic Task Manager

const { useState, useEffect, useRef } = React;

// --- Simple SVG Icons ---
const IconBook = ({ width = "20", height = "20" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
);

const IconCalendar = ({ width = "20", height = "20" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

const IconPlus = ({ width = "20", height = "20" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
);

const IconClock = ({ width = "20", height = "20" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
    </svg>
);

const IconMail = ({ width = "20", height = "20" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
    </svg>
);

const IconBell = ({ width = "22", height = "22" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
);

const IconAlert = ({ width = "20", height = "20" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
);

const IconChevronDown = ({ width = "24", height = "24" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6,9 12,15 18,9"/>
    </svg>
);

const IconChevronUp = ({ width = "24", height = "24" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18,15 12,9 6,15"/>
    </svg>
);

const IconTrash = ({ width = "18", height = "18" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3,6 5,6 21,6"/>
        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
);

const IconCheck = ({ width = "18", height = "18" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20,6 9,17 4,12"/>
    </svg>
);

const IconEdit = ({ width = "18", height = "18" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

const IconHamburger = ({ width = "24", height = "24" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const IconArrowBack = ({ width = "24", height = "24" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5"/>
        <polyline points="12 19 5 12 12 5"/>
    </svg>
);

// --- Custom Alert/Confirm Dialogs ---
const CustomAlertDialog = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-blue-500">
                <IconAlert width="40" height="40" className="text-blue-500 mx-auto mb-4" />
                <p className="text-lg text-gray-800 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
};

const CustomConfirmDialog = ({ message, isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-red-500">
                <IconTrash width="40" height="40" className="text-red-500 mx-auto mb-4" />
                <p className="text-lg text-gray-800 mb-6">{message}</p>
                <div className="flex space-x-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition-colors text-lg font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main AcademicTaskManager component
const AcademicTaskManager = () => {
    // State variables
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [alertDialogMessage, setAlertDialogMessage] = useState("");
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [confirmDialogMessage, setConfirmDialogMessage] = useState("");
    const confirmCallbackRef = useRef(null);

    // Chilean holidays for 2025
    const chileanHolidays = [
        '2025-01-01', '2025-04-18', '2025-04-19', '2025-05-01', '2025-05-21',
        '2025-06-20', '2025-06-29', '2025-07-16', '2025-08-15', '2025-09-18',
        '2025-09-19', '2025-10-12', '2025-10-31', '2025-11-01', '2025-12-08',
        '2025-12-25'
    ];

    // Function to show custom alert
    const showAlert = (message) => {
        setAlertDialogMessage(message);
        setIsAlertDialogOpen(true);
    };

    // Function to show custom confirm
    const showConfirm = (message, onConfirmCallback) => {
        setConfirmDialogMessage(message);
        confirmCallbackRef.current = onConfirmCallback;
        setIsConfirmDialogOpen(true);
    };

    // Handlers for custom dialogs
    const handleAlertDialogClose = () => {
        setIsAlertDialogOpen(false);
    };

    const handleConfirmDialogConfirm = () => {
        if (confirmCallbackRef.current) {
            confirmCallbackRef.current();
        }
        setIsConfirmDialogOpen(false);
    };

    const handleConfirmDialogCancel = () => {
        setIsConfirmDialogOpen(false);
    };

    // Function to load data from localStorage
    const loadTasksFromStorage = () => {
        try {
            const savedTasks = localStorage.getItem('academicTasks');
            if (savedTasks) {
                return JSON.parse(savedTasks);
            }
        } catch (error) {
            console.error('Error loading tasks from storage:', error);
        }
        
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const formatDateForInput = (date) => date.toISOString().split('T')[0];

        return [
            {
                id: 1,
                subject: 'Matemáticas',
                title: 'Examen Final',
                description: 'Cálculo integral y diferencial',
                dueDate: formatDateForInput(tomorrow),
                dueTime: '09:00',
                type: 'Examen',
                completed: false
            },
            {
                id: 2,
                subject: 'Historia',
                title: 'Ensayo sobre la Revolución',
                description: 'Análisis de las causas y consecuencias',
                dueDate: formatDateForInput(tomorrow),
                dueTime: '14:30',
                type: 'Ensayo',
                completed: false
            }
        ];
    };

    // Function to save data to localStorage
    const saveTasksToStorage = (tasksToSave) => {
        try {
            localStorage.setItem('academicTasks', JSON.stringify(tasksToSave));
        } catch (error) {
            console.error('Error saving tasks to storage:', error);
        }
    };

    // Function to load settings
    const loadSettingsFromStorage = () => {
        try {
            const savedView = localStorage.getItem('currentView');
            return { view: savedView || 'list' };
        } catch (error) {
            console.error('Error loading settings from storage:', error);
            return { view: 'list' };
        }
    };

    // Initialize states
    const [tasks, setTasks] = useState(() => loadTasksFromStorage());
    const [newTask, setNewTask] = useState({
        subject: '',
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        type: 'Tarea'
    });
    const [editingTask, setEditingTask] = useState(null);
    const savedSettings = loadSettingsFromStorage();
    const [view, setView] = useState(savedSettings.view);
    const [notifications, setNotifications] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showColorLegend, setShowColorLegend] = useState(false);
    const [showAlerts, setShowAlerts] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [expandedTasks, setExpandedTasks] = useState(new Set());

    // Toggle task expansion
    const toggleTaskExpansion = (taskId) => {
        const newExpanded = new Set(expandedTasks);
        if (newExpanded.has(taskId)) {
            newExpanded.delete(taskId);
        } else {
            newExpanded.add(taskId);
        }
        setExpandedTasks(newExpanded);
    };

    // Effects
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        saveTasksToStorage(tasks);
    }, [tasks]);

    // Helper functions
    const createLocalDate = (dateString) => {
        const parts = dateString.split('-').map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    };

    const getTaskStatus = (dueDate, dueTime, completed) => {
        if (completed) return 'completed';
        const now = new Date();
        const dueMidnight = createLocalDate(dueDate);
        let dueDateTime = dueMidnight;
        
        if (dueTime) {
            const [hours, minutes] = dueTime.split(':').map(Number);
            dueDateTime = new Date(dueMidnight);
            dueDateTime.setHours(hours, minutes, 0, 0);
        } else {
            dueDateTime = new Date(dueMidnight);
            dueDateTime.setHours(23, 59, 59, 999);
        }

        if (dueDateTime < now) return 'overdue';

        const todayMidnight = new Date(now);
        todayMidnight.setHours(0, 0, 0, 0);
        const diffTime = dueMidnight.getTime() - todayMidnight.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'due-today';
        if (diffDays === 1) return 'due-tomorrow';
        if (diffDays <= 3) return 'due-soon';
        return 'on-time';
    };

    const getTaskCardStyle = (status, completed) => {
        if (completed) {
            return {
                bg: 'bg-gray-50',
                border: 'border-gray-300',
                text: 'text-gray-600'
            };
        }
        
        switch (status) {
            case 'overdue':
                return { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-800' };
            case 'due-today':
                return { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800' };
            case 'due-tomorrow':
                return { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-800' };
            case 'due-soon':
                return { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-800' };
            default:
                return { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-800' };
        }
    };

    // Task management functions
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
                dueTime: '',
                type: 'Tarea'
            });
            setShowAddTask(false);
        } else {
            showAlert('Por favor, completa los campos de Asignatura, Título y Fecha de Vencimiento.');
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        showConfirm('¿Estás seguro de que quieres eliminar esta tarea?', () => {
            setTasks(tasks.filter(task => task.id !== id));
        });
    };

    const formatDate = (dateString) => {
        const date = createLocalDate(dateString);
        return date.toLocaleDateString('es-ES', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getDaysUntilDue = (dueDate) => {
        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);
        const dueMidnight = createLocalDate(dueDate);
        const diffTime = dueMidnight.getTime() - todayMidnight.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return `${Math.abs(diffDays)} días atrasado`;
        if (diffDays === 0) return 'Vence hoy';
        if (diffDays === 1) return 'Vence mañana';
        return `${diffDays} días restantes`;
    };

    return (
        <div className="min-h-screen bg-gray-200">
            {/* Header */}
            <div className="bg-white shadow-lg w-full py-4 sm:py-6 mb-6">
                <div className="max-w-7xl mx-auto px-3 sm:px-6">
                    <div className="flex items-start sm:items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="text-blue-600">
                                <IconBook width="28" height="28" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-4xl font-bold text-blue-600 leading-tight">
                                    GESTOR ACADÉMICO
                                </h1>
                                <p className="text-xs sm:text-lg text-gray-600">
                                    Organiza tus tareas académicas
                                </p>
                            </div>
                        </div>

                        <div className="flex-shrink-0 flex items-center space-x-3">
                            <button
                                onClick={() => setShowColorLegend(!showColorLegend)}
                                className="text-gray-600 hover:text-blue-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                                title="Acceso Rápido a Tareas"
                            >
                                <IconHamburger width="28" height="28" />
                            </button>
                        </div>
                    </div>

                    {showColorLegend && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <h3 className="font-semibold text-blue-600 text-xl sm:text-2xl text-left mb-4">Acceso rápido a tareas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        setView('list');
                                        setShowColorLegend(false);
                                    }}
                                    className="block w-full text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-800 font-medium text-base flex items-center space-x-2"
                                >
                                    <IconBook width="20" height="20" />
                                    <span>Tareas</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main content area */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6">
                {/* Form section */}
                <div id="addTaskFormSection" className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 border border-gray-200 transition-all duration-500 hover:shadow-blue-400/60 hover:ring-2 hover:ring-blue-300/50 hover:shadow-2xl hover:border-blue-300 mt-4">
                    <button
                        onClick={() => setShowAddTask(!showAddTask)}
                        className="w-full flex items-center justify-between text-left mb-4"
                    >
                        <h3 className="font-semibold text-blue-600 text-xl sm:text-2xl text-left">
                            Agregar nueva tarea
                        </h3>
                        {showAddTask ? <IconChevronUp /> : <IconChevronDown />}
                    </button>

                    {showAddTask && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                <input
                                    type="text"
                                    placeholder="Asignatura"
                                    value={newTask.subject}
                                    onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Título de la tarea"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <select
                                    value={newTask.type}
                                    onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Tarea">Tarea</option>
                                    <option value="Examen">Examen</option>
                                    <option value="Ensayo">Ensayo</option>
                                    <option value="Proyecto">Proyecto</option>
                                    <option value="Laboratorio">Laboratorio</option>
                                </select>
                                <input
                                    type="date"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="time"
                                    value={newTask.dueTime}
                                    onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <textarea
                                placeholder="Descripción (opcional)"
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                rows="3"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                            ></textarea>
                            <div className="flex space-x-4">
                                <button
                                    onClick={addTask}
                                    className="flex-1 bg-blue-600 text-white rounded-xl px-4 py-3 hover:bg-blue-700 flex items-center justify-center space-x-2 text-lg font-medium"
                                >
                                    <IconPlus width="20" height="20" />
                                    <span>Agregar</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Task List */}
                <div id="taskListSection" className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-8 mb-4 sm:mb-8 mt-6 sm:mt-8">
                        <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 text-left mb-4 sm:mb-8">Lista de tareas</h2>
                    </div>
                    
                    {tasks.map(task => {
                        const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                        const cardStyle = getTaskCardStyle(status, task.completed);
                        const isExpanded = expandedTasks.has(task.id);

                        return (
                            <div
                                key={task.id}
                                className={`rounded-xl shadow-lg border-l-8 transition-all duration-300 ${cardStyle.bg} ${cardStyle.border} ${
                                    isExpanded ? 'p-4 sm:p-8' : 'p-2 sm:p-4'
                                }`}
                            >
                                {/* Compact view */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 flex-1">
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                                task.completed
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            {task.completed && <IconCheck width="14" height="14" />}
                                        </button>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-semibold text-sm sm:text-base ${
                                                task.completed ? 'line-through text-gray-500' : 
                                                status === 'overdue' ? 'line-through text-gray-700' : 'text-gray-900'
                                            }`}>
                                                {task.subject}: {task.title}
                                            </h3>
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                                                <span>📅 {formatDate(task.dueDate)}</span>
                                                <span>⏰ {getDaysUntilDue(task.dueDate)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleTaskExpansion(task.id)}
                                        className="text-gray-400 hover:text-gray-600 p-1"
                                    >
                                        {isExpanded ? <IconChevronUp width="20" height="20" /> : <IconChevronDown width="20" height="20" />}
                                    </button>
                                </div>

                                {/* Expanded view */}
                                {isExpanded && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {task.type}
                                                </span>
                                            </div>
                                        </div>

                                        {task.description && (
                                            <p className="text-gray-600 text-sm sm:text-base mb-3">{task.description}</p>
                                        )}

                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors"
                                                title="Eliminar tarea"
                                            >
                                                <IconTrash width="18" height="18" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-8 sm:mt-10 bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <div className="text-center text-gray-600 space-y-2">
                        <div className="border-b border-gray-200 pb-2">
                            <p className="text-sm font-semibold text-gray-800 mb-0.5">© Derechos Reservados</p>
                            <p className="text-xs text-gray-700">
                                Realizado por <span className="font-semibold text-blue-600">Daniel Figueroa Chacama</span>
                            </p>
                            <p className="text-xs text-gray-600 mt-0.5">Ingeniero en Informática</p>
                        </div>
                    </div>
                </div>

                {/* Custom dialogs */}
                <CustomAlertDialog
                    message={alertDialogMessage}
                    isOpen={isAlertDialogOpen}
                    onClose={handleAlertDialogClose}
                />

                <CustomConfirmDialog
                    message={confirmDialogMessage}
                    isOpen={isConfirmDialogOpen}
                    onConfirm={handleConfirmDialogConfirm}
                    onCancel={handleConfirmDialogCancel}
                />
            </div>
        </div>
    );
};

// Use createRoot for React 18 to render the application
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<AcademicTaskManager />);
