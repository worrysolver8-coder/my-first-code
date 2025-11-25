import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

const STORAGE_KEY = 'dream_map_data_v1';

const DEFAULT_BOARD = {
    id: 'default',
    name: 'My Dream Map',
    items: [],
    backgroundColor: 'var(--color-bg-gradient)',
};

export function AppProvider({ children }) {
    const [boards, setBoards] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [DEFAULT_BOARD];
    });

    const [activeBoardId, setActiveBoardId] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY + '_active');
        return saved ? JSON.parse(saved) : 'default';
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
    }, [boards]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY + '_active', JSON.stringify(activeBoardId));
    }, [activeBoardId]);

    const activeBoard = boards.find(b => b.id === activeBoardId) || boards[0];

    const addBoard = (name) => {
        const newBoard = {
            ...DEFAULT_BOARD,
            id: uuidv4(),
            name: name || 'New Board',
        };
        setBoards([...boards, newBoard]);
        setActiveBoardId(newBoard.id);
    };

    const deleteBoard = (id) => {
        if (boards.length <= 1) return; // Prevent deleting last board
        const newBoards = boards.filter(b => b.id !== id);
        setBoards(newBoards);
        if (activeBoardId === id) {
            setActiveBoardId(newBoards[0].id);
        }
    };

    const updateBoard = (id, updates) => {
        setBoards(boards.map(b => b.id === id ? { ...b, ...updates } : b));
    };

    const addItem = (type, content, position = { x: 50, y: 50 }) => {
        const newItem = {
            id: uuidv4(),
            type,
            content,
            x: position.x,
            y: position.y,
            width: 200, // Default width
            height: 'auto',
            zIndex: activeBoard.items.length + 1,
            createdAt: Date.now(),
        };

        updateBoard(activeBoardId, {
            items: [...activeBoard.items, newItem]
        });
    };

    const updateItem = (itemId, updates) => {
        const newItems = activeBoard.items.map(item =>
            item.id === itemId ? { ...item, ...updates } : item
        );
        updateBoard(activeBoardId, { items: newItems });
    };

    const deleteItem = (itemId) => {
        const newItems = activeBoard.items.filter(item => item.id !== itemId);
        updateBoard(activeBoardId, { items: newItems });
    };

    const moveItem = (itemId, x, y) => {
        updateItem(itemId, { x, y });
    };

    const bringToFront = (itemId) => {
        const maxZ = Math.max(...activeBoard.items.map(i => i.zIndex || 0), 0);
        updateItem(itemId, { zIndex: maxZ + 1 });
    };

    const value = {
        boards,
        activeBoard,
        activeBoardId,
        setActiveBoardId,
        addBoard,
        deleteBoard,
        updateBoard,
        addItem,
        updateItem,
        deleteItem,
        moveItem,
        bringToFront,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
