const {
  useState,
  useEffect,
  useRef,
  Suspense,
  lazy
} = React;

// --- INSTRUCCIONES IMPORTANTES DE FIREBASE ---
// 1. Ve a https://firebase.google.com/ y crea un nuevo proyecto.
// 2. En tu proyecto de Firebase, crea una aplicación web.
// 3. Copia el objeto de configuración de Firebase y pégalo aquí abajo.
// 4. En Firebase, ve a "Authentication" -> "Sign-in method" y habilita "Email/Password" Y "Google".
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
const IconBook = ({
  width = "20",
  height = "20",
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
}), " ", /*#__PURE__*/React.createElement("path", {
  d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
}), " ");
const IconCalendar = ({
  width = "20",
  height = "20",
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "4",
  width: "18",
  height: "18",
  rx: "2",
  ry: "2"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "16",
  y1: "2",
  x2: "16",
  y2: "6"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "2",
  x2: "8",
  y2: "6"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "10",
  x2: "21",
  y2: "10"
}), " ");
const IconPlus = ({
  width = "20",
  height = "20",
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "5",
  x2: "12",
  y2: "19"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}), " ");
const IconClock = ({
  width = "20",
  height = "20"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), " ", /*#__PURE__*/React.createElement("polyline", {
  points: "12,6 12,12 16,14"
}), " ");
const IconMail = ({
  width = "20",
  height = "20",
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
}), " ", /*#__PURE__*/React.createElement("polyline", {
  points: "22,6 12,13 2,6"
}), " ");
const IconBell = ({
  width = "22",
  height = "22"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
}), " ", /*#__PURE__*/React.createElement("path", {
  d: "M13.73 21a2 2 0 0 1-3.46 0"
}), " ");
const IconAlert = ({
  width = "20",
  height = "20"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "9",
  x2: "12",
  y2: "13"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17"
}), " ");
const IconChevronDown = ({
  width = "32",
  height = "32",
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("polyline", {
  points: "6 9 12 15 18 9"
}), " ");
const IconChevronUp = ({
  width = "32",
  height = "32",
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("polyline", {
  points: "18 15 12 9 6 15"
}), " ");
const IconTrash = ({
  width = "18",
  height = "18"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("polyline", {
  points: "3,6 5,6 21,6"
}), " ", /*#__PURE__*/React.createElement("path", {
  d: "m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "10",
  y1: "11",
  x2: "10",
  y2: "17"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "14",
  y1: "11",
  x2: "14",
  y2: "17"
}), " ");
const IconCheck = ({
  width = "18",
  height = "18"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("polyline", {
  points: "20,6 9,17 4,12"
}), " ");
const IconEdit = ({
  width = "18",
  height = "18"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
}), " ", /*#__PURE__*/React.createElement("path", {
  d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
}), " ");
const IconHamburger = ({
  width = "24",
  height = "24"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "12",
  x2: "21",
  y2: "12"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "6",
  x2: "21",
  y2: "6"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "18",
  x2: "21",
  y2: "18"
}), " ");
const IconBackArrowhead = ({
  width = "32",
  height = "32",
  className,
  onClick,
  title
}) => /*#__PURE__*/React.createElement("svg", {
  onClick: onClick,
  title: title,
  className: className,
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("polyline", {
  points: "15 18 9 12 15 6"
}), " ");
const IconLock = ({
  width = "20",
  height = "20"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "11",
  width: "18",
  height: "11",
  rx: "2",
  ry: "2"
}), " ", /*#__PURE__*/React.createElement("path", {
  d: "M7 11V7a5 5 0 0 1 10 0v4"
}), " ");
const IconLogOut = ({
  width = "22",
  height = "22"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
}), " ", /*#__PURE__*/React.createElement("polyline", {
  points: "16 17 21 12 16 7"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "21",
  y1: "12",
  x2: "9",
  y2: "12"
}), " ");
const IconSpinner = () => /*#__PURE__*/React.createElement("svg", {
  className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, " ", /*#__PURE__*/React.createElement("circle", {
  className: "opacity-25",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  strokeWidth: "4"
}), " ", /*#__PURE__*/React.createElement("path", {
  className: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}), " ");
const IconDownload = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
}), " ", /*#__PURE__*/React.createElement("polyline", {
  points: "7 10 12 15 17 10"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "15",
  x2: "12",
  y2: "3"
}), " ");
const IconClose = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}), " ");
const IconEye = ({
  width = "20",
  height = "20"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
}), " ", /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), " ");
const IconEyeOff = ({
  width = "20",
  height = "20"
}) => /*#__PURE__*/React.createElement("svg", {
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
}), " ", /*#__PURE__*/React.createElement("line", {
  x1: "1",
  y1: "1",
  x2: "23",
  y2: "23"
}), " ");
const IconHistory = ({
  width = "20",
  height = "20",
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: width,
  height: height,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, " ", /*#__PURE__*/React.createElement("path", {
  d: "M1 4v6h6"
}), " ", /*#__PURE__*/React.createElement("path", {
  d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
}), " ");
// NUEVO: Icono de Google
const IconGoogle = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, " ", /*#__PURE__*/React.createElement("path", {
  fill: "#FFC107",
  d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
}), " ", /*#__PURE__*/React.createElement("path", {
  fill: "#FF3D00",
  d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
}), " ", /*#__PURE__*/React.createElement("path", {
  fill: "#4CAF50",
  d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.655-3.356-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"
}), " ", /*#__PURE__*/React.createElement("path", {
  fill: "#1976D2",
  d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,35.508,44,30.028,44,24C44,22.659,43.862,21.35,43.611,20.083z"
}), " ");

