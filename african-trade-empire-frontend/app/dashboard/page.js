'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'
import { CircleDollarSign, TrendingUp, Users, Activity, ArrowUp, ArrowDown, MapPin, Clock, Calendar, BriefcaseMedical, Award } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { user, stacksUser } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  
  // Check if any wallet is connected
  const isAuthenticated = user.loggedIn || stacksUser !== null

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    } else {
      setLoading(false)
    }
  }, [isAuthenticated, router])

  // Get user identifier based on connected wallet
  const getUserIdentifier = () => {
    if (user.loggedIn && user.addr) {
      return user.addr.slice(0, 6)
    } else if (stacksUser) {
      const stacksAddress = stacksUser.profile.stxAddress.mainnet || stacksUser.profile.stxAddress.testnet
      return stacksAddress.slice(0, 6)
    }
    return 'Unknown'
  }

  const stats = [
    {
      title: "Total Trade Value",
      value: "245,678",
      currency: "FLOW",
      change: "+12.5%",
      trend: "up",
      icon: CircleDollarSign,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Active Trade Routes",
      value: "24",
      currency: "Routes",
      change: "+3",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Trading Partners",
      value: "156",
      currency: "Partners",
      change: "+8",
      trend: "up",
      icon: Users,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      currency: "",
      change: "-2.3%",
      trend: "down",
      icon: Activity,
      gradient: "from-amber-500 to-orange-500"
    }
  ]

  const recentTrades = [
    {
      name: "Gold Trade Route",
      type: "Resource Trade",
      time: "2 hours ago",
      amount: "+1,234",
      status: "completed",
      route: "Lagos → Cairo"
    },
    {
      name: "Silk Route",
      type: "Merchant Trade",
      time: "5 hours ago",
      amount: "+2,567",
      status: "completed",
      route: "Timbuktu → Zanzibar"
    },
    {
      name: "Spice Trade",
      type: "Resource Trade",
      time: "8 hours ago",
      amount: "-890",
      status: "failed",
      route: "Mombasa → Cape Town"
    },
    {
      name: "Ivory Exchange",
      type: "Luxury Trade",
      time: "1 day ago",
      amount: "+3,450",
      status: "completed",
      route: "Dakar → Marrakech"
    }
  ]

  const merchantFleet = [
    {
      id: 1,
      name: "Abdullah al-Battuta",
      specialty: "Spice Trader",
      level: 4,
      rarity: "Rare",
      profit: "+8.5%",
      experience: 1240,
      image: "/merchants/trader1.jpg"
    },
    {
      id: 2,
      name: "Amara Nwosu",
      specialty: "Gold Merchant",
      level: 6,
      rarity: "Epic",
      profit: "+12.3%",
      experience: 2340,
      image: "/merchants/trader2.jpg"
    },
    {
      id: 3,
      name: "Kwame Osei",
      specialty: "Salt Trader",
      level: 3,
      rarity: "Common",
      profit: "+5.2%",
      experience: 780,
      image: "/merchants/trader3.jpg"
    }
  ]

  const achievements = [
    {
      title: "First Trade",
      description: "Complete your first trade route",
      progress: 100,
      reward: "+100 XP",
      icon: Award
    },
    {
      title: "Trade Network",
      description: "Establish 10 trade routes",
      progress: 80,
      reward: "Rare Merchant",
      icon: MapPin
    },
    {
      title: "Gold Rush",
      description: "Trade 5,000 gold",
      progress: 65,
      reward: "+500 XP",
      icon: CircleDollarSign
    },
    {
      title: "Merchant Fleet",
      description: "Collect 5 merchant NFTs",
      progress: 60,
      reward: "Route Discount",
      icon: Users
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  // If not authenticated, render loading state while redirecting
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Command Center
          </h1>
          <p className="text-gray-400 mt-1">
            Welcome back, Merchant {getUserIdentifier()}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="relative overflow-hidden bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 hover:border-gray-600/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 z-0" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                  {stat.currency && <span className="text-sm text-gray-400 ml-1">{stat.currency}</span>}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Trades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Trades</h2>
              <Link href="/trade">
                <span className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  View All →
                </span>
              </Link>
            </div>
            <div className="space-y-4">
              {recentTrades.map((trade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg hover:bg-gray-700/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center
                      ${trade.status === 'completed' ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600'}`}>
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{trade.name}</h3>
                      <p className="text-sm text-gray-400">{trade.route}</p>
                      <p className="text-xs text-gray-500">{trade.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      trade.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.amount} FLOW
                    </p>
                    <p className={`text-sm ${
                      trade.status === 'completed' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 bg-gray-700/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <achievement.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{achievement.title}</h3>
                      <p className="text-xs text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{achievement.progress}%</span>
                      <span className="text-purple-400">{achievement.reward}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Merchant Fleet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Merchant Fleet</h2>
            <Link href="/marketplace">
              <span className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                View Marketplace →
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {merchantFleet.map((merchant, index) => (
              <div 
                key={merchant.id}
                className="relative overflow-hidden bg-gray-700/20 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
              >
                <div className="absolute top-2 right-2 bg-gray-900/70 rounded-full px-2 py-1">
                  <span className={`text-xs font-medium ${
                    merchant.rarity === 'Common' ? 'text-gray-300' :
                    merchant.rarity === 'Rare' ? 'text-blue-400' :
                    'text-purple-400'
                  }`}>
                    {merchant.rarity}
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-3 flex items-center justify-center overflow-hidden">
                  {/* You can replace this with actual merchant images */}
                  <span className="text-2xl font-bold text-white">{merchant.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-white mb-1">{merchant.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{merchant.specialty}</p>
                
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Level {merchant.level}</span>
                  <span className="text-green-400">{merchant.profit} profit</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${(merchant.experience % 1000) / 10}%` }}
                  ></div>
                </div>
                
                <button className="w-full py-2 mt-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-sm font-medium text-white transition-colors">
                  Assign to Route
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active Routes Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Active Trade Routes</h2>
          <div className="relative w-full h-96 bg-gray-700/20 rounded-lg overflow-hidden">
            {/* This would be where your interactive map goes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-purple-500/50 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Interactive Trade Routes Map Coming Soon</p>
                <Link href="/trade">
                  <span className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium text-white transition-colors">
                    Manage Trade Routes
                  </span>
                </Link>
              </div>
            </div>

            {/* Decorative route lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
              <path d="M200,150 Q300,50 400,200 T600,250" 
                    stroke="rgba(168,85,247,0.4)" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="10,10"
                    strokeLinecap="round" />
              <path d="M100,200 Q250,150 350,250 T700,200" 
                    stroke="rgba(236,72,153,0.3)" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="12,8"
                    strokeLinecap="round" />
              <path d="M150,300 Q300,250 450,300 T650,150" 
                    stroke="rgba(59,130,246,0.3)" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="8,12"
                    strokeLinecap="round" />
                    
              {/* Route points */}
              <circle cx="200" cy="150" r="5" fill="#a855f7" />
              <circle cx="400" cy="200" r="5" fill="#a855f7" />
              <circle cx="600" cy="250" r="5" fill="#a855f7" />
              
              <circle cx="100" cy="200" r="5" fill="#ec4899" />
              <circle cx="350" cy="250" r="5" fill="#ec4899" />
              <circle cx="700" cy="200" r="5" fill="#ec4899" />
              
              <circle cx="150" cy="300" r="5" fill="#3b82f6" />
              <circle cx="450" cy="300" r="5" fill="#3b82f6" />
              <circle cx="650" cy="150" r="5" fill="#3b82f6" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  )
}