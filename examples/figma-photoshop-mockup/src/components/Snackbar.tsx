export function Snackbar() {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] border border-[#444] rounded-lg px-4 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-[#EAEAEA]">Removed 'Web'</span>
        <button className="text-[#31A8FF] hover:text-[#2690D9] transition-colors">
          Undo
        </button>
      </div>
    </div>
  );
}