// --- Custom Dialogs ---
const CustomAlertDialog = ({
  message,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-blue-500"
  }, " ", /*#__PURE__*/React.createElement(IconAlert, {
    width: "40",
    height: "40",
    className: "text-blue-500 mx-auto mb-4"
  }), " ", /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-gray-800 dark:text-gray-200 mb-6"
  }, message), " ", /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
  }, " Aceptar "), " "), " ");
};
const CustomConfirmDialog = ({
  message,
  isOpen,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-red-500"
  }, " ", /*#__PURE__*/React.createElement(IconTrash, {
    width: "40",
    height: "40",
    className: "text-red-500 mx-auto mb-4"
  }), " ", /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-gray-800 dark:text-gray-200 mb-6"
  }, message), " ", /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-4"
  }, " ", /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    className: "flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-lg font-medium"
  }, " Cancelar "), " ", /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm,
    className: "flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
  }, " Confirmar "), " "), " "), " ");
};

// --- Login Screen Component ---
const LoginScreen = ({
  showAlert
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');
  const handleRegister = () => {
    if (!email || !password) {
      showAlert('Por favor, ingresa un correo y contraseña.');
      return;
    }
    setLoading(true);
    auth.createUserWithEmailAndPassword(email, password).then(userCredential => userCredential.user.sendEmailVerification().then(() => {
      setRegisterSuccessMessage('¡Registro exitoso! Se ha enviado un correo de verificación. Revisa tu bandeja de entrada (o carpeta de spam) para activar tu cuenta.');
      setIsRegister(false);
      setEmail('');
      setPassword('');
      setTimeout(() => setRegisterSuccessMessage(''), 30000); // Ocultar después de 30 segundos
    })).catch(error => {
      let message = "Ocurrió un error durante el registro.";
      if (error.code === 'auth/email-already-in-use') message = 'El correo electrónico ya está en uso.';else if (error.code === 'auth/weak-password') message = 'La contraseña debe tener al menos 6 caracteres.';else if (error.code === 'auth/invalid-email') message = 'El formato del correo electrónico no es válido.';
      showAlert(message);
    }).finally(() => setLoading(false));
  };
  const handleLogin = () => {
    if (!email || !password) {
      showAlert('Por favor, ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password).then(userCredential => userCredential.user.reload().then(() => userCredential)).then(() => {
      if (!auth.currentUser.emailVerified) {
        showAlert('Tu correo no ha sido verificado. Por favor, revisa tu bandeja de entrada y vuelve a iniciar sesión.');
        auth.signOut();
      }
    }).catch(error => {
      let message = 'Correo o contraseña incorrectos.';
      if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(error.code)) {
        message = 'Correo o contraseña incorrectos.';
      }
      showAlert(message);
    }).finally(() => setLoading(false));
  };

  // NUEVO: Manejador para el inicio de sesión con Google
  const handleGoogleLogin = () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
      // El usuario ha iniciado sesión correctamente.
      // No es necesario hacer nada más aquí, el onAuthStateChanged se encargará del resto.
    }).catch(error => {
      // Manejar errores aquí.
      let message = "Ocurrió un error al iniciar sesión con Google.";
      if (error.code === 'auth/account-exists-with-different-credential') {
        message = 'Ya existe una cuenta con este correo electrónico pero con un método de inicio de sesión diferente.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        message = 'La ventana de inicio de sesión fue cerrada antes de completar el proceso.';
      }
      showAlert(message);
    }).finally(() => {
      setLoading(false);
    });
  };
  const handlePasswordReset = () => {
    if (!email) {
      showAlert("Por favor, ingresa tu correo electrónico para restablecer la contraseña.");
      return;
    }
    setLoading(true);
    auth.sendPasswordResetEmail(email).then(() => showAlert("Se ha enviado un correo para restablecer tu contraseña.")).catch(() => showAlert("No se pudo enviar el correo de restablecimiento. Verifica que el correo sea correcto.")).finally(() => setLoading(false));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-blue-600 flex flex-col justify-center items-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-8 border-t-4 border-blue-600"
  }, registerSuccessMessage && /*#__PURE__*/React.createElement("div", {
    className: "bg-green-100 border-l-4 border-green-500 text-green-800 p-3 mb-4 rounded-r-lg",
    role: "alert"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-sm"
  }, "\xA1\xC9xito!"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, registerSuccessMessage)), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-4 sm:mb-8"
  }, /*#__PURE__*/React.createElement(IconBook, {
    width: "40",
    height: "40",
    className: "mx-auto text-blue-600 sm:w-12 sm:h-12"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2 sm:mt-4"
  }, "Gestor Acad\xE9mico"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg sm:text-base text-gray-500 dark:text-gray-400"
  }, isRegister ? 'Crea una nueva cuenta' : 'Bienvenido de vuelta')), !isRegister && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 sm:mb-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleGoogleLogin,
    disabled: loading,
    className: "w-full bg-white border border-gray-300 text-gray-700 rounded-xl py-4 sm:py-3 text-base sm:text-lg font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center disabled:bg-gray-200"
  }, loading ? /*#__PURE__*/React.createElement(IconSpinner, null) : /*#__PURE__*/React.createElement(IconGoogle, {
    className: "w-6 h-6 sm:w-6 sm:h-6 mr-3 sm:mr-3"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-base sm:text-base"
  }, "Iniciar Sesi\xF3n con Google"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center my-3 sm:my-6"
  }, /*#__PURE__*/React.createElement("hr", {
    className: "flex-grow border-t border-gray-300 dark:border-gray-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mx-3 sm:mx-4 text-sm sm:text-base text-gray-500 dark:text-gray-400"
  }, "o"), /*#__PURE__*/React.createElement("hr", {
    className: "flex-grow border-t border-gray-300 dark:border-gray-600"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 sm:space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute left-4 top-4 sm:top-3.5 text-gray-400"
  }, /*#__PURE__*/React.createElement(IconMail, null)), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "Correo electr\xF3nico",
    value: email,
    onChange: e => setEmail(e.target.value),
    className: "w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl px-12 py-4 sm:py-3 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute left-4 top-4 sm:top-3.5 text-gray-400"
  }, /*#__PURE__*/React.createElement(IconLock, null)), /*#__PURE__*/React.createElement("input", {
    type: showPassword ? 'text' : 'password',
    placeholder: "Contrase\xF1a",
    value: password,
    onChange: e => setPassword(e.target.value),
    className: "w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl px-12 py-4 sm:py-3 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowPassword(!showPassword),
    className: "absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
  }, showPassword ? /*#__PURE__*/React.createElement(IconEyeOff, null) : /*#__PURE__*/React.createElement(IconEye, null)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 sm:mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: isRegister ? handleRegister : handleLogin,
    disabled: loading,
    className: "w-full bg-blue-600 text-white rounded-xl py-4 sm:py-3.5 text-lg sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center disabled:bg-blue-400"
  }, loading && /*#__PURE__*/React.createElement(IconSpinner, null), isRegister ? 'Registrarse' : 'Iniciar Sesión')), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsRegister(!isRegister),
    className: "text-base sm:text-base text-blue-600 dark:text-blue-400 hover:underline"
  }, isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'), !isRegister && /*#__PURE__*/React.createElement("button", {
    onClick: handlePasswordReset,
    className: "text-sm sm:text-sm text-gray-500 dark:text-gray-400 hover:underline"
  }, "\xBFOlvidaste la contrase\xF1a?"))));
};

