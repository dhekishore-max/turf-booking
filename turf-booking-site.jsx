import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, MessageCircle, Send, Clock, MapPin, Users, IndianRupee, Calendar } from 'lucide-react';

export default function TurfBookingApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hi! 👋 Ask me about our turfs, pricing, or availability.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    hours: '1',
    name: '',
    phone: ''
  });

  const turfs = [
    {
      id: 1,
      name: 'Avinash Sports Arena',
      location: 'Race Course Road',
      sports: ['Football', 'Cricket', 'Badminton'],
      pricing: '₹500/hour',
      rating: 4.8,
      image: '🏟️',
      timings: '6 AM - 11 PM',
      amenities: ['Lights', 'Parking', 'Restrooms', 'Seating']
    },
    {
      id: 2,
      name: 'Champions Turf',
      location: 'Peelamedu',
      sports: ['Football', 'Basketball'],
      pricing: '₹600/hour',
      rating: 4.6,
      image: '⚽',
      timings: '7 AM - 10 PM',
      amenities: ['Lights', 'Water', 'Parking']
    },
    {
      id: 3,
      name: 'Victory Grounds',
      location: 'Gandhipuram',
      sports: ['Cricket', 'Volleyball', 'Basketball'],
      pricing: '₹400/hour',
      rating: 4.5,
      image: '🏏',
      timings: '6 AM - 10:30 PM',
      amenities: ['Lights', 'Equipment', 'Cafeteria']
    },
    {
      id: 4,
      name: 'Elite Sports Hub',
      location: 'Keeranatham',
      sports: ['Badminton', 'Tennis', 'Squash'],
      pricing: '₹800/hour',
      rating: 4.9,
      image: '🎾',
      timings: '6 AM - 11 PM',
      amenities: ['AC Courts', 'Lights', 'Coaching', 'Parking']
    },
    {
      id: 5,
      name: 'Green Field Turf',
      location: 'Tatabad',
      sports: ['Football', 'Kabaddi'],
      pricing: '₹450/hour',
      rating: 4.4,
      image: '🌱',
      timings: '7 AM - 9:30 PM',
      amenities: ['Lights', 'Parking', 'Restrooms']
    },
    {
      id: 6,
      name: 'Pro Play Arena',
      location: 'Brookefields',
      sports: ['All Sports', 'Multi-court'],
      pricing: '₹550/hour',
      rating: 4.7,
      image: '⭐',
      timings: '6 AM - 11 PM',
      amenities: ['Lights', 'Parking', 'Cafeteria', 'Coaching']
    }
  ];

  // AI Chatbot response logic
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost') || message.includes('₹')) {
      return 'Our turfs range from ₹400-₹800 per hour. Elite Sports Hub is premium (₹800), while Green Field Turf offers great value at ₹450/hour. Want to see specific pricing for a turf?';
    }
    if (message.includes('hours') || message.includes('timing') || message.includes('open')) {
      return 'Most turfs are open from 6-7 AM and close between 9:30-11 PM. Elite Sports Hub & Avinash Sports Arena stay open until 11 PM. All have lights for evening play.';
    }
    if (message.includes('cricket')) {
      return 'Cricket turfs available: Victory Grounds (₹400/hr, Gandhipuram), Avinash Sports Arena (₹500/hr, Race Course). Both have great ratings!';
    }
    if (message.includes('football')) {
      return 'Football turfs: Champions Turf (₹600/hr), Avinash Sports Arena (₹500/hr), Green Field Turf (₹450/hr). All are well-lit for evening matches.';
    }
    if (message.includes('booking') || message.includes('book')) {
      return 'To book: 1) Choose a turf, 2) Pick date & time, 3) Select duration, 4) Confirm details. Need help with a specific turf?';
    }
    if (message.includes('best') || message.includes('recommend')) {
      return 'Elite Sports Hub has the best rating (4.9★) with AC courts. For budget-friendly: Green Field Turf (₹450/hr). Both highly recommended!';
    }
    if (message.includes('amenities') || message.includes('facilities')) {
      return 'Top amenities: 🕯️ Lights (all turfs), 🅿️ Parking (most), 💧 Water, ☕ Cafeteria, 🎓 Coaching available at some. Which turf interests you?';
    }
    return '📍 I can help you find turfs, check pricing, timings, and book slots. Ask about sports, prices, locations, or recommendations!';
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    
    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = { role: 'bot', text: generateAIResponse(chatInput) };
      setChatMessages(prev => [...prev, botResponse]);
    }, 500);

    setChatInput('');
  };

  const handleBooking = () => {
    if (!bookingData.date || !bookingData.time || !bookingData.name || !bookingData.phone) {
      alert('Please fill all fields');
      return;
    }
    alert(`✅ Booking confirmed!\n\n${selectedTurf.name}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nDuration: ${bookingData.hours} hour(s)\n\nWe'll send confirmation to ${bookingData.phone}`);
    setShowBookingModal(false);
    setBookingData({ date: '', time: '', hours: '1', name: '', phone: '' });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">⚽ TurfHub Coimbatore</div>
          
          <div className="hidden md:flex gap-6">
            <button onClick={() => setCurrentPage('home')} className={`font-medium ${currentPage === 'home' ? 'text-indigo-600' : 'text-gray-600'}`}>Home</button>
            <button onClick={() => setCurrentPage('turfs')} className={`font-medium ${currentPage === 'turfs' ? 'text-indigo-600' : 'text-gray-600'}`}>Browse Turfs</button>
            <button onClick={() => setCurrentPage('about')} className={`font-medium ${currentPage === 'about' ? 'text-indigo-600' : 'text-gray-600'}`}>About</button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 p-4 flex flex-col gap-3">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">Home</button>
            <button onClick={() => { setCurrentPage('turfs'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">Browse Turfs</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">About</button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Home Page */}
        {currentPage === 'home' && (
          <div>
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Perfect Turf in Coimbatore</h1>
              <p className="text-lg mb-6">Play cricket, football, badminton & more at the best prices</p>
              <button 
                onClick={() => setCurrentPage('turfs')}
                className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Browse All Turfs →
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-bold text-lg mb-2">Top Rated Turfs</h3>
                <p className="text-gray-600">4.5+ ★ rated facilities with great amenities</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-bold text-lg mb-2">Easy Booking</h3>
                <p className="text-gray-600">Book in minutes, instant confirmation on WhatsApp</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-bold text-lg mb-2">Best Prices</h3>
                <p className="text-gray-600">₹400-₹800/hour, no hidden charges</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Featured Turfs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {turfs.slice(0, 3).map(turf => (
                <div key={turf.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="text-6xl bg-indigo-100 p-4 text-center">{turf.image}</div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{turf.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin size={16} /> {turf.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock size={16} /> {turf.timings}
                    </div>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {turf.sports.map(sport => <span key={sport} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">{sport}</span>)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-indigo-600">{turf.pricing}</span>
                      <span className="text-yellow-500 font-bold">{turf.rating}★</span>
                    </div>
                    <button 
                      onClick={() => { setSelectedTurf(turf); setShowBookingModal(true); }}
                      className="w-full mt-4 bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Browse Turfs Page */}
        {currentPage === 'turfs' && (
          <div>
            <h1 className="text-4xl font-bold mb-8">All Turfs in Coimbatore</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {turfs.map(turf => (
                <div key={turf.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="text-6xl bg-gradient-to-br from-indigo-100 to-blue-100 p-4 text-center">{turf.image}</div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{turf.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin size={16} /> {turf.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock size={16} /> {turf.timings}
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Sports Available:</p>
                      <div className="flex gap-2 flex-wrap">
                        {turf.sports.map(sport => <span key={sport} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">{sport}</span>)}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Amenities:</p>
                      <div className="grid grid-cols-2 gap-1">
                        {turf.amenities.map(amenity => <span key={amenity} className="text-xs text-gray-700">✓ {amenity}</span>)}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4 pt-3 border-t">
                      <span className="font-bold text-lg text-indigo-600">{turf.pricing}</span>
                      <span className="text-yellow-500 font-bold">{turf.rating}★</span>
                    </div>
                    
                    <button 
                      onClick={() => { setSelectedTurf(turf); setShowBookingModal(true); }}
                      className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Page */}
        {currentPage === 'about' && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">About TurfHub</h1>
            <p className="text-gray-700 mb-4">
              TurfHub is your one-stop platform for booking the best sports turfs in Coimbatore. We connect casual players with premium facilities at affordable prices.
            </p>
            <h2 className="text-2xl font-bold mb-3 mt-6">Why Choose Us?</h2>
            <ul className="text-gray-700 space-y-2">
              <li>✓ 6+ verified turfs across Coimbatore</li>
              <li>✓ Real-time availability & instant booking</li>
              <li>✓ Best prices (₹400-₹800/hour)</li>
              <li>✓ AI chatbot for instant support</li>
              <li>✓ WhatsApp confirmation & reminders</li>
              <li>✓ All sports: Cricket, Football, Badminton, Volleyball & more</li>
            </ul>
            <h2 className="text-2xl font-bold mb-3 mt-6">Contact Us</h2>
            <p className="text-gray-700">
              📞 +91 98765 43210<br/>
              📧 support@turfhub.in<br/>
              📍 Coimbatore, Tamil Nadu
            </p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTurf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Book {selectedTurf.name}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Date</label>
                <input 
                  type="date" 
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Time</label>
                <input 
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Duration (hours)</label>
                <select 
                  value={bookingData.hours}
                  onChange={(e) => setBookingData({...bookingData, hours: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                >
                  {[1,2,3,4,5,6].map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Your Name</label>
                <input 
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number</label>
                <input 
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  placeholder="98765 43210"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm">
                  <span className="font-semibold">Total: </span>
                  {parseInt(bookingData.hours) * parseInt(selectedTurf.pricing.split('₹')[1])} 
                  {' '}₹
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={handleBooking}
                className="flex-1 bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <button 
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition z-30"
      >
        <MessageCircle size={24} />
      </button>

      {showChatbot && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl w-96 max-h-96 flex flex-col z-40">
          <div className="bg-indigo-600 text-white p-4 font-bold rounded-t-lg flex justify-between items-center">
            <span>TurfHub AI Assistant</span>
            <button onClick={() => setShowChatbot(false)} className="text-xl">×</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-3 flex gap-2">
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about turfs..."
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}