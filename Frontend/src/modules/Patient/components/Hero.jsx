export default function Hero() {
  return (
    <section className="pt-24 bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Smart Hospital Management System
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Book appointments, find hospitals, manage reports — all in one place.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Book Appointment
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
              Explore Hospitals
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img
            src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8446.jpg"
            alt="hospital"
            className="rounded-xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}