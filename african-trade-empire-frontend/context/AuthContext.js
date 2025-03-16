'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import * as fcl from "@onflow/fcl"
import { showConnect, AppConfig, UserSession } from '@stacks/connect'
import { StacksMainnet, StacksTestnet } from '@stacks/network'

const AuthContext = createContext({
  user: null,
  isLoading: false,
  error: null,
  stacksUser: null, // New addition for Stacks auth
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  connectStacksWallet: async () => {}, // New method
  disconnectStacksWallet: async () => {}, // New method
})

// Initialize Stacks app config
const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: false })
  const [stacksUser, setStacksUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Subscribe to Flow user changes
    fcl.currentUser.subscribe(setUser)
    
    // Check if user is already signed in with Stacks
    if (userSession.isUserSignedIn()) {
      setStacksUser(userSession.loadUserData())
    }
  }, [])

  const connectWallet = async (walletType) => {
    try {
      setIsLoading(true)
      setError(null)
      
      switch(walletType) {
        case 'flow':
          await fcl.authenticate()
          break
        case 'leather':
        case 'xverse':
          // Redirect to Stacks Connect
          await connectStacksWallet()
          break
        default:
          throw new Error('Unsupported wallet type')
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      // Check which wallet is connected and disconnect accordingly
      if (user.loggedIn) {
        await fcl.unauthenticate()
      }
      if (stacksUser) {
        await disconnectStacksWallet()
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const connectStacksWallet = async () => {
    setIsLoading(true)
    try {
      showConnect({
        appDetails: {
          name: 'African Trade Empire',
          icon: window.location.origin + '/appIcon.jpg',
        },
        redirectTo: '/',
        onFinish: (data) => {
          setStacksUser(data.userSession.loadUserData())
          setIsLoading(false)
        },
        onCancel: () => {
          setIsLoading(false)
        },
        userSession,
      })
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const disconnectStacksWallet = async () => {
    if (userSession.isUserSignedIn()) {
      userSession.signUserOut()
      setStacksUser(null)
    }
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        stacksUser, // Include Stacks user in context
        isLoading,
        error,
        connectWallet,
        disconnectWallet,
        connectStacksWallet,
        disconnectStacksWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)