const { useState, useEffect, useRef } = React;

// --- INSTRUCCIONES IMPORTANTES DE FIREBASE ---
// 1. Ve a https://firebase.google.com/ y crea un nuevo proyecto.
// 2. En tu proyecto de Firebase, crea una aplicación web.
// 3. Copia el objeto de configuración de Firebase y pégalo aquí abajo.
// 4. En Firebase, ve a "Authentication" -> "Sign-in method" y habilita "Email/Password".
// 5. Ve a "Firestore Database" -> "Create database" y créala en modo de prueba (test mode) por ahora.
const firebaseConfig = {
  apiKey: "AIzaSyDxrNur1ijuqHzkKK0vuvJ2jaW5DnhkgcQ",
  authDomain: "gestor-9df5a.firebaseapp.com",
  projectId: "gestor-9df5a",
  storageBucket: "gestor-9df5a.appspot.com",
  messagingSenderId: "81232263097",
  appId: "1:81232263097:web:07d07125dac516205e2868",
  measurementId: "G-GJVDBRWEGV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// --- Iconos SVG ---
const IconBook = ({ width = "20", height = "20", className }) => ( <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/> <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/> </svg> );
const IconCalendar = ({ width = "20", height = "20", className }) => ( <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/> <line x1="16" y1="2" x2="16" y2="6"/> <line x1="8" y1="2" x2="8" y2="6"/> <line x1="3" y1="10" x2="21" y2="10"/> </svg> );
const IconPlus = ({ width = "20", height = "20", className }) => ( <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="12" y1="5" x2="12" y2="19"/> <line x1="5" y1="12" x2="19" y2="12"/> </svg> );
const IconClock = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="10"/> <polyline points="12,6 12,12 16,14"/> </svg> );
const IconMail = ({ width = "20", height = "20", className }) => ( <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/> <polyline points="22,6 12,13 2,6"/> </svg> );
const IconBell = ({ width = "22", height = "22" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/> <path d="M13.73 21a2 2 0 0 1-3.46 0"/> </svg> );
const IconAlert = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/> <line x1="12" y1="9" x2="12" y2="13"/> <line x1="12" y1="17" x2="12.01" y2="17"/> </svg> );
const IconChevronDown = ({ width = "32", height = "32", className }) => ( <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"> <polyline points="6 9 12 15 18 9"/> </svg> );
const IconChevronUp = ({ width = "32", height = "32", className }) => ( <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"> <polyline points="18 15 12 9 6 15"/> </svg> );
const IconTrash = ({ width = "18", height = "18" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="3,6 5,6 21,6"/> <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/> <line x1="10" y1="11" x2="10" y2="17"/> <line x1="14" y1="11" x2="14" y2="17"/> </svg> );
const IconCheck = ({ width = "18", height = "18" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="20,6 9,17 4,12"/> </svg> );
const IconEdit = ({ width = "18", height = "18" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/> <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/> </svg> );
const IconHamburger = ({ width = "24", height = "24" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="18" x2="21" y2="18"></line> </svg> );
const IconBackArrowhead = ({ width = "32", height = "32", className, onClick, title }) => ( <svg onClick={onClick} title={title} className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"> <polyline points="15 18 9 12 15 6"/> </svg> );
const IconLock = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path> </svg> );
const IconLogOut = ({ width = "22", height = "22" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" y1="12" x2="9" y2="12"></line> </svg> );
const IconSpinner = () => (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>);
const IconDownload = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="7 10 12 15 17 10"></polyline> <line x1="12" y1="15" x2="12" y2="3"></line> </svg> );
const IconClose = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg> );
const IconEye = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path> <circle cx="12" cy="12" r="3"></circle> </svg> );
const IconEyeOff = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path> <line x1="1" y1="1" x2="23" y2="23"></line> </svg> );
const IconHistory = ({ width = "20", height = "20", className }) => ( <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M1 4v6h6" /> <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /> </svg> );


// --- Custom Dialogs ---
const CustomAlertDialog = ({ message, isOpen, onClose }) => { if (!isOpen) return null; return ( <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"> <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-blue-500"> <IconAlert width="40" height="40" className="text-blue-500 mx-auto mb-4" /> <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">{message}</p> <button onClick={onClose} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium" > Aceptar </button> </div> </div> ); };
const CustomConfirmDialog = ({ message, isOpen, onConfirm, onCancel }) => { if (!isOpen) return null; return ( <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"> <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-red-500"> <IconTrash width="40" height="40" className="text-red-500 mx-auto mb-4" /> <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">{message}</p> <div className="flex space-x-4"> <button onClick={onCancel} className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-lg font-medium" > Cancelar </button> <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium" > Confirmar </button> </div> </div> </div> ); };

// --- Login Screen Component ---
const LoginScreen = ({ showAlert }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');

    const handleRegister = () => {
        if (!email || !password) { showAlert('Por favor, ingresa un correo y contraseña.'); return; }
        setLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => userCredential.user.sendEmailVerification().then(() => {
                setRegisterSuccessMessage('¡Registro exitoso! Se ha enviado un correo de verificación. Revisa tu bandeja de entrada (o carpeta de spam) para activar tu cuenta.');
                setIsRegister(false); setEmail(''); setPassword('');
                setTimeout(() => setRegisterSuccessMessage(''), 30000); // Ocultar después de 30 segundos
            }))
            .catch(error => {
                let message = "Ocurrió un error durante el registro.";
                if (error.code === 'auth/email-already-in-use') message = 'El correo electrónico ya está en uso.';
                else if (error.code === 'auth/weak-password') message = 'La contraseña debe tener al menos 6 caracteres.';
                else if (error.code === 'auth/invalid-email') message = 'El formato del correo electrónico no es válido.';
                showAlert(message);
            })
            .finally(() => setLoading(false));
    };

    const handleLogin = () => {
        if (!email || !password) { showAlert('Por favor, ingresa tu correo y contraseña.'); return; }
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => userCredential.user.reload().then(() => userCredential))
            .then(() => {
                if (!auth.currentUser.emailVerified) {
                    showAlert('Tu correo no ha sido verificado. Por favor, revisa tu bandeja de entrada y vuelve a iniciar sesión.');
                    auth.signOut();
                }
            })
            .catch(error => {
                let message = 'Correo o contraseña incorrectos.';
                if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(error.code)) {
                     message = 'Correo o contraseña incorrectos.';
                }
                showAlert(message);
            })
            .finally(() => setLoading(false));
    };

    const handlePasswordReset = () => {
        if (!email) { showAlert("Por favor, ingresa tu correo electrónico para restablecer la contraseña."); return; }
        setLoading(true);
        auth.sendPasswordResetEmail(email)
            .then(() => showAlert("Se ha enviado un correo para restablecer tu contraseña."))
            .catch(() => showAlert("No se pudo enviar el correo de restablecimiento. Verifica que el correo sea correcto."))
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen bg-blue-600 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-t-4 border-blue-600">
                {registerSuccessMessage && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 mb-6 rounded-r-lg" role="alert">
                        <p className="font-bold">¡Éxito!</p>
                        <p>{registerSuccessMessage}</p>
                    </div>
                )}
                <div className="text-center mb-8">
                    <IconBook width="48" height="48" className="mx-auto text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">Gestor Académico</h1>
                    <p className="text-gray-500 dark:text-gray-400">{isRegister ? 'Crea una nueva cuenta' : 'Bienvenido de vuelta'}</p>
                </div>
                <div className="space-y-6">
                    <div className="relative"><span className="absolute left-4 top-3.5 text-gray-400"><IconMail /></span><input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl px-12 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div>
                    <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-400"><IconLock /></span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl px-12 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            {showPassword ? <IconEyeOff /> : <IconEye />}
                        </button>
                    </div>
                </div>
                <div className="mt-8"><button onClick={isRegister ? handleRegister : handleLogin} disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-3.5 text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center disabled:bg-blue-400">{loading && <IconSpinner />}{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</button></div>
                <div className="text-center mt-6 flex justify-between items-center">
                    <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 dark:text-blue-400 hover:underline">{isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}</button>
                    {!isRegister && (<button onClick={handlePasswordReset} className="text-sm text-gray-500 dark:text-gray-400 hover:underline">¿Olvidaste la contraseña?</button>)}
                </div>
            </div>
        </div>
    );
};

// --- Componentes de Vista (Refactorizados) ---
const DailyTasksCardView = ({ tasks, formatDate, getTaskStatus, getTaskCardStyle, getDaysUntilDue, toggleTask, startEditing, deleteTask, handleTaskCardClick, onBackToList }) => {
    const groupedTasks = tasks.reduce((acc, task) => {
        const date = task.dueDate;
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
    }, {});

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6 relative">
            <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 text-left">Tareas por día</h2>
                 <IconBackArrowhead onClick={onBackToList} className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" title="Volver a la lista" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Object.entries(groupedTasks).sort().map(([date, dayTasks]) => (
                    <div key={date} className="bg-white dark:bg-gray-700/50 rounded-xl shadow-lg p-2.5 sm:p-5 transition-all duration-300">
                        <h3 className="font-semibold text-xl sm:text-2xl text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">{formatDate(date)}</h3>
                        <div className="space-y-1">
                            {dayTasks.sort((a, b) => (a.dueTime || '00:00').localeCompare(b.dueTime || '00:00')).map(task => {
                                const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                                const cardStyle = getTaskCardStyle(status, task.completed);
                                return (
                                    <div key={task.id} onClick={(e) => handleTaskCardClick(task, e)} className={`p-1.5 sm:p-3 rounded-xl border-l-8 ${cardStyle.bg} ${cardStyle.border} transition-all duration-300 cursor-pointer ${cardStyle.hoverClasses}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-1"><IconClock width="18" height="18" className="text-gray-600 dark:text-gray-300" /><span className={`text-xs sm:text-sm px-2 py-0.5 rounded-full ${cardStyle.bg} ${cardStyle.text} font-medium`}>{task.dueTime ? `${getDaysUntilDue(task.dueDate)} - ${task.dueTime}` : getDaysUntilDue(task.dueDate)}</span></div>
                                            <button onClick={(e) => { e.stopPropagation(); toggleTask(task.id, task.completed); }} className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-400 dark:border-gray-500'}`}>{task.completed && <IconCheck width="14" height="14" />}</button>
                                        </div>
                                        <div><p className="font-medium text-sm sm:text-lg text-gray-800 dark:text-gray-100">{task.subject}</p><p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 mt-0.5">{task.title}</p><p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.type}</p></div>
                                        <div className="flex justify-end mt-3 space-x-1">
                                            <button onClick={(e) => { e.stopPropagation(); startEditing(task); }} className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 p-1 rounded-xl transition-colors" title="Editar tarea"><IconEdit width="16" height="16" /></button>
                                            <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 p-1 rounded-xl transition-colors" title="Eliminar tarea"><IconTrash width="16" height="16" /></button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MonthlyCalendar = ({ tasks, highlightedDate, currentViewDate, setCurrentViewDate, todayGlobal, getTaskStatus, chileanHolidays, createLocalDate, onDayDoubleClick, getTaskCardStyle }) => {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const daysArray = [];
    const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1; // Adjust to start Monday as 0
    for (let i = 0; i < adjustedStartingDay; i++) { daysArray.push(null); }
    for (let day = 1; day <= daysInMonth; day++) { daysArray.push(day); }
    const tasksByDate = tasks.reduce((acc, task) => {
        const taskDate = createLocalDate(task.dueDate);
        if (taskDate.getFullYear() === year && taskDate.getMonth() === month) {
            const day = taskDate.getDate();
            if (!acc[day]) acc[day] = [];
            acc[day].push(task);
        }
        return acc;
    }, {});
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const goToPreviousMonth = () => setCurrentViewDate(new Date(year, month - 1, 1));
    const goToNextMonth = () => setCurrentViewDate(new Date(year, month + 1, 1));
    const goToToday = () => setCurrentViewDate(todayGlobal);

    return (
        <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 text-center mb-1 sm:mb-0 uppercase">{monthNames[month]} {year}</h2>
            <div className="flex justify-center space-x-1 sm:space-x-2 w-full mt-1 sm:mt-2 mb-4">
                <button onClick={goToPreviousMonth} className="px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm">←</button>
                <button onClick={goToToday} className="px-3 py-1.5 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors text-sm">Hoy</button>
                <button onClick={goToNextMonth} className="px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm">→</button>
            </div>
            <div className="grid grid-cols-7 bg-blue-600 dark:bg-gray-700 text-white rounded-t-lg">{dayNames.map((day, index) => <div key={index} className="text-center font-semibold py-2 text-sm">{day}</div>)}</div>
            <div className="grid grid-cols-7 border-l border-t border-gray-200 dark:border-gray-700">
                {daysArray.map((day, index) => {
                    if (!day) return <div key={index} className="h-14 sm:h-20 lg:h-28 bg-gray-50 dark:bg-gray-800/50 border-r border-b border-gray-200 dark:border-gray-600"></div>;
                    const dayObj = new Date(year, month, day);
                    const isToday = todayGlobal.getDate() === dayObj.getDate() && todayGlobal.getMonth() === dayObj.getMonth() && todayGlobal.getFullYear() === dayObj.getFullYear();
                    const currentDayFormatted = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    const isHoliday = chileanHolidays.includes(currentDayFormatted);
                    const highlightEntry = highlightedDate && highlightedDate.date === currentDayFormatted ? highlightedDate : null;

                    let dayClasses = `h-14 sm:h-20 lg:h-28 p-0.5 sm:p-1 transition-all duration-300 ease-in-out relative border-r border-b border-gray-200 dark:border-gray-600 ${isToday ? 'bg-blue-100 dark:bg-blue-800/80' : 'bg-white dark:bg-gray-700/90 hover:bg-gray-50 dark:hover:bg-gray-600/90'}`;

                    if (highlightEntry) {
                        dayClasses += ` ${highlightEntry.highlightBg} z-10`;
                        if (highlightEntry.isAnimating) {
                             dayClasses += ` highlight-animation`;
                        }
                    }

                    let dynamicStyle = {};
                    if (highlightEntry && highlightEntry.isAnimating) {
                        dynamicStyle = { '--ring-color-rgb': highlightEntry.borderColorRgb };
                    }

                    const dayTasks = tasksByDate[day] || [];
                    const allDayTasks = dayTasks.filter(t => !t.dueTime);
                    const timedTasks = dayTasks.filter(t => t.dueTime);

                    const getTaskTopPercent = (time) => {
                        const [hour, minute] = time.split(':').map(Number);
                        const totalMinutes = hour * 60 + minute;
                        const startMinutes = 8 * 60; // 8 AM
                        const endMinutes = 24 * 60; // Midnight
                        const duration = endMinutes - startMinutes;

                        const positionInMinutes = totalMinutes - startMinutes;
                        const percentage = (positionInMinutes / duration) * 100;

                        return Math.max(0, Math.min(100, percentage));
                    };

                    const renderTaskBar = (task) => {
                         const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                         const cardStyle = getTaskCardStyle(status, task.completed);
                         let bgColor = cardStyle.border.replace('border-', 'bg-').replace('dark:border-', 'dark:bg-'); // Derive from border color
                         let title = '';
                         switch (status) { case 'overdue': title = `${task.subject} - Vencida`; break; case 'due-today': title = `${task.subject} - Vence hoy`; break; case 'due-tomorrow': title = `${task.subject} - Vence mañana`; break; case 'due-soon': title = `${task.subject} - Por vencer`; break; case 'completed': title = `${task.subject} - Completada`; break; default: title = `${task.subject} - A tiempo`; }
                         if (task.dueTime) title += ` - ${task.dueTime}`;
                         return <div className={`w-full h-1.5 ${bgColor} rounded`} title={title}></div>;
                    };

                    return (
                        <div key={currentDayFormatted} style={dynamicStyle} onDoubleClick={() => onDayDoubleClick(currentDayFormatted)} className={dayClasses}>
                            <div className={`text-xs sm:text-sm font-medium ${isToday ? 'text-blue-700 dark:text-blue-300' : (isHoliday ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-300')}`}>{day}</div>
                            <div className="absolute top-4 left-0.5 right-0.5 bottom-1">
                                {/* All-day tasks stacked at the top */}
                                <div className="space-y-0.5">
                                    {allDayTasks.map(task => <div key={task.id}>{renderTaskBar(task)}</div>)}
                                </div>
                                {/* Timed tasks positioned absolutely */}
                                {timedTasks.map(task => {
                                    const topPercent = getTaskTopPercent(task.dueTime);
                                    const style = {
                                        position: 'absolute',
                                        top: `${topPercent}%`,
                                        transform: 'translateY(-50%)',
                                        width: '100%'
                                    };
                                    return (
                                        <div key={task.id} style={style}>
                                            {renderTaskBar(task)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const CalendarView = ({ tasks, highlightedDate, currentViewDate, setCurrentViewDate, todayGlobal, getTaskStatus, getTaskCardStyle, chileanHolidays, createLocalDate, onBackToList, onDayDoubleClick }) => {
    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-3xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6 relative border-4 border-blue-200 dark:border-gray-700" id="calendarSection">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 text-left">Calendario Mensual</h2>
                <IconBackArrowhead onClick={onBackToList} className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" title="Volver a la lista" />
            </div>
            <MonthlyCalendar tasks={tasks} highlightedDate={highlightedDate} currentViewDate={currentViewDate} setCurrentViewDate={setCurrentViewDate} todayGlobal={todayGlobal} getTaskStatus={getTaskStatus} getTaskCardStyle={getTaskCardStyle} chileanHolidays={chileanHolidays} createLocalDate={createLocalDate} onBackToList={() => setView('list')} onDayDoubleClick={onDayDoubleClick} />
        </div>
    );
};

const HistoryView = ({ history, permanentDeleteFromHistory, formatTimestamp, onBackToList }) => {
    if (!history || history.length === 0) {
        return (
            <div id="historySection" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 mt-6 text-center relative">
                 <IconBackArrowhead onClick={onBackToList} className="absolute top-6 right-6 text-red-500 cursor-pointer hover:text-red-700 transition-colors" title="Volver a la lista" />
                <IconHistory width="48" height="48" className="mx-auto text-gray-400 dark:text-gray-500 mb-4 mt-8" />
                <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Historial de Tareas</h2>
                <p className="text-gray-500 dark:text-gray-400">Aún no hay tareas completadas o eliminadas.</p>
            </div>
        );
    }

    return (
        <div id="historySection" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 sm:p-6 mb-3 sm:mb-6 mt-5 sm:mt-6 space-y-4 relative">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 text-left">Historial de Tareas</h2>
                 <IconBackArrowhead onClick={onBackToList} className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" title="Volver a la lista" />
            </div>
            {history.map(task => {
                const isCompleted = task.status === 'completed';
                const cardStyle = isCompleted ? 'bg-green-50 dark:bg-green-800/20 border-green-200 dark:border-green-800/50' : 'bg-red-50 dark:bg-red-800/20 border-red-200 dark:border-red-800/50';
                const textStyle = isCompleted ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-400';
                const icon = isCompleted ? <IconCheck width="16" height="16" /> : <IconTrash width="16" height="16" />;

                return (
                    <div key={task.id} className={`rounded-xl border-l-8 p-4 transition-all duration-300 ${cardStyle}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center mb-2">
                                    <span className={`font-bold text-sm px-3 py-1 rounded-full flex items-center space-x-2 ${textStyle} ${isCompleted ? 'bg-green-100 dark:bg-green-500/20' : 'bg-red-100 dark:bg-red-500/20'}`}>
                                        {icon}
                                        <span>{isCompleted ? 'Completada' : 'Eliminada'}</span>
                                    </span>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 truncate">{task.subject}: {task.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Archivado: {task.archivedAt ? formatTimestamp(task.archivedAt.toDate()) : 'Fecha no disponible'}
                                </p>
                            </div>
                            <div className="mt-3 sm:mt-0">
                                <button
                                    onClick={() => permanentDeleteFromHistory(task.id)}
                                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 p-2 rounded-full transition-colors"
                                    title="Eliminar permanentemente"
                                >
                                    <IconTrash width="20" height="20" />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const HighlightedTaskDetail = ({ task, onClose, formatDate, taskCardPosition }) => {
    const [style, setStyle] = useState({ opacity: 0, visibility: 'hidden' });

    useEffect(() => {
        if (task && taskCardPosition) {
            // Initial state: at the position and size of the clicked card
            setStyle({
                position: 'fixed',
                top: `${taskCardPosition.top}px`,
                left: `${taskCardPosition.left}px`,
                width: `${taskCardPosition.width}px`,
                height: `${taskCardPosition.height}px`,
                opacity: 0,
                transform: 'scale(0.95)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 50,
                visibility: 'visible',
            });

            // After a tick, transition to the final state
            const timer = setTimeout(() => {
                setStyle(prev => ({
                    ...prev,
                    top: '80px', // 5rem
                    left: '50%',
                    width: 'min(91.666667%, 32rem)', // w-11/12 max-w-md
                    height: 'auto',
                    opacity: 1,
                    transform: 'scale(1) translateX(-50%)',
                }));
            }, 20);

            return () => clearTimeout(timer);
        }
    }, [task, taskCardPosition]);

    const handleClose = () => {
        // Animate out
        setStyle(prev => ({
            ...prev,
            opacity: 0,
            transform: 'scale(0.95) translateX(-50%)',
        }));
        // Unmount after animation
        setTimeout(onClose, 350);
    };

    if (!task) return null;

    return (
        <div style={style} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-gray-300 dark:border-gray-600">
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400">Detalle de Tarea</h4>
                <button onClick={handleClose} className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-full transition-colors">
                    <IconClose className="w-5 h-5" />
                </button>
            </div>
            <div className="space-y-1 text-left">
                <p className="text-gray-800 dark:text-gray-200"><span className="font-semibold">Asignatura:</span> {task.subject}</p>
                <p className="text-gray-800 dark:text-gray-200"><span className="font-semibold">Título:</span> {task.title}</p>
                <p className="text-gray-800 dark:text-gray-200"><span className="font-semibold">Fecha:</span> {formatDate(task.dueDate)} {task.dueTime || ''}</p>
            </div>
        </div>
    );
};

const TaskModal = ({ isOpen, onClose, onSave, showAlert, taskToEdit, selectedDate }) => {
    const [taskData, setTaskData] = useState({});
    const isEditMode = !!taskToEdit;

    useEffect(() => {
        const initialData = {
            subject: '', title: '', description: '',
            dueDate: selectedDate || new Date().toISOString().split('T')[0],
            dueTime: '', type: 'Tarea'
        };
        setTaskData(isEditMode ? { ...taskToEdit } : initialData);
    }, [isOpen, taskToEdit, selectedDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (taskData.subject && taskData.title && taskData.dueDate) {
            onSave(taskData);
            onClose();
        } else {
            showAlert('Por favor, completa los campos de Asignatura, Título y Fecha de Vencimiento.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2">
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-8 w-[99%] max-w-2xl mx-auto border border-white/20 dark:border-gray-700/50">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-white text-xl sm:text-2xl">{isEditMode ? 'Editar Tarea' : 'Agregar Nueva Tarea'}</h3>
                    <button onClick={onClose} className="text-gray-200 hover:text-white p-1 rounded-full">
                        <IconClose className="w-6 h-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" name="subject" placeholder="Asignatura" value={taskData.subject || ''} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        <input type="text" name="title" placeholder="Título de la tarea" value={taskData.title || ''} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <select name="type" value={taskData.type || 'Tarea'} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="Tarea">Tarea</option>
                        <option value="Examen">Examen</option>
                        <option value="Recuperación de Clases">Recuperación de Clases</option>
                        <option value="Proyecto">Proyecto</option>
                        <option value="Monografía">Monografía</option>
                        <option value="Informe">Informe</option>
                    </select>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="date" name="dueDate" value={taskData.dueDate || ''} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        <input type="time" name="dueTime" placeholder="Hora (opcional)" value={taskData.dueTime || ''} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <textarea name="description" placeholder="Descripción (opcional)" value={taskData.description || ''} onChange={handleChange} rows="3" className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"></textarea>
                    <div className="flex justify-center w-full space-x-4 pt-2">
                        <button onClick={onClose} className="bg-gray-500/50 text-white rounded-xl px-5 py-2.5 hover:bg-gray-500/70 text-base font-medium">Cancelar</button>
                        <button onClick={handleSubmit} className="bg-blue-600 text-white rounded-xl px-5 py-2.5 hover:bg-blue-700 flex items-center justify-center space-x-2 text-base font-medium">
                            {isEditMode ? <IconCheck width="18" height="18" /> : <IconPlus width="18" height="18" />}
                            <span>{isEditMode ? 'Actualizar' : 'Agregar'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define time slots globally for easier modification
const WEEKLY_CALENDAR_TIME_SLOTS = [
    '06:00', '08:00', '10:00', '12:00', '14:00',
    '16:00', '19:00', '20:00', '22:00' // 9 rows
];

// --- NEW: Class Modal Component ---
const ClassModal = ({ isOpen, onClose, onSave, showAlert, classToEdit, selectedDay, selectedTime }) => {
    const [classData, setClassData] = useState({});
    const isEditMode = !!classToEdit;

    useEffect(() => {
        const initialData = {
            subject: '',
            dayOfWeek: selectedDay || 'Lunes',
            startTime: selectedTime || '', // Default to empty string for manual input
            endTime: '', // Optional
            description: '' // Optional
        };
        setClassData(isEditMode ? { ...classToEdit } : initialData);
    }, [isOpen, classToEdit, selectedDay, selectedTime]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (classData.subject && classData.dayOfWeek && classData.startTime) {
            onSave(classData);
            onClose();
        } else {
            showAlert('Por favor, completa los campos de Asignatura, Día y Hora de inicio.');
        }
    };

    if (!isOpen) return null;

    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2">
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-8 w-[99%] max-w-2xl mx-auto border border-white/20 dark:border-gray-700/50">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-white text-xl sm:text-2xl">{isEditMode ? 'Editar Clase' : 'Agregar Nueva Clase'}</h3>
                    <button onClick={onClose} className="text-gray-200 hover:text-white p-1 rounded-full">
                        <IconClose className="w-6 h-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    <input type="text" name="subject" placeholder="Asignatura" value={classData.subject || ''} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select name="dayOfWeek" value={classData.dayOfWeek || 'Lunes'} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                        </select>
                        {/* Changed to input type="time" for manual input */}
                        <input type="time" name="startTime" placeholder="Hora de inicio" value={classData.startTime || ''} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <input type="time" name="endTime" placeholder="Hora de fin (opcional)" value={classData.endTime || ''} onChange={handleChange} className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <textarea name="description" placeholder="Descripción (opcional)" value={classData.description || ''} onChange={handleChange} rows="3" className="w-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-200 border border-gray-300/40 dark:border-gray-600/50 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"></textarea>
                    <div className="flex justify-center w-full space-x-4 pt-2">
                        <button onClick={onClose} className="bg-gray-500/50 text-white rounded-xl px-5 py-2.5 hover:bg-gray-500/70 text-base font-medium">Cancelar</button>
                        <button onClick={handleSubmit} className="bg-blue-600 text-white rounded-xl px-5 py-2.5 hover:bg-blue-700 flex items-center justify-center space-x-2 text-base font-medium">
                            {isEditMode ? <IconCheck width="18" height="18" /> : <IconPlus width="18" height="18" />}
                            <span>{isEditMode ? 'Actualizar' : 'Agregar'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NEW: Weekly Calendar View Component ---
const WeeklyCalendarView = ({ classes, chileanHolidays, createLocalDate, onBackToList, onAddClass, onEditClass, onDeleteClass }) => {
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    // Using the globally defined time slots
    const timeSlots = WEEKLY_CALENDAR_TIME_SLOTS;

    // Get the current week's dates
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday
    const diff = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Days to subtract to get to Monday
    const mondayOfCurrentWeek = new Date(new Date().setDate(today.getDate() - diff));
    mondayOfCurrentWeek.setHours(0, 0, 0, 0); // Normalize to start of day

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(mondayOfCurrentWeek);
        date.setDate(mondayOfCurrentWeek.getDate() + i);
        weekDates.push(date);
    }

    const classesByDayAndTime = classes.reduce((acc, cls) => {
        // Find the closest time slot for display
        const classHour = parseInt(cls.startTime.split(':')[0]);
        let closestSlot = timeSlots[0];
        let minDiff = Math.abs(classHour - parseInt(closestSlot.split(':')[0]));

        for (let i = 1; i < timeSlots.length; i++) {
            const slotHour = parseInt(timeSlots[i].split(':')[0]);
            const diff = Math.abs(classHour - slotHour);
            if (diff < minDiff) {
                minDiff = diff;
                closestSlot = timeSlots[i];
            }
        }

        if (!acc[cls.dayOfWeek]) acc[cls.dayOfWeek] = {};
        if (!acc[cls.dayOfWeek][closestSlot]) acc[cls.dayOfWeek][closestSlot] = [];
        acc[cls.dayOfWeek][closestSlot].push(cls);
        return acc;
    }, {});

    const getFormattedDateForDay = (dayIndex) => {
        const date = weekDates[dayIndex];
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-3xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6 relative border-4 border-blue-200 dark:border-gray-700" id="weeklyCalendarSection">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 text-left">Calendario Semanal</h2>
                <IconBackArrowhead onClick={onBackToList} className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" title="Volver a la lista" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg">
                    <thead className="bg-blue-600 dark:bg-gray-700 text-white">
                        <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-lg">Hora</th>
                            {daysOfWeek.map((day, index) => {
                                const formattedDate = getFormattedDateForDay(index);
                                const isToday = formattedDate === new Date().toISOString().split('T')[0];
                                return (
                                    <th key={day} className={`px-2 py-3 text-center text-xs font-medium uppercase tracking-wider ${isToday ? 'bg-blue-800' : ''} ${index === 6 ? 'rounded-tr-lg' : ''}`}>
                                        {day} <br /> <span className="font-normal text-xs">{formattedDate.substring(5)}</span>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {timeSlots.map(time => (
                            <tr key={time}>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-700">{time} horas</td>
                                {daysOfWeek.map((day, dayIndex) => {
                                    const classesInSlot = classesByDayAndTime[day] && classesByDayAndTime[day][time] ? classesByDayAndTime[day][time] : [];
                                    const formattedDate = getFormattedDateForDay(dayIndex);
                                    const isToday = formattedDate === new Date().toISOString().split('T')[0];

                                    return (
                                        <td key={`${day}-${time}`}
                                            className={`relative px-2 py-2 border-r border-b border-gray-200 dark:border-gray-700 ${isToday ? 'bg-blue-50 dark:bg-blue-800/50' : 'bg-white dark:bg-gray-800'}`}
                                            onDoubleClick={() => onAddClass(day, time)}
                                        >
                                            <div className="flex flex-col space-y-1">
                                                {classesInSlot.map(cls => (
                                                    <div key={cls.id} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-md px-1 py-0.5 truncate flex items-center justify-between group">
                                                        <span title={`${cls.subject} (${cls.description})`}>{cls.subject}</span>
                                                        {/* Display time range below subject */}
                                                        <span className="text-[0.6rem] text-blue-700 dark:text-blue-300">
                                                            {cls.startTime}{cls.endTime ? ` - ${cls.endTime}` : ''}
                                                        </span>
                                                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => onEditClass(cls)} className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100" title="Editar clase"><IconEdit width="12" height="12" /></button>
                                                            <button onClick={() => onDeleteClass(cls.id)} className="text-red-600 dark:text-red-300 hover:text-red-800 dark:hover:text-red-100" title="Eliminar clase"><IconTrash width="12" height="12" /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- NEW: Mini Weekly Calendar Component ---
const MiniWeeklyCalendar = ({ classes }) => {
    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const timeSlots = WEEKLY_CALENDAR_TIME_SLOTS.map(time => time.substring(0, 2));

    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const diff = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const mondayOfCurrentWeek = new Date(new Date().setDate(today.getDate() - diff));
    mondayOfCurrentWeek.setHours(0, 0, 0, 0);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(mondayOfCurrentWeek);
        date.setDate(mondayOfCurrentWeek.getDate() + i);
        weekDates.push(date);
    }

    const classesByDayAndFullTimeSlot = classes.reduce((acc, cls) => {
        const classHour = parseInt(cls.startTime.split(':')[0]);
        let closestFullSlot = WEEKLY_CALENDAR_TIME_SLOTS[0];
        let minDiff = Math.abs(classHour - parseInt(closestFullSlot.split(':')[0]));

        for (let i = 1; i < WEEKLY_CALENDAR_TIME_SLOTS.length; i++) {
            const slotHour = parseInt(WEEKLY_CALENDAR_TIME_SLOTS[i].split(':')[0]);
            const diff = Math.abs(classHour - slotHour);
            if (diff < minDiff) {
                minDiff = diff;
                closestFullSlot = WEEKLY_CALENDAR_TIME_SLOTS[i];
            }
        }

        if (!acc[cls.dayOfWeek]) acc[cls.dayOfWeek] = {};
        if (!acc[cls.dayOfWeek][closestFullSlot]) acc[cls.dayOfWeek][closestFullSlot] = [];
        acc[cls.dayOfWeek][closestFullSlot].push(cls);
        return acc;
    }, {});

    const getFormattedDateForDay = (dayIndex) => {
        const date = weekDates[dayIndex];
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-full">
            <div className="p-2 bg-blue-600 dark:bg-gray-700 text-white text-center text-sm font-semibold rounded-t-lg">
                Semana Actual
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-blue-500 dark:bg-gray-600 text-white">
                        <tr>
                            <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Hr</th>
                            {daysOfWeek.map((day, index) => {
                                const formattedDate = getFormattedDateForDay(index);
                                const isToday = formattedDate === new Date().toISOString().split('T')[0];
                                return (
                                    <th key={day} className={`px-1 py-1 text-center text-xs font-medium uppercase tracking-wider ${isToday ? 'bg-blue-700' : ''}`}>
                                        {day}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {WEEKLY_CALENDAR_TIME_SLOTS.map(fullTimeSlot => (
                            <tr key={fullTimeSlot}>
                                <td className="px-1 py-1 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700/50 border-r border-b border-gray-200 dark:border-gray-700">
                                    {fullTimeSlot.substring(0, 2)}
                                </td>
                                {daysOfWeek.map((day, dayIndex) => {
                                    const dayName = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][dayIndex];
                                    const classesInSlot = (classesByDayAndFullTimeSlot[dayName] && classesByDayAndFullTimeSlot[dayName][fullTimeSlot]) || [];
                                    const formattedDate = getFormattedDateForDay(dayIndex);
                                    const isToday = formattedDate === new Date().toISOString().split('T')[0];

                                    return (
                                        <td key={`${day}-${fullTimeSlot}`}
                                            className={`px-1 py-1 border-r border-b border-gray-200 dark:border-gray-700 ${isToday ? 'bg-blue-50 dark:bg-blue-800/50' : 'bg-white dark:bg-gray-800'}`}
                                        >
                                            <div className="flex flex-col space-y-0.5">
                                                {classesInSlot.map(cls => (
                                                    <div key={cls.id} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-[0.6rem] font-medium rounded-sm px-0.5 py-0.5 truncate" title={`${cls.subject} (${cls.description})`}>
                                                        {cls.subject}
                                                        <span className="text-[0.5rem] text-blue-700 dark:text-blue-300 block">
                                                            {cls.startTime}{cls.endTime ? ` - ${cls.endTime}` : ''}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Academic Task Manager Component ---
const AcademicTaskManager = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [classes, setClasses] = useState([]); // NEW: State for classes
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({ view: 'list', emailNotifications: false });

    const tasksCollectionRef = db.collection('users').doc(user.uid).collection('tasks');
    const classesCollectionRef = db.collection('users').doc(user.uid).collection('classes'); // NEW: Classes collection ref
    const historyCollectionRef = db.collection('users').doc(user.uid).collection('history');
    const settingsDocRef = db.collection('users').doc(user.uid).collection('settings').doc('appSettings');

    useEffect(() => {
        setLoading(true);
        const unsubscribeTasks = tasksCollectionRef.onSnapshot(snapshot => {
            const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksData);
            setLoading(false);
        }, error => { console.error("Error fetching tasks:", error); setLoading(false); });

        // NEW: Subscribe to classes collection
        const unsubscribeClasses = classesCollectionRef.onSnapshot(snapshot => {
            const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClasses(classesData);
        }, error => console.error("Error fetching classes:", error));

        const unsubscribeHistory = historyCollectionRef.orderBy('archivedAt', 'desc').onSnapshot(snapshot => {
            const historyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHistory(historyData);
        }, error => console.error("Error fetching history:", error));

        const unsubscribeSettings = settingsDocRef.onSnapshot(doc => { if (doc.exists) { setSettings(doc.data()); } }, error => { console.error("Error fetching settings:", error); });

        return () => {
            unsubscribeTasks();
            unsubscribeClasses(); // NEW: Unsubscribe from classes
            unsubscribeHistory();
            unsubscribeSettings();
        };
    }, [user.uid]);

    useEffect(() => {
        if (settings.view !== 'list' || settings.emailNotifications !== false) {
             settingsDocRef.set(settings, { merge: true }).catch(error => { console.error("Error saving settings:", error); });
        }
    }, [settings]);

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [alertDialogMessage, setAlertDialogMessage] = useState("");
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [confirmDialogMessage, setConfirmDialogMessage] = useState("");
    const confirmCallbackRef = useRef(null);

    const chileanHolidays = [ '2025-01-01', '2025-04-18', '2025-04-19', '2025-05-01', '2025-05-21', '2025-06-20', '2025-06-29', '2025-07-16', '2025-08-15', '2025-09-18', '2025-09-19', '2025-10-12', '2025-10-31', '2025-11-01', '2025-12-08', '2025-12-25' ];
    const showAlert = (message) => { setAlertDialogMessage(message); setIsAlertDialogOpen(true); };
    const showConfirm = (message, onConfirmCallback) => { setConfirmDialogMessage(message); confirmCallbackRef.current = onConfirmCallback; setIsConfirmDialogOpen(true); };
    const handleAlertDialogClose = () => setIsAlertDialogOpen(false);
    const handleConfirmDialogConfirm = () => { if (confirmCallbackRef.current) confirmCallbackRef.current(); setIsConfirmDialogOpen(false); };
    const handleConfirmDialogCancel = () => setIsConfirmDialogOpen(false);

    const [editingTask, setEditingTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedDateForNewTask, setSelectedDateForNewTask] = useState('');
    const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
    const [taskCardPosition, setTaskCardPosition] = useState(null);

    // NEW: State for class modal
    const [editingClass, setEditingClass] = useState(null);
    const [isClassModalOpen, setIsClassModalOpen] = useState(false);
    const [selectedDayForNewClass, setSelectedDayForNewClass] = useState('');
    const [selectedTimeForNewClass, setSelectedTimeForNewClass] = useState('');

    const { view, emailNotifications } = settings;
    const setView = (newView) => {
        if (view !== newView) {
            setSelectedTaskDetails(null);
            setTaskCardPosition(null);
        }
        setSettings(prev => ({...prev, view: newView}));
    };
    const setEmailNotifications = (enabled) => setSettings(prev => ({...prev, emailNotifications: enabled}));

    const [notifications, setNotifications] = useState([]);
    const [showQuickAccess, setShowQuickAccess] = useState(false);
    const [showAlerts, setShowAlerts] = useState(true);
    const [highlightedDate, setHighlightedDate] = useState(null);
    const [currentCalendarViewDate, setCurrentCalendarViewDate] = useState(new Date());
    const todayGlobal = new Date();
    const highlightTimeoutRef = useRef(null);
    const alertHideTimeoutRef = useRef(null);

    const [isViewsCollapsed, setIsViewsCollapsed] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 640;
            if (!mobile) {
                setIsViewsCollapsed(false); // Always expand on desktop
            } else {
                setIsViewsCollapsed(true); // Collapse by default on mobile
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => { const interval = setInterval(() => setCurrentTime(new Date()), 60000); return () => clearInterval(interval); }, []);

    const createLocalDate = (dateString) => { const parts = dateString.split('-').map(Number); return new Date(parts[0], parts[1] - 1, parts[2]); };
    const getTaskStatus = (dueDate, dueTime, completed) => { if (completed) return 'completed'; const now = new Date(); const todayMidnight = new Date(now); todayMidnight.setHours(0, 0, 0, 0); const dueMidnight = createLocalDate(dueDate); let dueDateTime = dueMidnight; if (dueTime) { const [hours, minutes] = dueTime.split(':').map(Number); dueDateTime = new Date(dueMidnight); dueDateTime.setHours(hours, minutes, 0, 0); } else { dueDateTime = new Date(dueMidnight); dueDateTime.setHours(23, 59, 59, 999); } if (dueDateTime < now) return 'overdue'; const diffTime = dueMidnight.getTime() - todayMidnight.getTime(); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); if (diffDays === 0) return 'due-today'; if (diffDays === 1) return 'due-tomorrow'; if (diffDays <= 3) return 'due-soon'; return 'on-time'; };

    const getTaskCardStyle = (status, completed) => {
        let baseStyles = {}, highlightClass = '', borderColorRgb = '0,0,0', hoverClasses = '', highlightBg = '';
        if (completed) {
            baseStyles = { bg: 'bg-gray-50 dark:bg-gray-700/50', border: 'border-gray-300 dark:border-gray-600', text: 'text-gray-600 dark:text-gray-400' };
            highlightClass = 'border-gray-500 ring-2 ring-gray-500 shadow-md';
            borderColorRgb = '107,114,128';
            hoverClasses = 'hover:border-gray-400 dark:hover:border-gray-500 hover:ring-2 hover:ring-gray-400/50 dark:hover:ring-gray-500/50 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-gray-900/50';
            highlightBg = 'bg-gray-200 dark:bg-gray-600';
        } else {
            switch (status) {
                case 'overdue':
                    baseStyles = { bg: 'bg-gray-100 dark:bg-gray-800/80', border: 'border-gray-500 dark:border-gray-600', text: 'text-gray-800 dark:text-gray-300' };
                    highlightClass = 'border-gray-600 ring-2 ring-gray-600 shadow-md';
                    borderColorRgb = '75,85,99';
                    hoverClasses = 'hover:border-gray-600 dark:hover:border-gray-400 hover:ring-2 hover:ring-gray-600/50 dark:hover:ring-gray-400/50 hover:shadow-xl hover:shadow-gray-400/50 dark:hover:shadow-black/50';
                    highlightBg = 'bg-gray-200 dark:bg-gray-600';
                    break;
                case 'due-today':
                    baseStyles = { bg: 'bg-red-50 dark:bg-red-800/70', border: 'border-red-500 dark:border-red-600', text: 'text-red-800 dark:text-red-200' };
                    highlightClass = 'border-red-500 ring-2 ring-red-500 shadow-md';
                    borderColorRgb = '239,68,68';
                    hoverClasses = 'hover:border-red-600 dark:hover:border-red-500 hover:ring-2 hover:ring-red-600/50 dark:hover:ring-red-500/50 hover:shadow-xl hover:shadow-red-300/50 dark:hover:shadow-red-900/50';
                    highlightBg = 'bg-red-200 dark:bg-red-800/70';
                    break;
                case 'due-tomorrow':
                    baseStyles = { bg: 'bg-orange-50 dark:bg-orange-800/70', border: 'border-orange-400 dark:border-orange-500', text: 'text-orange-800 dark:text-orange-200' };
                    highlightClass = 'border-orange-500 ring-2 ring-orange-500 shadow-md';
                    borderColorRgb = '249,115,22';
                    hoverClasses = 'hover:border-orange-500 dark:hover:border-orange-500 hover:ring-2 hover:ring-orange-500/50 dark:hover:ring-orange-500/50 hover:shadow-xl hover:shadow-orange-300/50 dark:hover:shadow-orange-900/50';
                    highlightBg = 'bg-orange-200 dark:bg-orange-800/70';
                    break;
                case 'due-soon':
                    baseStyles = { bg: 'bg-yellow-50 dark:bg-yellow-800/70', border: 'border-yellow-400 dark:border-yellow-500', text: 'text-yellow-800 dark:text-yellow-200' };
                    highlightClass = 'border-yellow-500 ring-2 ring-yellow-500 shadow-md';
                    borderColorRgb = '245,158,11';
                    hoverClasses = 'hover:border-yellow-500 dark:hover:border-yellow-500 hover:ring-2 hover:ring-yellow-500/50 dark:hover:ring-yellow-500/50 hover:shadow-xl hover:shadow-yellow-300/50 dark:hover:shadow-yellow-900/50';
                    highlightBg = 'bg-yellow-200 dark:bg-yellow-800/70';
                    break;
                default: // 'on-time'
                    baseStyles = { bg: 'bg-green-50 dark:bg-green-800/70', border: 'border-green-400 dark:border-green-500', text: 'text-green-800 dark:text-green-200' };
                    highlightClass = 'border-green-500 ring-2 ring-green-500 shadow-md';
                    borderColorRgb = '34,197,94';
                    hoverClasses = 'hover:border-green-500 dark:hover:border-green-500 hover:ring-2 hover:ring-green-500/50 dark:hover:ring-green-500/50 hover:shadow-xl hover:shadow-green-300/50 dark:hover:shadow-green-900/50';
                    highlightBg = 'bg-green-200 dark:bg-green-800/70';
                    break;
            }
        }
        return { ...baseStyles, highlightClass, borderColorRgb, hoverClasses, highlightBg };
    };

    useEffect(() => { const checkNotifications = () => { const newNotifications = []; tasks.forEach(task => { if (!task.completed) { const status = getTaskStatus(task.dueDate, task.dueTime, task.completed); if (['due-today', 'due-tomorrow', 'overdue'].includes(status)) { let label = ''; switch (status) { case 'overdue': label = 'Vencido'; break; case 'due-today': label = 'Vence hoy'; break; case 'due-tomorrow': label = 'Vence mañana'; break; } newNotifications.push({ id: task.id, message: `${task.subject}: ${task.title} - ${label}`, type: status, dueDate: task.dueDate, timestamp: new Date() }); } } }); setNotifications(newNotifications); }; checkNotifications(); const interval = setInterval(() => setCurrentTime(new Date()), 60000); return () => clearInterval(interval); }, [tasks, currentTime]);
    useEffect(() => { if (showAlerts && notifications.length > 0) { if (alertHideTimeoutRef.current) clearTimeout(alertHideTimeoutRef.current); alertHideTimeoutRef.current = setTimeout(() => { setShowAlerts(false); alertHideTimeoutRef.current = null; }, 25000); } else if (!showAlerts && alertHideTimeoutRef.current) { clearTimeout(alertHideTimeoutRef.current); alertHideTimeoutRef.current = null; } return () => { if (alertHideTimeoutRef.current) clearTimeout(alertHideTimeoutRef.current); }; }, [showAlerts, notifications.length]);

    const handleSaveTask = (taskData) => {
        if (taskData.id) { // Update existing task
            const { id, ...dataToUpdate } = taskData;
            tasksCollectionRef.doc(id).update(dataToUpdate)
                .catch(error => showAlert("Error al actualizar la tarea: " + error.message));
        } else { // Add new task
            tasksCollectionRef.add({ ...taskData, completed: false, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                .catch(error => showAlert("Error al agregar la tarea: " + error.message));
        }
    };

    const startEditing = (task) => {
        setEditingTask(task);
        setIsTaskModalOpen(true);
    };

    const toggleTask = async (id) => {
        const taskRef = tasksCollectionRef.doc(id);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) return;

        const taskData = taskDoc.data();

        await historyCollectionRef.add({
            ...taskData,
            status: 'completed',
            archivedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        await taskRef.delete();
    };

    const deleteTask = (id) => {
        showConfirm('¿Estás seguro de que quieres eliminar esta tarea? Se moverá al historial.', async () => {
            const taskRef = tasksCollectionRef.doc(id);
            const taskDoc = await taskRef.get();
            if (!taskDoc.exists) {
                showAlert("La tarea ya no existe.");
                return;
            }
            const taskData = taskDoc.data();

            await historyCollectionRef.add({
                ...taskData,
                status: 'deleted',
                archivedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            await taskRef.delete();

            if (editingTask && editingTask.id === id) setEditingTask(null);
        });
    };

    const handleDayDoubleClick = (date) => {
        setEditingTask(null);
        setSelectedDateForNewTask(date);
        setIsTaskModalOpen(true);
    };

    const handleOpenNewTaskModal = () => {
        setEditingTask(null);
        setSelectedDateForNewTask(new Date().toISOString().split('T')[0]);
        setIsTaskModalOpen(true);
    };

    // NEW: Class related functions
    const handleSaveClass = (classData) => {
        if (classData.id) { // Update existing class
            const { id, ...dataToUpdate } = classData;
            classesCollectionRef.doc(id).update(dataToUpdate)
                .catch(error => showAlert("Error al actualizar la clase: " + error.message));
        } else { // Add new class
            classesCollectionRef.add({ ...classData, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                .catch(error => showAlert("Error al agregar la clase: " + error.message));
        }
    };

    const handleAddClass = (day, time) => {
        setEditingClass(null);
        setSelectedDayForNewClass(day);
        setSelectedTimeForNewClass(time);
        setIsClassModalOpen(true);
    };

    const handleEditClass = (cls) => {
        setEditingClass(cls);
        setIsClassModalOpen(true);
    };

    const handleDeleteClass = (id) => {
        showConfirm('¿Estás seguro de que quieres eliminar esta clase?', () => {
            classesCollectionRef.doc(id).delete()
                .catch(error => showAlert("Error al eliminar la clase: " + error.message));
        });
    };

    const permanentDeleteFromHistory = (id) => {
        showConfirm('Esta acción es irreversible. ¿Seguro que quieres eliminar esta tarea permanentemente del historial?', () => {
            historyCollectionRef.doc(id).delete()
                .catch(error => showAlert("Error al eliminar la tarea del historial: " + error.message));
        });
    };

    const formatDate = (dateString) => createLocalDate(dateString).toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    const formatTimestamp = (dateObj) => {
        if (!dateObj) return '';
        return dateObj.toLocaleString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };
    const getDaysUntilDue = (dueDate) => { const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0); const dueMidnight = createLocalDate(dueDate); const diffTime = dueMidnight.getTime() - todayMidnight.getTime(); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); if (diffDays < 0) return `${Math.abs(diffDays)} días atrasado`; if (diffDays === 0) return 'Vence hoy'; if (diffDays === 1) return 'Vence mañana'; return `${diffDays} días restantes`; };

    const highlightCalendarDate = (dateString, highlightBg, borderColorRgb) => {
        if (highlightTimeoutRef.current) {
            clearTimeout(highlightTimeoutRef.current);
        }
        setHighlightedDate({ date: dateString, highlightBg, borderColorRgb, isAnimating: true });

        highlightTimeoutRef.current = setTimeout(() => {
            setHighlightedDate(prev => (prev && prev.date === dateString) ? { ...prev, isAnimating: false } : prev);
        }, 180000);
    };

    const handleTaskCardClick = (task, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTaskCardPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        });
        setSelectedTaskDetails(task);
        setView('calendar');
        setCurrentCalendarViewDate(createLocalDate(task.dueDate));

        setTimeout(() => {
            const calendarSection = document.getElementById('calendarSection');
            if (calendarSection) {
                calendarSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
            const cardStyle = getTaskCardStyle(status, task.completed);
            highlightCalendarDate(task.dueDate, cardStyle.highlightBg, cardStyle.borderColorRgb);
        }, 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <IconSpinner /> <span className="text-xl ml-4 text-gray-600 dark:text-gray-300">Cargando tareas...</span>
            </div>
        );
    }

    const renderCurrentView = () => {
        switch (view) {
            case 'list':
                return <div id="taskListSection" className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-2 sm:p-6 mb-3 sm:mb-6 mt-3 space-y-4"> <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 text-left mb-3 sm:mb-6">Lista de tareas</h2> {[...tasks].sort((a, b) => { if (a.completed && !b.completed) return 1; if (!a.completed && b.completed) return -1; const dateA = new Date(`${a.dueDate}T${a.dueTime || '00:00'}`); const dateB = new Date(`${b.dueDate}T${b.dueTime || '00:00'}`); return dateA - dateB; }).map(task => { const status = getTaskStatus(task.dueDate, task.dueTime, task.completed); const cardStyle = getTaskCardStyle(status, task.completed); return ( <div key={task.id} id={task.id} onClick={(e) => handleTaskCardClick(task, e)} className={`rounded-xl shadow-lg border-l-8 p-2.5 sm:p-6 transition-all duration-300 ${cardStyle.bg} ${cardStyle.border} ${cardStyle.hoverClasses} cursor-pointer`}> <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0"> <div className="flex items-start space-x-2.5 sm:space-x-4 flex-1"> <button onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }} className={`mt-0.5 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded border-2 flex items-center justify-center flex-shrink-0 border-gray-300 dark:border-gray-500 hover:border-green-500 dark:hover:border-green-400 hover:bg-green-100 dark:hover:bg-green-900/30`}></button> <div className="flex-1 min-w-0">
                                 <h3 className={`font-semibold text-sm sm:text-lg text-gray-900 dark:text-gray-100`}>{task.subject}</h3>
                                 <p className={`text-sm sm:text-base text-gray-800 dark:text-gray-300`}>
                                     {task.title}
                                     <span className="text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-md ml-2 align-middle">{task.type}</span>
                                 </p>
                                 {task.description && <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 mt-1.5 mb-1.5">{task.description}</p>}
                                 <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-base text-gray-500 dark:text-gray-400 mt-2">
                                    <span className="flex items-center">
                                        📅
                                        <span className="ml-1.5">{formatDate(task.dueDate)}</span>
                                    </span>
                                    {task.dueTime && (
                                        <span className="flex items-center">
                                            🕒
                                            <span className="ml-1.5">{task.dueTime}</span>
                                        </span>
                                    )}
                                    <span className="flex items-center">
                                        ⏰
                                        <span className="ml-1.5">{getDaysUntilDue(task.dueDate)}</span>
                                    </span>
                                </div>
                                 </div> </div> <div className="flex items-center space-x-2.5"> <div className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400"><IconClock width="22" height="22" /></div> <button onClick={(e) => { e.stopPropagation(); startEditing(task); }} className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 p-1.5 sm:p-3 rounded-xl transition-colors" title="Editar tarea"><div className="w-4.5 h-4.5 sm:w-6 sm:h-6"><IconEdit width="22" height="22" /></div></button> <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 p-1.5 sm:p-3 rounded-xl transition-colors" title="Eliminar tarea"><div className="w-4.5 h-4.5 sm:w-6 sm:h-6"><IconTrash width="22" height="22" /></div></button> </div> </div> </div> ); })} </div>;
            case 'daily':
                return <DailyTasksCardView tasks={tasks} formatDate={formatDate} getTaskStatus={getTaskStatus} getTaskCardStyle={getTaskCardStyle} getDaysUntilDue={getDaysUntilDue} toggleTask={toggleTask} startEditing={startEditing} deleteTask={deleteTask} handleTaskCardClick={handleTaskCardClick} onBackToList={() => setView('list')} />;
            case 'calendar':
                return <CalendarView tasks={tasks} highlightedDate={highlightedDate} currentViewDate={currentCalendarViewDate} setCurrentViewDate={setCurrentCalendarViewDate} todayGlobal={todayGlobal} getTaskStatus={getTaskStatus} getTaskCardStyle={getTaskCardStyle} chileanHolidays={chileanHolidays} createLocalDate={createLocalDate} onBackToList={() => setView('list')} onDayDoubleClick={handleDayDoubleClick} />;
            case 'weeklyCalendar': // NEW: Weekly calendar view
                return <WeeklyCalendarView classes={classes} chileanHolidays={chileanHolidays} createLocalDate={createLocalDate} onBackToList={() => setView('list')} onAddClass={handleAddClass} onEditClass={handleEditClass} onDeleteClass={handleDeleteClass} />;
            case 'history':
                return <HistoryView history={history} permanentDeleteFromHistory={permanentDeleteFromHistory} formatTimestamp={formatTimestamp} onBackToList={() => setView('list')} />;
            default:
                return null;
        }
    };

    const unselectedButtonClasses = "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-700 dark:hover:text-white";
    const selectedButtonClasses = "bg-blue-600 text-white shadow-lg shadow-blue-300 dark:shadow-blue-800/50 ring-2 ring-blue-400 dark:ring-blue-500";

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header */}
            <div className="sticky top-0 z-30">
                <div className="bg-blue-700 dark:bg-gray-800 shadow-lg w-full py-4 sm:py-4">
                    <div className="max-w-7xl mx-auto px-3 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="text-white"><IconBook width="26" height="26" /></div>
                                <div>
                                    <h1 className="text-sm sm:text-3xl font-bold text-white leading-tight">GESTOR ACADÉMICO</h1>
                                    <p className="text-[08px] sm:text-sm text-blue-200 mt-1"><span className="font-semibold text-white">{user.email}</span></p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 flex items-center space-x-1 sm:space-x-2">
                                {notifications.length > 0 && (
                                    <button onClick={() => setShowAlerts(!showAlerts)} className="relative text-white hover:bg-blue-600 dark:hover:bg-gray-700 p-2 rounded-full transition-colors" title={showAlerts ? "Ocultar alertas" : "Mostrar alertas"}>
                                        <IconBell width="16" height="16" className="sm:w-8 sm:h-8" />
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{notifications.length}</span>
                                    </button>
                                )}
                                <div className="hidden sm:flex items-center space-x-2 p-1 rounded-full hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors">
                                    <IconMail width="16" height="16" className="text-white sm:w-4 sm:h-4" />
                                    <button onClick={() => setEmailNotifications(!emailNotifications)} className={`w-10 h-5 rounded-full transition-colors flex items-center p-0.5 ${emailNotifications ? 'bg-blue-400' : 'bg-gray-500'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${emailNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <button onClick={() => auth.signOut()} className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 p-2 rounded-full transition-colors" title="Cerrar sesión">
                                    <IconLogOut width="16" height="16" className="sm:w-8 sm:h-8" />
                                </button>
                                <button onClick={() => setShowQuickAccess(!showQuickAccess)} className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 p-2 rounded-full transition-colors md:hidden" title="Acceso Rápido">
                                    {showQuickAccess ? <IconClose className="w-6 h-6"/> : <IconHamburger width="26" height="26" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showQuickAccess && (
                    <div className="absolute top-full left-0 right-0 w-full md:hidden">
                         <div className="p-4 bg-black/10 dark:bg-black/30 backdrop-blur-2xl shadow-lg w-full md:w-auto md:max-w-xs rounded-b-2xl">
                            <div className="max-w-5xl md:max-w-xs mx-auto">
                                <div className="space-y-1">
                                    <button onClick={() => { setView('list'); setShowQuickAccess(false); }} className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors text-blue-900 font-medium text-base flex items-center justify-center space-x-3">
                                        <IconBook width="20" height="20" /> <span>Lista</span>
                                    </button>
                                    <hr className="border-white/10" />
                                    <button onClick={() => { setView('daily'); setShowQuickAccess(false); }} className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors text-blue-900 font-medium text-base flex items-center justify-center space-x-3">
                                        <IconCalendar width="20" height="20" /> <span>Por Día</span>
                                    </button>
                                    <hr className="border-white/10" />
                                    <button onClick={() => { setView('calendar'); setShowQuickAccess(false); }} className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors text-blue-900 font-medium text-base flex items-center justify-center space-x-3">
                                        <IconCalendar width="20" height="20" /> <span>Calendario Mensual</span>
                                    </button>
                                    <hr className="border-white/10" />
                                    <button onClick={() => { setView('weeklyCalendar'); setShowQuickAccess(false); }} className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors text-blue-900 font-medium text-base flex items-center justify-center space-x-3">
                                        <IconCalendar width="20" height="20" /> <span>Calendario Semanal</span>
                                    </button>
                                    <hr className="border-white/10" />
                                    <button onClick={() => { setView('history'); setShowQuickAccess(false); }} className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors text-blue-900 font-medium text-base flex items-center justify-center space-x-3">
                                        <IconHistory width="20" height="20" /> <span>Historial</span>
                                    </button>
                                    <hr className="border-white/10" />
                                    <button onClick={() => { handleOpenNewTaskModal(); setShowQuickAccess(false); }} className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors text-blue-900 font-medium text-base flex items-center justify-center space-x-3">
                                        <IconPlus width="20" height="20" /> <span>Agregar nueva tarea</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content Layout */}
            <div className="w-full flex justify-end px-3 sm:px-6">
                <div className="flex w-full max-w-7xl">
                    {/* Main Content Column */}
                    <main className="w-full md:flex-1">
                        <div className="pb-24">
                            {notifications.length > 0 && showAlerts && ( <div onClick={() => { handleAlertsClick(); if (alertHideTimeoutRef.current) clearTimeout(alertHideTimeoutRef.current); alertHideTimeoutRef.current = null; }} className="bg-orange-100 dark:bg-orange-500/20 border border-orange-400 dark:border-orange-500/50 rounded-xl shadow-lg shadow-red-200 p-2 sm:p-4 mb-3 sm:mb-4 cursor-pointer transition-all duration-300 ease-in-out" style={{marginTop: '0.75rem'}} > <div className="flex items-center justify-between mb-2"> <h3 className="font-semibold text-orange-800 dark:text-orange-300 text-lg sm:text-xl text-left">Alertas activas</h3> <div className="text-orange-600 dark:text-orange-400"><IconAlert width="18" height="18" /></div> </div> <div className="flex flex-col gap-0.5"> {notifications.slice(0, 3).map((notif, index) => <p key={notif.id || index} className="text-sm text-orange-700 dark:text-orange-300/90 w-full text-left">• {notif.message}</p>)} {notifications.length > 3 && <p className="text-sm text-orange-600 dark:text-orange-400 w-full text-left">... y {notifications.length - 3} alertas más</p>} </div> </div> )}

                            <div className="relative bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 w-full py-2.5 sm:py-3.5 mt-5 mb-3 rounded-2xl">
                                <div className="max-w-4xl mx-auto px-3 sm:px-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 text-left">Vistas</h2>
                                        <button onClick={() => { setIsViewsCollapsed(!isViewsCollapsed); }} className="sm:hidden p-2">
                                            {isViewsCollapsed ? <IconChevronDown className="text-red-500" /> : <IconChevronUp className="text-red-500" />}
                                        </button>
                                    </div>
                                    <div className={`sm:block mt-4 sm:mt-5 ${isViewsCollapsed ? 'hidden' : ''}`}>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                                            <button onClick={() => setView('list')} className={`px-2 py-2 sm:px-5 sm:py-3 rounded-xl flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-sm transition-all duration-300 transform hover:scale-105 ${view === 'list' ? selectedButtonClasses : unselectedButtonClasses}`}><IconBook width="18" height="18" /><span className="font-medium text-center">Lista</span></button>
                                            <button onClick={() => setView('daily')} className={`px-2 py-2 sm:px-5 sm:py-3 rounded-xl flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-sm transition-all duration-300 transform hover:scale-105 ${view === 'daily' ? selectedButtonClasses : unselectedButtonClasses}`}><IconCalendar width="18" height="18" /><span className="font-medium text-center">Por Día</span></button>
                                            <button onClick={() => setView('calendar')} className={`px-2 py-2 sm:px-5 sm:py-3 rounded-xl flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-sm transition-all duration-300 transform hover:scale-105 ${view === 'calendar' ? selectedButtonClasses : unselectedButtonClasses}`}><IconCalendar width="20" height="20" /><span className="font-medium text-center">Calendario Mensual</span></button>
                                            <button onClick={() => setView('weeklyCalendar')} className={`px-2 py-2 sm:px-5 sm:py-3 rounded-xl flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-sm transition-all duration-300 transform hover:scale-105 ${view === 'weeklyCalendar' ? selectedButtonClasses : unselectedButtonClasses}`}><IconCalendar width="20" height="20" /><span className="font-medium text-center">Calendario Semanal</span></button>
                                            <button onClick={() => setView('history')} className={`px-2 py-2 sm:px-5 sm:py-3 rounded-xl flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-sm transition-all duration-300 transform hover:scale-105 ${view === 'history' ? selectedButtonClasses : unselectedButtonClasses}`}><IconHistory width="20" height="20" /><span className="font-medium text-center">Historial</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t-4 border-gray-100 dark:border-gray-800 mb-2 sm:my-3"></div>
                            {renderCurrentView()}
                            <div className="mt-7 sm:mt-9 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 sm:p-5"> <div className="text-center text-gray-600 dark:text-gray-400 space-y-1.5"> <div className="border-b border-gray-200 dark:border-gray-700 pb-1.5"> <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-0.5">© Derechos Reservados</p> <p className="text-xs text-gray-700 dark:text-gray-300">Creado por <span className="font-semibold text-blue-600 dark:text-blue-400">Daniel Figueroa Chacama</span></p> <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Ingeniero en Informática</p> </div> </div> </div>
                        </div>
                    </main>

                    {/* Sidebar Column for Mini Calendar */}
                    <aside className="hidden md:block w-[30rem] flex-shrink-0 ml-6">
                        <div className="sticky top-24">
                            <MiniWeeklyCalendar classes={classes} />
                        </div>
                    </aside>
                </div>
            </div>


            {/* FAB Button */}
            <button onClick={handleOpenNewTaskModal} className="fixed bottom-6 right-6 md:right-[32rem] bg-red-600/90 backdrop-blur-sm text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-all transform hover:scale-110 z-40">
                <IconPlus width="24" height="24" />
            </button>


            {/* Custom Dialogs and Menus */}
            <HighlightedTaskDetail
                task={selectedTaskDetails}
                onClose={() => {
                    setSelectedTaskDetails(null);
                    setTaskCardPosition(null);
                }}
                formatDate={formatDate}
                taskCardPosition={taskCardPosition}
            />
            <CustomAlertDialog message={alertDialogMessage} isOpen={isAlertDialogOpen} onClose={handleAlertDialogClose} />
            <CustomConfirmDialog message={confirmDialogMessage} isOpen={isConfirmDialogOpen} onConfirm={handleConfirmDialogConfirm} onCancel={handleConfirmDialogCancel} />
            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onSave={handleSaveTask}
                showAlert={showAlert}
                taskToEdit={editingTask}
                selectedDate={selectedDateForNewTask}
            />
            {/* NEW: Class Modal */}
            <ClassModal
                isOpen={isClassModalOpen}
                onClose={() => setIsClassModalOpen(false)}
                onSave={handleSaveClass}
                showAlert={showAlert}
                classToEdit={editingClass}
                selectedDay={selectedDayForNewClass}
                selectedTime={selectedTimeForNewClass}
            />
        </div>
    );
};

// --- NUEVO: Banner de Instalación ---
const InstallBanner = ({ onInstall, onClose }) => {
    return (
        <div className="fixed top-0 left-0 right-0 p-4 z-50">
            <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm text-white rounded-2xl shadow-2xl max-w-lg mx-auto p-4 flex items-center justify-between transition-transform duration-500 transform animate-slide-down">
                <div className="flex items-center">
                    <div>
                        <h4 className="font-bold">Instalar Gestor Académico</h4>
                    </div>
                </div>
                <div className="flex items-center">
                    <button onClick={onInstall} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors">
                        <IconDownload className="w-5 h-5 mr-2"/>
                        Instalar
                    </button>
                    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white p-2 rounded-full">
                        <IconClose className="w-5 h-5"/>
                    </button>
                </div>
            </div>
            {/* Moved style block to index.html */}
        </div>
    );
};


// --- Main App Component (Actualizado con lógica de instalación) ---
const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [alertDialogMessage, setAlertDialogMessage] = useState("");
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [showInstallBanner, setShowInstallBanner] = useState(false);

    useEffect(() => {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            if (isMobile) { // Solo mostrar en dispositivos móviles
                setInstallPromptEvent(e);
                setShowInstallBanner(true);
                setTimeout(() => {
                    setShowInstallBanner(false);
                }, 15000);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            if (currentUser && currentUser.emailVerified) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const showAlert = (message) => {
        setAlertDialogMessage(message);
        setIsAlertDialogOpen(true);
    };

    const handleAlertDialogClose = () => {
        setIsAlertDialogOpen(false);
    };

    const handleInstallClick = () => {
        if (!installPromptEvent) return;

        installPromptEvent.prompt();
        installPromptEvent.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setInstallPromptEvent(null);
            setShowInstallBanner(false);
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <IconSpinner /> <span className="text-xl ml-4 text-gray-600 dark:text-gray-300">Cargando...</span>
            </div>
        );
    }

    return (
        <div>
            {user ? (
                <AcademicTaskManager user={user} />
            ) : (
                <LoginScreen showAlert={showAlert} />
            )}
            <CustomAlertDialog
                message={alertDialogMessage}
                isOpen={isAlertDialogOpen}
                onClose={handleAlertDialogClose}
            />
            {showInstallBanner && (
                <InstallBanner
                    onInstall={handleInstallClick}
                    onClose={() => setShowInstallBanner(false)}
                />
            )}
        </div>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
