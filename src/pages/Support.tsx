import React, { useState, useRef, useEffect } from 'react';
import { HeartHandshake, Phone, MessageCircle, Mail, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../components/BackButton';
import { generateResponse, createMessage } from '../services/chatbotService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Support = () => {
  const [messages, setMessages] = useState<Message[]>([
    createMessage("Hello! I'm here to support you. How can I help you today?", 'bot')
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = createMessage(newMessage, 'user');
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = createMessage(generateResponse(newMessage), 'bot');
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton to="/dashboard" />
      
      <div className="text-center mb-8">
        <HeartHandshake className="h-12 w-12 text-purple-600 mx-auto mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">24/7 Support</h1>
        <p className="text-gray-600">We're here to help whenever you need us</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Phone className="mr-2 text-purple-600" />
            Emergency Contacts
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h3 className="font-semibold text-red-800">Crisis Helpline</h3>
              <p className="text-red-600">1800-599-0019</p>
              <p className="text-sm text-red-700 mt-1">Available 24/7 for immediate support</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="font-semibold text-purple-800">Mental Health Support (Vandrevala Foundation crisis intervention helpline)</h3>
              <p className="text-purple-600">+91 9999 666 555</p>
              <p className="text-sm text-purple-700 mt-1"></p>
            </div>
          </div>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={false}
          animate={{ height: isChatOpen ? 'auto' : '140px' }}
        >
          <div 
            className="p-6 cursor-pointer"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle className="mr-2 text-purple-600" />
              Chat Support
            </h2>
            <p className="text-gray-600">
              {isChatOpen ? "Click to minimize" : "Click to start chatting with our support bot"}
            </p>
          </div>

          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-t border-gray-100"
              >
                <div className="h-96 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.text}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      />
                      <button
                        type="submit"
                        className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Mail className="mr-2 text-purple-600" />
            Email Support
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                rows={4}
                placeholder="Describe your concerns..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;