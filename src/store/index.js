import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export const store = createStore({
    state: {
        notes: [],
        tasks: [],
        note: null,
        noteHistory: [],
        noteHistoryCurrent: null,
        noteSaved: false,
        noteModified: false,
    },
    mutations: {
        init(state, payload) {
            state.notes = payload.notes;
            state.tasks = payload.tasks;
        },

        // Note CRUD

        setNote(state, noteId) {
            const note = {
                ...state.notes.find((item) => item.id == noteId),
                tasks: [...state.tasks.filter((item) => item.noteId == noteId)],
            };
            state.note = JSON.parse(JSON.stringify(note));
        },
        newNote(state, noteId) {
            state.note = {
                id: noteId,
                title: null,
                tasks: [],
            };
        },
        saveNote(state, noteId) {
            const notes = state.notes;
            const note = notes.find((item) => item.id == noteId);
            if (note) {
                note.title = state.note.title;
                note.id = state.note.id;
            } else {
                notes.unshift({
                    title: state.note.title,
                    id: state.note.id,
                });
            }

            const tasks = state.tasks;
            const tasksUpd = tasks.filter((item) => item.noteId != noteId);
            tasks.length = 0;
            tasks.push(...tasksUpd);
            tasks.push(...state.note.tasks);
        },
        deleteNote(state, noteId) {
            const notes = state.notes;
            const note = notes.find((item) => item.id == noteId);
            const noteIndex = notes.indexOf(note);
            notes.splice(noteIndex, 1);

            const tasks = state.tasks;
            const tasksUpd = tasks.filter((item) => item.noteId != noteId);
            tasks.length = 0;
            tasks.push(...tasksUpd);
        },
        cancelNote(state) {
            state.note = null;
            state.noteHistory = [];
        },
        updateTitle(state, title) {
            state.note.title = title;
        },

        // Tasks CRUD

        addNewTask(state, taskInfo) {
            const task = {
                id: uuidv4(),
                noteId: taskInfo.noteId,
                description: taskInfo.description,
                completed: false,
            };
            state.note.tasks.push(task);
        },
        deleteTask(state, taskId) {
            const tasks = state.note.tasks;
            const task = tasks.find((item) => item.id == taskId);
            const taskIndex = tasks.indexOf(task);
            tasks.splice(taskIndex, 1);
        },
        updateTaskDescription(state, task) {
            const taskItem = state.note.tasks.find(
                (item) => item.id == task.id
            );
            taskItem.description = task.description;
        },
        updateTaskStatus(state, task) {
            const taskItem = state.note.tasks.find(
                (item) => item.id === task.id
            );
            taskItem.completed = task.completed;
        },

        // History mutations
        toggleSaveNoteNotification(state, status) {
            state.noteSaved = status;
        },
        pushHistory(state) {
            const notePrint = JSON.parse(JSON.stringify(state.note));
            const historyCurrent = state.noteHistoryCurrent;
            const historyCount = state.noteHistory.length;

            state.noteHistory.splice(
                historyCurrent,
                historyCount - historyCurrent,
                notePrint
            );

            state.noteHistoryCurrent = historyCount + 1;
        },
        undoHistory(state) {
            if (state.noteHistoryCurrent == 1) {
                return;
            }
            state.noteHistoryCurrent--;
        },
        redoHistory(state) {
            if (state.noteHistoryCurrent == state.noteHistory.length) {
                return;
            }
            state.noteHistoryCurrent++;
        },
        shiftHistory(state) {
            let notePrint = state.noteHistory[state.noteHistoryCurrent - 1];
            notePrint = JSON.parse(JSON.stringify(notePrint));

            state.note = notePrint;
        },
        noteModified(state, status) {
            state.noteModified = status;
        },
    },
    actions: {
        init({ commit }) {
            let notes = localStorage.getItem("notes");
            if (notes) {
                notes = JSON.parse(notes);
            } else {
                notes = [
                    {
                        id: 1,
                        title: "Устроиться в DDoS guard",
                    },
                ];
            }

            let tasks = localStorage.getItem("tasks");
            if (tasks) {
                tasks = JSON.parse(tasks);
            } else {
                tasks = [
                    {
                        id: 1,
                        noteId: 1,
                        description: "Откликнуться",
                        completed: true,
                    },
                    {
                        id: 2,
                        noteId: 1,
                        description: "Сделать тестовое",
                        completed: true,
                    },
                    {
                        id: 3,
                        noteId: 1,
                        description: "Прийти на работу",
                        completed: false,
                    },
                    {
                        id: 4,
                        noteId: 1,
                        description: "Познакомиться с коллегами",
                        completed: false,
                    },
                ];
            }

            commit("init", { notes, tasks });
        },
        saveToLocalStorage({ state }) {
            localStorage.setItem("notes", JSON.stringify(state.notes));
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },

        // Note actions
        saveNote({ commit, dispatch }, noteId) {
            commit("saveNote", noteId);
            commit("toggleSaveNoteNotification", true);
            commit("noteModified", false);
            dispatch("saveToLocalStorage");

            setTimeout(() => {
                commit("toggleSaveNoteNotification", false);
            }, 2000);
        },
        deleteNote({ commit, dispatch }, noteId) {
            commit("deleteNote", noteId);
            commit("noteModified", false);
            dispatch("saveToLocalStorage");
        },
        cancelNote({ commit }) {
            commit("cancelNote");
            commit("noteModified", false);
        },
        setNote({ commit, dispatch }, noteId) {
            commit("setNote", noteId);
            dispatch("pushHistory");
            commit("noteModified", false);
        },
        newNote({ commit, dispatch }, noteId) {
            commit("newNote", noteId);
            dispatch("pushHistory");
            commit("noteModified", false);
        },
        updateTitle({ commit }, title) {
            commit("updateTitle", title);
        },

        // Tasks actions

        updateTaskDescription({ commit }, task) {
            commit("updateTaskDescription", task);
        },
        updateTaskStatus({ commit, dispatch }, task) {
            commit("updateTaskStatus", task);
            dispatch("pushHistory");
        },
        addNewTask({ commit, dispatch }, taskInfo) {
            commit("addNewTask", taskInfo);
            dispatch("pushHistory");
        },
        deleteTask({ commit, dispatch }, taskId) {
            commit("deleteTask", taskId);
            dispatch("pushHistory");
        },

        // History actions

        pushHistory({ commit }) {
            commit("pushHistory");
            commit("noteModified", true);
        },
        undoHistory({ commit }) {
            commit("undoHistory");
            commit("shiftHistory");
            commit("noteModified", true);
        },
        redoHistory({ commit }) {
            commit("redoHistory");
            commit("shiftHistory");
            commit("noteModified", true);
        },
    },
    modules: {},
});
