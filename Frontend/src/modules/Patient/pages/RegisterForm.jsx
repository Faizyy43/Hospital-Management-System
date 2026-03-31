import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

/* ================= MAIN ================= */

export default function RegisterForm() {
  const { role: routeRole } = useParams();

  const [role, setRole] = useState(
    routeRole || localStorage.getItem("role") || "",
  );
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  /* ================= HANDLE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value, // ✅ dynamic update (correct way)
    }));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    let newErrors = {};

    if (role === "patient") {
      const requiredFields = [
        "firstName",
        "lastName",
        "mobile",
        "email",
        "dob",
        "gender",
        "blood",
        "emergencyName",
        "emergencyPhone",
      ];

      requiredFields.forEach((field) => {
        if (!form[field] || form[field].toString().trim() === "") {
          newErrors[field] = "This field is required";
        }
      });
    }

    if (role === "hospital") {
      const requiredFields = [
        "hospitalName",
        "registrationNumber",
        "type",
        "phone",
        "email",
        "generalBeds",
        "icuBeds",
      ];

      requiredFields.forEach((field) => {
        if (!form[field] || form[field].toString().trim() === "") {
          newErrors[field] = "This field is required";
        }
      });

      // 🔥 Special fields
      if (!form.specialities || form.specialities.length === 0) {
        newErrors.specialities = "Add at least one speciality";
      }

      if (!form.insurance || form.insurance.length === 0) {
        newErrors.insurance = "Add at least one insurance provider";
      }

      if (form.emergency === undefined) {
        newErrors.emergency = "Select emergency availability";
      }
    }

    // 🔥 Address required for both
    ["city", "state", "pin"].forEach((field) => {
      if (!form[field]) {
        newErrors[field] = "Location required (select from map)";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= GEO ================= */

  const fetchAddress = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    const data = await res.json();

    if (!data.address) return;

    const a = data.address;

    setForm((prev) => ({
      ...prev,
      city: a.city || a.town || "",
      state: a.state || "",
      pin: a.postcode || "",
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("FINAL DATA", form);
    alert("Submitted Successfully 🚀");
    navigate("/login");
  };

  useEffect(() => {
    setForm({});
    setErrors({});
  }, [role]);

  useEffect(() => {
    if (routeRole) {
      setRole(routeRole);
    }
  }, [routeRole]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          {role === "patient"
            ? "Patient Registration"
            : "Hospital Registration"}
        </h2>

        {/* ================= PATIENT ================= */}
        {role === "patient" && (
          <>
            <Section title="Personal Info">
              <FloatingInput
                name="firstName"
                label="First Name"
                value={form.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <FloatingInput
                name="lastName"
                label="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
              <FloatingInput
                name="mobile"
                label="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                error={errors.mobile}
              />
              <FloatingInput
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <FloatingInput
                type="date"
                name="dob"
                label="DOB"
                value={form.dob}
                onChange={handleChange}
              />
            </Section>

            <Section title="Medical">
              <Select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
              />
              <Select
                name="blood"
                value={form.blood}
                onChange={handleChange}
                options={["A+", "B+", "O+", "AB+"]}
              />
              <FloatingInput
                name="insurance"
                label="Insurance Policy"
                value={form.insurance}
                onChange={handleChange}
              />
            </Section>

            <Section title="Emergency">
              <FloatingInput
                name="emergencyName"
                label="Contact Name"
                value={form.emergencyName}
                onChange={handleChange}
              />
              <FloatingInput
                name="emergencyPhone"
                label="Contact Phone"
                value={form.emergencyPhone}
                onChange={handleChange}
              />
            </Section>
          </>
        )}

        {/* ================= HOSPITAL ================= */}
        {role === "hospital" && (
          <>
            <Section title="Basic">
              <FloatingInput
                name="hospitalName"
                label="Legal Hospital Name"
                value={form.hospitalName}
                onChange={handleChange}
                error={errors.hospitalName}
              />
              <FloatingInput
                name="registrationNumber"
                label="MCI Registration"
                value={form.registrationNumber}
                onChange={handleChange}
                error={errors.registrationNumber}
              />
              <Select
                name="type"
                value={form.type}
                onChange={handleChange}
                options={["Government", "Private", "Trust", "Clinic"]}
              />
              <TagInput
                label="Specialities"
                onChange={(v) =>
                  setForm((prev) => ({ ...prev, specialities: v }))
                }
              />
              {errors.specialities && (
                <p className="text-xs text-red-500">{errors.specialities}</p>
              )}{" "}
            </Section>

            <Section title="Contact">
              <FloatingInput
                name="phone"
                label="Phone"
                value={form.phone}
                onChange={handleChange}
              />
              <FloatingInput
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
              />
              <FloatingInput
                name="website"
                label="Website (Optional)"
                value={form.website}
                onChange={handleChange}
              />
            </Section>

            <Section title="Hospital Details">
              <FloatingInput
                name="generalBeds"
                label="General Beds"
                value={form.generalBeds}
                onChange={handleChange}
              />
              <FloatingInput
                name="icuBeds"
                label="ICU Beds"
                value={form.icuBeds}
                onChange={handleChange}
              />
              <TagInput
                label="Insurance Providers"
                onChange={(v) => setForm((prev) => ({ ...prev, insurance: v }))}
              />
              {/* ✅ ADD HERE */}
              {errors.insurance && (
                <p className="text-xs text-red-500 mt-1">{errors.insurance}</p>
              )}
              <Toggle
                label="Emergency 24x7"
                onChange={(v) => setForm((prev) => ({ ...prev, emergency: v }))}
              />
              {errors.emergency && (
                <p className="text-xs text-red-500">{errors.emergency}</p>
              )}{" "}
            </Section>

            <Section title="Uploads">
              <input
                type="file"
                multiple
                className="w-full border rounded-lg p-2"
              />
            </Section>
          </>
        )}

        {/* MAP */}
        <div className="mt-6">
          <div className="h-40 rounded-xl overflow-hidden border">
            <MapContainer
              center={[23.0225, 72.5714]}
              zoom={13}
              className="h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker
                setLocation={setLocation}
                fetchAddress={fetchAddress}
              />
              {location && <Marker position={location} />}
            </MapContainer>
          </div>
        </div>

        {/* ADDRESS */}
        <Section title="Address">
          <FloatingInput
            name="city"
            label="City"
            value={form.city}
            onChange={handleChange}
            error={errors.city}
          />

          <FloatingInput
            name="state"
            label="State"
            value={form.state}
            onChange={handleChange}
          />

          <FloatingInput
            name="pin"
            label="PIN"
            value={form.pin}
            onChange={handleChange}
          />
        </Section>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl"
        >
          Submit Registration
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-500 mb-3">{title}</h3>
    <div className="grid md:grid-cols-2 gap-4">{children}</div>
  </div>
);

/* FLOAT INPUT */
const FloatingInput = ({ label, error, value, ...props }) => (
  <div className="relative">
    <input
      {...props}
      value={value || ""}
      placeholder=" "
      autoComplete="off"
      className={`peer w-full p-3 border rounded-xl bg-white/60 outline-none
      ${error ? "border-red-500" : "border-gray-300"}
      focus:ring-2 ${error ? "focus:ring-red-400" : "focus:ring-blue-500"}`}
    />
    <label
      className={`absolute left-3 px-1 bg-white text-gray-500 text-sm transition-all
      ${value ? "-top-2 text-xs text-blue-600" : "top-3"}
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
    >
      {label}
    </label>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

/* SELECT */
const Select = ({ options, value, ...props }) => (
  <select
    {...props}
    value={value || ""}
    className="w-full p-3 border rounded-xl bg-white/60"
  >
    <option value="">Select</option>
    {options.map((o, i) => (
      <option key={i} value={o}>
        {o}
      </option>
    ))}
  </select>
);

/* TAG INPUT */
const TagInput = ({ label, onChange }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const newTags = [...tags, input.trim()];
      setTags(newTags);
      onChange(newTags);
      setInput("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div className="border rounded-xl p-2 bg-white/60">
      <div className="flex flex-wrap gap-2 items-center">
        {tags.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm"
          >
            {t}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-red-500 hover:text-red-700 ml-1"
            >
              ✕
            </button>
          </span>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTag}
          placeholder={label}
          className="outline-none p-1 flex-1 min-w-[100px] bg-transparent"
        />
      </div>
    </div>
  );
};
/* TOGGLE */
const Toggle = ({ label, onChange }) => {
  const [on, setOn] = useState(false);

  return (
    <div
      onClick={() => {
        setOn(!on);
        onChange(!on);
      }}
      className={`p-3 rounded-xl cursor-pointer ${on ? "bg-green-100" : "bg-gray-100"}`}
    >
      {label}: {on ? "Yes" : "No"}
    </div>
  );
};

/* MAP PICKER */
function LocationPicker({ setLocation, fetchAddress }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}
