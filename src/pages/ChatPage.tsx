import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './ChatPage.module.css';
import { Navigation } from "@/ui/components/navigation/navigation";
import { REGISTERED } from "@/lib/session-status";
import { Session } from "@/ui/components/session/session";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, where } from 'firebase/firestore';
import { db } from "@/config/firebase-config";
import { useAuth } from "@/context/AuthUserContext";
import { Timestamp } from 'firebase/firestore';

interface FeaturesListInterface {
  imagePath: string;
  imageAlt: string;
  description: string;
}

interface Message {
  id: string;
  author: string;
  text: string;
  timestamp: any;
  date: string;
}

const ChatPage: React.FC = () => {
  const { authUser } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<'fr' | 'en'>('en');

  const featuresData: FeaturesListInterface[] = [
    {
      imagePath: "/assets/svg/welcome2.svg",
      imageAlt: "illustration",
      description: "Votre compagnon pour gérer le stress et réussir.",
    },
    {
      imagePath: "/assets/svg/help.svg",
      imageAlt: "illustration",
      description: "Obtenez des conseils et des ressources.",
    },
    {
      imagePath: "/assets/svg/book.svg",
      imageAlt: "illustration",
      description: "Outils pour améliorer votre concentration.",
    },
    {
      imagePath: "/assets/svg/phone.svg",
      imageAlt: "illustration",
      description: "Contactez notre équipe pour un soutien.",
    },
  ];

  const featuredList = featuresData.map((feature) => (
    <div key={uuidv4()} className="flex flex-col items-center justify-center bg-white rounded p-7">
      <div className="relative w-[15px] h-[15px] rounded-[20px] mb-6 p-10 overflow-hidden">
        <Image fill src={feature.imagePath} alt={feature.imageAlt} className="object-scale-down blur-2xl" />
        <Image fill src={feature.imagePath} alt={feature.imageAlt} className="object-scale-down" />
      </div>
      <Typography variant="body-base" component="h1" theme="gray" className="text-center">
        {feature.description}
      </Typography>
    </div>
  ));

  const sendMessageToChatbot = async () => {
    if (message.trim() === '') return;

    const newMessage: Message = {
      id: uuidv4(),
      author: 'User',
      text: message,
      timestamp: Timestamp.now(),
      date: new Date().toLocaleDateString(),
    };

    await saveMessage(newMessage);
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage('');

    try {
      const res = await axios.post('http://127.0.0.1:5000/chat', { message, language });
      const botMessage: Message = {
        id: uuidv4(),
        author: 'Bot',
        text: res.data.response,
        timestamp: Timestamp.now(),
        date: new Date().toLocaleDateString(),
      };

      await saveMessage(botMessage);
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      const errorMessage: Message = {
        id: uuidv4(),
        author: 'Bot',
        text: "Désolé, une erreur s'est produite.",
        timestamp: Timestamp.now(),
        date: new Date().toLocaleDateString(),
      };

      await saveMessage(errorMessage);
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const saveMessage = async (message: Message) => {
    try {
      if (authUser) {
        await addDoc(collection(db, `users/${authUser.uid}/Message`), message);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du message :", error);
    }
  };

  const loadMessages = async () => {
    try {
      if (authUser) {
        const messagesQuery = query(collection(db, `users/${authUser.uid}/Message`), orderBy("timestamp"));
        const querySnapshot = await getDocs(messagesQuery);
        const loadedMessages: Message[] = [];

        querySnapshot.forEach((doc) => {
          const messageData = doc.data() as Message;
          if (!messageData.date) {
            messageData.date = new Date(messageData.timestamp?.toDate()).toLocaleDateString();
          }
          loadedMessages.push(messageData);
        });

        setMessages(loadedMessages);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des messages :", error);
    }
  };

  useEffect(() => {
    if (authUser) {
      loadMessages();
    }
  }, [authUser]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessageToChatbot();
    }
  };

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
  };

  const deleteSession = async (sessionDate: string) => {
    try {
      if (authUser) {
        const messagesQuery = query(collection(db, `users/${authUser.uid}/Message`), where("date", "==", sessionDate));
        const querySnapshot = await getDocs(messagesQuery);

        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        const updatedMessages = messages.filter(msg => msg.date !== sessionDate);
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la session :", error);
    }
  };

  return (
    <Session sessionStatus={REGISTERED}>
      <Navigation />
      <div className={styles.chatContainer}>
        <div className={styles.sidebar}>
          <div className="flex items-center space-x-2">
            <Image src="/assets/svg/robot.svg" alt="Image de bienvenue" width={35} height={35} className="" />
            <h2 className="text-lg font-bold mt-3">Historique Conversation</h2>
          </div>
          <ul className={styles.historyList}>
            {messages.map((msg, index) => (
              <li key={msg.id} className={`${styles.historyItem} ${msg.author === 'User' ? styles.userMessage : styles.botMessage}`}>
                <p>{msg.text}</p>
                {msg.author === 'User' && (
                  <img
                    src="/assets/svg/delete.svg"
                    alt="Supprimer"
                    className={styles.deleteIcon}
                    onClick={() => deleteSession(msg.date)}
                  
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.main}>
          <div className={styles.languageSlider}>
            <span onClick={() => handleLanguageChange('fr')} className={`${styles.languageOption} ${language === 'fr' ? styles.activeLanguage : ''}`}>FR</span>
            <span onClick={() => handleLanguageChange('en')} className={`${styles.languageOption} ${language === 'en' ? styles.activeLanguage : ''}`}>EN</span>
          </div>
          <h1 className={styles.chatTitle}>EduSupport Chatbot</h1>
          <div className={styles.messagesContainer}>
            {messages.length === 0 && (
              <div className="grid grid-cols-4 col-span-7 gap-7 mt-14">
                {featuredList}
              </div>
            )}
            {messages.map((msg, index) => (
                 <div className={styles.chatdate}>
                   {index === 0 || messages[index - 1].date !== msg.date ? (
                  <p className={styles.dateSeparator}>{msg.date}</p>
                ) : null}
                </div>  
              ))}
            {messages.map((msg, index) => (
              <div key={msg.id} className={`${styles.message} ${msg.author === 'User' ? styles.userMessage : styles.botMessage}`}>
               
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message ici..."
              className={styles.inputField}
            />
            <button onClick={sendMessageToChatbot} className={styles.sendButton}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </Session>
  );
};

export default ChatPage;
