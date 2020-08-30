import React from 'react';
import './styles/App.scss';
import BookSearch from './containers/book-search';
import ErrorBoundary from './shared/errorBoundary';

function App() {
  return (
    <div>
      <header className="header">
        <div className="header--content">
          <h1>My Good Reads</h1>
        </div>
      </header>
      <main>
        <ErrorBoundary>
          <BookSearch />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
