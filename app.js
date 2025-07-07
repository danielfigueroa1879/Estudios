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
const IconBook = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/> <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/> </svg> );
const IconCalendar = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/> <line x1="16" y1="2" x2="16" y2="6"/> <line x1="8" y1="2" x2="8" y2="6"/> <line x1="3" y1="10" x2="21" y2="10"/> </svg> );
const IconPlus = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="12" y1="5" x2="12" y2="19"/> <line x1="5" y1="12" x2="19" y2="12"/> </svg> );
const IconClock = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="10"/> <polyline points="12,6 12,12 16,14"/> </svg> );
const IconMail = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/> <polyline points="22,6 12,13 2,6"/> </svg> );
const IconBell = ({ width = "22", height = "22" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/> <path d="M13.73 21a2 2 0 0 1-3.46 0"/> </svg> );
const IconAlert = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/> <line x1="12" y1="9" x2="12" y2="13"/> <line x1="12" y1="17" x2="12.01" y2="17"/> </svg> );
const IconChevronDown = ({ width = "24", height = "24" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="6,9 12,15 18,9"/> </svg> );
const IconChevronUp = ({ width = "24", height = "24" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="18,15 12,9 6,15"/> </svg> );
const IconTrash = ({ width = "18", height = "18" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="3,6 5,6 21,6"/> <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/> <line x1="10" y1="11" x2="10" y2="17"/> <line x1="14" y1="11" x2="14" y2="17"/> </svg> );
const IconCheck = ({ width = "18", height = "18" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="20,6 9,17 4,12"/> </svg> );
const IconEdit = ({ width = "18", height = "18" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/> <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/> </svg> );
const IconHamburger = ({ width = "24", height = "24" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="18" x2="21" y2="18"></line> </svg> );
const IconArrowBack = ({ width = "24", height = "24" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M19 12H5"/> <polyline points="12 19 5 12 12 5"/> </svg> );
const IconLock = ({ width = "20", height = "20" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path> </svg> );
const IconLogOut = ({ width = "22", height = "22" }) => ( <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" y1="12" x2="9" y2="12"></line> </svg> );
const IconSpinner = () => (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>);
const IconDownload = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="7 10 12 15 17 10"></polyline> <line x1="12" y1="15" x2="12" y2="3"></line> </svg> );
const IconClose = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg> );


// --- Custom Dialogs ---
const CustomAlertDialog = ({ message, isOpen, onClose }) => { if (!isOpen) return null; return ( <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"> <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-blue-500"> <IconAlert width="40" height="40" className="text-blue-500 mx-auto mb-4" /> <p className="text-lg text-gray-800 mb-6">{message}</p> <button onClick={onClose} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium" > Aceptar </button> </div> </div> ); };
const CustomConfirmDialog = ({ message, isOpen, onConfirm, onCancel }) => { if (!isOpen) return null; return ( <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"> <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-red-500"> <IconTrash width="40" height="40" className="text-red-500 mx-auto mb-4" /> <p className="text-lg text-gray-800 mb-6">{message}</p> <div className="flex space-x-4"> <button onClick={onCancel} className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition-colors text-lg font-medium" > Cancelar </button> <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium" > Confirmar </button> </div> </div> </div> ); };

// --- Login Screen Component ---
const LoginScreen = ({ showAlert }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        if (!email || !password) { showAlert('Por favor, ingresa un correo y contraseña.'); return; }
        setLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => userCredential.user.sendEmailVerification().then(() => {
                showAlert('¡Registro exitoso! Se ha enviado un correo de verificación. Por favor, revisa tu bandeja de entrada para activar tu cuenta.');
                setIsRegister(false); setEmail(''); setPassword('');
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
            <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-blue-600">
                <div className="text-center mb-8">
                    <IconBook width="48" height="48" className="mx-auto text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800 mt-4">Gestor Académico</h1>
                    <p className="text-gray-500">{isRegister ? 'Crea una nueva cuenta' : 'Bienvenido de vuelta'}</p>
                </div>
                <div className="space-y-6">
                    <div className="relative"><span className="absolute left-4 top-3.5 text-gray-400"><IconMail /></span><input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-xl px-12 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div>
                    <div className="relative"><span className="absolute left-4 top-3.5 text-gray-400"><IconLock /></span><input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl px-12 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div>
                </div>
                <div className="mt-8"><button onClick={isRegister ? handleRegister : handleLogin} disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-3.5 text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center disabled:bg-blue-400">{loading && <IconSpinner />}{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</button></div>
                <div className="text-center mt-6 flex justify-between items-center">
                    <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 hover:underline">{isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}</button>
                    {!isRegister && (<button onClick={handlePasswordReset} className="text-sm text-gray-500 hover:underline">¿Olvidaste la contraseña?</button>)}
                </div>
            </div>
        </div>
    );
};

// --- Componentes de Vista (Refactorizados) ---
const DailyTasksCardView = ({ tasks, formatDate, getTaskStatus, getTaskCardStyle, getDaysUntilDue, toggleTask, startEditing, deleteTask, handleTaskCardClick }) => {
    const groupedTasks = tasks.reduce((acc, task) => {
        const date = task.dueDate;
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
    }, {});

    return (
        <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6" id="dailyTasksSection">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 text-left mb-6">Tareas por día</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Object.entries(groupedTasks).sort().map(([date, dayTasks]) => (
                    <div key={date} className="bg-white rounded-xl shadow-lg p-2.5 sm:p-5 transition-all duration-300">
                        <h3 className="font-semibold text-xl sm:text-2xl text-gray-800 mb-2 sm:mb-3">{formatDate(date)}</h3>
                        <div className="space-y-1">
                            {dayTasks.sort((a, b) => (a.dueTime || '00:00').localeCompare(b.dueTime || '00:00')).map(task => {
                                const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                                const cardStyle = getTaskCardStyle(status, task.completed);
                                return (
                                    <div key={task.id} onClick={() => handleTaskCardClick(task)} className={`p-1.5 sm:p-3 rounded-xl border-l-8 ${cardStyle.bg} ${cardStyle.border} transition-all duration-300 cursor-pointer ${cardStyle.hoverClasses}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-1"><IconClock width="18" height="18" /><span className={`text-xs sm:text-sm px-2 py-0.5 rounded-full ${cardStyle.bg} ${cardStyle.text} font-medium`}>{task.dueTime ? `${getDaysUntilDue(task.dueDate)} - ${task.dueTime}` : getDaysUntilDue(task.dueDate)}</span></div>
                                            <button onClick={(e) => { e.stopPropagation(); toggleTask(task.id, task.completed); }} className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{task.completed && <IconCheck width="14" height="14" />}</button>
                                        </div>
                                        <div><p className="font-medium text-sm sm:text-lg text-gray-800">{task.subject}</p><p className="text-xs sm:text-base text-gray-600 mt-0.5">{task.title}</p><p className="text-xs text-gray-500 mt-1">{task.type}</p></div>
                                        <div className="flex justify-end mt-3 space-x-1">
                                            <button onClick={(e) => { e.stopPropagation(); startEditing(task); }} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded-xl transition-colors" title="Editar tarea"><IconEdit width="16" height="16" /></button>
                                            <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-xl transition-colors" title="Eliminar tarea"><IconTrash width="16" height="16" /></button>
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

const MonthlyCalendar = ({ tasks, highlightedDates, currentViewDate, setCurrentViewDate, todayGlobal, getTaskStatus, chileanHolidays, createLocalDate }) => {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const daysArray = [];
    const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
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
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', <span key="sab" className="text-red-600">Sáb</span>, <span key="dom" className="text-red-600">Dom</span>];
    const goToPreviousMonth = () => setCurrentViewDate(new Date(year, month - 1, 1));
    const goToNextMonth = () => setCurrentViewDate(new Date(year, month + 1, 1));
    const goToToday = () => setCurrentViewDate(todayGlobal);
    return (
        <div className="relative">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 text-center mb-1 sm:mb-0">{monthNames[month]} {year}</h2>
            <div className="flex justify-center space-x-1 sm:space-x-2 w-full mt-1 sm:mt-2 mb-4">
                <button onClick={goToPreviousMonth} className="px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm">←</button>
                <button onClick={goToToday} className="px-3 py-1.5 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors text-sm">Hoy</button>
                <button onClick={goToNextMonth} className="px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm">→</button>
            </div>
            <div className="grid grid-cols-7 gap-0.5 mb-1">{dayNames.map((day, index) => <div key={index} className="text-center font-semibold text-gray-600 py-1 text-sm">{day}</div>)}</div>
            <div className="grid grid-cols-7 gap-0.5">
                {daysArray.map((day, index) => {
                    if (!day) return <div key={index} className="h-14 sm:h-20 lg:h-28"></div>;
                    const dayObj = new Date(year, month, day);
                    const isToday = todayGlobal.getDate() === dayObj.getDate() && todayGlobal.getMonth() === dayObj.getMonth() && todayGlobal.getFullYear() === dayObj.getFullYear();
                    const currentDayFormatted = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    const isHoliday = chileanHolidays.includes(currentDayFormatted);
                    const highlightEntry = highlightedDates.find(h => h.date === currentDayFormatted);
                    const highlightClassesToApply = highlightEntry ? highlightEntry.classes : '';
                    const highlightBorderColorRgb = highlightEntry ? highlightEntry.borderColorRgb : '';
                    return (
                        <div key={currentDayFormatted} className={`h-14 sm:h-20 lg:h-28 border border-gray-200 p-0.5 sm:p-1 transition-all duration-300 ease-in-out ${isHoliday ? 'bg-red-50' : ''} ${isToday ? 'bg-blue-50 border-blue-500' : 'bg-white hover:bg-gray-50'} ${highlightClassesToApply.includes('ring-2') ? 'highlight-animation' : ''}`} style={highlightEntry ? { '--highlight-color': highlightClassesToApply.match(/border-([\w-]+)-(\d+)/)?.[0].replace('border-', '') || '#3b82f6', '--ring-color-rgb': highlightBorderColorRgb } : {}}>
                            <div className={`text-xs sm:text-sm font-medium ${isToday ? 'text-blue-700' : (isHoliday ? 'text-red-600' : 'text-gray-800')}`}>{day}</div>
                            <div className="mt-0.5 space-y-0.5">
                                {tasksByDate[day] && tasksByDate[day].sort((a, b) => (a.dueTime || '00:00').localeCompare(b.dueTime || '00:00')).map((task, taskIndex) => {
                                    const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                                    let bgColor = '', title = '';
                                    switch (status) { case 'overdue': bgColor = 'bg-gray-600'; title = `${task.subject} - Vencida`; break; case 'due-today': bgColor = 'bg-red-400'; title = `${task.subject} - Vence hoy`; break; case 'due-tomorrow': bgColor = 'bg-orange-400'; title = `${task.subject} - Vence mañana`; break; case 'due-soon': bgColor = 'bg-yellow-400'; title = `${task.subject} - Por vencer`; break; case 'completed': bgColor = 'bg-gray-400'; title = `${task.subject} - Completada`; break; default: bgColor = 'bg-green-400'; title = `${task.subject} - A tiempo`; }
                                    if (task.dueTime) title += ` - ${task.dueTime}`;
                                    return <div key={`${task.id}-${taskIndex}`} className={`w-full h-1.5 ${bgColor} rounded text-xs text-white text-center leading-none`} title={title}></div>;
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const CalendarView = ({ tasks, highlightedDates, currentViewDate, setCurrentViewDate, todayGlobal, getTaskStatus, chileanHolidays, createLocalDate, originTaskForCalendar, backToOriginTask }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6 relative" id="calendarSection">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 text-left">Calendario</h2>
                {originTaskForCalendar && (<button onClick={backToOriginTask} className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center z-10" title="Volver a la tarea original"><IconArrowBack width="20" height="20" /></button>)}
            </div>
            <MonthlyCalendar tasks={tasks} highlightedDates={highlightedDates} currentViewDate={currentViewDate} setCurrentViewDate={setCurrentViewDate} todayGlobal={todayGlobal} getTaskStatus={getTaskStatus} chileanHolidays={chileanHolidays} createLocalDate={createLocalDate} />
        </div>
    );
};

// --- Academic Task Manager Component ---
const AcademicTaskManager = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({ view: 'list', emailNotifications: false });

    const tasksCollectionRef = db.collection('users').doc(user.uid).collection('tasks');
    const settingsDocRef = db.collection('users').doc(user.uid).collection('settings').doc('appSettings');

    useEffect(() => {
        setLoading(true);
        const unsubscribeTasks = tasksCollectionRef.onSnapshot(snapshot => {
            const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksData);
            setLoading(false);
        }, error => { console.error("Error fetching tasks:", error); setLoading(false); });
        const unsubscribeSettings = settingsDocRef.onSnapshot(doc => { if (doc.exists) { setSettings(doc.data()); } }, error => { console.error("Error fetching settings:", error); });
        return () => { unsubscribeTasks(); unsubscribeSettings(); };
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
    
    const [newTask, setNewTask] = useState({ subject: '', title: '', description: '', dueDate: '', dueTime: '', type: 'Tarea' });
    const [editingTask, setEditingTask] = useState(null);
    
    const { view, emailNotifications } = settings;
    const setView = (newView) => setSettings(prev => ({...prev, view: newView}));
    const setEmailNotifications = (enabled) => setSettings(prev => ({...prev, emailNotifications: enabled}));

    const [notifications, setNotifications] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showColorLegend, setShowColorLegend] = useState(false);
    const [showAlerts, setShowAlerts] = useState(true);
    const [highlightedCalendarDates, setHighlightedCalendarDates] = useState([]);
    const [currentCalendarViewDate, setCurrentCalendarViewDate] = useState(new Date());
    const todayGlobal = new Date();
    const [originTaskForCalendar, setOriginTaskForCalendar] = useState(null);
    const highlightTimeoutRef = useRef(null);
    const alertHideTimeoutRef = useRef(null);

    useEffect(() => { const interval = setInterval(() => setCurrentTime(new Date()), 60000); return () => clearInterval(interval); }, []);
    
    const createLocalDate = (dateString) => { const parts = dateString.split('-').map(Number); return new Date(parts[0], parts[1] - 1, parts[2]); };
    const getTaskStatus = (dueDate, dueTime, completed) => { if (completed) return 'completed'; const now = new Date(); const todayMidnight = new Date(now); todayMidnight.setHours(0, 0, 0, 0); const dueMidnight = createLocalDate(dueDate); let dueDateTime = dueMidnight; if (dueTime) { const [hours, minutes] = dueTime.split(':').map(Number); dueDateTime = new Date(dueMidnight); dueDateTime.setHours(hours, minutes, 0, 0); } else { dueDateTime = new Date(dueMidnight); dueDateTime.setHours(23, 59, 59, 999); } if (dueDateTime < now) return 'overdue'; const diffTime = dueMidnight.getTime() - todayMidnight.getTime(); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); if (diffDays === 0) return 'due-today'; if (diffDays === 1) return 'due-tomorrow'; if (diffDays <= 3) return 'due-soon'; return 'on-time'; };
    
    const getTaskCardStyle = (status, completed) => {
        let baseStyles = {}, highlightClass = '', borderColorRgb = '0,0,0', hoverClasses = '';
        if (completed) {
            baseStyles = { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-600' };
            highlightClass = 'border-gray-500 ring-2 ring-gray-500 shadow-md';
            borderColorRgb = '107,114,128';
            hoverClasses = 'hover:border-gray-400 hover:ring-2 hover:ring-gray-400/50 hover:shadow-xl hover:shadow-gray-300/50';
        } else {
            switch (status) {
                case 'overdue':
                    baseStyles = { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-800' };
                    highlightClass = 'border-gray-600 ring-2 ring-gray-600 shadow-md';
                    borderColorRgb = '75,85,99';
                    hoverClasses = 'hover:border-gray-600 hover:ring-2 hover:ring-gray-600/50 hover:shadow-xl hover:shadow-gray-400/50';
                    break;
                case 'due-today':
                    baseStyles = { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800' };
                    highlightClass = 'border-red-500 ring-2 ring-red-500 shadow-md';
                    borderColorRgb = '239,68,68';
                    hoverClasses = 'hover:border-red-600 hover:ring-2 hover:ring-red-600/50 hover:shadow-xl hover:shadow-red-300/50';
                    break;
                case 'due-tomorrow':
                    baseStyles = { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-800' };
                    highlightClass = 'border-orange-500 ring-2 ring-orange-500 shadow-md';
                    borderColorRgb = '249,115,22';
                    hoverClasses = 'hover:border-orange-500 hover:ring-2 hover:ring-orange-500/50 hover:shadow-xl hover:shadow-orange-300/50';
                    break;
                case 'due-soon':
                    baseStyles = { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-800' };
                    highlightClass = 'border-yellow-500 ring-2 ring-yellow-500 shadow-md';
                    borderColorRgb = '245,158,11';
                    hoverClasses = 'hover:border-yellow-500 hover:ring-2 hover:ring-yellow-500/50 hover:shadow-xl hover:shadow-yellow-300/50';
                    break;
                default: // 'on-time'
                    baseStyles = { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-800' };
                    highlightClass = 'border-green-500 ring-2 ring-green-500 shadow-md';
                    borderColorRgb = '34,197,94';
                    hoverClasses = 'hover:border-green-500 hover:ring-2 hover:ring-green-500/50 hover:shadow-xl hover:shadow-green-300/50';
                    break;
            }
        }
        return { ...baseStyles, highlightClass, borderColorRgb, hoverClasses };
    };

    useEffect(() => { const checkNotifications = () => { const newNotifications = []; tasks.forEach(task => { if (!task.completed) { const status = getTaskStatus(task.dueDate, task.dueTime, task.completed); if (['due-today', 'due-tomorrow', 'overdue'].includes(status)) { let label = ''; switch (status) { case 'overdue': label = 'Vencido'; break; case 'due-today': label = 'Vence hoy'; break; case 'due-tomorrow': label = 'Vence mañana'; break; } newNotifications.push({ id: task.id, message: `${task.subject}: ${task.title} - ${label}`, type: status, dueDate: task.dueDate, timestamp: new Date() }); } } }); setNotifications(newNotifications); }; checkNotifications(); const interval = setInterval(checkNotifications, 60000); return () => clearInterval(interval); }, [tasks, currentTime]);
    useEffect(() => { if (showAlerts && notifications.length > 0) { if (alertHideTimeoutRef.current) clearTimeout(alertHideTimeoutRef.current); alertHideTimeoutRef.current = setTimeout(() => { setShowAlerts(false); alertHideTimeoutRef.current = null; }, 25000); } else if (!showAlerts && alertHideTimeoutRef.current) { clearTimeout(alertHideTimeoutRef.current); alertHideTimeoutRef.current = null; } return () => { if (alertHideTimeoutRef.current) clearTimeout(alertHideTimeoutRef.current); }; }, [showAlerts, notifications.length]);

    const addTask = () => {
        if (newTask.subject && newTask.title && newTask.dueDate) {
            tasksCollectionRef.add({ ...newTask, completed: false, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                .then(() => {
                    setNewTask({ subject: '', title: '', description: '', dueDate: '', dueTime: '', type: 'Tarea' });
                    setShowAddTask(false);
                })
                .catch(error => showAlert("Error al agregar la tarea: " + error.message));
        } else {
            showAlert('Por favor, completa los campos de Asignatura, Título y Fecha de Vencimiento.');
        }
    };

    const startEditing = (task) => { setEditingTask(task); setNewTask(task); setShowAddTask(true); setView('list'); const formElement = document.getElementById('addTaskFormSection'); if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

    const updateTask = () => {
        if (newTask.subject && newTask.title && newTask.dueDate) {
            const { id, ...taskData } = newTask;
            tasksCollectionRef.doc(editingTask.id).update(taskData)
                .then(() => {
                    setEditingTask(null);
                    setNewTask({ subject: '', title: '', description: '', dueDate: '', dueTime: '', type: 'Tarea' });
                    setShowAddTask(false);
                })
                .catch(error => showAlert("Error al actualizar la tarea: " + error.message));
        } else {
            showAlert('Por favor, completa los campos de Asignatura, Título y Fecha de Vencimiento.');
        }
    };

    const cancelEditing = () => { setEditingTask(null); setNewTask({ subject: '', title: '', description: '', dueDate: '', dueTime: '', type: 'Tarea' }); setShowAddTask(false); };
    
    const toggleTask = (id, currentCompleted) => {
        tasksCollectionRef.doc(id).update({ completed: !currentCompleted })
            .catch(error => showAlert("Error al cambiar el estado: " + error.message));
    };

    const deleteTask = (id) => {
        showConfirm('¿Estás seguro de que quieres eliminar esta tarea?', () => {
            tasksCollectionRef.doc(id).delete()
                .catch(error => showAlert("Error al eliminar la tarea: " + error.message));
            if (editingTask && editingTask.id === id) cancelEditing();
        });
    };

    const deleteAllCompleted = () => {
        const completedTasks = tasks.filter(task => task.completed);
        if (completedTasks.length === 0) {
            showAlert('No hay tareas completadas para eliminar.');
            return;
        }
        showConfirm(`¿Estás seguro de que quieres eliminar ${completedTasks.length} tarea(s) completada(s)?`, () => {
            const batch = db.batch();
            completedTasks.forEach(task => {
                batch.delete(tasksCollectionRef.doc(task.id));
            });
            batch.commit().catch(error => showAlert("Error al eliminar tareas: " + error.message));
            if (editingTask && tasks.find(t => t.id === editingTask.id)?.completed) cancelEditing();
        });
    };

    const formatDate = (dateString) => createLocalDate(dateString).toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    const formatDateTime = (dateString, timeString) => { const formattedDate = formatDate(dateString); const formattedTime = timeString || ''; return formattedTime ? `${formattedDate} a las ${formattedTime}` : formattedDate; };
    const getDaysUntilDue = (dueDate) => { const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0); const dueMidnight = createLocalDate(dueDate); const diffTime = dueMidnight.getTime() - todayMidnight.getTime(); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); if (diffDays < 0) return `${Math.abs(diffDays)} días atrasado`; if (diffDays === 0) return 'Vence hoy'; if (diffDays === 1) return 'Vence mañana'; return `${diffDays} días restantes`; };
    const animateCalendarDate = async (dateString, highlightClasses, borderColorRgb) => { if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current); setHighlightedCalendarDates([]); setHighlightedCalendarDates([{ date: dateString, classes: highlightClasses, borderColorRgb: borderColorRgb }]); highlightTimeoutRef.current = setTimeout(() => { setHighlightedCalendarDates([]); highlightTimeoutRef.current = null; }, 30000); };
    const handleAlertsClick = async () => { if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current); setHighlightedCalendarDates([]); setOriginTaskForCalendar(null); setView('calendar'); setTimeout(() => { const calendarSection = document.getElementById('calendarSection'); if (calendarSection) calendarSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); const alertDates = [...new Set(notifications.map(n => n.dueDate))].sort(); let delay = 0; for (const dateString of alertDates) { const taskForColor = tasks.find(t => t.dueDate === dateString); let highlightClasses = '', borderColorRgb = ''; if (taskForColor) { const status = getTaskStatus(taskForColor.dueDate, taskForColor.dueTime, taskForColor.completed); const style = getTaskCardStyle(status, taskForColor.completed); highlightClasses = style.highlightClass; borderColorRgb = style.borderColorRgb; } await new Promise(resolve => { highlightTimeoutRef.current = setTimeout(() => { setHighlightedCalendarDates([{ date: dateString, classes: highlightClasses, borderColorRgb: borderColorRgb }]); resolve(); }, delay); }); delay += 1500; await new Promise(resolve => { highlightTimeoutRef.current = setTimeout(() => { setHighlightedCalendarDates([]); resolve(); }, delay); }); delay += 750; } highlightTimeoutRef.current = null; };
    const handleTaskCardClick = async (task) => { if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current); setHighlightedCalendarDates([]); setOriginTaskForCalendar({ taskId: task.id, scrollY: window.scrollY }); setView('calendar'); setCurrentCalendarViewDate(createLocalDate(task.dueDate)); setTimeout(() => { const calendarSection = document.getElementById('calendarSection'); if (calendarSection) calendarSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); const status = getTaskStatus(task.dueDate, task.dueTime, task.completed); const cardStyle = getTaskCardStyle(status, task.completed); await animateCalendarDate(task.dueDate, cardStyle.highlightClass, cardStyle.borderColorRgb); };
    const backToOriginTask = () => { if (originTaskForCalendar) { setView('list'); setHighlightedCalendarDates([]); setTimeout(() => { const taskElement = document.getElementById(originTaskForCalendar.taskId); if (taskElement) taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); setOriginTaskForCalendar(null); }, 0); } };
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <IconSpinner /> <span className="text-xl ml-4 text-gray-600">Cargando tareas...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200">
            {/* Header */}
            <div className="bg-blue-700 shadow-lg w-full py-4 sm:py-4 mb-5">
                <div className="max-w-7xl mx-auto px-3 sm:px-6">
                    <div className="flex items-start sm:items-center justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center space-x-2">
                                <div className="text-white"><IconBook width="26" height="26" /></div>
                                <div>
                                    <h1 className="text-lg sm:text-3xl font-bold text-white leading-tight">GESTOR ACADÉMICO</h1>
                                    <p className="text-xs sm:text-base text-white mt-1">Usuario: <span className="font-semibold">{user.email}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-2">
                            {notifications.length > 0 && (
                                <button onClick={() => setShowAlerts(!showAlerts)} className="relative hover:bg-blue-600 p-1.5 rounded-xl transition-colors" title={showAlerts ? "Ocultar alertas" : "Mostrar alertas"}>
                                    <div className="text-white"><IconBell width="20" height="20" /></div>
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{notifications.length}</span>
                                </button>
                            )}
                            <div className="hidden sm:flex items-center space-x-0.5">
                                <div className="text-white"><IconMail width="16" height="16" /></div>
                                <button onClick={() => setEmailNotifications(!emailNotifications)} className={`w-9 h-4 rounded-full transition-colors ${emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                    <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${emailNotifications ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                            <button onClick={() => auth.signOut()} className="text-white hover:bg-blue-600 p-1.5 rounded-xl transition-colors" title="Cerrar sesión">
                                <IconLogOut width="22" height="22" />
                            </button>
                            <button onClick={() => setShowColorLegend(!showColorLegend)} className="text-white hover:bg-blue-600 p-1.5 rounded-xl transition-colors" title="Acceso Rápido a Tareas">
                                <IconHamburger width="26" height="26" />
                            </button>
                        </div>
                    </div>
                     {showColorLegend && ( <div className="mt-4 pt-3 border-t border-gray-200"> <h3 className="font-semibold text-blue-600 text-lg sm:text-xl text-left mb-3">Acceso rápido a tareas</h3> <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5"> <button onClick={() => { setView('list'); setShowColorLegend(false); setOriginTaskForCalendar(null); setTimeout(() => document.getElementById('taskListSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0); }} className="block w-full text-left p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-800 font-medium text-sm flex items-center space-x-1.5"> <IconBook width="18" height="18" /> <span>Tareas</span> </button> <button onClick={() => { setView('daily'); setShowColorLegend(false); setOriginTaskForCalendar(null); setTimeout(() => document.getElementById('dailyTasksSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0); }} className="block w-full text-left p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-800 font-medium text-sm flex items-center space-x-1.5"> <IconCalendar width="18" height="18" /> <span>Tareas por Día</span> </button> <button onClick={() => { setView('calendar'); setShowColorLegend(false); setTimeout(() => document.getElementById('calendarSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }} className="block w-full text-left p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-800 font-medium text-sm flex items-center space-x-1.5"> <IconCalendar width="20" height="20" /> <span>Calendario</span> </button> </div> </div> )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6">
                 {notifications.length > 0 && showAlerts && ( <div onClick={() => { handleAlertsClick(); if (alertHideTimeoutRef.current) clearTimeout(alertHideTimeoutRef.current); alertHideTimeoutRef.current = null; }} className="bg-orange-50 border border-orange-400 rounded-xl shadow-lg shadow-red-200 p-2 sm:p-4 mb-3 sm:mb-4 cursor-pointer transition-all duration-300 ease-in-out" style={{marginTop: '0.75rem'}} > <div className="flex items-center justify-between mb-2"> <h3 className="font-semibold text-orange-800 text-lg sm:text-xl text-left">Alertas activas</h3> <div className="text-orange-600"><IconAlert width="18" height="18" /></div> </div> <div className="flex flex-col gap-0.5"> {notifications.slice(0, 3).map((notif, index) => <p key={notif.id || index} className="text-sm text-orange-700 w-full text-left">• {notif.message}</p>)} {notifications.length > 3 && <p className="text-sm text-orange-600 w-full text-left">... y {notifications.length - 3} alertas más</p>} </div> </div> )}
                 <div id="addTaskFormSection" className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6 border border-gray-200 transition-all duration-500 hover:shadow-blue-400/60 hover:ring-2 hover:ring-blue-300/50 hover:shadow-2xl hover:border-blue-300 mt-3"> <button onClick={() => setShowAddTask(!showAddTask)} className="w-full flex items-center justify-between text-left mb-3"> <h3 className="font-semibold text-blue-600 text-lg sm:text-xl text-left">{editingTask ? 'Editar tarea' : 'Agregar nueva tarea'}</h3> {showAddTask ? <div className="text-blue-600"><IconChevronUp width="20" height="20" /></div> : <div className="text-blue-600"><IconChevronDown width="20" height="20" /></div>} </button> {showAddTask && ( <div className="space-y-3"> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"> <input type="text" placeholder="Asignatura" value={newTask.subject} onChange={(e) => setNewTask({...newTask, subject: e.target.value})} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> <input type="text" placeholder="Título de la tarea" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> <select value={newTask.type} onChange={(e) => setNewTask({...newTask, type: e.target.value})} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"> <option value="Tarea">Tarea</option> <option value="Examen">Examen</option> <option value="Recuperación de Clases">Recuperación de Clases</option> <option value="Proyecto">Proyecto</option> <option value="Monografía">Monografía</option> <option value="Informe">Informe</option> </select> <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> <input type="time" placeholder="Hora (opcional)" value={newTask.dueTime} onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> </div> <textarea placeholder="Descripción (opcional)" value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})} rows="2" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"></textarea> <div className="flex space-x-3"> <button onClick={editingTask ? updateTask : addTask} className="flex-1 bg-blue-600 text-white rounded-xl px-3 py-2.5 hover:bg-blue-700 flex items-center justify-center space-x-1.5 text-base font-medium"> {editingTask ? <><IconCheck width="18" height="18" /><span>Actualizar</span></> : <><IconPlus width="18" height="18" /><span>Agregar</span></>} </button> {editingTask && <button onClick={cancelEditing} className="flex-1 bg-gray-500 text-white rounded-xl px-3 py-2.5 hover:bg-gray-600 flex items-center justify-center space-x-1.5 text-base font-medium"><span>Cancelar</span></button>} </div> </div> )} </div>
                 <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg border-b border-blue-100 w-full py-2.5 sm:py-3.5 mt-5 mb-5 backdrop-blur-sm shadow-blue-200/50 ring-1 ring-blue-200/30 transition-all duration-500 rounded-2xl"> <div className="max-w-7xl mx-auto px-3 sm:px-6"> <h2 className="text-lg sm:text-xl font-semibold text-blue-600 text-left mb-5">Tareas</h2> <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0"> <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto"> <div className="grid grid-cols-3 gap-1.5 sm:flex sm:gap-3 w-full sm:w-auto"> <button onClick={() => { setView('list'); setOriginTaskForCalendar(null); setTimeout(() => document.getElementById('taskListSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }} className={`px-2 py-2 sm:px-6 sm:py-3 sm:w-40 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-center space-y-0.5 sm:space-y-0 sm:space-x-2 text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-md ${view === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-300' : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300'}`}><IconBook width="18" height="18" /><span className="font-medium text-center sm:text-center">Lista</span></button> <button onClick={() => { setView('daily'); setShowColorLegend(false); setTimeout(() => document.getElementById('dailyTasksSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }} className={`px-2 py-2 sm:px-6 sm:py-3 sm:w-40 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-center space-y-0.5 sm:space-y-0 sm:space-x-2 text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-md ${view === 'daily' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-300' : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300'}`}><IconCalendar width="18" height="18" /><span className="font-medium text-center sm:text-center">Por Día</span></button> <button onClick={() => { setView('calendar'); setShowColorLegend(false); setTimeout(() => document.getElementById('calendarSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }} className={`px-2 py-2 sm:px-6 sm:py-3 sm:w-40 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-center space-y-0.5 sm:space-y-0 sm:space-x-2 text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-md ${view === 'calendar' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-300' : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300'}`}><IconCalendar width="20" height="20" /><span className="font-medium text-center sm:text-center">Calendario</span></button> </div> </div> {tasks.filter(task => task.completed).length > 0 && <button onClick={deleteAllCompleted} className="px-3 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 flex items-center space-x-1.5 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-red-200"><IconTrash width="16" height="16" /><span>Eliminar Completadas ({tasks.filter(task => task.completed).length})</span></button>} </div> </div> </div>
                 <div className="border-t-4 border-gray-100 mb-2 sm:my-3"></div>
                 {view === 'list' ? ( <div id="taskListSection" className="bg-white rounded-2xl shadow-lg p-2 sm:p-6 mb-3 sm:mb-6 mt-5 sm:mt-6 space-y-4"> <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 text-left mb-3 sm:mb-6">Lista de tareas</h2> {[...tasks].sort((a, b) => { if (a.completed && !b.completed) return 1; if (!a.completed && b.completed) return -1; const dateA = new Date(`${a.dueDate}T${a.dueTime || '00:00'}`); const dateB = new Date(`${b.dueDate}T${b.dueTime || '00:00'}`); return dateA - dateB; }).map(task => { const status = getTaskStatus(task.dueDate, task.dueTime, task.completed); const cardStyle = getTaskCardStyle(status, task.completed); return ( <div key={task.id} id={task.id} onClick={(e) => { if (e.target.tagName !== 'BUTTON' && e.target.closest('button') === null) handleTaskCardClick(task); }} className={`rounded-xl shadow-lg border-l-8 p-2.5 sm:p-6 transition-all duration-300 ${cardStyle.bg} ${cardStyle.border} ${cardStyle.hoverClasses} cursor-pointer`}> <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0"> <div className="flex items-start space-x-2.5 sm:space-x-4 flex-1"> <button onClick={(e) => { e.stopPropagation(); toggleTask(task.id, task.completed); }} className={`mt-0.5 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded border-2 flex items-center justify-center flex-shrink-0 ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-gray-400'}`}>{task.completed && <IconCheck width="15" height="15" />}</button> <div className="flex-1 min-w-0"> <div className="flex flex-col sm:flex-row sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-3 mb-1.5"> <h3 className={`font-semibold text-sm sm:text-lg ${task.completed ? 'line-through text-gray-500' : status === 'overdue' ? 'line-through text-gray-700' : 'text-gray-900'}`}>{task.subject}: {task.title}</h3> <div className="flex items-center space-x-2"><span className="text-xs sm:text-sm bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded">{task.type}</span></div> </div> {task.description && <p className="text-xs sm:text-base text-gray-600 mb-1.5">{task.description}</p>} <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-5 text-xs sm:text-base text-gray-500"> <span>📅 {formatDateTime(task.dueDate, task.dueTime)}</span> <span>⏰ {getDaysUntilDue(task.dueDate)}</span> </div> </div> </div> <div className="flex items-center space-x-2.5"> <div className="w-4.5 h-4.5 sm:w-6 sm:h-6"><IconClock width="22" height="22" /></div> <button onClick={(e) => { e.stopPropagation(); startEditing(task); }} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 sm:p-3 rounded-xl transition-colors" title="Editar tarea"><div className="w-4.5 h-4.5 sm:w-6 sm:h-6"><IconEdit width="22" height="22" /></div></button> <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 sm:p-3 rounded-xl transition-colors" title="Eliminar tarea"><div className="w-4.5 h-4.5 sm:w-6 sm:h-6"><IconTrash width="22" height="22" /></div></button> </div> </div> </div> ); })} </div> ) : view === 'daily' ? ( <DailyTasksCardView tasks={tasks} formatDate={formatDate} getTaskStatus={getTaskStatus} getTaskCardStyle={getTaskCardStyle} getDaysUntilDue={getDaysUntilDue} toggleTask={toggleTask} startEditing={startEditing} deleteTask={deleteTask} handleTaskCardClick={handleTaskCardClick} /> ) : ( <CalendarView tasks={tasks} highlightedDates={highlightedCalendarDates} currentViewDate={currentCalendarViewDate} setCurrentViewDate={setCurrentCalendarViewDate} todayGlobal={todayGlobal} getTaskStatus={getTaskStatus} chileanHolidays={chileanHolidays} createLocalDate={createLocalDate} originTaskForCalendar={originTaskForCalendar} backToOriginTask={backToOriginTask} /> )}
                 <div className="mt-7 sm:mt-9 bg-white rounded-xl shadow-lg p-3 sm:p-5"> <div className="text-center text-gray-600 space-y-1.5"> <div className="border-b border-gray-200 pb-1.5"> <p className="text-sm font-semibold text-gray-800 mb-0.5">© Derechos Reservados</p> <p className="text-xs text-gray-700">Realizado por <span className="font-semibold text-blue-600">Daniel Figueroa Chacama</span></p> <p className="text-xs text-gray-600 mt-0.5">Ingeniero en Informática</p> </div> </div> </div>
            </div>

            {/* Custom Dialogs */}
            <CustomAlertDialog message={alertDialogMessage} isOpen={isAlertDialogOpen} onClose={handleAlertDialogClose} />
            <CustomConfirmDialog message={confirmDialogMessage} isOpen={isConfirmDialogOpen} onConfirm={handleConfirmDialogConfirm} onCancel={handleConfirmDialogCancel} />
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
            <style>{`
                @keyframes slide-down {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-down { animation: slide-down 0.5s ease-out forwards; }
            `}</style>
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
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <IconSpinner /> <span className="text-xl ml-4 text-gray-600">Iniciando...</span>
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
