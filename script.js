// Handle date click specifically
    const handleDateClick = async (task, e) => {
        e.stopPropagation();
        if (highlightTimeoutRef.current) {
            clearTimeout(highlightTimeoutRef.current);
            highlightTimeoutRef.current = null;
        }
        setHighlightedCalendarDates([]);

        setOriginTaskForCalendar({ taskId: task.id, scrollY: window.scrollY });
        setView('calendar');
        setCurrentCalendarViewDate(createLocalDate(task.dueDate));

        setTimeout(() => {
            const calendarSection = document.getElementById('calendarSection');
            if (calendarSection) {
                calendarSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);

        const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
        const cardStyle = getTaskCardStyle(status, task.completed);
        
        // Animate calendar date
        setHighlightedCalendarDates([{ date: task.dueDate, classes: cardStyle.highlightClass, borderColorRgb: cardStyle.borderColorRgb }]);
        highlightTimeoutRef.current = setTimeout(() => {
            setHighlightedCalendarDates([]);
            highlightTimeoutRef.current = null;
        }, 30000);
    };

    // Function to go back to original task in list view
    const backToOriginTask = () => {
        if (originTaskForCalendar) {
            setView('list');
            setHighlightedCalendarDates([]);
            
            setTimeout(() => {
                const taskElement = document.getElementById(originTaskForCalendar.taskId);
                if (taskElement) {
                    taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                setOriginTaskForCalendar(null);
            }, 0);
        }
    };

    // Simulate automatic notifications considering time
    useEffect(() => {
        const checkNotifications = () => {
            const newNotifications = [];
            tasks.forEach(task => {
                if (!task.completed) {
                    const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                    if (status === 'due-today' || status === 'due-tomorrow' || status === 'overdue') {
                        let label = '';
                        switch (status) {
                            case 'overdue': label = 'Vencido'; break;
                            case 'due-today': label = 'Vence hoy'; break;
                            case 'due-tomorrow': label = 'Vence mañana'; break;
                        }
                        newNotifications.push({
                            id: task.id,
                            message: `${task.subject}: ${task.title} - ${label}`,
                            type: status,
                            dueDate: task.dueDate,
                            timestamp: new Date()
                        });
                    }
                }
            });
            setNotifications(newNotifications);
        };

        checkNotifications();
        const interval = setInterval(checkNotifications, 60000);
        return () => clearInterval(interval);
    }, [tasks, currentTime]);

    // Handle Active Alerts click
    const handleAlertsClick = async () => {
        if (highlightTimeoutRef.current) {
            clearTimeout(highlightTimeoutRef.current);
            highlightTimeoutRef.current = null;
        }
        setHighlightedCalendarDates([]);
        setOriginTaskForCalendar(null);

        setView('calendar');
        
        setTimeout(() => {
            const calendarSection = document.getElementById('calendarSection');
            if (calendarSection) {
                calendarSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);

        const alertDates = [...new Set(notifications.map(n => n.dueDate))].sort();

        let delay = 0;
        for (const dateString of alertDates) {
            const taskForColor = tasks.find(t => t.dueDate === dateString);
            let highlightClasses = '';
            let borderColorRgb = '';
            if (taskForColor) {
                const status = getTaskStatus(taskForColor.dueDate, taskForColor.dueTime, taskForColor.completed);
                const style = getTaskCardStyle(status, taskForColor.completed);
                highlightClasses = style.highlightClass;
                borderColorRgb = style.borderColorRgb;
            }
            
            await new Promise(resolve => {
                highlightTimeoutRef.current = setTimeout(() => {
                    setHighlightedCalendarDates([{ date: dateString, classes: highlightClasses, borderColorRgb: borderColorRgb }]);
                    resolve();
                }, delay);
            });
            delay += 1500;

            await new Promise(resolve => {
                highlightTimeoutRef.current = setTimeout(() => {
                    setHighlightedCalendarDates([]);
                    highlightTimeoutRef.current = null;
                    resolve();
                }, delay);
            });
            delay += 750;
        }
        highlightTimeoutRef.current = null;
    };
        // Header
        React.createElement("div", { className: "bg-white shadow-lg w-full py-4 sm:py-6 mb-6" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-3 sm:px-6" },
                React.createElement("div", { className: "flex items-start sm:items-center justify-between" },
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center" },
                        React.createElement("div", { className: "flex items-center space-x-2" },
                            React.createElement("div", { className: "text-blue-600" },
                                React.createElement(IconBook, { width: "28", height: "28" })
                            ),
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-xl sm:text-4xl font-bold text-blue-600 leading-tight" }, "GESTOR ACADÉMICO"),
                                React.createElement("p", { className: "text-xs sm:text-lg text-gray-600" }, "Organiza tus tareas académicas")
                            )
                        )
                    ),
                    React.createElement("div", { className: "flex-shrink-0 flex items-center space-x-3" },
                        notifications.length > 0 && React.createElement("button", {
                            onClick: () => setShowAlerts(!showAlerts),
                            className: "relative hover:bg-gray-100 p-2 rounded-xl transition-colors",
                            title: showAlerts ? "Ocultar alertas" : "Mostrar alertas"
                        },
                        React.createElement("div", { className: "text-orange-500" },
                            React.createElement(IconBell, { width: "22", height: "22" })
                        ),
                        React.createElement("span", { className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" },
                            notifications.length
                        )),
                        React.createElement("div", { className: "hidden sm:flex items-center space-x-1" },
                            React.createElement("div", { className: emailNotifications ? 'text-blue-500' : 'text-gray-400' },
                                React.createElement(IconMail, { width: "18", height: "18" })
                            ),
                            React.createElement("button", {
                                onClick: () => setEmailNotifications(!emailNotifications),
                                className: `w-10 h-5 rounded-full transition-colors ${emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`
                            },
                            React.createElement("div", { className: `w-4 h-4 bg-white rounded-full transition-transform ${emailNotifications ? 'translate-x-5' : 'translate-x-0.5'}` })
                            )
                        ),
                        React.createElement("button", {
                            onClick: () => setShowColorLegend(!showColorLegend),
                            className: "text-gray-600 hover:text-blue-600 p-2 rounded-xl hover:bg-gray-100 transition-colors",
                            title: "Acceso Rápido a Tareas"
                        },
                        React.createElement(IconHamburger, { width: "28", height: "28" })
                        )
                    )
                ),
                showColorLegend && React.createElement("div", { className: "mt-6 pt-4 border-t border-gray-200" },
                    React.createElement("h3", { className: "font-semibold text-blue-600 text-xl sm:text-2xl text-left mb-4" }, "Acceso rápido a tareas"),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2" },
                        React.createElement("button", {
                            onClick: () => {
                                setView('list');
                                setShowColorLegend(false);
                                setOriginTaskForCalendar(null);
                                setTimeout(() => {
                                    const taskListSection = document.getElementById('taskListSection');
                                    if (taskListSection) {
                                        taskListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }, 0);
                            },
                            className: "block w-full text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-800 font-medium text-base flex items-center space-x-2"
                        },
                        React.createElement(IconBook, { width: "20", height: "20" }),
                        React.createElement("span", null, "Tareas")
                        ),
                        React.createElement("button", {
                            onClick: () => {
                                setView('daily');
                                setShowColorLegend(false);
                                setTimeout(() => {
                                    const dailyTasksSection = document.getElementById('dailyTasksSection');
                                    if (dailyTasksSection) {
                                        dailyTasksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        setOriginTaskForCalendar(null);
                                    }
                                }, 0);
                            },
                            className: "block w-full text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-800 font-medium text-base flex items-center space-x-2"
                        },
                        React.createElement(IconCalendar, { width: "20", height: "20" }),
                        React.createElement("span", null, "Tareas por Día")
                        ),
                        React.createElement("button", {
                            onClick: () => {
                                setView('calendar');
                                setShowColorLegend(false);
                                setTimeout(() => {
                                    const calendarSection = document.getElementById('calendarSection');
                                    if (calendarSection) {
                                        calendarSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        setOriginTaskForCalendar(null);
                                    }
                                }, 100);
                            },
                            className: "block w-full text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-800 font-medium text-base flex items-center space-x-2"
                        },
                        React.createElement(IconCalendar, { width: "20", height: "20" }),
                        React.createElement("span", null, "Vista de Calendario")
                        )
                    )
                )
            )
        ),

        // Main content area
        React.createElement("div", { className: "max-w-7xl mx-auto px-3 sm:px-6" },
            // Active Alerts section
            notifications.length > 0 && showAlerts && React.createElement("div", {
                onClick: handleAlertsClick,
                className: "bg-orange-50 border border-orange-400 rounded-xl shadow-lg shadow-red-200 p-3 sm:p-6 mb-4 sm:mb-6 cursor-pointer transition-all duration-300 ease-in-out",
                style: { marginTop: '1rem' }
            },
            React.createElement("div", { className: "flex items-center justify-between mb-3" },
                React.createElement("h3", { className: "font-semibold text-orange-800 text-xl sm:text-2xl text-left" }, "Alertas activas"),
                React.createElement("div", { className: "text-orange-600" },
                    React.createElement(IconAlert, { width: "20", height: "20" })
                )
            ),
            React.createElement("div", { className: "flex flex-col gap-1" },
                notifications.slice(0, 3).map((notif, index) =>
                    React.createElement("p", { key: notif.id || index, className: "text-sm text-orange-700 w-full text-left" },
                        `• ${notif.message}`
                    )
                ),
                notifications.length > 3 && React.createElement("p", { className: "text-sm text-orange-600 w-full text-left" },
                    `... y ${notifications.length - 3} alertas más`
                )
            )
            ),

            // Form section
            React.createElement("div", { 
                id: "addTaskFormSection", 
                className: "bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 border border-gray-200 transition-all duration-500 hover:shadow-blue-400/60 hover:ring-2 hover:ring-blue-300/50 hover:shadow-2xl hover:border-blue-300 mt-4" 
            },
            React.createElement("button", {
                onClick: () => setShowAddTask(!showAddTask),
                className: "w-full flex items-center justify-between text-left mb-4"
            },
            React.createElement("h3", { className: "font-semibold text-blue-600 text-xl sm:text-2xl text-left" },
                editingTask ? 'Editar tarea' : 'Agregar nueva tarea'
            ),
            showAddTask ? React.createElement("div", { className: "text-blue-600" }, React.createElement(IconChevronUp)) : React.createElement("div", { className: "text-blue-600" }, React.createElement(IconChevronDown))
            ),

            showAddTask && React.createElement("div", { className: "space-y-4" },
                React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" },
                    React.createElement("input", {
                        type: "text",
                        placeholder: "Asignatura",
                        value: newTask.subject,
                        onChange: (e) => setNewTask({...newTask, subject: e.target.value}),
                        className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }),
                    React.createElement("input", {
                        type: "text",
                        placeholder: "Título de la tarea",
                        value: newTask.title,
                        onChange: (e) => setNewTask({...newTask, title: e.target.value}),
                        className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }),
                    React.createElement("select", {
                        value: newTask.type,
                        onChange: (e) => setNewTask({...newTask, type: e.target.value}),
                        className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    },
                    React.createElement("option", { value: "Tarea" }, "Tarea"),
                    React.createElement("option", { value: "Examen" }, "Examen"),
                    React.createElement("option", { value: "Ensayo" }, "Ensayo"),
                    React.createElement("option", { value: "Proyecto" }, "Proyecto"),
                    React.createElement("option", { value: "Laboratorio" }, "Laboratorio")
                    ),
                    React.createElement("input", {
                        type: "date",
                        value: newTask.dueDate,
                        onChange: (e) => setNewTask({...newTask, dueDate: e.target.value}),
                        className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }),
                    React.createElement("input", {
                        type: "time",
                        placeholder: "Hora (opcional)",
                        value: newTask.dueTime,
                        onChange: (e) => setNewTask({...newTask, dueTime: e.target.value}),
                        className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    })
                ),
                React.createElement("textarea", {
                    placeholder: "Descripción (opcional)",
                    value: newTask.description,
                    onChange: (e) => setNewTask({...newTask, description: e.target.value}),
                    rows: "3",
                    className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                }),
                React.createElement("div", { className: "flex space-x-4" },
                    React.createElement("button", {
                        onClick: editingTask ? updateTask : addTask,
                        className: "flex-1 bg-blue-600 text-white rounded-xl px-4 py-3 hover:bg-blue-700 flex items-center justify-center space-x-2 text-lg font-medium"
                    },
                    editingTask ? [
                        React.createElement(IconCheck, { key: "icon", width: "20", height: "20" }),
                        React.createElement("span", { key: "text" }, "Actualizar")
                    ] : [
                        React.createElement(IconPlus, { key: "icon", width: "20", height: "20" }),
                        React.createElement("span", { key: "text" }, "Agregar")
                    ]
                    ),
                    editingTask && React.createElement("button", {
                        onClick: cancelEditing,
                        className: "flex-1 bg-gray-500 text-white rounded-xl px-4 py-3 hover:bg-gray-600 flex items-center justify-center space-x-2 text-lg font-medium"
                    },
                    React.createElement("span", null, "Cancelar")
                    )
                )
            )
            ),

            // Navigation container
            React.createElement("div", { className: "bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg border-b border-blue-100 w-full py-3 sm:py-4 mt-6 mb-6 backdrop-blur-sm shadow-blue-200/50 ring-1 ring-blue-200/30 transition-all duration-500 rounded-2xl" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-3 sm:px-6" },
                    React.createElement("h2", { className: "text-xl sm:text-2xl font-semibold text-blue-600 text-left mb-6" }, "Tareas"),
                    React.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0" },
                        React.createElement("div", { className: "flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto" },
                            React.createElement("div", { className: "grid grid-cols-3 gap-2 sm:flex sm:gap-4 w-full sm:w-auto" },
                                React.createElement("button", {
                                    onClick: () => {
                                        setView('list');
                                        setShowColorLegend(false);
                                        setOriginTaskForCalendar(null);
                                        setTimeout(() => {
                                            const taskListSection = document.getElementById('taskListSection');
                                            if (taskListSection) {
                                                taskListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }
                                        }, 100);
                                    },
                                    className: `px-1 py-2 sm:px-8 sm:py-4 sm:w-48 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-center space-y-1 sm:space-y-0 sm:space-x-3 text-xs sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                                        view === 'list' 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-300' 
                                        : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300'
                                    }`
                                },
                                React.createElement(IconBook, { width: "16", height: "16" }),
                                React.createElement("span", { className: "font-medium text-center sm:text-center" }, "Lista")
                                ),
                                React.createElement("button", {
                                    onClick: () => {
                                        setView('daily');
                                        setShowColorLegend(false);
                                        setTimeout(() => {
                                            const dailyTasksSection = document.getElementById('dailyTasksSection');
                                            if (dailyTasksSection) {
                                                dailyTasksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                setOriginTaskForCalendar(null);
                                            }
                                        }, 100);
                                    },
                                    className: `px-1 py-2 sm:px-8 sm:py-4 sm:w-48 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-center space-y-1 sm:space-y-0 sm:space-x-3 text-xs sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                                        view === 'daily' 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-300' 
                                        : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300'
                                    }`
                                },
                                React.createElement(IconCalendar, { width: "16", height: "16" }),
                                React.createElement("span", { className: "font-medium text-center sm:text-center" }, "Por Día")
                                ),
                                React.createElement("button", {
                                    onClick: () => {
                                        setView('calendar');
                                        setShowColorLegend(false);
                                        setTimeout(() => {
                                            const calendarSection = document.getElementById('calendarSection');
                                            if (calendarSection) {
                                                calendarSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                setOriginTaskForCalendar(null);
                                            }
                                        }, 100);
                                    },
                                    className: `px-1 py-2 sm:px-8 sm:py-4 sm:w-48 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-center space-y-1 sm:space-y-0 sm:space-x-3 text-xs sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                                        view === 'calendar' 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-300' 
                                        : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300'
                                    }`
                                },
                                React.createElement(IconCalendar, { width: "16", height: "16" }),
                                React.createElement("span", { className: "font-medium text-center sm:text-center" }, "Calendario")
                                )
                            )
                        ),
                        tasks.filter(task => task.completed).length > 0 && React.createElement("button", {
                            onClick: deleteAllCompleted,
                            className: "px-4 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 flex items-center space-x-2 text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-red-200"
                        },
                        React.createElement(IconTrash, { width: "18", height: "18" }),
                        React.createElement("span", null, `Eliminar Completadas (${tasks.filter(task => task.completed).length})`)
                        )
                    )
                )
            ),

            // Separation line
            React.createElement("div", { className: "border-t-4 border-gray-100 mb-2 sm:my-4" }),

            // Main view content based on view state
            view === 'list' ? React.createElement("div", { id: "taskListSection", className: "space-y-6" },
                React.createElement("div", { className: "bg-white rounded-2xl shadow-lg p-3 sm:p-8 mb-4 sm:mb-8 mt-6 sm:mt-8" },
                    React.createElement("h2", { className: "text-xl sm:text-2xl font-semibold text-blue-600 text-left mb-4 sm:mb-8" }, "Lista de tareas")
                ),
                [...tasks].sort((a, b) => {
                    if (a.completed && !b.completed) return 1;
                    if (!a.completed && b.completed) return -1;
                    const dateA = new Date(`${a.dueDate}T${a.dueTime || '00:00'}`);
                    const dateB = new Date(`${b.dueDate}T${b.dueTime || '00:00'}`);
                    return dateA - dateB;
                }).map(task => {
                    const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                    const cardStyle = getTaskCardStyle(status, task.completed);
                    const isExpanded = expandedTasks.has(task.id);

                    return React.createElement("div", {
                        key: task.id,
                        id: task.id,
                        className: `rounded-xl shadow-lg border-l-8 transition-all duration-300 ${cardStyle.bg} ${cardStyle.border} ${
                            isExpanded ? 'p-4 sm:p-8' : 'p-2 sm:p-4'
                        }`
                    },
                    // Compact view
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("div", { className: "flex items-center space-x-3 flex-1" },
                            React.createElement("button", {
                                onClick: (e) => { e.stopPropagation(); toggleTask(task.id); },
                                className: `w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                    task.completed
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`
                            },
                            task.completed && React.createElement(IconCheck, { width: "14", height: "14" })
                            ),
                            React.createElement("div", { className: "flex-1 min-w-0" },
                                React.createElement("h3", { 
                                    className: `font-semibold text-sm sm:text-base ${
                                        task.completed ? 'line-through text-gray-500' : 
                                        status === 'overdue' ? 'line-through text-gray-700' : 'text-gray-900'
                                    }`
                                }, `${task.subject}: ${task.title}`),
                                React.createElement("div", { className: "flex items-center space-x-2 text-xs sm:text-sm text-gray-500" },
                                    React.createElement("span", {
                                        onClick: (e) => handleDateClick(task, e),
                                        className: "cursor-pointer hover:text-blue-600 hover:underline"
                                    }, `📅 ${formatDate(task.dueDate)}`),
                                    React.createElement("span", null, `⏰ ${getDaysUntilDue(task.dueDate)}`)
                                )
                            )
                        ),
                        React.createElement("button", {
                            onClick: () => toggleTaskExpansion(task.id),
                            className: "text-gray-400 hover:text-gray-600 p-1"
                        },
                        isExpanded ? React.createElement(IconChevronUp, { width: "20", height: "20" }) : React.createElement(IconChevronDown, { width: "20", height: "20" })
                        )
                    ),
                    // Expanded view
                    isExpanded && React.createElement("div", { className: "mt-4 pt-4 border-t border-gray-200" },
                        React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3" },
                            React.createElement("div", { className: "flex items-center space-x-3" },
                                React.createElement("span", { className: "text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded" }, task.type)
                            )
                        ),
                        task.description && React.createElement("p", { className: "text-gray-600 text-sm sm:text-base mb-3" }, task.description),
                        React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm sm:text-base text-gray-500 mb-4" },
                            React.createElement("span", {
                                onClick: (e) => handleDateClick(task, e),
                                className: "cursor-pointer hover:text-blue-600 hover:underline"
                            }, `📅 ${formatDateTime(task.dueDate, task.dueTime)}`),
                            React.createElement("span", null, `⏰ ${getDaysUntilDue(task.dueDate)}`)
                        ),
                        React.createElement("div", { className: "flex items-center justify-end space-x-2" },
                            React.createElement("button", {
                                onClick: (e) => { e.stopPropagation(); startEditing(task); },
                                className: "text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-xl transition-colors",
                                title: "Editar tarea"
                            },
                            React.createElement(IconEdit, { width: "18", height: "18" })
                            ),
                            React.createElement("button", {
                                onClick: (e) => { e.stopPropagation(); deleteTask(task.id); },
                                className: "text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors",
                                title: "Eliminar tarea"
                            },
                            React.createElement(IconTrash, { width: "18", height: "18" })
                            )
                        )
                    )
                    );
                })
            ) : view === 'daily' ? React.createElement("div", { className: "space-y-8", id: "dailyTasksSection" },
                React.createElement("div", { className: "bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8" },
                    React.createElement("h2", { className: "text-xl sm:text-2xl font-semibold text-blue-600 text-left mb-8" }, "Tareas por día")
                ),
                React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" },
                    Object.entries(tasks.reduce((acc, task) => {
                        const date = task.dueDate;
                        if (!acc[date]) acc[date] = [];
                        acc[date].push(task);
                        return acc;
                    }, {})).sort().map(([date, dayTasks]) =>
                        React.createElement("div", { key: date, className: "bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:border-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-200 transition-all duration-300 cursor-pointer" },
                            React.createElement("h3", { className: "font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4" }, formatDate(date)),
                            React.createElement("div", { className: "space-y-3" },
                                dayTasks.sort((a, b) => (a.dueTime || '00:00').localeCompare(b.dueTime || '00:00')).map(task => {
                                    const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                                    const cardStyle = getTaskCardStyle(status, task.completed);
                                    return React.createElement("div", {
                                        key: task.id,
                                        onClick: () => handleDateClick(task, { stopPropagation: () => {} }),
                                        className: `p-3 sm:p-4 rounded-xl border-l-8 ${cardStyle.bg} ${cardStyle.border} transition-all duration-300 cursor-pointer hover:shadow-lg`
                                    },
                                    React.createElement("div", { className: "flex items-center justify-between mb-3" },
                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                            React.createElement(IconClock, { width: "20", height: "20" }),
                                            React.createElement("span", { className: `text-base px-3 py-1 rounded-full ${cardStyle.bg} ${cardStyle.text} font-medium` },
                                                task.dueTime ? `${getDaysUntilDue(task.dueDate)} - ${task.dueTime}` : getDaysUntilDue(task.dueDate)
                                            )
                                        ),
                                        React.createElement("button", {
                                            onClick: (e) => { e.stopPropagation(); toggleTask(task.id); },
                                            className: `w-6 h-6 sm:w-7 sm:h-7 rounded border-2 flex items-center justify-center ${
                                                task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
                                            }`
                                        },
                                        task.completed && React.createElement(IconCheck, { width: "16", height: "16" })
                                        )
                                    ),
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "font-medium text-gray-800 text-lg sm:text-xl" }, task.subject),
                                        React.createElement("p", { className: "text-base sm:text-lg text-gray-600 mt-1" }, task.title),
                                        React.createElement("p", { className: "text-base text-gray-500 mt-2" }, task.type)
                                    ),
                                    React.createElement("div", { className: "flex justify-end mt-4 space-x-2" },
                                        React.createElement("button", {
                                            onClick: (e) => { e.stopPropagation(); startEditing(task); },
                                            className: "text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-xl transition-colors",
                                            title: "Editar tarea"
                                        },
                                        React.createElement(IconEdit, { width: "18", height: "18" })
                                        ),
                                        React.createElement("button", {
                                            onClick: (e) => { e.stopPropagation(); deleteTask(task.id); },
                                            className: "text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors",
                                            title: "Eliminar tarea"
                                        },
                                        React.createElement(IconTrash, { width: "18", height: "18" })
                                        )
                                    )
                                    );
                                })
                            )
                        )
                    )
                )
            ) : React.createElement("div", { className: "space-y-8", id: "calendarSection" },
                React.createElement("div", { className: "bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8" },
                    React.createElement("h2", { className: "text-xl sm:text-2xl font-semibold text-blue-600 text-left mb-8" }, "Calendario")
                ),
                // Monthly Calendar
                React.createElement("div", { className: "bg-blue-50 rounded-2xl shadow-lg p-4 sm:p-6 relative border border-gray-200 transition-all duration-500 hover:shadow-blue-400/60 hover:ring-2 hover:ring-blue-300/50 hover:shadow-2xl hover:border-blue-300" },
                    React.createElement("div", { className: "flex items-center justify-center mb-6 relative" },
                        React.createElement("button", {
                            onClick: () => setCurrentCalendarViewDate(new Date(currentCalendarViewDate.getFullYear(), currentCalendarViewDate.getMonth() - 1, 1)),
                            className: "absolute left-0 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        }, "←"),
                        React.createElement("h2", { className: "text-base sm:text-2xl font-bold text-gray-800" },
                            [
                                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                            ][currentCalendarViewDate.getMonth()] + ' ' + currentCalendarViewDate.getFullYear()
                        ),
                        React.createElement("button", {
                            onClick: () => setCurrentCalendarViewDate(new Date(currentCalendarViewDate.getFullYear(), currentCalendarViewDate.getMonth() + 1, 1)),
                            className: "absolute right-0 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        }, "→")
                    ),
                    React.createElement("div", { className: "flex justify-center mb-4" },
                        React.createElement("button", {
                            onClick: () => setCurrentCalendarViewDate(todayGlobal),
                            className: "px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                        }, "Hoy")
                    ),
                    // Day names
                    React.createElement("div", { className: "grid grid-cols-7 gap-1 mb-2" },
                        ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map(day => 
                            React.createElement("div", { key: day, className: "text-center font-semibold text-gray-600 py-2 text-base" }, day)
                        ),
                        React.createElement("div", { key: "sab", className: "text-center font-semibold text-red-600 py-2 text-base" }, "Sáb"),
                        React.createElement("div", { key: "dom", className: "text-center font-semibold text-red-600 py-2 text-base" }, "Dom")
                    ),
                    // Calendar days grid
                    React.createElement("div", { className: "grid grid-cols-7 gap-1" },
                        (() => {
                            const year = currentCalendarViewDate.getFullYear();
                            const month = currentCalendarViewDate.getMonth();
                            const firstDay = new Date(year, month, 1);
                            const lastDay = new Date(year, month + 1, 0);
                            const daysInMonth = lastDay.getDate();
                            const startingDayOfWeek = firstDay.getDay();
                            const daysArray = [];
                            
                            // Empty days from previous month
                            const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
                            for (let i = 0; i < adjustedStartingDay; i++) {
                                daysArray.push(null);
                            }
                            
                            // Days of current month
                            for (let day = 1; day <= daysInMonth; day++) {
                                daysArray.push(day);
                            }
                            
                            // Group tasks by date
                            const tasksByDate = tasks.reduce((acc, task) => {
                                const taskDate = createLocalDate(task.dueDate);
                                if (taskDate.getFullYear() === year && taskDate.getMonth() === month) {
                                    const day = taskDate.getDate();
                                    if (!acc[day]) acc[day] = [];
                                    acc[day].push(task);
                                }
                                return acc;
                            }, {});
                            
                            return daysArray.map((day, index) => {
                                if (!day) {
                                    return React.createElement("div", { key: index, className: "h-[3rem] sm:h-[6rem]" });
                                }
                                
                                const dayObj = new Date(year, month, day);
                                const isToday = todayGlobal.getDate() === dayObj.getDate() &&
                                                todayGlobal.getMonth() === dayObj.getMonth() &&
                                                todayGlobal.getFullYear() === dayObj.getFullYear();
                                
                                const currentDayFormatted = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                const isHoliday = chileanHolidays.includes(currentDayFormatted);
                                
                                const highlightEntry = highlightedCalendarDates.find(h => h.date === currentDayFormatted);
                                const highlightClassesToApply = highlightEntry ? highlightEntry.classes : '';
                                const highlightBorderColorRgb = highlightEntry ? highlightEntry.borderColorRgb : '';
                                
                                return React.createElement("div", {
                                    key: currentDayFormatted,
                                    className: `h-[3rem] sm:h-[6rem] border border-gray-200 p-1 sm:p-2 transition-all duration-300 ease-in-out ${
                                        isHoliday ? 'bg-red-50' : ''
                                    } ${isToday ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-blue-50'} ${highlightClassesToApply.includes('ring-2') ? 'highlight-animation' : ''}`,
                                    style: highlightEntry ? {
                                        '--highlight-color': highlightClassesToApply.match(/border-([\w-]+)-(\d+)/)?.[0].replace('border-', '') || '#3b82f6',
                                        '--ring-color-rgb': highlightBorderColorRgb
                                    } : {}
                                },
                                React.createElement("div", { 
                                    className: `text-sm sm:text-base font-medium ${
                                        isToday ? 'text-blue-700' : (isHoliday ? 'text-red-600' : 'text-gray-800')
                                    }`
                                }, day),
                                React.createElement("div", { className: "mt-1 space-y-0.5" },
                                    tasksByDate[day] && tasksByDate[day]
                                        .sort((a, b) => (a.dueTime || '00:00').localeCompare(b.dueTime || '00:00'))
                                        .map((task, taskIndex) => {
                                        const status = getTaskStatus(task.dueDate, task.dueTime, task.completed);
                                        let bgColor = '';
                                        let title = '';
                                        
                                        switch (status) {
                                            case 'overdue':
                                                bgColor = 'bg-gray-600';
                                                title = `${task.subject} - Vencida`;
                                                break;
                                            case 'due-today':
                                                bgColor = 'bg-red-400';
                                                title = `${task.subject} - Vence hoy`;
                                                break;
                                            case 'due-tomorrow':
                                                bgColor = 'bg-orange-400';
                                                title = `${task.subject} - Vence mañana`;
                                                break;
                                            case 'due-soon':
                                                bgColor = 'bg-yellow-400';
                                                title = `${task.subject} - Por vencer`;
                                                break;
                                            case 'completed':
                                                bgColor = 'bg-gray-400';
                                                title = `${task.subject} - Completada`;
                                                break;
                                            default:
                                                bgColor = 'bg-green-400';
                                                title = `${task.subject} - A tiempo`;
                                                break;
                                        }
                                        
                                        if (task.dueTime) {
                                            title += ` - ${task.dueTime}`;
                                        }
                                        
                                        return React.createElement("div", {
                                            key: `${task.id}-${taskIndex}`,
                                            className: `w-full h-1.5 ${bgColor} rounded text-xs text-white text-center leading-none`,
                                            title: title
                                        });
                                    })
                                )
                                );
                            });
                        })()
                    ),
                    React.createElement("div", { className: "mt-4 text-xs text-gray-600 text-center" },
                        "Cada barra de color representa una tarea individual. Si hay múltiples tareas el mismo día, verás múltiples barras ordenadas por horario."
                    ),
                    originTaskForCalendar && React.createElement("button", {
                        onClick: backToOriginTask,
                        className: "absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-10",
                        title: "Volver a la tarea original"
                    },
                    React.createElement(IconArrowBack, { width: "20", height: "20" })
                    )
                )
            ),

            // Footer
            React.createElement("div", { className: "mt-8 sm:mt-10 bg-white rounded-xl shadow-lg p-4 sm:p-6" },
                React.createElement("div", { className: "text-center text-gray-600 space-y-2" },
                    React.createElement("div", { className: "border-b border-gray-200 pb-2" },
                        React.createElement("p", { className: "text-sm font-semibold text-gray-800 mb-0.5" }, "© Derechos Reservados"),
                        React.createElement("p", { className: "text-xs text-gray-700" },
                            "Realizado por ",
                            React.createElement("span", { className: "font-semibold text-blue-600" }, "Daniel Figueroa Chacama")
                        ),
                        React.createElement("p", { className: "text-xs text-gray-600 mt-0.5" }, "Ingeniero en Informática")
                    )
                )
            ),

            // Custom dialogs
            React.createElement(CustomAlertDialog, {
                message: alertDialogMessage,
                isOpen: isAlertDialogOpen,
                onClose: handleAlertDialogClose
            }),
            React.createElement(CustomConfirmDialog, {
                message: confirmDialogMessage,
                isOpen: isConfirmDialogOpen,
                onConfirm: handleConfirmDialogConfirm,
                onCancel: handleConfirmDialogCancel
            })
        )
    );
};

// Use createRoot for React 18 to render the application
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(AcademicTaskManager));// React components and application logic for the Academic Task Manager

const { useState, useEffect, useRef } = React;

// --- Simple SVG Icons ---
const IconBook = ({ width = "20", height = "20" }) => (
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
    React.createElement("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
    React.createElement("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })
    )
);

const IconCalendar = ({ width = "20", height = "20" }) => (
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
    React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
    React.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
    React.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
    React.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" })
    )
);

const IconPlus = ({ width = "20", height = "20" }) => (
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
    React.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
    React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
    )
);

const IconClock = ({ width = "20", height = "20" }) => (
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
    )
);

