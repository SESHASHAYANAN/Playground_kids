import React, { useState, useEffect } from "react";
import nestLogo from "./NEST SCHOOL.jpeg";

function LoginPage({ onLogin }) {
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-4">
            <form
                className="bg-[#121212] p-8 rounded-2xl shadow-2xl max-w-md w-full border border-[#2a2a2a] animate-fade-in"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!name.trim() || !pwd.trim()) {
                        setError("Enter both name and password");
                        return;
                    }
                    setError("");
                    onLogin(name, pwd);
                }}
            >
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#64ffda] to-[#3a506b] flex items-center justify-center animate-pulse-glow">
                        <span className="text-3xl">🏆</span>
                    </div>
                </div>
                <h2 className="text-center mb-8 text-3xl font-bold text-[#64ffda] animate-slide-up">
                    NEST Sports Booking
                </h2>
                <p className="text-center text-gray-400 mb-8 animate-fade-in-delay">Book your favorite sports facilities</p>
                <div className="mb-6 bg-[#1e1e1e] p-5 rounded-lg transform hover:scale-[1.02] transition-all duration-300">
                    <label htmlFor="user-name" className="text-gray-300 mb-2 block font-medium">
                        Your Name
                    </label>
                    <input
                        id="user-name"
                        type="text"
                        className="input-dark w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="mb-6 bg-[#1e1e1e] p-5 rounded-lg transform hover:scale-[1.02] transition-all duration-300">
                    <label htmlFor="user-pwd" className="text-gray-300 mb-2 block font-medium">
                        Password
                    </label>
                    <input
                        id="user-pwd"
                        type="password"
                        className="input-dark w-full"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>
                {error && (
                    <div className="text-red-400 mb-4 font-medium text-center bg-red-500/10 py-2 rounded-lg animate-shake">
                        {error}
                    </div>
                )}
                <button type="submit" className="btn-primary w-full py-3 text-lg mt-4 animate-bounce-subtle">
                    Login
                </button>
            </form>
        </div>
    );
}

function PieChart({ data }) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;
    return (
        <div className="flex flex-col items-center gap-6">
            <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-lg animate-spin-slow">
                {data.map((item, index) => {
                    const percentage = item.value / total;
                    const angle = percentage * 360;
                    const endAngle = startAngle + angle;
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                    startAngle = endAngle;
                    return <path key={index} d={pathData} fill={item.color} stroke="#1a1a2e" strokeWidth="0.5" className="hover:opacity-80 transition-opacity cursor-pointer" />;
                })}
            </svg>
            <div className="flex flex-wrap gap-3 justify-center">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-[#1e1e1e] px-3 py-1.5 rounded-full hover:scale-105 transition-transform cursor-pointer">
                        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-300">{item.name}: {item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ScatterPlot({ data }) {
    const maxValue = Math.max(...data.map((item) => item.bookings), 1);
    return (
        <div className="bg-[#1e1e1e] p-6 rounded-xl">
            <div className="relative h-48 border-l-2 border-b-2 border-gray-600">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 translate-y-1/2 hover:scale-150 transition-transform cursor-pointer animate-bounce-dot"
                        style={{
                            left: `${(index / (data.length - 1 || 1)) * 100}%`,
                            bottom: `${(item.bookings / maxValue) * 100}%`,
                            backgroundColor: ["#FF6B6B", "#4A00E0", "#10B981", "#3B82F6", "#F59E0B"][item.sportId % 5],
                            animationDelay: `${index * 0.1}s`
                        }}
                        title={`${item.date}: ${item.bookings} bookings`}
                    ></div>
                ))}
            </div>
        </div>
    );
}



