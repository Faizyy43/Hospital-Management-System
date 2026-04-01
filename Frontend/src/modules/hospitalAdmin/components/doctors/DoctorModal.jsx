const DoctorModal = ({ doctor, onClose, doctors, setDoctors }) => {
  if (!doctor) return null;

  const handleChange = (field, value) => {
    doctor[field] = value;
  };

  const handleSave = () => {
    setDoctors(doctors.map(d =>
      d.id === doctor.id ? doctor : d
    ));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">

      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl w-96">

        <h2 className="mb-4 font-semibold">Edit Doctor</h2>

        <input
          defaultValue={doctor.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full mb-3 p-2 rounded-lg bg-gray-100"
        />

        <input
          defaultValue={doctor.speciality}
          onChange={(e) => handleChange("speciality", e.target.value)}
          className="w-full mb-3 p-2 rounded-lg bg-gray-100"
        />

        <input
          defaultValue={doctor.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          className="w-full mb-3 p-2 rounded-lg bg-gray-100"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>

      </div>

    </div>
  );
};

export default DoctorModal;