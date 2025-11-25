import React from 'react';
import Board from './components/Board/Board';
import Toolbar from './components/Controls/Toolbar';
import BoardSwitcher from './components/Controls/BoardSwitcher';

function App() {
  return (
    <div className="app">
      <BoardSwitcher />
      <Board />
      <Toolbar />
    </div>
  );
}

export default App;
