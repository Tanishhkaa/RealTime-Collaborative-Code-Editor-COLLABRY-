import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { AppContextProvider } from './context/AppContext'
import { ViewContextProvider } from './context/ViewContext'
import { ChatContextProvider } from './context/ChatContext'
import { FileContextProvider } from './context/FileContext'
import { RunCodeContextProvider } from './context/RunCodeContext'
import { SocketProvider } from './context/SocketContext'
import { SettingContextProvider } from './context/SettingContext'
import { CopilotContextProvider } from './context/CopilotContext'
import AppProvider from './context/AppProvider'
import HomePage from './pages/HomePage'
import EditorPage from './pages/EditorPage'
import GitHubCorner from './components/GitHubCorner'
import Toast from './components/toast/Toast'
import VideoCall from './components/VideoCall';


const App = () => {
  return (
    <AppContextProvider>
      <ViewContextProvider>
        <SocketProvider>
          <ChatContextProvider>
            <FileContextProvider>
              <RunCodeContextProvider>
                <SettingContextProvider>
                  <CopilotContextProvider>
                    <AppProvider>
                      <Router>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/editor/:roomId" element={<EditorPage />} />
                        <Route path="/video" element={<VideoCall />} />
                        <Route path="*" element={<h1>404 - Not Found</h1>} />
                      </Routes>
                      </Router>
                      <Toast />
                      <GitHubCorner />
                    </AppProvider>
                  </CopilotContextProvider>
                </SettingContextProvider>
              </RunCodeContextProvider>
            </FileContextProvider>
          </ChatContextProvider>
        </SocketProvider>
      </ViewContextProvider>
    </AppContextProvider>
  )
}

export default App