const IconMail = ({ width = "20", height = "20" }) => (
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
    React.createElement("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
    React.createElement("polyline", { points: "22,6 12,13 2,6" })
    )
);

const IconBell = ({ width = "22", height = "22" }) => (
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
    )
);

const IconAlert = ({ width = "20", height = "20" }) => (
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
    )
);

const IconChevronDown = ({ width = "24", height = "24" }) => (
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
    React.createElement("polyline", { points: "6,9 12,15 18,9" })
    )
);

const IconChevronUp = ({ width = "24", height = "24" }) => (
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
    React.createElement("polyline", { points: "18,15 12,9 6,15" })
    )
);

const IconTrash = ({ width = "18", height = "18" }) => (
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
    )
);

const IconCheck = ({ width = "18", height = "18" }) => (
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
    )
);

const IconEdit = ({ width = "18", height = "18" }) => (
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
    )
);

const IconHamburger = ({ width = "24", height = "24" }) => (
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
    )
);

const IconArrowBack = ({ width = "24", height = "24" }) => (
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
    React.createElement("path", { d: "M19 12H5" }),
    React.createElement("polyline", { points: "12 19 5 12 12 5" })
    )
);

// --- Custom Alert/Confirm Dialogs ---
const CustomAlertDialog = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;
    return React.createElement("div", {
        className: "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
    },
    React.createElement("div", {
        className: "bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-blue-500"
    },
    React.createElement(IconAlert, { width: "40", height: "40", className: "text-blue-500 mx-auto mb-4" }),
    React.createElement("p", { className: "text-lg text-gray-800 mb-6" }, message),
    React.createElement("button", {
        onClick: onClose,
        className: "w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
    }, "Aceptar")
    ));
};

