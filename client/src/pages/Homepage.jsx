import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, MapPin, Star, ArrowRight } from 'lucide-react';

const Homepage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white">
            {/* --- Navigation Bar --- */}
            <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    {/* Logo */}
                    <div className="p-2 bg-[#2E7D32] rounded-lg">
                        <ShoppingBag className="h-8 w-8 text-white" />
                    </div>
                    <Link to="/" className="text-2xl font-bold text-[#333333]">
                        Food<span className="text-[#FF9800]">Wise</span>
                    </Link>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#how" className="text-gray-700 hover:text-[#2E7D32] font-medium">How it Works</a>
                    <a href="#business" className="text-gray-700 hover:text-[#2E7D32] font-medium">For Businesses</a>
                    <Link to="/signup" className="text-gray-700 hover:text-[#2E7D32] font-medium">Sign Up</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/auth" className="text-gray-700 hover:text-[#2E7D32] font-medium">Log In</Link>
                    <Link to="/auth" className="bg-[#FF9800] text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-12 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#333333] leading-tight">
                        Fight Food Waste,<br />
                        <span className="text-[#2E7D32]">Save Money</span>.
                        
                    </h1>
                    <p className="text-xl text-gray-600 my-8">
                        Discover delicious surplus food from top restaurants, bakeries, and supermarkets in your city at a fraction of the price. Good for your wallet, great for the planet.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link to="/auth" className="bg-[#2E7D32] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg flex items-center justify-center">
                            Explore Magic Bags <ArrowRight className="ml-2" />
                        </Link>
                        <a href="#how" className="border-2 border-[#2E7D32] text-[#2E7D32] px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition duration-300 text-center">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-lg">
                        <div className="w-full h-96 bg-gradient-to-r from-[#FF9800]/20 to-[#2E7D32]/20 rounded-3xl shadow-2xl overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                alt="A basket filled with fresh bread, pastries, and fruits from a local bakery"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating Stats Card
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                            <div className="text-3xl font-bold text-[#2E7D32]">5000+</div>
                            <div className="text-gray-500">Meals Saved</div>
                            <div className="flex mt-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* --- How It Works --- */}
            <section id="how" className="container mx-auto px-4 py-16 bg-gray-50 rounded-3xl my-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#333333] mb-4">How FoodWise Works</h2>
                <p className="text-gray-600 text-center text-lg mb-12">Three simple steps to your next delicious, sustainable meal.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <MapPin />, title: "Discover", desc: "Browse 'Magic Bags' of surplus food near you on our map or list." },
                        { icon: <ShoppingBag />, title: "Order & Pay", desc: "Reserve your bag via the app. Pay less for great food." },
                        { icon: <Shield />, title: "Collect & Enjoy", desc: "Pick up your bag at the set time. Enjoy the surprise!" }
                    ].map((step, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition duration-300">
                            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#2E7D32] text-white">
                                <div className="h-8 w-8">{step.icon}</div>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-[#333333]">{step.title}</h3>
                            <p className="text-gray-600">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CTA for Businesses --- */}
            <section id="business" className="container mx-auto px-4 py-16 my-12">
                <div className="bg-gradient-to-r from-[#2E7D32] to-green-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-2/3 mb-8 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Are you a Business?</h2>
                            <p className="text-xl opacity-90">
                                Join FoodWise to reduce waste, reach new customers, and recover costs on surplus food. It's win-win-win.
                            </p>
                        </div>
                        <Link 
                            to="/business/signup"
                            className="bg-white text-[#2E7D32] px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition duration-300 shadow-lg"
                        >
                            List Your Business
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="bg-[#333333] text-white py-12 mt-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-8 md:mb-0">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="p-2 bg-white rounded-lg">
                                    <ShoppingBag className="h-6 w-6 text-[#2E7D32]" />
                                </div>
                                <span className="text-2xl font-bold">Food<span className="text-[#FF9800]">Wise</span></span>
                            </div>
                            <p className="text-gray-300">Fighting food waste, one Magic Bag at a time. 🇿🇼</p>
                        </div>
                        <div className="flex space-x-8">
                            <div>
                                <h4 className="font-bold mb-4">Company</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><a href="#" className="hover:text-white">About Us</a></li>
                                    <li><a href="#" className="hover:text-white">Contact</a></li>
                                    <li><a href="#" className="hover:text-white">Careers</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Legal</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                                    <li><a href="#" className="hover:text-white">For Businesses</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} FoodWise Zimbabwe. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;