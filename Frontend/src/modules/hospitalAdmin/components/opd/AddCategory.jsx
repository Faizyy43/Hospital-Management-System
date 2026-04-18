const AddCategory = ({ onAdd }) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Category"
        className="p-2 border rounded-lg w-full"
      />

      <button
        onClick={() => {
          onAdd(value);
          setValue("");
        }}
        className="bg-blue-500 text-white px-4 rounded-lg"
      >
        Add
      </button>
    </div>
  );
};