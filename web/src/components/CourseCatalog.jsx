import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
} from "lucide-react";

const categories = [
  "All",
  "Programming",
  "Design",
  "Marketing",
  "Data Science",
  "Language",
  "Business",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const languages = ["All", "Bangla", "English"];

function CourseCard({ course }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] 
        cursor-pointer transition-all duration-200 ease-out overflow-hidden
        ${isHovered ? "transform -translate-y-1 shadow-lg dark:shadow-2xl" : ""}
      `}
      style={{
        boxShadow: isHovered
          ? document.documentElement.classList.contains("dark")
            ? "0 10px 30px rgba(255, 255, 255, 0.08)"
            : "0 8px 25px rgba(32, 50, 89, 0.08)"
          : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className={`
            w-full h-full object-cover transition-transform duration-300
            ${isHovered ? "scale-105" : "scale-100"}
          `}
        />

        {/* Play Button Overlay */}
        <div
          className={`
          absolute inset-0 flex items-center justify-center bg-black bg-opacity-30
          transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <Play size={24} className="text-[#2563EB] ml-1" />
          </div>
        </div>

        {/* Premium Badge */}
        {course.isPremium && (
          <div className="absolute top-3 right-3 bg-[#FFD700] text-[#8B7500] px-2 py-1 rounded-full text-xs font-semibold">
            Premium
          </div>
        )}

        {/* Language Badge */}
        <div className="absolute top-3 left-3 bg-[#2563EB] text-white px-2 py-1 rounded-full text-xs font-semibold">
          {course.language}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Category and Level */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#2563EB] dark:text-[#3B82F6] text-sm font-medium">
            {course.category}
          </span>
          <span className="text-[#6B7280] dark:text-[#9CA3AF] text-sm">
            {course.level}
          </span>
        </div>

        {/* Course Title */}
        <h3 className="font-montserrat font-bold text-lg text-[#1F2937] dark:text-[#E5E7EB] mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm mb-3">
          By {course.instructor}
        </p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-[#FFD700] fill-current" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>{course.lessons} lessons</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Price and Enroll Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-[#2563EB] dark:text-[#3B82F6]">
              ৳{course.price}
            </span>
            {course.originalPrice && (
              <span className="text-[#6B7280] dark:text-[#9CA3AF] text-sm line-through">
                ৳{course.originalPrice}
              </span>
            )}
          </div>
          <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CourseCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (selectedCategory !== "All")
        params.append("category", selectedCategory);
      if (selectedLevel !== "All") params.append("level", selectedLevel);
      if (selectedLanguage !== "All")
        params.append("language", selectedLanguage);
      if (searchTerm) params.append("search", searchTerm);

      const response = await fetch(`/api/courses?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }

      const data = await response.json();
      setCourses(data.courses || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedLevel, selectedLanguage, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSelectedLanguage("All");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-3xl text-[#1F2937] dark:text-[#E5E7EB] mb-2">
          Explore Courses
        </h1>
        <p className="text-[#6B7280] dark:text-[#9CA3AF] text-lg">
          Discover thousands of courses from expert instructors
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-[#6B7280] dark:text-[#9CA3AF]" />
          </div>
          <input
            type="text"
            placeholder="Search courses, instructors, or topics..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg 
                     bg-white dark:bg-[#262626] text-[#1F2937] dark:text-[#E5E7EB] 
                     placeholder-[#6B7280] dark:placeholder-[#9CA3AF]
                     focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-[#2563EB] dark:text-[#3B82F6] font-medium mb-4"
        >
          <Filter size={18} />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-[#374151] dark:text-[#D1D5DB] mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-[#D1D5DB] dark:border-[#374151] rounded-lg 
                         bg-white dark:bg-[#262626] text-[#1F2937] dark:text-[#E5E7EB]
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-[#374151] dark:text-[#D1D5DB] mb-2">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 border border-[#D1D5DB] dark:border-[#374151] rounded-lg 
                         bg-white dark:bg-[#262626] text-[#1F2937] dark:text-[#E5E7EB]
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium text-[#374151] dark:text-[#D1D5DB] mb-2">
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-2 border border-[#D1D5DB] dark:border-[#374151] rounded-lg 
                         bg-white dark:bg-[#262626] text-[#1F2937] dark:text-[#E5E7EB]
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
          <p className="text-[#6B7280] dark:text-[#9CA3AF]">
            Loading courses...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={fetchCourses}
            className="text-[#2563EB] dark:text-[#3B82F6] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Results Count */}
      {!loading && !error && (
        <div className="mb-6">
          <p className="text-[#6B7280] dark:text-[#9CA3AF]">
            Found {courses.length} courses
          </p>
        </div>
      )}

      {/* Courses Grid */}
      {!loading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && courses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[#6B7280] dark:text-[#9CA3AF] text-lg mb-4">
            No courses found matching your criteria
          </div>
          <button
            onClick={clearFilters}
            className="text-[#2563EB] dark:text-[#3B82F6] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
