const roles = [
  "Nurse",
  "Receptionist",
  "Technician",
  "Pharmacist",
  "Admin",
];

const StaffTabs = ({ active, setActive }) => {
  return (
    <div className="flex gap-2 mb-4">
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => setActive(role)}
          className={`px-4 py-2 rounded-xl transition ${
            active === role
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default StaffTabs;