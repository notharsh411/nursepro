import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let response = '';
    let newContext = null;

    // Appointment booking context
    if (context === 'appointment') {
      if (lowerInput.includes('slot') || lowerInput.includes('time') || lowerInput.includes('when')) {
        response = "We have the following slots available for this week:\n- Monday: 10 AM, 2 PM\n- Tuesday: 11 AM, 3 PM\n- Wednesday: 9 AM, 1 PM\n- Thursday: 10 AM, 4 PM\n- Friday: 11 AM, 2 PM\nWhich day and time would you prefer?";
        newContext = 'appointment_slot';
      } else if (lowerInput.includes('hold') || lowerInput.includes('reserve')) {
        response = "We can hold a slot for you for up to 24 hours. Would you like me to reserve a slot for you now?";
        newContext = 'appointment_hold';
      } else if (lowerInput.includes('cancel') || lowerInput.includes('reschedule')) {
        response = "To cancel or reschedule an appointment, please call our office at (123) 456-7890 or log into your patient portal. Do you need help accessing the patient portal?";
        newContext = 'appointment_change';
      } else {
        response = "I'm here to help with your appointment. Would you like to book a new appointment, check available slots, or make changes to an existing appointment?";
      }
    }
    // Appointment slot context
    else if (context === 'appointment_slot') {
      if (lowerInput.includes('hold') || lowerInput.includes('reserve')) {
        response = "I can hold your preferred slot for 24 hours. Which day and time would you like me to reserve for you?";
        newContext = 'appointment_hold';
      } else if (lowerInput.includes('monday') || lowerInput.includes('tuesday') || lowerInput.includes('wednesday') || lowerInput.includes('thursday') || lowerInput.includes('friday')) {
        response = "Great choice! I can reserve that slot for you. Would you like me to go ahead and book it, or just hold it for now?";
        newContext = 'appointment_confirm';
      } else {
        response = "I'm sorry, I didn't catch which day and time you prefer. Could you please specify a day (Monday to Friday) and time from the available slots I mentioned earlier?";
      }
    }
    // New health diagnosis context
    else if (context === 'diagnosis') {
      if (lowerInput.includes('symptom') || lowerInput.includes('feel')) {
        response = "I understand you're not feeling well. Can you describe your symptoms in more detail? For example, do you have a fever, cough, or any pain?";
        newContext = 'symptoms';
      } else if (lowerInput.includes('test') || lowerInput.includes('exam')) {
        response = "Based on your symptoms, you might need some tests. However, it's important to consult with a healthcare professional for an accurate diagnosis. Would you like me to help you book an appointment with a doctor?";
        newContext = 'appointment';
      } else {
        response = "I'm here to help with general health inquiries, but remember that for accurate diagnosis and treatment, it's best to consult with a healthcare professional. Is there anything specific you'd like to know about your health concern?";
      }
    }
    // New pre-care context
    else if (context === 'pre_care') {
      if (lowerInput.includes('surgery') || lowerInput.includes('operation')) {
        response = "Before surgery, it's important to follow your doctor's instructions carefully. This may include fasting, stopping certain medications, or arranging for someone to drive you home. Do you have a specific pre-surgery concern?";
      } else if (lowerInput.includes('test') || lowerInput.includes('exam')) {
        response = "Preparation for medical tests can vary. Some tests require fasting, while others may need you to adjust medications. What specific test are you preparing for?";
      } else {
        response = "Pre-care instructions can differ based on the procedure or test. It's best to follow the specific guidelines provided by your healthcare provider. Is there a particular aspect of pre-care you're unsure about?";
      }
    }
    // New post-care context
    else if (context === 'post_care') {
      if (lowerInput.includes('pain') || lowerInput.includes('discomfort')) {
        response = "Some pain or discomfort after a procedure is normal. However, if the pain is severe or increasing, you should contact your healthcare provider. Are you experiencing any other symptoms besides pain?";
      } else if (lowerInput.includes('medication') || lowerInput.includes('medicine')) {
        response = "It's crucial to take your medications as prescribed. If you're having side effects or concerns about your medication, please consult your doctor or pharmacist. Do you need more information about a specific medication?";
      } else {
        response = "Post-care involves following your doctor's instructions, taking prescribed medications, and attending follow-up appointments. If you have any unusual symptoms or concerns during your recovery, don't hesitate to contact your healthcare provider. Is there a specific post-care issue you're dealing with?";
      }
    }
    // New first aid context
    else if (context === 'first_aid') {
      if (lowerInput.includes('cut') || lowerInput.includes('bleeding')) {
        response = "For a minor cut, clean the wound with cool water, apply gentle pressure to stop bleeding, and cover with a sterile bandage. For severe bleeding, apply firm, direct pressure and seek immediate medical attention. Do you need more specific instructions?";
      } else if (lowerInput.includes('burn')) {
        response = "For minor burns, run cool (not cold) water over the area for about 10 minutes. Cover with a clean, dry dressing. Don't apply ice, butter, or ointments. For severe burns, seek immediate medical attention. Is the burn pain getting worse?";
      } else if (lowerInput.includes('choking')) {
        response = "If someone is choking and can't breathe, cough, or speak, stand behind them and give 5 sharp blows between the shoulder blades with the heel of your hand. If this doesn't work, perform abdominal thrusts (Heimlich maneuver). Always call for emergency help in choking situations. Do you need me to explain the Heimlich maneuver?";
      } else {
        response = "First aid knowledge is crucial for emergencies. Remember, for any life-threatening situation, always call emergency services immediately. What specific first aid information are you looking for?";
      }
    }
    // General queries (including new topics)
    else if (lowerInput.includes('health') && lowerInput.includes('concern')) {
      response = "I understand you have a health concern. While I can provide general information, it's important to consult a healthcare professional for personalized medical advice. Can you tell me more about your specific concern?";
      newContext = 'diagnosis';
    } else if (lowerInput.includes('prepare') && (lowerInput.includes('surgery') || lowerInput.includes('procedure'))) {
      response = "Preparing for a medical procedure is important. The specific preparations can vary depending on the type of procedure. What kind of procedure are you preparing for?";
      newContext = 'pre_care';
    } else if (lowerInput.includes('after') && (lowerInput.includes('surgery') || lowerInput.includes('procedure'))) {
      response = "Post-procedure care is crucial for proper recovery. The specific care instructions depend on the procedure you've had. What procedure did you recently undergo?";
      newContext = 'post_care';
    } else if (lowerInput.includes('first aid') || lowerInput.includes('emergency')) {
      response = "First aid knowledge is important for everyone. Are you looking for information about a specific first aid situation, like cuts, burns, or choking?";
      newContext = 'first_aid';
    } else if (lowerInput.includes('book') && lowerInput.includes('appointment')) {
      response = "Certainly! I can help you book an appointment. Do you have a preferred day or time in mind, or would you like me to list our available slots for this week?";
      newContext = 'appointment';
    } else if (lowerInput.includes('opening') && lowerInput.includes('hours')) {
      response = "Our clinic is open Monday to Friday from 9 AM to 5 PM, and Saturdays from 10 AM to 2 PM. We're closed on Sundays and public holidays. Is there a specific day you're interested in?";
      newContext = 'hours';
    } else if (lowerInput.includes('services') || lowerInput.includes('treatments')) {
      response = "We offer a wide range of services including:\n- General check-ups\n- Vaccinations\n- Minor surgeries\n- Specialist consultations\n- Chronic disease management\n- Mental health services\nWhat specific service are you interested in?";
      newContext = 'services';
    } else if (lowerInput.includes('insurance')) {
      response = "We accept most major insurance plans, including:\n- BlueCross BlueShield\n- Aetna\n- Cigna\n- UnitedHealthcare\n- Medicare and Medicaid\nIt's best to check with your insurance provider about specific coverage. Would you like me to provide our billing department's contact information?";
      newContext = 'insurance';
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      response = "Hello! Welcome to NurseConnect Pro. How can I assist you today? I can help with booking appointments, provide information about our services, or answer general health questions. Please note that for specific medical advice, it's best to consult with a healthcare professional.";
    } else if (lowerInput.includes('thank')) {
      response = "You're welcome! Is there anything else I can help you with today? Remember, I'm here to provide general information and assistance, but for specific medical advice, please consult with a healthcare professional.";
      newContext = null;
    } else {
      response = "I'm here to help with various health-related topics, including general health concerns, appointment booking, pre and post-care information, and first aid guidance. However, please remember that for specific medical advice, diagnosis, or treatment, it's best to consult with a healthcare professional. How can I assist you today?";
      newContext = null;
    }

    setContext(newContext);
    return response;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(msgs => [...msgs, userMessage]);
      
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages(msgs => [...msgs, { text: botResponse, sender: 'bot' }]);
      }, 1000);
      
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[32rem] flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle size={24} className="mr-2" />
              <span>NurseBot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200">
              &times;
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;