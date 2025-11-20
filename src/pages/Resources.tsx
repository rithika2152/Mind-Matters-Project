import React from 'react';
import { Book, ExternalLink, BookOpen, Brain, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const Resources = () => {
  const articles = [
    {
      title: 'Understanding Anxiety',
      description: 'Learn about anxiety symptoms and coping strategies.',
      type: 'Article',
      readTime: '5 min',
      link: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders'
    },
    {
      title: 'Stress Management Guide',
      description: 'Comprehensive guide to managing daily stress.',
      type: 'Guide',
      readTime: '10 min',
      link: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/'
    },
    {
      title: 'Sleep Hygiene Tips',
      description: 'Improve your sleep quality with these evidence-based tips.',
      type: 'Article',
      readTime: '7 min',
      link: 'https://www.sleepfoundation.org/sleep-hygiene'
    },
    {
      title: 'Meditation Basics',
      description: 'Getting started with meditation practice.',
      type: 'Guide',
      readTime: '8 min',
      link: 'https://www.headspace.com/meditation-101'
    }
  ];

  const stories = [
    {
      title: "Overcoming Social Anxiety",
      author: "Sarah, 23",
      content: "I struggled with social anxiety throughout college. Every presentation felt like a mountain to climb. Through therapy and gradual exposure, I learned to manage my anxiety. I started with small group discussions, then worked my way up to class presentations. Today, I'm a confident public speaker.",
      tips: [
        "Start with small social interactions",
        "Practice deep breathing exercises",
        "Challenge negative thoughts",
        "Celebrate small victories"
      ]
    },
    {
      title: "Journey Through Depression",
      author: "Mike, 25",
      content: "Depression made even simple tasks feel impossible. I found help through a combination of therapy, exercise, and connecting with others who understood. Building a routine and setting small, achievable goals helped me regain control of my life.",
      tips: [
        "Establish a daily routine",
        "Exercise regularly, even if just a short walk",
        "Reach out to friends and family",
        "Seek professional help when needed"
      ]
    },
    {
      title: "Managing Academic Stress",
      author: "Emily, 20",
      content: "The pressure of deadlines and expectations became overwhelming. I learned to break large tasks into smaller ones and practice self-compassion. Mindfulness and time management techniques helped me find balance.",
      tips: [
        "Break large tasks into smaller steps",
        "Use time management tools",
        "Take regular study breaks",
        "Practice self-care"
      ]
    }
  ];

  const helpfulLinks = [
    {
      title: "National Mental Health Resources",
      url: "https://www.nimh.nih.gov/health",
      icon: Brain
    },
    {
      title: "Anxiety and Depression Association",
      url: "https://adaa.org",
      icon: Heart
    },
    {
      title: "Student Mental Health Guide",
      url: "https://www.activeminds.org",
      icon: BookOpen
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton to="/dashboard" />
      
      <motion.div 
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Book className="h-12 w-12 text-primary-600 mx-auto mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Mental Health Resources</h1>
        <p className="text-gray-600">Educational materials and real stories to support your wellbeing journey</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {articles.map((resource, index) => (
          <motion.a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{resource.title}</h2>
              <ExternalLink className="h-5 w-5 text-primary-600" />
            </div>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                {resource.type}
              </span>
              <span className="text-sm text-gray-500">
                {resource.readTime} read
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.section 
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Success Stories</h2>
        <div className="space-y-6">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
              <p className="text-primary-600 mb-4">By {story.author}</p>
              <p className="text-gray-600 mb-4">{story.content}</p>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Helpful Tips:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {story.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {helpfulLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-3"
                whileHover={{ y: -5 }}
              >
                <Icon className="h-6 w-6 text-primary-600" />
                <span className="text-gray-800">{link.title}</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </motion.a>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};

export default Resources;