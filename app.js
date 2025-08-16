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
const IconBook = ({ width = "20", height = "20", className }) => 
  React.createElement("svg", {
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
  React.createElement("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })
);

const IconCalendar = ({ width = "20", height = "20", className }) => 
  React.createElement("svg", {
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
  React.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
  React.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
  React.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" })
);

const IconPlus = ({ width = "20", height = "20", className }) => 
  React.createElement("svg", {
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
  React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
);

const IconClock = ({ width = "20", height = "20" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
  React.createElement("polyline", { points: "12,6 12,12 16,14" })
);

const IconMail = ({ width = "20", height = "20", className }) => 
  React.createElement("svg", {
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
  React.createElement("polyline", { points: "22,6 12,13 2,6" })
);

const IconBell = ({ width = "22", height = "22" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }),
  React.createElement("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })
);

const IconAlert = ({ width = "20", height = "20" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
  React.createElement("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
  React.createElement("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
);

const IconChevronDown = ({ width = "32", height = "32", className }) => 
  React.createElement("svg", {
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("polyline", { points: "6 9 12 15 18 9" })
);

const IconChevronUp = ({ width = "32", height = "32", className }) => 
  React.createElement("svg", {
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("polyline", { points: "18 15 12 9 6 15" })
);

const IconTrash = ({ width = "18", height = "18" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("polyline", { points: "3,6 5,6 21,6" }),
  React.createElement("path", { d: "m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" }),
  React.createElement("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
  React.createElement("line", { x1: "14", y1: "11", x2: "14", y2: "17" })
);

const IconCheck = ({ width = "18", height = "18" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("polyline", { points: "20,6 9,17 4,12" })
);

const IconEdit = ({ width = "18", height = "18" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  React.createElement("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
);

const IconHamburger = ({ width = "24", height = "24" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
  React.createElement("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  React.createElement("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
);

const IconBackArrowhead = ({ width = "32", height = "32", className, onClick, title }) => 
  React.createElement("svg", {
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
  }, 
  React.createElement("polyline", { points: "15 18 9 12 15 6" })
);

const IconLock = ({ width = "20", height = "20" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
  React.createElement("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
);

const IconLogOut = ({ width = "22", height = "22" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
  React.createElement("polyline", { points: "16 17 21 12 16 7" }),
  React.createElement("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
);

const IconSpinner = () => 
  React.createElement("svg", {
    className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, 
  React.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }),
  React.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
);

const IconDownload = ({ className }) => 
  React.createElement("svg", {
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
  }, 
  React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
  React.createElement("polyline", { points: "7 10 12 15 17 10" }),
  React.createElement("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
);

const IconClose = ({ className }) => 
  React.createElement("svg", {
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
  }, 
  React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
  React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
);

const IconEye = ({ width = "20", height = "20" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
  React.createElement("circle", { cx: "12", cy: "12", r: "3" })
);

const IconEyeOff = ({ width = "20", height = "20" }) => 
  React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" }),
  React.createElement("line", { x1: "1", y1: "1", x2: "23", y2: "23" })
);

const IconHistory = ({ width = "20", height = "20", className }) => 
  React.createElement("svg", {
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, 
  React.createElement("path", { d: "M1 4v6h6" }),
  React.createElement("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
);

// NUEVO: Icono de Google
const IconGoogle = ({ className }) => 
  React.createElement("svg", {
    className: className,
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg"
  }, 
  React.createElement("path", {
    fill: "#FFC107",
    d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
  }),
  React.createElement("path", {
    fill: "#FF3D00",
    d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
  }),
  React.createElement("path", {
    fill: "#4CAF50",
    d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.655-3.356-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"
  }),
  React.createElement("path", {
    fill: "#1976D2",
    d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,35.508,44,30.028,44,24C44,22.659,43.862,21.35,43.611,20.083z"
  })
);

// --- Custom Dialogs ---
const CustomAlertDialog = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return React.createElement("div", {
    className: "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
  },
    React.createElement("div", {
      className: "bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-blue-500"
    },
      React.createElement(IconAlert, {
        width: "40",
        height: "40",
        className: "text-blue-500 mx-auto mb-4"
      }),
      React.createElement("p", {
        className: "text-lg text-gray-800 dark:text-gray-200 mb-6"
      }, message),
      React.createElement("button", {
        onClick: onClose,
        className: "w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
      }, "Aceptar")
    )
  );
};

const CustomConfirmDialog = ({ message, isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  
  return React.createElement("div", {
    className: "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
  },
    React.createElement("div", {
      className: "bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-red-500"
    },
      React.createElement(IconTrash, {
        width: "40",
        height: "40",
        className: "text-red-500 mx-auto mb-4"
      }),
      React.createElement("p", {
        className: "text-lg text-gray-800 dark:text-gray-200 mb-6"
      }, message),
      React.createElement("div", {
        className: "flex space-x-4"
      },
        React.createElement("button", {
          onClick: onCancel,
          className: "flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-lg font-medium"
        }, "Cancelar"),
        React.createElement("button", {
          onClick: onConfirm,
          className: "flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
        }, "Confirmar")
      )
    )
  );
};

// --- Login Screen Component ---
const LoginScreen = ({ showAlert }) => {
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
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => 
        userCredential.user.sendEmailVerification()
          .then(() => {
            setRegisterSuccessMessage('¡Registro exitoso! Se ha enviado un correo de verificación. Revisa tu bandeja de entrada (o carpeta de spam) para activar tu cuenta.');
            setIsRegister(false);
            setEmail('');
            setPassword('');
            setTimeout(() => setRegisterSuccessMessage(''), 30000);
          })
      )
      .catch(error => {
        let message = "Ocurrió un error durante el registro.";
        if (error.code === 'auth/email-already-in-use') 
          message = 'El correo electrónico ya está en uso.';
        else if (error.code === 'auth/weak-password') 
          message = 'La contraseña debe tener al menos 6 caracteres.';
        else if (error.code === 'auth/invalid-email') 
          message = 'El formato del correo electrónico no es válido.';
        showAlert(message);
      })
      .finally(() => setLoading(false));
  };

  const handleLogin = () => {
    if (!email || !password) {
      showAlert('Por favor, ingresa tu correo y contraseña.');
      return;
    }
    
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => 
        userCredential.user.reload()
          .then(() => userCredential)
      )
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

  const handleGoogleLogin = () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        // Usuario logueado exitosamente
      })
      .catch(error => {
        let message = "Ocurrió un error al iniciar sesión con Google.";
        if (error.code === 'auth/account-exists-with-different-credential') {
          message = 'Ya existe una cuenta con este correo electrónico pero con un método de inicio de sesión diferente.';
        } else if (error.code === 'auth/popup-closed-by-user') {
          message = 'La ventana de inicio de sesión fue cerrada antes de completar el proceso.';
        }
        showAlert(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePasswordReset = () => {
    if (!email) {
      showAlert("Por favor, ingresa tu correo electrónico para restablecer la contraseña.");
      return;
    }
    
    setLoading(true);
    auth.sendPasswordResetEmail(email)
      .then(() => showAlert("Se ha enviado un correo para restablecer tu contraseña."))
      .catch(() => showAlert("No se pudo enviar el correo de restablecimiento. Verifica que el correo sea correcto."))
      .finally(() => setLoading(false));
  };

  return React.createElement("div", {
    className: "min-h-screen bg-blue-600 flex flex-col justify-center items-center p-4"
  },
    React.createElement("div", {
      className: "max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-8 border-t-4 border-blue-600"
    },
      registerSuccessMessage && React.createElement("div", {
        className: "bg-green-100 border-l-4 border-green-500 text-green-800 p-3 mb-4 rounded-r-lg",
        role: "alert"
      },
        React.createElement("p", { className: "font-bold text-sm" }, "¡Éxito!"),
        React.createElement("p", { className: "text-sm" }, registerSuccessMessage)
      ),
      
      React.createElement("div", {
        className: "text-center mb-4 sm:mb-8"
      },
        React.createElement(IconBook, {
          width: "40",
          height: "40",
          className: "mx-auto text-blue-600 sm:w-12 sm:h-12"
        }),
        React.createElement("h1", {
          className: "text-3xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2 sm:mt-4"
        }, "Gestor Académico"),
        React.createElement("p", {
          className: "text-lg sm:text-base text-gray-500 dark:text-gray-400"
        }, isRegister ? 'Crea una nueva cuenta' : 'Bienvenido de vuelta')
      ),

      !isRegister && React.createElement(React.Fragment, null,
        React.createElement("div", {
          className: "mb-4 sm:mb-6"
        },
          React.createElement("button", {
            onClick: handleGoogleLogin,
            disabled: loading,
            className: "w-full bg-white border border-gray-300 text-gray-700 rounded-xl py-4 sm:py-3 text-base sm:text-lg font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center disabled:bg-gray-200"
          },
            loading ? React.createElement(IconSpinner) : React.createElement(IconGoogle, {
              className: "w-6 h-6 sm:w-6 sm:h-6 mr-3 sm:mr-3"
            }),
            React.createElement("span", {
              className: "text-base sm:text-base"
            }, "Iniciar Sesión con Google")
          )
        ),
        
        React.createElement("div", {
          className: "flex items-center my-3 sm:my-6"
        },
          React.createElement("hr", {
            className: "flex-grow border-t border-gray-300 dark:border-gray-600"
          }),
          React.createElement("span", {
            className: "mx-3 sm:mx-4 text-sm sm:text-base text-gray-500 dark:text-gray-400"
          }, "o"),
          React.createElement("hr", {
            className: "flex-grow border-t border-gray-300 dark:border-gray-600"
          })
        )
      ),

      React.createElement("div", {
        className: "space-y-4 sm:space-y-6"
      },
        React.createElement("div", {
          className: "relative"
        },
          React.createElement("span", {
            className: "absolute left-4 top-4 sm:top-3.5 text-gray-400"
          }, React.createElement(IconMail)),
          React.createElement("input", {
            type: "email",
            placeholder: "Correo electrónico",
            value: email,
            onChange: e => setEmail(e.target.value),
            className: "w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl px-12 py-4 sm:py-3 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          })
        ),
        
        React.createElement("div", {
          className: "relative"
        },
          React.createElement("span", {
            className: "absolute left-4 top-4 sm:top-3.5 text-gray-400"
          }, React.createElement(IconLock)),
          React.createElement("input", {
            type: showPassword ? 'text' : 'password',
            placeholder: "Contraseña",
            value: password,
            onChange: e => setPassword(e.target.value),
            className: "w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl px-12 py-4 sm:py-3 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          }),
          React.createElement("button", {
            type: "button",
            onClick: () => setShowPassword(!showPassword),
            className: "absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          }, showPassword ? React.createElement(IconEyeOff) : React.createElement(IconEye))
        )
      ),

      React.createElement("div", {
        className: "mt-6 sm:mt-8"
      },
        React.createElement("button", {
          onClick: isRegister ? handleRegister : handleLogin,
          disabled: loading,
          className: "w-full bg-blue-600 text-white rounded-xl py-4 sm:py-3.5 text-lg sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center disabled:bg-blue-400"
        },
          loading && React.createElement(IconSpinner),
          isRegister ? 'Registrarse' : 'Iniciar Sesión'
        )
      ),

      React.createElement("div", {
        className: "text-center mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0"
      },
        React.createElement("button", {
          onClick: () => setIsRegister(!isRegister),
          className: "text-base sm:text-base text-blue-600 dark:text-blue-400 hover:underline"
        }, isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'),
        
        !isRegister && React.createElement("button", {
          onClick: handlePasswordReset,
          className: "text-sm sm:text-sm text-gray-500 dark:text-gray-400 hover:underline"
        }, "¿Olvidaste la contraseña?")
      )
    )
  );
};

// Componente simple para mostrar tareas
const SimpleTaskView = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  if (!tasks || tasks.length === 0) {
    return React.createElement("div", {
      className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
    },
      React.createElement("p", {
        className: "text-gray-500 dark:text-gray-400 mb-4"
      }, "No hay tareas pendientes"),
      React.createElement("button", {
        onClick: onAddTask,
        className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      }, "Agregar primera tarea")
    );
  }

  return React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
  },
    React.createElement("h2", {
      className: "text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4"
    }, "Mis Tareas"),
    
    React.createElement("div", {
      className: "space-y-3"
    }, 
      tasks.map(task => 
        React.createElement("div", {
          key: task.id,
          className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
        },
          React.createElement("div", {
            className: "flex items-center space-x-3"
          },
            React.createElement("button", {
              onClick: () => onToggleTask(task.id),
              className: `w-5 h-5 rounded border-2 flex items-center justify-center ${
                task.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-400 dark:border-gray-500'
              }`
            }, task.completed && React.createElement(IconCheck, { width: "14", height: "14" })),
            
            React.createElement("div", null,
              React.createElement("p", {
                className: `font-medium ${
                  task.completed 
                    ? 'text-gray-500 dark:text-gray-400 line-through' 
                    : 'text-gray-800 dark:text-gray-200'
                }`
              }, task.subject),
              React.createElement("p", {
                className: `text-sm ${
                  task.completed 
                    ? 'text-gray-400 dark:text-gray-500 line-through' 
                    : 'text-gray-600 dark:text-gray-400'
                }`
              }, task.title)
            )
          ),
          
          React.createElement("button", {
            onClick: () => onDeleteTask(task.id),
            className: "text-red-500 hover:text-red-700 p-1"
          }, React.createElement(IconTrash, { width: "16", height: "16" }))
        )
      )
    ),
    
    React.createElement("button", {
      onClick: onAddTask,
      className: "w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
    },
      React.createElement(IconPlus, { width: "18", height: "18" }),
      React.createElement("span", null, "Agregar Tarea")
    )
  );
};

// Modal simple para agregar tareas
const SimpleTaskModal = ({ isOpen, onClose, onSave }) => {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (subject && title) {
      onSave({
        subject,
        title,
        dueDate,
        completed: false,
        createdAt: new Date()
      });
      setSubject('');
      setTitle('');
      setDueDate(new Date().toISOString().split('T')[0]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  },
    React.createElement("div", {
      className: "bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md"
    },
      React.createElement("h3", {
        className: "text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
      }, "Agregar Nueva Tarea"),
      
      React.createElement("div", {
        className: "space-y-4"
      },
        React.createElement("input", {
          type: "text",
          placeholder: "Asignatura",
          value: subject,
          onChange: e => setSubject(e.target.value),
          className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
        }),
        
        React.createElement("input", {
          type: "text",
          placeholder: "Título de la tarea",
          value: title,
          onChange: e => setTitle(e.target.value),
          className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
        }),
        
        React.createElement("input", {
          type: "date",
          value: dueDate,
          onChange: e => setDueDate(e.target.value),
          className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
        })
      ),
      
      React.createElement("div", {
        className: "flex space-x-4 mt-6"
      },
        React.createElement("button", {
          onClick: onClose,
          className: "flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
        }, "Cancelar"),
        
        React.createElement("button", {
          onClick: handleSubmit,
          className: "flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        }, "Agregar")
      )
    )
  );
};

// --- Academic Task Manager Component (Versión Simplificada) ---
const AcademicTaskManager = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tasksRef = db.collection('users').doc(user.uid).collection('tasks');

  useEffect(() => {
    const unsubscribe = tasksRef.onSnapshot(
      snapshot => {
        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksData);
        setLoading(false);
      },
      error => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user.uid]);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    tasksRef.add({
      ...taskData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(error => {
      console.error("Error adding task:", error);
    });
  };

  const handleToggleTask = async (taskId) => {
    try {
      const taskRef = tasksRef.doc(taskId);
      const taskDoc = await taskRef.get();
      
      if (taskDoc.exists) {
        const taskData = taskDoc.data();
        await taskRef.update({
          completed: !taskData.completed
        });
      }
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDeleteTask = (taskId) => {
    tasksRef.doc(taskId).delete().catch(error => {
      console.error("Error deleting task:", error);
    });
  };

  if (loading) {
    return React.createElement("div", {
      className: "min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
    },
      React.createElement(IconSpinner),
      React.createElement("span", {
        className: "text-xl ml-4 text-gray-600 dark:text-gray-300"
      }, "Cargando datos...")
    );
  }

  return React.createElement("div", {
    className: "min-h-screen bg-gray-100 dark:bg-gray-900"
  },
    // Header
    React.createElement("header", {
      className: "bg-blue-700 dark:bg-gray-800 shadow-lg"
    },
      React.createElement("div", {
        className: "max-w-4xl mx-auto px-4 py-4"
      },
        React.createElement("div", {
          className: "flex items-center justify-between"
        },
          React.createElement("div", {
            className: "flex items-center space-x-3"
          },
            React.createElement(IconBook, {
              width: "32",
              height: "32",
              className: "text-white"
            }),
            React.createElement("div", null,
              React.createElement("h1", {
                className: "text-2xl font-bold text-white"
              }, "Gestor Académico"),
              React.createElement("p", {
                className: "text-blue-200 text-sm"
              }, user.email)
            )
          ),
          
          React.createElement("button", {
            onClick: () => auth.signOut(),
            className: "text-white hover:bg-blue-600 p-2 rounded-lg transition-colors"
          }, React.createElement(IconLogOut, { width: "24", height: "24" }))
        )
      )
    ),

    // Main Content
    React.createElement("main", {
      className: "max-w-4xl mx-auto px-4 py-8"
    },
      React.createElement(SimpleTaskView, {
        tasks: tasks,
        onAddTask: handleAddTask,
        onToggleTask: handleToggleTask,
        onDeleteTask: handleDeleteTask
      })
    ),

    // Modal
    React.createElement(SimpleTaskModal, {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      onSave: handleSaveTask
    })
  );
};

// --- Main App Component ---
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        if (currentUser.providerData.some(provider => provider.providerId === 'password')) {
          if (currentUser.emailVerified) {
            setUser(currentUser);
          } else {
            setUser(null);
          }
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  if (loading) {
    return React.createElement("div", {
      className: "min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
    },
      React.createElement(IconSpinner),
      React.createElement("span", {
        className: "text-xl ml-4 text-gray-600 dark:text-gray-300"
      }, "Cargando...")
    );
  }

  return React.createElement("div", null,
    user ? 
      React.createElement(AcademicTaskManager, { user: user }) : 
      React.createElement(LoginScreen, { showAlert: handleShowAlert }),
    
    React.createElement(CustomAlertDialog, {
      message: alertMessage,
      isOpen: showAlert,
      onClose: () => setShowAlert(false)
    })
  );
};

// Render the app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