function SportsBookingApp({ currentUser, onLogout }) {
    const [currentView, setCurrentView] = useState("sportsListing");
    const [selectedSport, setSelectedSport] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [activeProfileTab, setActiveProfileTab] = useState("bookings");
    const [user, setUser] = useState({ ...currentUser, bookings: [] });
    const [sports, setSports] = useState([
        { id: 1, name: "Pickleball", pricePerHr: 600, duration: "1 hr", features: ["Indoor Court", "Equipment Provided", "Air Conditioning", "Coaching Available"], image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400", icon: "🏓" },
        { id: 2, name: "Shooting", pricePerHr: 4500, duration: "1:15 hrs", priceNote: "(not per hr)", features: ["Professional Range", "Safety Equipment", "Instructor", "Multiple Targets"], image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400", icon: "🎯" },
        { id: 3, name: "Archery", pricePerHr: 4500, duration: "1 hr", features: ["Outdoor Range", "Bow & Arrows", "Target Practice", "Beginner Friendly"], image: "https://images.unsplash.com/photo-1565408054866-b13da89d0caa?w=400", icon: "🏹" },
        { id: 4, name: "Badminton", pricePerHr: 400, duration: "1:30 hrs", features: ["Indoor Court", "Synthetic Surface", "Good Lighting", "Shuttle Provided"], image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400", icon: "🏸" },
        { id: 5, name: "Basket Ball", pricePerHr: 1000, duration: "1 hr", features: ["Full Court", "Professional Hoops", "Night Lighting", "Ball Provided"], image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400", icon: "🏀" },
        { id: 6, name: "Foot Ball", pricePerHr: 1500, duration: "1 hr", features: ["Turf Ground", "Goal Posts", "Floodlights", "Ball Provided"], image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400", icon: "⚽" },
        { id: 7, name: "Paddle Ball", pricePerHr: 2000, duration: "1 hr", features: ["Enclosed Court", "Glass Walls", "Equipment Included", "AC Facility"], image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400", icon: "🎾" },
    ]);
    const [newSport, setNewSport] = useState({ name: "", pricePerHr: "", features: [""], image: "" });
    const [selectedSlots, setSelectedSlots] = useState({});
    const [bookingDetails, setBookingDetails] = useState({ description: "", bookedBy: "" });
    const [selectedPermissionSport, setSelectedPermissionSport] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [reportWeek, setReportWeek] = useState(new Date().toISOString().split("T")[0]);
    const [reportGenerated, setReportGenerated] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [bookings, setBookings] = useState([
        { id: 101, bookedBy: "Rahul Sharma", department: "B.Tech CSE", sportId: 1, sportName: "Pickleball", date: new Date().toISOString().split("T")[0], time: "10:30 AM - 11:30 AM", description: "Practice Session", players: 4, approved: true },
        { id: 102, bookedBy: "Priya Kumar", department: "B.Tech ECE", sportId: 4, sportName: "Badminton", date: new Date().toISOString().split("T")[0], time: "1:30 PM - 3:00 PM", description: "Tournament Practice", players: 2, approved: false },
        { id: 103, bookedBy: "Arun Krishnan", department: "MBA", sportId: 6, sportName: "Foot Ball", date: new Date(Date.now() + 86400000).toISOString().split("T")[0], time: "4:30 PM - 5:30 PM", description: "Friendly Match", players: 14, approved: true },
    ]);
    const [existingBookings, setExistingBookings] = useState([
        { id: 201, sportId: 1, slotId: 2, date: new Date().toISOString().split("T")[0], bookedBy: "Rahul Sharma", department: "B.Tech CSE", description: "Practice Session", players: 4, approved: true },
        { id: 202, sportId: 4, slotId: 4, date: new Date().toISOString().split("T")[0], bookedBy: "Priya Kumar", department: "B.Tech ECE", description: "Tournament Practice", players: 2, approved: false },
        { id: 203, sportId: 6, slotId: 6, date: new Date().toISOString().split("T")[0], bookedBy: "Arun Krishnan", department: "MBA", description: "Friendly Match", players: 14, approved: true },
    ]);
    const [analyticsData, setAnalyticsData] = useState({
        pieChartData: [
            { name: "Pickleball", value: 12, color: "#FF6B6B" },
            { name: "Shooting", value: 5, color: "#4A00E0" },
            { name: "Archery", value: 7, color: "#10B981" },
            { name: "Badminton", value: 18, color: "#3B82F6" },
            { name: "Basketball", value: 9, color: "#F59E0B" },
            { name: "Football", value: 15, color: "#EC4899" },
            { name: "Paddle Ball", value: 6, color: "#8B5CF6" },
        ],
        scatterPlotData: [],
    });
    const [hoverInfo, setHoverInfo] = useState(null);
    const [bookingFilters, setBookingFilters] = useState({ date: "all", department: "all", searchTerm: "" });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const initialSelectedSlots = {};
        sports.forEach((sport) => { initialSelectedSlots[sport.id] = []; });
        setSelectedSlots(initialSelectedSlots);
    }, []);

    const filteredSports = sports.filter((sport) => sport.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const generateTimeSlots = () => {
        const timeSlots = [];
        let startTime = new Date();
        startTime.setHours(6, 0, 0);
        for (let i = 0; i < 14; i++) {
            const currentStartTime = new Date(startTime);
            const endTime = new Date(currentStartTime);
            endTime.setHours(endTime.getHours() + 1);
            timeSlots.push({
                id: i + 1,
                time: `${currentStartTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
                available: true,
            });
            startTime.setHours(startTime.getHours() + 1);
        }
        return timeSlots;
    };
    const timeSlots = generateTimeSlots();

    const toggleTimeSlot = (sportId, slotId) => {
        setSelectedSlots((prev) => {
            const newSlots = { ...prev };
            if (newSlots[sportId]?.includes(slotId)) {
                newSlots[sportId] = newSlots[sportId].filter((id) => id !== slotId);
            } else {
                newSlots[sportId] = [...(newSlots[sportId] || []), slotId];
            }
            return newSlots;
        });
    };

    const isSlotBooked = (sportId, slotId, date) => existingBookings.some((b) => b.sportId === sportId && b.slotId === slotId && b.date === date);
    const getBookingDetails = (sportId, slotId, date) => existingBookings.find((b) => b.sportId === sportId && b.slotId === slotId && b.date === date);

    const setBookingApproval = (bookingId, approved) => {
        setExistingBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, approved } : b)));
        setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, approved } : b)));
        setUser((prev) => ({ ...prev, bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, approved } : b)) }));
    };

    const confirmBooking = () => {
        if (!bookingDetails.bookedBy.trim()) { alert("Please enter your name"); return; }
        const newBookings = [];
        const newExistingBookings = [...existingBookings];
        const newAllBookings = [...bookings];
        Object.keys(selectedSlots).forEach((sportId) => {
            if (selectedSlots[sportId]?.length > 0) {
                const sport = sports.find((s) => s.id === parseInt(sportId));
                selectedSlots[sportId].forEach((slotId) => {
                    const slot = timeSlots.find((t) => t.id === slotId);
                    const bookingId = Date.now() + Math.random();
                    const totalPrice = sport.pricePerHr * selectedSlots[sportId].length;
                    newBookings.push({ id: bookingId, sportId: parseInt(sportId), sportName: sport.name, slotId, time: slot.time, date: selectedDate, description: bookingDetails.description, bookedBy: bookingDetails.bookedBy, approved: false, totalPrice });
                    newExistingBookings.push({ id: bookingId, sportId: parseInt(sportId), slotId, date: selectedDate, bookedBy: bookingDetails.bookedBy, department: user.department, description: bookingDetails.description || "No description", players: Math.floor(Math.random() * 10) + 2, approved: false });
                    newAllBookings.push({ id: bookingId, bookedBy: bookingDetails.bookedBy, department: user.department, sportId: parseInt(sportId), sportName: sport.name, date: selectedDate, time: slot.time, description: bookingDetails.description || "No description", players: Math.floor(Math.random() * 10) + 2, approved: false });
                });
            }
        });
        setUser((prev) => ({ ...prev, bookings: [...prev.bookings, ...newBookings] }));
        setExistingBookings(newExistingBookings);
        setBookings(newAllBookings);
        const resetSelections = {};
        sports.forEach((sport) => { resetSelections[sport.id] = []; });
        setSelectedSlots(resetSelections);
        setBookingDetails({ description: "", bookedBy: "" });
        setCurrentView("profile");
        setActiveProfileTab("permissions");
    };

    const cancelBooking = (bookingId) => {
        setUser((prev) => ({ ...prev, bookings: prev.bookings.filter((b) => b.id !== bookingId) }));
        setExistingBookings((prev) => prev.filter((b) => b.id !== bookingId));
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        setPermissions((prev) => prev.filter((p) => p.id !== bookingId));
    };

    const handleAddSport = () => {
        if (newSport.name && newSport.pricePerHr) {
            const newSportWithId = { ...newSport, id: sports.length + 1, features: newSport.features.filter((f) => f !== ""), image: newSport.image || "https://images.unsplash.com/photo-1461896836934- voices-from-the-field?w=400", icon: "🏆" };
            setSports([...sports, newSportWithId]);
            setSelectedSlots((prev) => ({ ...prev, [newSportWithId.id]: [] }));
            setNewSport({ name: "", pricePerHr: "", features: [""], image: "" });
            setCurrentView("sportsListing");
        } else { alert("Please enter sport name and price per hour"); }
    };

    const getBookedSportCount = (sportId) => existingBookings.filter((b) => b.sportId === sportId).length;

    const getFilteredBookings = () => bookings.filter((b) => {
        if (bookingFilters.date !== "all" && b.date !== bookingFilters.date) return false;
        if (bookingFilters.department !== "all" && b.department !== bookingFilters.department) return false;
        if (bookingFilters.searchTerm) {
            const term = bookingFilters.searchTerm.toLowerCase();
            return b.bookedBy.toLowerCase().includes(term) || b.sportName.toLowerCase().includes(term) || b.description.toLowerCase().includes(term);
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex flex-col">
            {/* Navbar */}
            <nav className="bg-[#121212]/80 backdrop-blur-xl border-b border-[#2a2a2a] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setCurrentView("sportsListing")}>
                        <img src={nestLogo} alt="NEST School Logo" className="h-10 sm:h-12 md:h-14 w-auto object-contain rounded-lg shadow-lg" />
                        <div className="flex flex-col">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#64ffda]">NEST Sports</span>
                            <span className="hidden sm:block text-xs text-gray-400">Sports Facilities Booking</span>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-gray-300 hover:text-[#64ffda] p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop menu */}
                    <div className="hidden md:flex gap-6">
                        <span className="nav-item" onClick={() => setCurrentView("sportsListing")}>Sports</span>
                        <span className="nav-item" onClick={() => setCurrentView("addSport")}>Add Sport</span>
                        <span className="nav-item" onClick={() => setCurrentView("profile")}>Profile</span>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-[#121212] border-t border-[#2a2a2a] animate-slide-down">
                        <div className="px-4 py-3 space-y-2">
                            <div className="nav-item-mobile" onClick={() => { setCurrentView("sportsListing"); setIsMobileMenuOpen(false); }}>🏟️ Sports</div>
                            <div className="nav-item-mobile" onClick={() => { setCurrentView("addSport"); setIsMobileMenuOpen(false); }}>➕ Add Sport</div>
                            <div className="nav-item-mobile" onClick={() => { setCurrentView("profile"); setIsMobileMenuOpen(false); }}>👤 Profile</div>
                        </div>
                    </div>
                )}
            </nav>



            {/* Main Content */}
            <div className="flex-1">
                {/* Sports Listing */}
                {currentView === "sportsListing" && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                                <img src={nestLogo} alt="NEST School Logo" className="h-16 sm:h-20 w-auto object-contain rounded-xl shadow-xl animate-pulse-glow" />
                                <h1 className="text-3xl sm:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#3a506b] animate-gradient-text">
                                    NEST Sports Facilities
                                </h1>
                            </div>
                            <p className="text-gray-400 text-base sm:text-lg animate-fade-in-delay">Select a sport to view available time slots and pricing</p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-8 gap-4">
                            <input type="text" placeholder="Search sports..." className="input-dark flex-1 sm:max-w-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <button className="btn-primary whitespace-nowrap" onClick={() => setCurrentView("addSport")}>+ Add New Sport</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredSports.map((sport, index) => (
                                <div
                                    key={sport.id}
                                    className="card-dark overflow-hidden card-glow cursor-pointer transform hover:scale-[1.03] transition-all duration-300 animate-fade-in-up group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => { setSelectedSport(sport); setCurrentView("sportDetail"); }}
                                >
                                    <div className="h-40 sm:h-48 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${sport.image})` }}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                                        <div className="absolute top-4 left-4 text-4xl animate-bounce-subtle group-hover:scale-125 transition-transform">{sport.icon}</div>
                                        <span className="absolute top-4 right-4 bg-[#64ffda]/20 text-[#64ffda] px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                            ₹{sport.pricePerHr}/hr
                                        </span>
                                        {getBookedSportCount(sport.id) > 0 && (
                                            <span className="absolute bottom-4 left-4 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm animate-pulse">
                                                {getBookedSportCount(sport.id)} Booked
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4 sm:p-6">
                                        <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-[#64ffda] transition-colors">{sport.name}</h2>
                                        <p className="text-gray-400 text-sm mb-3">Duration: {sport.duration} {sport.priceNote || ""}</p>
                                        <div className="flex flex-wrap mb-4">
                                            {sport.features.slice(0, 2).map((f, i) => (
                                                <span key={i} className="feature-tag text-xs">{f}</span>
                                            ))}
                                        </div>
                                        <button className="btn-secondary w-full text-sm sm:text-base group-hover:bg-[#64ffda]/20 transition-colors">
                                            Book Now →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sport Detail */}
                {currentView === "sportDetail" && selectedSport && (
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
                        <button className="text-[#64ffda] mb-6 hover:underline flex items-center gap-2 hover:gap-3 transition-all" onClick={() => setCurrentView("sportsListing")}>← Back to Sports</button>
                        <div className="card-dark p-4 sm:p-8 mb-8 animate-slide-up">
                            <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                                <div className="w-full md:w-1/3 h-48 sm:h-56 rounded-xl bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${selectedSport.image})` }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/50 to-transparent flex items-center justify-center">
                                        <span className="text-6xl animate-bounce-subtle">{selectedSport.icon}</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedSport.name}</h1>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        <p className="text-[#64ffda] text-lg">₹{selectedSport.pricePerHr}/hr {selectedSport.priceNote || ""}</p>
                                        <p className="text-gray-400 text-lg">Duration: {selectedSport.duration}</p>
                                    </div>
                                    <div className="flex flex-wrap">{selectedSport.features.map((f, i) => <span key={i} className="feature-tag">{f}</span>)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-dark p-4 sm:p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                                <label className="text-white font-medium whitespace-nowrap">Select Date:</label>
                                <input type="date" className="input-dark w-full sm:w-auto" value={selectedDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setSelectedDate(e.target.value)} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Available Time Slots</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                                {timeSlots.map((slot, index) => {
                                    const isBooked = isSlotBooked(selectedSport.id, slot.id, selectedDate);
                                    const isSelected = selectedSlots[selectedSport.id]?.includes(slot.id);
                                    return (
                                        <div
                                            key={slot.id}
                                            className={`time-slot ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""} animate-fade-in-up`}
                                            style={{ animationDelay: `${index * 0.03}s` }}
                                            onClick={() => !isBooked && toggleTimeSlot(selectedSport.id, slot.id)}
                                        >
                                            <div className="text-white font-medium mb-2 text-sm sm:text-base">{slot.time}</div>
                                            <span className={`text-xs sm:text-sm px-2 py-1 rounded-full ${isBooked ? "bg-red-500/20 text-red-400" : isSelected ? "bg-[#64ffda]/20 text-[#64ffda]" : "bg-green-500/20 text-green-400"}`}>
                                                {isBooked ? "Booked" : isSelected ? "Selected" : "Available"}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            {selectedSlots[selectedSport.id]?.length > 0 && (
                                <div className="mt-8 border-t border-[#2a2a2a] pt-8 animate-slide-up">
                                    <h3 className="text-xl font-semibold text-white mb-4">Booking Information</h3>
                                    <div className="bg-[#1e1e1e] p-4 rounded-lg mb-4">
                                        <p className="text-[#64ffda] text-lg font-semibold">
                                            Total: ₹{selectedSport.pricePerHr * selectedSlots[selectedSport.id].length}
                                            <span className="text-gray-400 text-sm ml-2">({selectedSlots[selectedSport.id].length} slot(s))</span>
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-300 mb-2">Your Name: <span className="text-red-400">*</span></label>
                                            <input type="text" className="input-dark w-full" value={bookingDetails.bookedBy} onChange={(e) => setBookingDetails({ ...bookingDetails, bookedBy: e.target.value })} placeholder="Enter your name" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 mb-2">Description (Optional):</label>
                                            <textarea className="input-dark w-full h-24 resize-none" value={bookingDetails.description} onChange={(e) => setBookingDetails({ ...bookingDetails, description: e.target.value })} placeholder="E.g., Practice session, friendly match..."></textarea>
                                        </div>
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-4 rounded-lg mt-4">
                                        ⚠️ Note: All bookings require approval before they are confirmed.
                                    </div>
                                    <button className="btn-primary w-full mt-6 py-3 text-lg animate-pulse-subtle" onClick={confirmBooking} disabled={!bookingDetails.bookedBy.trim()}>
                                        Request Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Add Sport */}
                {currentView === "addSport" && (
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
                        <button className="text-[#64ffda] mb-6 hover:underline flex items-center gap-2" onClick={() => setCurrentView("sportsListing")}>← Back to Sports</button>
                        <div className="card-dark p-4 sm:p-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">Add New Sport</h1>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-300 mb-2">Sport Name: <span className="text-red-400">*</span></label>
                                    <input type="text" className="input-dark w-full" value={newSport.name} onChange={(e) => setNewSport({ ...newSport, name: e.target.value })} placeholder="Enter sport name" />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Price per Hour (₹): <span className="text-red-400">*</span></label>
                                    <input type="number" className="input-dark w-full" value={newSport.pricePerHr} onChange={(e) => setNewSport({ ...newSport, pricePerHr: e.target.value })} placeholder="Enter price per hour" />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Features:</label>
                                    {newSport.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input type="text" className="input-dark flex-1" value={feature} onChange={(e) => { const updated = [...newSport.features]; updated[index] = e.target.value; setNewSport({ ...newSport, features: updated }); }} placeholder="Enter feature" />
                                            <button className="text-red-400 hover:text-red-300 px-3 transition-colors" onClick={() => setNewSport({ ...newSport, features: newSport.features.filter((_, i) => i !== index) })}>✕</button>
                                        </div>
                                    ))}
                                    <button className="btn-secondary mt-2" onClick={() => setNewSport({ ...newSport, features: [...newSport.features, ""] })}>+ Add Feature</button>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Image URL (optional):</label>
                                    <input type="text" className="input-dark w-full" value={newSport.image} onChange={(e) => setNewSport({ ...newSport, image: e.target.value })} placeholder="Enter image URL" />
                                </div>
                                <button className="btn-primary w-full py-3" onClick={handleAddSport} disabled={!newSport.name || !newSport.pricePerHr}>Create Sport</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile */}
                {currentView === "profile" && (
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
                        <button className="text-[#64ffda] mb-6 hover:underline flex items-center gap-2" onClick={() => setCurrentView("sportsListing")}>← Back to Sports</button>
                        <div className="card-dark p-4 sm:p-8 mb-8">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#64ffda] to-[#3a506b] flex items-center justify-center text-2xl sm:text-3xl font-bold text-[#121212] animate-pulse-glow">{user.name.charAt(0)}</div>
                                <div className="text-center sm:text-left">
                                    <h1 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
                                    <p className="text-gray-400">{user.email}</p>
                                    <p className="text-[#64ffda]">{user.department}</p>
                                </div>
                                <button className="sm:ml-auto btn-secondary" onClick={onLogout}>Logout</button>
                            </div>
                        </div>
                        <div className="flex overflow-x-auto border-b border-[#2a2a2a] mb-8 pb-1 scrollbar-hide">
                            {["bookings", "all", "reports", "permissions", "stats"].map((tab) => (
                                <span key={tab} className={`profile-tab whitespace-nowrap ${activeProfileTab === tab ? "active" : ""}`} onClick={() => setActiveProfileTab(tab)}>
                                    {tab === "all" ? "All Bookings" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </span>
                            ))}
                        </div>

                        {activeProfileTab === "bookings" && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Your Bookings</h2>
                                {user.bookings.length === 0 ? (
                                    <div className="card-dark p-8 sm:p-12 text-center">
                                        <div className="text-6xl mb-4">🏃</div>
                                        <p className="text-gray-400 mb-4">You don't have any bookings yet.</p>
                                        <button className="btn-primary" onClick={() => setCurrentView("sportsListing")}>Book a Sport Now</button>
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                        {user.bookings.map((booking, index) => (
                                            <div key={booking.id} className="card-dark p-4 sm:p-6 animate-fade-in-up hover:border-[#64ffda]/30 transition-colors" style={{ animationDelay: `${index * 0.1}s` }}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-semibold text-white">{booking.sportName}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-sm ${booking.approved ? "status-approved" : "status-pending"}`}>{booking.approved ? "Approved" : "Pending"}</span>
                                                </div>
                                                <p className="text-gray-400">{new Date(booking.date).toLocaleDateString()}</p>
                                                <p className="text-[#64ffda]">{booking.time}</p>
                                                <p className="text-gray-300 mt-2">{booking.description || "No description"}</p>
                                                {booking.totalPrice && <p className="text-green-400 mt-2 font-semibold">₹{booking.totalPrice}</p>}
                                                <div className="flex items-center justify-end mt-4">
                                                    <button className="text-red-400 hover:text-red-300 transition-colors" onClick={() => cancelBooking(booking.id)}>Cancel</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeProfileTab === "all" && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">All Bookings</h2>
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <select className="input-dark" value={bookingFilters.department} onChange={(e) => setBookingFilters({ ...bookingFilters, department: e.target.value })}>
                                        <option value="all">All Departments</option>
                                        {[...new Set(bookings.map((b) => b.department))].map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <input type="text" className="input-dark flex-1" placeholder="Search..." value={bookingFilters.searchTerm} onChange={(e) => setBookingFilters({ ...bookingFilters, searchTerm: e.target.value })} />
                                </div>
                                <div className="card-dark overflow-hidden overflow-x-auto">
                                    <div className="min-w-[800px]">
                                        <div className="booking-table-header">
                                            <div>Student Name</div>
                                            <div>Class</div>
                                            <div>Sport</div>
                                            <div>Date</div>
                                            <div>Time</div>
                                            <div>Purpose</div>
                                            <div>Players</div>
                                            <div>Status</div>
                                        </div>
                                        {getFilteredBookings().map((b, index) => (
                                            <div key={b.id} className="booking-table-row animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                                <div className="text-white font-medium">{b.bookedBy}</div>
                                                <div className="text-gray-300">{b.department}</div>
                                                <div className="text-[#64ffda] font-medium">{b.sportName}</div>
                                                <div className="text-gray-300">{new Date(b.date).toLocaleDateString()}</div>
                                                <div className="text-gray-300">{b.time}</div>
                                                <div className="text-gray-400 truncate">{b.description}</div>
                                                <div className="text-gray-300">{b.players}</div>
                                                <div><span className={`px-2 py-1 rounded-full text-xs ${b.approved ? "status-approved" : "status-pending"}`}>{b.approved ? "Approved" : "Pending"}</span></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeProfileTab === "permissions" && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Pending Approvals</h2>
                                {existingBookings.filter((b) => !b.approved).length === 0 ? (
                                    <div className="card-dark p-8 sm:p-12 text-center text-gray-400">
                                        <div className="text-6xl mb-4">✅</div>
                                        No pending approvals at this time.
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                        {existingBookings.filter((b) => !b.approved).map((b, index) => {
                                            const sport = sports.find((s) => s.id === b.sportId);
                                            return (
                                                <div key={b.id} className="card-dark p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="text-3xl">{sport?.icon}</span>
                                                        <h3 className="text-lg font-semibold text-white">{sport?.name}</h3>
                                                    </div>
                                                    <div className="space-y-2 text-gray-300 text-sm">
                                                        <p><span className="text-gray-500">Requested by:</span> {b.bookedBy}</p>
                                                        <p><span className="text-gray-500">Date:</span> {new Date(b.date).toLocaleDateString()}</p>
                                                        <p><span className="text-gray-500">Time:</span> {timeSlots.find((t) => t.id === b.slotId)?.time}</p>
                                                        <p><span className="text-gray-500">Purpose:</span> {b.description}</p>
                                                    </div>
                                                    <div className="flex gap-3 mt-4">
                                                        <button className="btn-primary flex-1" onClick={() => setBookingApproval(b.id, true)}>Approve</button>
                                                        <button className="flex-1 bg-red-500/20 text-red-400 border border-red-500/30 py-2 rounded-lg hover:bg-red-500/30 transition-colors" onClick={() => cancelBooking(b.id)}>Reject</button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeProfileTab === "stats" && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Booking Analytics</h2>
                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                                    <div className="card-dark p-4 sm:p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Sport Usage Distribution</h3>
                                        <PieChart data={analyticsData.pieChartData} />
                                    </div>
                                    <div className="card-dark p-4 sm:p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Booking Summary</h3>
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                            {[
                                                { label: "Total Bookings", value: existingBookings.length, color: "text-[#64ffda]", icon: "📊" },
                                                { label: "Approved", value: existingBookings.filter((b) => b.approved).length, color: "text-green-400", icon: "✅" },
                                                { label: "Pending", value: existingBookings.filter((b) => !b.approved).length, color: "text-yellow-400", icon: "⏳" },
                                                { label: "Sports", value: sports.length, color: "text-blue-400", icon: "🏆" }
                                            ].map((s, i) => (
                                                <div key={i} className="bg-[#1e1e1e] p-4 sm:p-6 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                                    <div className="text-2xl mb-2">{s.icon}</div>
                                                    <div className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</div>
                                                    <div className="text-gray-400 mt-1 text-sm">{s.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeProfileTab === "reports" && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Weekly Reports</h2>
                                <div className="card-dark p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                                        <label className="text-gray-300 whitespace-nowrap">Select Week Starting:</label>
                                        <input type="date" className="input-dark w-full sm:w-auto" value={reportWeek} onChange={(e) => setReportWeek(e.target.value)} />
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <button className="btn-primary flex-1 sm:flex-none">Generate Report</button>
                                            <button className="btn-secondary flex-1 sm:flex-none">Download CSV</button>
                                        </div>
                                    </div>
                                    <p className="text-gray-400">Select a date and generate a weekly report of all sports bookings.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-[#121212]/80 backdrop-blur-sm border-t border-[#2a2a2a] py-6 px-4 sm:px-6 mt-auto">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-400 text-sm">© 2026 NEST Sports Booking. All rights reserved.</p>
                    <p className="text-gray-500 text-xs mt-2">The NEST School - Sports Facilities</p>
                </div>
            </footer>
        </div>
    );
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState({ name: "Guest", email: "guest@msec.edu.in", department: "B.Tech AI & DS" });

    const handleLogin = (name, pwd) => {
        setUserProfile({ name, email: `${name.toLowerCase().replace(/\s+/g, "")}@msec.edu.in`, department: "B.Tech AI & DS" });
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;
    return <SportsBookingApp currentUser={userProfile} onLogout={() => setIsLoggedIn(false)} />;
}
