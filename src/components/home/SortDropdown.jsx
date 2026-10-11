"use client";

const SortDropdown = ({ value, onChange }) => {
    return (
        <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
        >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
    );
}
export default SortDropdown;
