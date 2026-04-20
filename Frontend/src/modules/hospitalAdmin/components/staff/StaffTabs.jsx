const roles = [
  "Nurse",
  "Receptionist",
  "Technician",
  "Pharmacist",
  "Admin",
];

const StaffTabs = ({ active, setActive }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => setActive(role)}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            active === role
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default StaffTabs;
