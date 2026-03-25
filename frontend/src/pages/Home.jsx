
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  RocketLaunchIcon, 
  ChatBubbleLeftRightIcon, 
  UsersIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setHeroLoaded(true);
  }, []);

  const features = [
    { icon: RocketLaunchIcon, title: "Lightning Fast", desc: "Real-time messaging with zero lag" },
    { icon: ChatBubbleLeftRightIcon, title: "End-to-End Encrypted", desc: "Your chats are 100% secure" },
    { icon: UsersIcon, title: "Group Chats", desc: "Connect with unlimited friends" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-8 h-8 text-white animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              ChatSphere
            </h1>
          </div>
          <Link 
            to="/login" 
            className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
          >
            Get Started
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-32 px-6 max-w-7xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Left Content */}
            <div className="lg:pr-12">
              <div className="inline-block py-2 px-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                <span className="text-purple-200 font-medium">🚀 New Era of Messaging</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight animate-float">
                <span>Revolutionize</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Your Chats
                </span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed animate-slide-up">
                Experience the future of messaging with real-time conversations, 
                stunning animations, and unbreakable security. Connect like never before.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/login"
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 transition-all duration-500 flex items-center space-x-3"
                >
                  <span>Start Chatting</span>
                  <RocketLaunchIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
     <Link
            to="/register"
            className="px-6 py-3 border relative bg-gradient-to-r from-indigo-500 to-brown-600 border-white text-white rounded-xl hover:bg-white/20   transform hover:-translate-y-2 transition-all duration-500 flex items-center space-x-3"
          >
            New User
          </Link>
              </div>

              {/* Live Users Counter */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  <span className="text-green-300 font-semibold">12,847</span>
                  <span className="text-gray-300">Online Now</span>
                </div>
              </div>
            </div>

            {/* Right Chat Preview */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-float-slow">
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Sarah Wilson</h3>
                      <p className="text-xs text-gray-300">Active 2 mins ago</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-6 h-64 overflow-hidden">
                  <div className="flex space-x-3 animate-slide-in-right">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-xs">
                      <p className="text-white text-sm">Hey! How's your day going? 😊</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end animate-slide-in-left">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-2xl max-w-xs">
                      <p className="text-sm">Going great! Just finished a cool project 🚀</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 animate-slide-in-right delay-200">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-xs">
                      <p className="text-white text-sm">That's awesome! Show me what you built 👀</p>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center space-x-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-gray-300 text-sm">Sarah is typing...</span>
                </div>
              </div>

              {/* Floating Chat Bubbles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-2xl border-2 border-white/20 animate-bubble-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full border-2 border-white/20 animate-bubble-float-slow"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* <section className="px-6 max-w-7xl mx-auto mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Everything You <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Need</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">Built for modern communication with cutting-edge technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-4 animate-slide-up ${index % 2 === 0 ? 'animate-delay-500' : 'animate-delay-1000'}`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">{feature.title}</h3>
                <p className="text-gray-200 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section> */}
      </div>

      
      
    </div>
  );
};

export default HomePage;



























// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   RocketLaunchIcon, 
//   ChatBubbleLeftRightIcon, 
//   UsersIcon,
//   SparklesIcon
// } from '@heroicons/react/24/outline';

// const HomePage = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const features = [
//     { icon: RocketLaunchIcon, title: "Lightning Fast", desc: "Real-time messaging with zero lag" },
//     { icon: ChatBubbleLeftRightIcon, title: "End-to-End Encrypted", desc: "Your chats are 100% secure" },
//     { icon: UsersIcon, title: "Group Chats", desc: "Connect with unlimited friends" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">

//       {/* Navbar */}
//       <nav className="px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-black/20">
//         <div className="flex items-center space-x-2">
//           <SparklesIcon className="w-8 h-8 text-white" />
//           <h1 className="text-2xl font-bold text-white">ChatSphere</h1>
//         </div>

//         <Link 
//           to="/login" 
//           className="px-6 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition"
//         >
//           Get Started
//         </Link>
//       </nav>

//       {/* Hero */}
//       <section className="pt-20 px-6 text-center">
//         <h1 className="text-5xl font-bold text-white mb-6">
//           Revolutionize Your Chats 🚀
//         </h1>

//         <p className="text-gray-300 max-w-xl mx-auto mb-8">
//           Experience real-time messaging with modern UI and smooth animations.
//         </p>

//         <div className="flex justify-center gap-4">
//           <Link
//             to="/login"
//             className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
//           >
//             Start Chatting
//           </Link>

//           <Link
//             to="/demo"
//             className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white/20 transition"
//           >
//             Watch Demo
//           </Link>
//         </div>
//       </section>

//       {/* Scroll Button */}
//       <div className="text-center mt-16">
//         <a 
//           href="#features"
//           className="text-white underline"
//         >
//           Scroll to Features ↓
//         </a>
//       </div>

//       {/* Features */}
//       <section id="features" className="mt-20 px-6">
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div 
//               key={index}
//               className="p-6 bg-white/10 rounded-xl text-white text-center"
//             >
//               <feature.icon className="w-10 h-10 mx-auto mb-4" />
//               <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//               <p className="text-gray-300">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default HomePage;