const CustomConfirmDialog = ({ message, isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return React.createElement("div", {
        className: "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
    },
    React.createElement("div", {
        className: "bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border-t-4 border-red-500"
    },
    React.createElement(IconTrash, { width: "40", height: "40", className: "text-red-500 mx-auto mb-4" }),
    React.createElement("p", { className: "text-lg text-gray-800 mb-6" }, message),
    React.createElement("div", { className: "flex space-x-4" },
    React.createElement("button", {
        onClick: onCancel,
        className: "flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition-colors text-lg font-medium"
    }, "Cancelar"),
    React.createElement("button", {
        onClick: onConfirm,
        className: "flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
    }, "Confirmar")
    )));
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
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        const fourDaysLater = new Date(today);
        fourDaysLater.setDate(today.getDate() + 4);

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
            },
            {
                id: 3,
                subject: 'Física',
                title: 'Laboratorio de Óptica',
                description: 'Informe de experimentos con lentes',
                dueDate: formatDateForInput(dayAfterTomorrow),
                dueTime: '11:00',
                type: 'Laboratorio',
                completed: false
            },
            {
                id: 4,
                subject: 'Literatura',
                title: 'Análisis de "Cien años de soledad"',
                description: 'Ensayo crítico sobre realismo mágico',
                dueDate: formatDateForInput(fourDaysLater),
                dueTime: '16:00',
                type: 'Ensayo',
                completed: false
            },
            {
                id: 5,
                subject: 'Química',
                title: 'Proyecto de Reacciones',
                description: 'Desarrollo de un modelo molecular',
                dueDate: formatDateForInput(today),
                dueTime: '13:15',
                type: 'Proyecto',
                completed: false
            }
        ];
    };

    // Function to save data to localStorage
    const saveTasksToStorage = (tasksToSave) => {
        try {
            localStorage.setItem('academicTasks', JSON.stringify(tasksToSave));
            localStorage.setItem('academicTasksLastSaved', new Date().toISOString());
        } catch (error) {
            console.error('Error saving tasks to storage:', error);
        }
    };

    // Function to load settings
    const loadSettingsFromStorage = () => {
        try {
            const savedView = localStorage.getItem('currentView');
            const savedEmailNotifications = localStorage.getItem('emailNotifications');
            return {
                view: savedView || 'list',
                emailNotifications: savedEmailNotifications === 'true'
            };
        } catch (error) {
            console.error('Error loading settings from storage:', error);
            return { view: 'list', emailNotifications: false };
        }
    };

    // Function to save settings
    const saveSettingsToStorage = (currentView, emailNotificationsState) => {
        try {
            localStorage.setItem('currentView', currentView);
            localStorage.setItem('emailNotifications', String(emailNotificationsState));
        } catch (error) {
            console.error('Error saving settings to storage:', error);
        }
    };

    // Initialize states with saved data
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
    const [emailNotifications, setEmailNotifications] = useState(savedSettings.emailNotifications);
    const [highlightedCalendarDates, setHighlightedCalendarDates] = useState([]);
    const [currentCalendarViewDate, setCurrentCalendarViewDate] = useState(new Date());
    const todayGlobal = new Date();
    const [originTaskForCalendar, setOriginTaskForCalendar] = useState(null);
    const highlightTimeoutRef = useRef(null);
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

    // Effects and other functions
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        saveTasksToStorage(tasks);
    }, [tasks]);

    useEffect(() => {
        saveSettingsToStorage(view, emailNotifications);
    }, [view, emailNotifications]);

    // Helper to create a local date at midnight from ISO-MM-DD
    const createLocalDate = (dateString) => {
        const parts = dateString.split('-').map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    };

    // Function to calculate task status based on current date and time
    const getTaskStatus = (dueDate, dueTime, completed) => {
        if (completed) return 'completed';

        const now = new Date();
        const todayMidnight = new Date(now);
        todayMidnight.setHours(0, 0, 0, 0);

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

        if (dueDateTime < now) {
            return 'overdue';
        }

        const diffTime = dueMidnight.getTime() - todayMidnight.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'due-today';
        if (diffDays === 1) return 'due-tomorrow';
        if (diffDays <= 3) return 'due-soon';
        return 'on-time';
    };

    // Function to get task card styles based on status
    const getTaskCardStyle = (status, completed) => {
        let baseStyles = {};
        let highlightClass = '';
        let borderColorRgb = '0,0,0';

        if (completed) {
            baseStyles = {
                bg: 'bg-gray-50',
                border: 'border-gray-300',
                text: 'text-gray-600',
            };
            highlightClass = 'border-gray-500 ring-2 ring-gray-500 shadow-md';
            borderColorRgb = '107,114,128';
        } else {
            switch (status) {
                case 'overdue':
                    baseStyles = {
                        bg: 'bg-gray-100',
                        border: 'border-gray-500',
                        text: 'text-gray-800',
                    };
                    highlightClass = 'border-gray-600 ring-2 ring-gray-600 shadow-md';
                    borderColorRgb = '75,85,99';
                    break;
                case 'due-today':
                    baseStyles = {
                        bg: 'bg-red-50',
                        border: 'border-red-500',
                        text: 'text-red-800',
                    };
                    highlightClass = 'border-red-500 ring-2 ring-red-500 shadow-md';
                    borderColorRgb = '239,68,68';
                    break;
                case 'due-tomorrow':
                    baseStyles = {
                        bg: 'bg-orange-50',
                        border: 'border-orange-400',
                        text: 'text-orange-800',
                    };
                    highlightClass = 'border-orange-500 ring-2 ring-orange-500 shadow-md';
                    borderColorRgb = '249,115,22';
                    break;
                case 'due-soon':
                    baseStyles = {
                        bg: 'bg-yellow-50',
                        border: 'border-yellow-400',
                        text: 'text-yellow-800',
                    };
                    highlightClass = 'border-yellow-500 ring-2 ring-yellow-500 shadow-md';
                    borderColorRgb = '245,158,11';
                    break;
                case 'on-time':
                default:
                    baseStyles = {
                        bg: 'bg-green-50',
                        border: 'border-green-400',
                        text: 'text-green-800',
                    };
                    highlightClass = 'border-green-500 ring-2 ring-green-500 shadow-md';
                    borderColorRgb = '34,197,94';
                    break;
            }
        }
        return { ...baseStyles, highlightClass: highlightClass, borderColorRgb: borderColorRgb };
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

    const startEditing = (task) => {
        setEditingTask(task);
        setNewTask(task);
        setShowAddTask(true);
        setView('list');
        const formElement = document.getElementById('addTaskFormSection');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const updateTask = () => {
        if (newTask.subject && newTask.title && newTask.dueDate) {
            setTasks(tasks.map(task =>
                task.id === editingTask.id ? { ...newTask } : task
            ));
            setEditingTask(null);
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

    const cancelEditing = () => {
        setEditingTask(null);
        setNewTask({
            subject: '',
            title: '',
            description: '',
            dueDate: '',
            dueTime: '',
            type: 'Tarea'
        });
        setShowAddTask(false);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        showConfirm('¿Estás seguro de que quieres eliminar esta tarea?', () => {
            setTasks(tasks.filter(task => task.id !== id));
            if (editingTask && editingTask.id === id) {
                cancelEditing();
            }
        });
    };

    const deleteAllCompleted = () => {
        const completedCount = tasks.filter(task => task.completed).length;
        if (completedCount === 0) {
            showAlert('No hay tareas completadas para eliminar.');
            return;
        }

        showConfirm(`¿Estás seguro de que quieres eliminar ${completedCount} tarea${completedCount > 1 ? 's' : ''} completada${completedCount > 1 ? 's' : ''}?`, () => {
            setTasks(tasks.filter(task => !task.completed));
            if (editingTask && tasks.filter(task => task.completed).some(t => t.id === editingTask.id)) {
                cancelEditing();
            }
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

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString;
    };

    const formatDateTime = (dateString, timeString) => {
        const formattedDate = formatDate(dateString);
        const formattedTime = formatTime(timeString);
        return formattedTime ? `${formattedDate} a las ${formattedTime}` : formattedDate;
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

    // Handle date click specifically
    const handleDateClick = async (task, e) => {
        e.stopPropagation();
        if (highlightTimeoutRef.current) {
            clearTimeout(highlightTimeoutRef.current);
            highlightTimeoutRef.