// --- Componentes de Vista (Refactorizados) ---
const DailyTasksCardView = ({
  tasks,
  formatDate,
  getTaskStatus,
  getTaskCardStyle,
  getDaysUntilDue,
  toggleTask,
  startEditing,
  deleteTask,
  handleTaskCardClick,
  onBackToList
}) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    const date = task.dueDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 text-left"
  }, "Tareas por d\xEDa"), /*#__PURE__*/React.createElement(IconBackArrowhead, {
    onClick: onBackToList,
    className: "text-red-500 cursor-pointer hover:text-red-700 transition-colors",
    title: "Volver a la lista"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
  }, Object.entries(groupedTasks).sort().map(([date, dayTasks]) => /*#__PURE__*/React.createElement("div", {
    key: date,
    className: "bg-white dark:bg-gray-700/50 rounded-xl shadow-lg p-2.5 sm:p-5 transition-all duration-300"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-xl sm:text-2xl text-gray-800 dark:text-gray-200 mb-2 sm:mb-3"
  }, formatDate(date)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, dayTasks.sort((a, b) => (a.dueTime || '00:00').localeCompare(b.dueTime || '00:00')).map(task => {
    const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
    const cardStyle = getTaskCardStyle(status, task.completed);
    return /*#__PURE__*/React.createElement("div", {
      key: task.id,
      onClick: e => handleTaskCardClick(task, e),
      className: `p-1.5 sm:p-3 rounded-xl border-l-8 ${cardStyle.bg} ${cardStyle.border} transition-all duration-300 cursor-pointer ${cardStyle.hoverClasses}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1"
    }, /*#__PURE__*/React.createElement(IconClock, {
      width: "18",
      height: "18",
      className: "text-gray-600 dark:text-gray-300"
    }), " ", /*#__PURE__*/React.createElement("span", {
      className: `text-xs sm:text-sm px-2 py-0.5 rounded-full ${cardStyle.bg} ${cardStyle.text} font-medium`
    }, task.dueTime ? `${getDaysUntilDue(task.dueDate)} - ${task.dueTime}` : getDaysUntilDue(task.dueDate))), " ", /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        toggleTask(task.id, task.completed);
      },
      className: `w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-400 dark:border-gray-500'}`
    }, task.completed && /*#__PURE__*/React.createElement(IconCheck, {
      width: "14",
      height: "14"
    }))), " ", /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-medium text-sm sm:text-lg text-gray-800 dark:text-gray-100"
    }, task.subject), " ", /*#__PURE__*/React.createElement("p", {
      className: "text-xs sm:text-base text-gray-600 dark:text-gray-300 mt-0.5"
    }, task.title), " ", /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 dark:text-gray-400 mt-1"
    }, task.type)), " ", /*#__PURE__*/React.createElement("div", {
      className: "flex justify-end mt-3 space-x-1"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        startEditing(task);
      },
      className: "text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 p-1 rounded-xl transition-colors",
      title: "Editar tarea"
    }, /*#__PURE__*/React.createElement(IconEdit, {
      width: "16",
      height: "16"
    })), " ", /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        deleteTask(task.id);
      },
      className: "text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 p-1 rounded-xl transition-colors",
      title: "Eliminar tarea"
    }, /*#__PURE__*/React.createElement(IconTrash, {
      width: "16",
      height: "16"
    }))));
  }))))));
};

