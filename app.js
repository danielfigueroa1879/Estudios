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


// --- Iconos SVG (Sin cambios) ---
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


// --- Custom Dialogs (Sin cambios) ---
const CustomAlertDialog = ({ message, isOpen, onClose }) => { if (!isOpen) return null; return ( <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"> <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-blue-500"> <IconAlert width="40" height="40" className="text-blue-500 mx-auto mb-4" /> <p className="text-lg text-gray-800 mb-6">{message}</p> <button onClick={onClose} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium" > Aceptar </button> </div> </div> ); };
const CustomConfirmDialog = ({ message, isOpen, onConfirm, onCancel }) => { if (!isOpen) return null; return ( <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"> <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-red-500"> <IconTrash width="40" height="40" className="text-red-500 mx-auto mb-4" /> <p className="text-lg text-gray-800 mb-6">{message}</p> <div className="flex space-x-4"> <button onClick={onCancel} className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition-colors text-lg font-medium" > Cancelar </button> <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium" > Confirmar </button> </div> </div> </div> ); };

// --- Login Screen Component (Sin cambios) ---
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
const DailyTasksCardView = ({ tasks, formatDate, getTaskStatus, getTaskCardStyle, getDaysUntilDue, toggleTask, startEditing, deleteTask, handleTaskCardClick }) => { /* ... */ };
const MonthlyCalendar = ({ tasks, highlightedDates, currentViewDate, setCurrentViewDate, todayGlobal, getTaskStatus, chileanHolidays, createLocalDate }) => { /* ... */ };
const CalendarView = ({ tasks, highlightedDates, currentViewDate, setCurrentViewDate, todayGlobal, getTaskStatus, chileanHolidays, createLocalDate, originTaskForCalendar, backToOriginTask }) => { /* ... */ };

// --- Academic Task Manager Component (Sin cambios) ---
const AcademicTaskManager = ({ user }) => { /* ... */ };

// --- NUEVO: Banner de Instalación ---
const InstallBanner = ({ onInstall, onClose }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
            <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm text-white rounded-2xl shadow-2xl max-w-lg mx-auto p-4 flex items-center justify-between transition-transform duration-500 transform animate-slide-up">
                <div className="flex items-center">
                    <IconBook width="40" height="40" className="mr-4 text-blue-400"/>
                    <div>
                        <h4 className="font-bold">Instalar Gestor Académico</h4>
                        <p className="text-sm text-gray-300">Accede más rápido a tus tareas.</p>
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
                @keyframes slide-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
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
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPromptEvent(e);
            setShowInstallBanner(true);
            setTimeout(() => {
                setShowInstallBanner(false);
            }, 5000); 
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

