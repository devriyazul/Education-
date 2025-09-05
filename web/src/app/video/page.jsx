import VideoPlayer from "../../components/VideoPlayer";

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Course Header */}
        <div className="mb-6">
          <h1 className="font-poppins font-bold text-2xl md:text-3xl text-[#1F2937] dark:text-[#E5E7EB] mb-2">
            Introduction to Web Development
          </h1>
          <p className="text-[#6B7280] dark:text-[#9CA3AF]">
            Complete Web Development Bootcamp • Lesson 1 of 85
          </p>
        </div>

        {/* Video Player */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-6 mb-6">
          <div className="aspect-video">
            <VideoPlayer
              videoUrl="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              title="Introduction to Web Development"
              subtitles={[]}
              onProgress={(currentTime, duration) => {
                // Track progress for the user
                console.log(`Progress: ${currentTime}/${duration}`);
              }}
            />
          </div>
        </div>

        {/* Course Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Lesson Description */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-6 mb-6">
              <h2 className="font-montserrat font-bold text-xl text-[#1F2937] dark:text-[#E5E7EB] mb-4">
                About this lesson
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                  Welcome to the Complete Web Development Bootcamp! In this first lesson, we'll introduce you to the fundamentals of web development and what you'll learn throughout this course.
                </p>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                  You'll discover the three core technologies that power the web: HTML for structure, CSS for styling, and JavaScript for interactivity. We'll also cover the tools and resources you'll need to start your web development journey.
                </p>
                <h3 className="font-montserrat font-semibold text-lg text-[#1F2937] dark:text-[#E5E7EB] mb-3">
                  What you'll learn:
                </h3>
                <ul className="text-[#6B7280] dark:text-[#9CA3AF] space-y-2">
                  <li>• Overview of web development landscape</li>
                  <li>• Understanding frontend vs backend development</li>
                  <li>• Setting up your development environment</li>
                  <li>• Introduction to HTML, CSS, and JavaScript</li>
                  <li>• Planning your first web project</li>
                </ul>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-6">
              <h2 className="font-montserrat font-bold text-xl text-[#1F2937] dark:text-[#E5E7EB] mb-4">
                Resources
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg">
                  <div>
                    <h3 className="font-medium text-[#1F2937] dark:text-[#E5E7EB]">
                      Lesson Slides
                    </h3>
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                      PDF • 2.5 MB
                    </p>
                  </div>
                  <button className="text-[#2563EB] dark:text-[#3B82F6] hover:underline">
                    Download
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg">
                  <div>
                    <h3 className="font-medium text-[#1F2937] dark:text-[#E5E7EB]">
                      Code Examples
                    </h3>
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                      ZIP • 1.2 MB
                    </p>
                  </div>
                  <button className="text-[#2563EB] dark:text-[#3B82F6] hover:underline">
                    Download
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg">
                  <div>
                    <h3 className="font-medium text-[#1F2937] dark:text-[#E5E7EB]">
                      Additional Reading
                    </h3>
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                      External Link
                    </p>
                  </div>
                  <button className="text-[#2563EB] dark:text-[#3B82F6] hover:underline">
                    Open
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Progress */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-6 mb-6">
              <h3 className="font-montserrat font-bold text-lg text-[#1F2937] dark:text-[#E5E7EB] mb-4">
                Course Progress
              </h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    1 of 85 lessons
                  </span>
                  <span className="text-sm font-medium text-[#2563EB] dark:text-[#3B82F6]">
                    1%
                  </span>
                </div>
                <div className="w-full bg-[#E5E7EB] dark:bg-[#374151] rounded-full h-2">
                  <div className="bg-[#2563EB] dark:bg-[#3B82F6] h-2 rounded-full" style={{ width: '1%' }}></div>
                </div>
              </div>
              <button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                Mark as Complete
              </button>
            </div>

            {/* Next Lesson */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-6">
              <h3 className="font-montserrat font-bold text-lg text-[#1F2937] dark:text-[#E5E7EB] mb-4">
                Up Next
              </h3>
              <div className="space-y-3">
                <div className="p-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#374151] cursor-pointer transition-colors">
                  <h4 className="font-medium text-[#1F2937] dark:text-[#E5E7EB] mb-1">
                    Setting Up Your Development Environment
                  </h4>
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    Lesson 2 • 15 min
                  </p>
                </div>
                <div className="p-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#374151] cursor-pointer transition-colors">
                  <h4 className="font-medium text-[#1F2937] dark:text-[#E5E7EB] mb-1">
                    HTML Fundamentals
                  </h4>
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    Lesson 3 • 22 min
                  </p>
                </div>
                <div className="p-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#374151] cursor-pointer transition-colors">
                  <h4 className="font-medium text-[#1F2937] dark:text-[#E5E7EB] mb-1">
                    CSS Basics and Styling
                  </h4>
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    Lesson 4 • 28 min
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}