const AcademicTaskManager = ({
  user
}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list' o 'calendar'
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [alertDialogMessage, setAlertDialogMessage] = useState('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState('');
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [highlightedDate, setHighlightedDate] = useState(null);
  const [currentViewDate, setCurrentViewDate] = useState(todayGlobal);
  const [chileanHolidays, setChileanHolidays] = useState([]);
  const academicHistoryRef = useRef(null);
  const profileMenuRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const todayGlobal = new Date();
  todayGlobal.setHours(0, 0, 0, 0);
  const isMobile = window.innerWidth <= 768;
  const formatDate = dateString => {
    const date = createLocalDate(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-CL', options);
  };
  const formatTime = timeString => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getDaysUntilDue = dueDate => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = createLocalDate(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays > 1) return `En ${diffDays} días`;
    if (diffDays === -1) return 'Ayer';
    if (diffDays < -1) return `Hace ${Math.abs(diffDays)} días`;
    return 'Sin fecha';
  };
  const getTaskStatus = (dueDate, dueTime, completed) => {
    if (completed) return 'completed';
    if (!dueDate) return 'no-due-date';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = createLocalDate(dueDate);
    const now = new Date();
    if (due.getTime() < today.getTime()) return 'overdue';
    if (due.getTime() === today.getTime()) {
      if (dueTime) {
        const [dueHour, dueMinute] = dueTime.split(':').map(Number);
        const dueDateTime = new Date();
        dueDateTime.setHours(dueHour, dueMinute, 0, 0);
        if (dueDateTime.getTime() < now.getTime()) return 'overdue';
        const diffInMinutes = (dueDateTime.getTime() - now.getTime()) / (1000 * 60);
        if (diffInMinutes <= 60) return 'due-soon';
      }
      return 'due-soon';
    }
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 3) return 'upcoming';
    return 'default';
  };
  const getTaskCardStyle = (status, completed) => {
    if (completed) {
      return {
        bg: 'bg-green-50 dark:bg-green-900/30',
        border: 'border-green-500',
        text: 'text-green-700 dark:text-green-300',
        hoverClasses: 'hover:bg-green-100 dark:hover:bg-green-900/50'
      };
    }
    switch (status) {
      case 'overdue':
        return {
          bg: 'bg-red-50 dark:bg-red-900/30',
          border: 'border-red-500',
          text: 'text-red-700 dark:text-red-300',
          hoverClasses: 'hover:bg-red-100 dark:hover:bg-red-900/50'
        };
      case 'due-soon':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/30',
          border: 'border-yellow-500',
          text: 'text-yellow-700 dark:text-yellow-300',
          hoverClasses: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/50'
        };
      case 'upcoming':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30',
          border: 'border-blue-500',
          text: 'text-blue-700 dark:text-blue-300',
          hoverClasses: 'hover:bg-blue-100 dark:hover:bg-blue-900/50'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-700/50',
          border: 'border-gray-300 dark:border-gray-600',
          text: 'text-gray-700 dark:text-gray-300',
          hoverClasses: 'hover:bg-gray-100 dark:hover:bg-gray-700'
        };
    }
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };
  const showAlert = (message) => {
    setAlertDialogMessage(message);
    setIsAlertDialogOpen(true);
  };
  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen(false);
  };
  const showConfirmDialog = (message, onConfirm) => {
    setConfirmDialogMessage(message);
    setConfirmAction(() => onConfirm);
    setIsConfirmDialogOpen(true);
  };
  const handleConfirmDialogClose = () => {
    setIsConfirmDialogOpen(false);
    setConfirmAction(null);
  };
  const [confirmAction, setConfirmAction] = useState(null);
  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    handleConfirmDialogClose();
  };
  const fetchTasks = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const tasksCollection = await db.collection('tasks').where('userId', '==', user.uid).orderBy('createdAt', 'desc').get();
      const fetchedTasks = tasksCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(fetchedTasks);
    } catch (e) {
      console.error("Error fetching tasks: ", e);
      setError("No se pudieron cargar las tareas.");
    } finally {
      setLoading(false);
    }
  };
  const addTask = async (taskData) => {
    if (!user) return;
    try {
      await db.collection('tasks').add({
        ...taskData,
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      fetchTasks();
    } catch (e) {
      console.error("Error adding document: ", e);
      showAlert("No se pudo agregar la tarea.");
    }
  };
  const updateTask = async (id, taskData) => {
    try {
      await db.collection('tasks').doc(id).update(taskData);
      fetchTasks();
    } catch (e) {
      console.error("Error updating document: ", e);
      showAlert("No se pudo actualizar la tarea.");
    }
  };
  const toggleTask = async (id, completed) => {
    try {
      await db.collection('tasks').doc(id).update({
        completed: !completed
      });
      fetchTasks();
    } catch (e) {
      console.error("Error toggling task status: ", e);
      showAlert("No se pudo actualizar el estado de la tarea.");
    }
  };
  const deleteTask = (id) => {
    showConfirmDialog("¿Estás seguro de que quieres eliminar esta tarea?", () => {
      const deleteTaskAction = async () => {
        try {
          await db.collection('tasks').doc(id).delete();
          fetchTasks();
        } catch (e) {
          console.error("Error removing document: ", e);
          showAlert("No se pudo eliminar la tarea.");
        }
      };
      deleteTaskAction();
    });
  };
  const logout = () => {
    auth.signOut();
  };
  const startEditing = task => {
    setEditingTask(task);
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };
  const handleTaskCardClick = (task) => {
    setSelectedTask(task);
  };
  const handleTaskDetailClose = () => {
    setSelectedTask(null);
  };
  const createLocalDate = dateString => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  };
  const fetchChileanHolidays = async () => {
    try {
      const response = await fetch('https://apis.digital.gob.cl/fl/feriados/2025');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const holidayDates = data.map(holiday => holiday.fecha);
      setChileanHolidays(holidayDates);
    } catch (error) {
      console.error("Error fetching Chilean holidays:", error);
    }
  };
  const isChileanHoliday = date => {
    const formattedDate = date.toISOString().split('T')[0];
    return chileanHolidays.includes(formattedDate);
  };
  const getDayClass = (day) => {
    if (day === null) {
      return "w-full aspect-square";
    }
    const date = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isToday = date.getTime() === today.getTime();
    const isHoliday = isChileanHoliday(date);
    const hasTask = tasks.some(task => {
      const taskDate = createLocalDate(task.dueDate);
      return taskDate.getFullYear() === date.getFullYear() && taskDate.getMonth() === date.getMonth() && taskDate.getDate() === date.getDate();
    });
    const isHighlighted = highlightedDate && date.getDate() === highlightedDate.getDate() && date.getMonth() === highlightedDate.getMonth() && date.getFullYear() === highlightedDate.getFullYear();
    let classes = `w-full aspect-square rounded-lg flex flex-col justify-between items-start text-xs sm:text-sm font-semibold p-1 sm:p-2 transition-all duration-200 cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 relative`;
    if (isHighlighted) {
      classes += ' bg-blue-100 dark:bg-blue-800/50 scale-105';
    } else if (isToday) {
      classes += ' bg-blue-500 text-white shadow-md';
    }
    if (isHoliday) {
      classes += ' font-bold text-red-500';
    }
    if (hasTask) {
      classes += ' border border-dashed border-blue-500 dark:border-blue-400';
    }
    return classes;
  };
  const handleViewChange = newView => {
    setCurrentView(newView);
    if (newView === 'list') {
      setHighlightedDate(null);
      setCurrentViewDate(todayGlobal);
    } else {
      setHighlightedDate(null);
      setCurrentViewDate(todayGlobal);
    }
  };
  const handleDayDoubleClick = day => {
    if (day) {
      const selectedDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), day);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dayOfMonth = String(selectedDate.getDate()).padStart(2, '0');
      setEditingTask({
        dueDate: `${year}-${month}-${dayOfMonth}`
      });
      setIsFormOpen(true);
    }
  };
  const handleInstallClick = () => {
    if (!pwaInstallPrompt) return;
    pwaInstallPrompt.prompt();
    pwaInstallPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setPwaInstallPrompt(null);
      setShowInstallBanner(false);
    });
  };
  useEffect(() => {
    if (!user) return;
    fetchTasks();
  }, [user]);
  useEffect(() => {
    const handleOutsideClick = event => {
      if (isProfileMenuOpen && profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (isHamburgerOpen && hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target)) {
        setIsHamburgerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isProfileMenuOpen, isHamburgerOpen]);
  useEffect(() => {
    fetchChileanHolidays();
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      setPwaInstallPrompt(e);
      setShowInstallBanner(true);
    });
  }, []);
  const visibleTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const isTaskFormVisible = isFormOpen;
  const isTaskDetailVisible = selectedTask !== null;
  const isListVisible = currentView === 'list' && !isTaskFormVisible && !isTaskDetailVisible;
  const isCalendarVisible = currentView === 'calendar' && !isTaskFormVisible && !isTaskDetailVisible;
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-100 dark:bg-gray-900 min-h-screen relative"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 lg:px-8 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-4 sm:mr-6"
  }, /*#__PURE__*/React.createElement(IconBook, {
    width: "32",
    height: "32",
    className: "text-blue-600"
  })), " ", /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:block"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleViewChange('list'),
    className: `py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isListVisible ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`
  }, "Lista de Tareas")), " ", isMobile && /*#__PURE__*/React.createElement("div", {
    className: "sm:hidden relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsHamburgerOpen(!isHamburgerOpen),
    className: "py-2 px-3 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
  }, "Men\xFA"), " ", isHamburgerOpen && /*#__PURE__*/React.createElement("div", {
    ref: hamburgerMenuRef,
    className: "absolute left-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      handleViewChange('list');
      setIsHamburgerOpen(false);
    },
    className: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
  }, "Lista de Tareas"), " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      handleViewChange('calendar');
      setIsHamburgerOpen(false);
    },
    className: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
  }, "Calendario"), " ", /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-200 dark:border-gray-700 my-1"
  }), " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      logout();
      setIsHamburgerOpen(false);
    },
    className: "block px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 w-full text-left"
  }, "Cerrar Sesi\xF3n")))), " ", /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium mr-2 hidden sm:block"
  }, user.email), " ", /*#__PURE__*/React.createElement("div", {
    className: "relative",
    ref: profileMenuRef
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsProfileMenuOpen(!isProfileMenuOpen),
    className: "w-8 h-8 rounded-full overflow-hidden border-2 border-blue-600 dark:border-blue-400 focus:outline-none focus:border-blue-700 transition"
  }, user.photoURL ? /*#__PURE__*/React.createElement("img", {
    src: user.photoURL,
    alt: "Profile",
    className: "w-full h-full object-cover"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full bg-blue-600 flex items-center justify-center text-white"
  }, user.email.charAt(0).toUpperCase())), " ", isProfileMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold"
  }, "Cuenta"), /*#__PURE__*/React.createElement("p", null, user.email)), " ", /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-200 dark:border-gray-700 my-1"
  }), " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      logout();
      setIsProfileMenuOpen(false);
    },
    className: "block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50"
  }, /*#__PURE__*/React.createElement(IconLogOut, {
    width: "18",
    height: "18",
    className: "inline-block mr-2"
  }), " Cerrar Sesi\xF3n"))))))), /*#__PURE__*/React.createElement("main", {
    className: "container mx-auto p-4 sm:p-6 lg:p-8"
  }, error && /*#__PURE__*/React.createElement("div", {
    className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block sm:inline"
  }, " ", error, " ")), " ", isListVisible && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100"
  }, getGreeting()), " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsFormOpen(true),
    className: "bg-blue-600 text-white rounded-full p-2.5 shadow-lg hover:bg-blue-700 transition-colors"
  }, /*#__PURE__*/React.createElement(IconPlus, {
    width: "28",
    height: "28",
    className: "text-white"
  }))), " ", visibleTasks.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, visibleTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(task => {
    const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
    const cardStyle = getTaskCardStyle(status, task.completed);
    return /*#__PURE__*/React.createElement("div", {
      key: task.id,
      onClick: () => handleTaskCardClick(task),
      className: `bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 cursor-pointer transform transition-all duration-200 ${cardStyle.hoverClasses} border-l-8 ${cardStyle.border}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement(IconClock, {
      className: "text-gray-500 dark:text-gray-400",
      width: "20",
      height: "20"
    }), " ", /*#__PURE__*/React.createElement("span", {
      className: `text-sm sm:text-base font-semibold ${cardStyle.text}`
    }, task.dueTime ? `${getDaysUntilDue(task.dueDate)} - ${task.dueTime}` : getDaysUntilDue(task.dueDate))), " ", /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        toggleTask(task.id, task.completed);
      },
      className: `w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-400 dark:border-gray-500'}`
    }, task.completed && /*#__PURE__*/React.createElement(IconCheck, {
      width: "18",
      height: "18"
    }))), " ", /*#__PURE__*/React.createElement("h2", {
      className: "text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100"
    }, task.subject), " ", /*#__PURE__*/React.createElement("p", {
      className: "text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1"
    }, task.title), " ", /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 dark:text-gray-400 mt-2"
    }, task.type));
  })), " ", visibleTasks.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 dark:text-gray-400 text-lg"
  }, "No tienes tareas pendientes."), " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsFormOpen(true),
    className: "mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
  }, "Crear nueva tarea")), " ", completedTasks.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between cursor-pointer",
    onClick: () => academicHistoryRef.current.classList.toggle('hidden')
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100"
  }, "Historial (", completedTasks.length, ")"), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 dark:text-gray-400 text-xs"
  }, "Mostrar / Ocultar"), " ", /*#__PURE__*/React.createElement(IconHistory, {
    className: "text-gray-500 dark:text-gray-400"
  })), " ", /*#__PURE__*/React.createElement("div", {
    ref: academicHistoryRef,
    className: "hidden mt-4 space-y-4"
  }, completedTasks.map(task => {
    const cardStyle = getTaskCardStyle('completed', true);
    return /*#__PURE__*/React.createElement("div", {
      key: task.id,
      onClick: () => handleTaskCardClick(task),
      className: `bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 cursor-pointer opacity-70 transition-all duration-200 ${cardStyle.hoverClasses} border-l-8 ${cardStyle.border}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement(IconCheck, {
      className: "text-green-500",
      width: "20",
      height: "20"
    }), " ", /*#__PURE__*/React.createElement("span", {
      className: `text-sm sm:text-base font-semibold ${cardStyle.text}`
    }, "Completada el", " ", formatDate(task.updatedAt ? task.updatedAt.toDate() : task.createdAt.toDate()))), " ", /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        toggleTask(task.id, task.completed);
      },
      className: `text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 p-1 rounded-xl transition-colors`,
      title: "Marcar como incompleta"
    }, /*#__PURE__*/React.createElement(IconClock, {
      width: "18",
      height: "18"
    })), " ", /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        deleteTask(task.id);
      },
      className: `text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 p-1 rounded-xl transition-colors`,
      title: "Eliminar tarea"
    }, /*#__PURE__*/React.createElement(IconTrash, {
      width: "18",
      height: "18"
    })))), " ", /*#__PURE__*/React.createElement("h2", {
      className: "text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100"
    }, task.subject), " ", /*#__PURE__*/React.createElement("p", {
      className: "text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1"
    }, task.title), " ", /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 dark:text-gray-400 mt-2"
    }, task.type));
  })))), " ", isTaskFormVisible && /*#__PURE__*/React.createElement(TaskForm, {
    taskToEdit: editingTask,
    onClose: handleFormClose,
    onSave: editingTask ? updateTask : addTask
  }), " ", isTaskDetailVisible && /*#__PURE__*/React.createElement(TaskDetail, {
    task: selectedTask,
    onClose: handleTaskDetailClose,
    onEdit: startEditing,
    onDelete: deleteTask,
    onToggle: toggleTask
  })));
};
const TaskForm = ({
  taskToEdit,
  onClose,
  onSave
}) => {
  const [subject, setSubject] = useState(taskToEdit?.subject || '');
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [type, setType] = useState(taskToEdit?.type || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || '');
  const [dueTime, setDueTime] = useState(taskToEdit?.dueTime || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSave = async e => {
    e.preventDefault();
    if (!subject.trim() || !title.trim() || !type.trim()) {
      setError("Materia, título y tipo son campos obligatorios.");
      return;
    }
    setLoading(true);
    await onSave(taskToEdit ? taskToEdit.id : null, {
      subject,
      title,
      type,
      description,
      dueDate,
      dueTime,
      completed: taskToEdit?.completed || false,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    setLoading(false);
    onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full relative"
  }, " ", /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
  }, /*#__PURE__*/React.createElement(IconClose, null)), " ", /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6"
  }, taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'), " ", error && /*#__PURE__*/React.createElement("div", {
    className: "bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-r-lg",
    role: "alert"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, error)), " ", /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSave,
    className: "space-y-4"
  }, " ", /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
  }, "Materia*"), " ", /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: subject,
    onChange: e => setSubject(e.target.value),
    placeholder: "Ej: Matem\xE1ticas",
    className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
    required: true
  })), " ", /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
  }, "T\xEDtulo*"), " ", /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: title,
    onChange: e => setTitle(e.target.value),
    placeholder: "Ej: Entrega de informe",
    className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
    required: true
  })), " ", /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
  }, "Tipo*"), " ", /*#__PURE__*/React.createElement("select", {
    value: type,
    onChange: e => setType(e.target.value),
    className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecciona un tipo"), /*#__PURE__*/React.createElement("option", {
    value: "Tarea"
  }, "Tarea"), /*#__PURE__*/React.createElement("option", {
    value: "Prueba"
  }, "Prueba"), /*#__PURE__*/React.createElement("option", {
    value: "Proyecto"
  }, "Proyecto"), /*#__PURE__*/React.createElement("option", {
    value: "Examen"
  }, "Examen"), /*#__PURE__*/React.createElement("option", {
    value: "Otro"
  }, "Otro"))), " ", /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
  }, "Descripci\xF3n (opcional)"), " ", /*#__PURE__*/React.createElement("textarea", {
    value: description,
    onChange: e => setDescription(e.target.value),
    placeholder: "Detalles adicionales de la tarea...",
    className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
    rows: "3"
  })), " ", /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1/2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
  }, "Fecha de entrega"), " ", /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dueDate,
    onChange: e => setDueDate(e.target.value),
    className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
  })), " ", /*#__PURE__*/React.createElement("div", {
    className: "w-1/2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
  }, "Hora (opcional)"), " ", /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: dueTime,
    onChange: e => setDueTime(e.target.value),
    className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
  }))), " ", /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: loading,
    className: "w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-blue-400"
  }, loading && /*#__PURE__*/React.createElement(IconSpinner, null), " ", " ", taskToEdit ? 'Guardar Cambios' : 'Crear Tarea'))));
};
const TaskDetail = ({
  task,
  onClose,
  onEdit,
  onDelete,
  onToggle
}) => {
  if (!task) return null;
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-CL', options);
  };
  const formatTime = timeString => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full relative border-t-4 border-blue-500"
  }, " ", /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
  }, /*#__PURE__*/React.createElement(IconClose, null)), " ", /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, " ", /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-medium px-2 py-1 rounded-full ${task.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} dark:bg-gray-700 dark:text-gray-200`
  }, task.type), " ", /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2"
  }, task.subject), " ", /*#__PURE__*/React.createElement("p", {
    className: "text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-1"
  }, task.title), " "), " ", /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-gray-700 dark:text-gray-300"
  }, " ", task.dueDate && /*#__PURE__*/React.createElement("p", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    className: "mr-2 text-blue-500",
    width: "20",
    height: "20"
  }), " ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Fecha de entrega:"), " ", formatDate(task.dueDate)), " ", task.dueTime && /*#__PURE__*/React.createElement("p", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement(IconClock, {
    className: "mr-2 text-blue-500",
    width: "20",
    height: "20"
  }), " ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Hora:"), " ", formatTime(task.dueTime)), " ", task.description && /*#__PURE__*/React.createElement("p", {
    className: "flex"
  }, /*#__PURE__*/React.createElement(IconBook, {
    className: "mr-2 mt-1 text-blue-500",
    width: "20",
    height: "20"
  }), " ", /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold block mb-1"
  }, "Descripci\xF3n:"), " ", /*#__PURE__*/React.createElement("span", {
    className: "block text-sm sm:text-base"
  }, task.description))), " ", /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 mt-6"
  }, " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onEdit(task);
    },
    className: "text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 p-2 rounded-xl transition-colors",
    title: "Editar tarea"
  }, /*#__PURE__*/React.createElement(IconEdit, {
    width: "20",
    height: "20"
  })), " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onDelete(task.id);
      onClose();
    },
    className: "text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 p-2 rounded-xl transition-colors",
    title: "Eliminar tarea"
  }, /*#__PURE__*/React.createElement(IconTrash, {
    width: "20",
    height: "20"
  })), " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onToggle(task.id, task.completed);
      onClose();
    },
    className: `py-2 px-4 rounded-xl font-semibold transition-colors ${task.completed ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-green-500 text-white hover:bg-green-600'}`
  }, task.completed ? 'Marcar como incompleta' : 'Marcar como completada'))));
};
const InstallBanner = ({
  onInstall,
  onClose
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 flex items-center justify-between z-50 animate-slideUp"
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, " ", /*#__PURE__*/React.createElement(IconDownload, {
    className: "text-blue-500 mr-3"
  }), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-700 dark:text-gray-200"
  }, "Instala la aplicaci\xF3n para acceso r\xE1pido.")), " ", /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-2"
  }, " ", /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
  }, /*#__PURE__*/React.createElement(IconClose, null)), " ", /*#__PURE__*/React.createElement("button", {
    onClick: onInstall,
    className: "bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
  }, "Instalar")));
};
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [alertDialogMessage, setAlertDialogMessage] = useState('');
  const [pwaInstallPrompt, setInstallPromptEvent] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const showAlert = (message) => {
    setAlertDialogMessage(message);
    setIsAlertDialogOpen(true);
  };
  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      setInstallPromptEvent(e);
      setShowInstallBanner(true);
    });
  }, []);
  const handleInstallClick = () => {
    if (!pwaInstallPrompt) return;
    pwaInstallPrompt.prompt();
    installPromptEvent.userChoice.then(choiceResult => {
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
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(IconSpinner, null), " ", /*#__PURE__*/React.createElement("span", {
      className: "text-xl ml-4 text-gray-600 dark:text-gray-300"
    }, "Cargando..."));
  }
  return /*#__PURE__*/React.createElement("div", null, user ? /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement(AcademicTaskManager, {
    user: user
  })) : /*#__PURE__*/React.createElement(LoginScreen, {
    showAlert: showAlert
  }), /*#__PURE__*/React.createElement(CustomAlertDialog, {
    message: alertDialogMessage,
    isOpen: isAlertDialogOpen,
    onClose: handleAlertDialogClose
  }), showInstallBanner && /*#__PURE__*/React.createElement(InstallBanner, {
    onInstall: handleInstallClick,
    onClose: () => setShowInstallBanner(false)
  }));
};
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render( /*#__PURE__*/React.createElement(App, null));
