// Reusable style classes for components
export const styles = {
  // Header styles
  cartH1: "text-black text-xl font-bold mb-4",

  formH1:"text-black text-2xl font-bold mb-6",

  subtitleProfile:"text-black text-md font-medium mb-2 cursor-pointer",

  // Button styles
  btnPrimary: "bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer",
  
  btnNav: "text-black px-4 py-2 font-medium cursor-pointer ",

  btnLoginNav: "block text-black text-center px-4 py-2 text-sm",
  
  btnCategory: "text-black hover:bg-yellow-400 px-4 py-2 rounded-lg transition-all duration-300 font-medium",

  btnProfile: "w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50",

  // Layout styles
  dropdownMenu: "absolute left-0 top-full flex flex-col bg-white shadow-lg rounded-lg p-4 space-y-2 z-50",
  
  mobileMenu: "flex flex-col md:hidden mt-4 space-y-2",
  
  navContainer: "container mx-auto px-6 py-4",
  
  navHeader: "flex items-center justify-between",
  
  // Footer styles
  footerSticky: "bg-white shadow-lg border-t-4 border-yellow-400 w-full mt-auto",
  
  footerContainer: "container mx-auto px-6 py-4 text-center",
  
  // Card styles
  card: "bg-white rounded-lg shadow-md p-4 transition-shadow duration-300 hover:shadow-lg",
  
  cardTitle: "text-xl font-bold text-gray-800 mb-2",
  
  cardText: "text-gray-600 text-sm",

  //Profile styles
  profileTexting: "text-black text-md font-medium mb-2",

  inputProfile: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-amber-500 text-black focus:ring-2 focus:ring-yellow-500",

  // Form styles
  formInput: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent",
  
  formLabel: "block text-sm font-medium text-gray-700 mb-1",
  
  // Utility classes
  flexCenter: "flex items-center justify-center",
  
  flexBetween: "flex items-center justify-between",
  
  textPrimary: "text-yellow-600",
  
  textSecondary: "text-gray-600",

  //Profile styles
  inputProfile: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500",

  // Product styles
  productCard: "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105",
  
  productImage: "w-full h-48 object-cover",
  
  productTitle: "text-lg font-semibold text-gray-800 mb-2",
  
  productPrice: "text-xl font-bold text-yellow-600",

  //ItemDetail
  productDetailContainer: "bg-white rounded-lg shadow-md p-6",

  productDetailTitle: "text-2xl font-bold text-gray-800 mb-4",

  productDetailDescription: "text-gray-600 mb-4",
  
  productDetailPrice: "text-xl font-bold text-yellow-600 mb-4",

  // Container styles
  pageContainer: "container mx-auto px-4 py-8",
  
  sectionTitle: "text-3xl font-bold text-gray-800 mb-8 text-center",

  cartContainer: "container bg-white shadow-lg rounded-lg p-6 text-center sm:w-[300px] md:w-[400px] mx-auto mt-5",

  profileRegisterContainer: "bg-white p-8 rounded-lg shadow-md m-5 xl:w-[600px] md:w-[500px]",

  //Carrousel styles
  carouselContainer: "relative max-w-[1200px] mx-auto",
  carouselImage: "relative xl:h-[600px] xl:w-[1200px] md:h-[500px] md:w-[800px] sm:h-[300px] sm:w-[600px]",

  // Grid layouts
  productGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  
  categoryGrid: "grid grid-cols-1 md:grid-cols-2 gap-6"
};

// Color palette
export const colors = {
  primary: "yellow-500",
  primaryHover: "yellow-400",
  secondary: "gray-600",
  accent: "yellow-600",
  text: "gray-800",
  textLight: "gray-600",
  background: "white",
  border: "gray-300"
};

// Animation classes
export const animations = {
  fadeIn: "transition-opacity duration-300",
  slideIn: "transition-transform duration-300",
  scaleHover: "transition-transform duration-300 hover:scale-105",
  colorTransition: "transition-colors duration-200"
};
